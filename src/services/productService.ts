import Product, { IProduct } from '../models/Product.ts';
import mongoose, { Types } from 'mongoose';

export const createProduct = async (
  productData: Omit<IProduct, keyof mongoose.Document>, userId: mongoose.Schema.Types.ObjectId 
): Promise<IProduct> => {
  return await Product.createProduct(productData, userId);
};

export const getProductById = async (
  productId: string,
  userId?: Types.ObjectId
): Promise<IProduct | null> => {
  const query: any = { _id: productId };
  if (userId) query.user = userId; 
  return await Product.findOne(query).populate('user', 'name email');
};


export const deleteProduct = async (
  productId: string,
  userId: Types.ObjectId
): Promise<IProduct | null> => {
  return await Product.findOneAndDelete({ _id: productId, user: userId });
};
