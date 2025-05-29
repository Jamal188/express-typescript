import User, { IUser, IUserPatch } from '../models/User';




export const createUser = async (userData: Omit<IUser, 'id'>) => {
	return await User.create(userData);
};

export const getUserById = async ( id: string ) => {
	return await User.findById(id).select('-password');
};


export const getUserByEmail = async (email: string) => {
	return await User.findOne({ email });
};

export const patchUser = async (id: string, userData: IUserPatch) => {
	return await User.findByIdAndUpdate(id, userData);
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};


