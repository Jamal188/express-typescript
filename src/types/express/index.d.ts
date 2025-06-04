import { UserRoles } from "../user";
import { Session } from '../session';
import { IUser, IUserPatch } from "../../models/User";
export {};

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: UserRoles;
      userVerified?: string | JwtPayload;
      user?: IUser;
      email?: string;
      tokenExp?: number;
      validatedCreateData?: IUser;
      validatedUpdateData?: IUserPatch;
    }
  }
}
