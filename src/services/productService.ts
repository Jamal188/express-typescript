import { string } from 'zod/v4';
import Product, { IProduct, IProductPatch } from '../models/Product.ts';
import mongoose, { Types } from 'mongoose';
import { query } from 'express-validator';

export const createProduct = async (
  productData: Omit<IProductPatch, keyof mongoose.Document>, 
  userId: mongoose.Schema.Types.ObjectId 
): Promise<IProduct> => {
  return await Product.createProduct(productData, userId);
};
export const updateProduct = async (productdata: IProductPatch, 
  userId: mongoose.Schema.Types.ObjectId) => {

    return await Product.updateOne(productdata.id, productdata);
};

export const verifyProduct = async (productId: string,
  userId: string
):Promise<boolean> =>{
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  if ((product.userId).toString() == userId) return true;
  return false;
};

export const getProductById = async (
  productId: string,
  userId?: Types.ObjectId
): Promise<IProduct | null> => {
  if (userId) { 
  const query = { _id: productId, user: userId };
  } else {
    const query = {_id : productId};
  }
  return await Product.findOne(query).populate('user', 'name email');
};


export const deleteProduct = async (
  productId: string,
  userId: Types.ObjectId
): Promise<IProduct | null> => {
  return await Product.findOneAndDelete({ _id: productId, user: userId });
};

export const productInStock = async (productId: string): Promise<boolean> => {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    if (product.quantity > 0) {
	      return true;
    }
    return false;
};



