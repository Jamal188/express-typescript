import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const UserSchemaZod = z.object({
  id: z.string().optional(),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["admin", "user"]).default("user"),
});

type IUser = z.infer<typeof UserSchemaZod>;

const UserPatchSchemaZod = UserSchemaZod.partial().omit({ id: true });

type IUserPatch = z.infer<typeof UserPatchSchemaZod>;

interface IUserm extends mongoose.Document {
	_id: string;
	username : string;
	email : string;
	password : string;
	role: "admin" | "user" | undefined;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user'},
  }, 
  {
	  toJSON: {
		transform: function(doc, ret) {
      		delete ret.password;
      		delete ret.__v; 
      		return ret;
    		}
	  },
	  toObject: {
		  transform: function(doc, ret) {
      			delete ret.password;
      			delete ret.__v;
      			return ret;
    			}
	  }
});

UserSchema.pre<IUserm>('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model<IUserm>('User', UserSchema);
export default User;
export { IUser, IUserm, UserSchemaZod, IUserPatch, UserPatchSchemaZod };

