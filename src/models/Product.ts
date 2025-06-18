import mongoose from 'mongoose';
import User, { IUser } from './User.ts';


export interface IProduct extends mongoose.Document {
	name: string;
	brand: string;
	description?: string;
	price: number;
	quantity: number;
  photo_path?: string;
	userId: mongoose.Schema.Types.ObjectId;
}

export interface IProductPatch extends Partial<Omit<IProduct, 'userId'>> {}

export interface IProductModel extends mongoose.Model<IProduct> {
  createProduct(productData: Omit<IProductPatch, keyof mongoose.Document>,
		userId: mongoose.Schema.Types.ObjectId
	       ): Promise<IProduct>;
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: { 
      type: String, 
      required: [true, 'Product name is required'],
      trim: true
    },
    brand: { 
      type: String, 
      required: [true, 'Brand is required'],
      trim: true 
    },
    description: { 
      type: String, 
      required: false,
      maxlength: [300, 'Description cannot exceed 300 characters']
    },
    price: { 
      type: Number, 
      required: [true, 'Price is required'],
      min: [0.01, 'Price must be positive']
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity of the product is required']
    },
    photo_path: {
      type: String,
      required: false
    },
    userId: {
	    type: mongoose.Schema.Types.ObjectId,
	    required: true,
	    ref: 'User'
    }
  },
  {
    timestamps: true, 
    toJSON: {
      transform: function(doc, ret) {
        delete ret.__v;
        return ret;
      }
    }
  }
);


ProductSchema.pre<IProduct>('save', async function(next) {
  const user = await User.exists({_id: this.userId});
  if (!user) throw new Error("Login required!");

  if (this.isModified('price') && this.price <= 0) {
    throw new Error('Price must be positive');
  }
  next();
});

ProductSchema.statics.createProduct = async function(productData: Omit<IProduct, keyof mongoose.Document | 'userId'> & {
  userId: mongoose.Schema.Types.ObjectId }) 
  {
  	const product = new this(productData);
  	return await product.save();
};


const Product = mongoose.model<IProduct, IProductModel>('Product', ProductSchema);
export type UseProduct = Pick<IProduct, '_id' | 'name' | 'brand' | 'price' | 'description' | 'photo_path'>;
export default Product;

