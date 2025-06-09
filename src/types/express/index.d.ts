import mongoose from 'mongoose';
import { UserRoles } from "../user.ts";
import { Session } from '../session.ts';
import { IUser, IUserPatch } from "../../models/User.ts";
import { IProduct, IProductPatch } from "../../models/Product.ts";

export {};

declare global {
  namespace Express {
    interface Request {
      userId?: mongoose.Schema.Types.ObjectId; 
      userRole?: UserRoles;
      userVerified?: string | JwtPayload;
      user?: IUser;
      email?: string;
      tokenExp?: number;
      validatedCreateData?: IUser;
      validatedUpdateData?: IUserPatch;
      validatedProductData?: IProductPatch;
      validatedProductPatch?: IProductPatch;
      productId: string;
    }
  }
}
