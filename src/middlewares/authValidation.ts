import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';


export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const validateLoginInput = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = LoginSchema.parse(req.body);
    next();
  } catch (error) {
	  if (error instanceof Error) {
    		res.status(400).json({ error: error });
	  }
  }
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  try {
    if (!token) {
       res.status(401).json({ error: 'Access denied' });
    }
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!);
    if(!decoded) throw new Error("invalid token");

    req.userVerified = decoded as JwtPayload; 
    req.userId = req.userVerified.id;
    req.userRole = req.userVerified.role;

    next();
  } catch (error) {
        if (error instanceof Error) {
              res.status(401).json({ error: error.message });
	}
  }
};
