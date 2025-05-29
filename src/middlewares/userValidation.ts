import { Request, Response, NextFunction } from 'express';
import { UserSchemaZod, UserPatchSchemaZod } from '../models/User';

export const validateUserInput = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
  try {

    const validatedData = UserSchemaZod.parse(req.body);
    req.validatedCreateData = validatedData; 
    next();

  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({ error: error });
    }
  }
};


export const validateUserPatchInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
	
    const validatedData = UserPatchSchemaZod.parse(req.body);
    req.validatedUpdateData = validatedData;
    next();
  } catch (error) {
      if (error instanceof Error) {
	  res.status(400).json({ error: error });
      }
  }
};


