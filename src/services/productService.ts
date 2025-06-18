import Product, { IProduct, IProductPatch } from '../models/Product.ts';
import mongoose, { Types } from 'mongoose';


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
  userId: mongoose.Schema.Types.ObjectId
):Promise<boolean> =>{
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  if (product.userId == userId) return true;
  return false;
};

export const getProductById = async (
  productId: string,
  userId?: Types.ObjectId
): Promise<IProduct | null> => {
  let query;
  if (userId) { 
    query = { _id: productId, user: userId };
  } else {
    query = {_id : productId};
  }
  return await Product.findOne(query);
};


export const deleteProduct = async (
  productId: string
): Promise<IProduct | null> => {
  return await Product.findOneAndDelete({ _id: productId});
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



