import User, { IUser } from '../models/User.ts';




export const createUser = async (userData: Omit<IUser, 'id'>) => {
	return await User.create(userData);
};

export const getUserById = async ( id: string ) => {
	return await User.findById(id).select('-password');
};


export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};




export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};


