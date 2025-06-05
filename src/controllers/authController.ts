import { Request, Response } from 'express';
import { loginUser } from '../services/auth.ts';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.json({ token, user });
  } catch (error) {
	  if (error instanceof Error) {
    		res.status(401).json({ error: error });
	  }
  }
};


