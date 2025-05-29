import { UserRoles } from "../user";
import { IUser, IUserPatch } from "../../models/User";
export {};

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: UserRoles;
      tokenExp?: number;
      validatedCreateData?: IUser;
      validatedUpdateData?: IUserPatch;
    }
  }
}
