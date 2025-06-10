import mongoose from 'mongoose';
import { UserRoles, UserJwt } from "../user.ts";

import { IUser, IUserPatch } from "../../models/User.ts";
import { IProduct, IProductPatch } from "../../models/Product.ts";
import { JwtPayload } from 'jsonwebtoken';

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
