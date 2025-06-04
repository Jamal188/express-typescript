import { Request, Response } from 'express';
import * as userService from '../services/userServices';
import {IUserPatch} from '../models/User';

export const createUser = async (req: Request, res: Response) => {
  try {
    if (!req.validatedCreateData) {
    	throw new Error("Update data is required");
    }
    const user = await userService.createUser(req.validatedCreateData); 
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    if (!req.userId) { return res.status(404).json({ error: 'No id provided' }); }
    const user = await userService.getUserById(req.userId);
    if (!user) {
       res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserByEmail(req.email as string);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


export const patchUser = async (req: Request, res: Response):Promise<void> => {
  try {
    if (!req.validatedUpdateData) {
    	throw new Error("Update data is required");
    }    
    const updatedUser = await userService.patchUser(req.params.id, req.validatedUpdateData);
    if (!updatedUser) {
       res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
        if (error instanceof Error) {
    	    res.status(400).json({ error: error });
	}
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const home = (req: Request, res: Response) => {
	
}
