import Product, { IProduct, IProductPatch } from '../models/Product.ts';
import mongoose, { Types } from 'mongoose';
import { PaginatedResponse } from '../types/product.ts';

export const createProduct = async (
  productData: Omit<IProductPatch, keyof mongoose.Document>, 
  userId: mongoose.Schema.Types.ObjectId 
): Promise<IProduct> => {
  return await Product.createProduct(productData, userId);
};

export const updateProduct = async (productdata: IProductPatch) => {
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

export const getProducts = async (page: number = 1):Promise<PaginatedResponse> => {
    const limit = 5;
    if (page < 1) throw new Error("Page must be >= 1");
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .lean();
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;
    return {
      data: products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        nextPage,
        prevPage,
      },
    };
}


