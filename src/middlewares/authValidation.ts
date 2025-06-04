import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


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
    req.userVerified = decoded; 
    next();
  } catch (err) {
        if (err instanceof Error) {
              res.status(401).json({ error: 'Invalid token' });
	}
  }
};
