import { Request, Response } from 'express';
import * as productService from '../services/productService.ts';
import { IProduct, IProductPatch } from '../models/Product.ts';
import { th } from 'zod/v4/locales';



export const createProduct = async (req: Request, res: Response) => {
    try {
	if (!req.validatedProductData) throw new Error("Create data is required");

	if(!req.userVerified || !req.body.userId) throw new Error("Login required");

	const product = await productService.createProduct(req.validatedProductData, req.body.userId);
	res.status(201).json(product);
    
    } catch (error) {
	    if (error instanceof Error) {
		res.status(400).json({error: error.message});
            }
	    else {
		res.status(500).json({error: "internal error"});
	    }
   }
};


export const updateProduct = async (req: Request, res: Response) => {
	try {

		if(!req.validatedProductPatch) throw new Error("Update data is required");


		if(!req.body.userId) throw new Error("Login required");

		const updated = await productService.updateProduct(req.validatedProductPatch, 
			req.body.userId);
		res.status(201).json("updated successfully");
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({error: error.message});
		}
		else {
			res.status(500).json({error: "internal error"});
		}

	}

};


export const inStock = async (req: Request, res: Response) => {
    try {
	if (!req.body.productId) throw new Error("Product id required");
	const instock = await productService.productInStock(req.body.productId);
	res.status(200).json({ inStock: instock });
    } catch (error) {
	if (error instanceof Error) {
	    res.status(400).json({error: error.message});
	}
	else {
	    res.status(500).json({error: "internal error"});
	}
    }    
};
