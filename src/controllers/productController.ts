import { Request, Response } from 'express';
import * as productService from '../services/productService.ts';
import { IProduct, IProductPatch } from '../models/Product.ts';
import { th } from 'zod/v4/locales';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { error } from 'console';
import { Error } from 'mongoose';



export const createProduct = async (req: Request, res: Response) => {
    try {
	if (!req.validatedProductData) throw new Error("Create data is required");

	if(!req.userVerified || !req.userId) throw new Error("Login required");

	const product = await productService.createProduct(req.validatedProductData, req.userId);
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


		if(!req.userId) throw new Error("Login required");

		const updated = await productService.updateProduct(req.validatedProductPatch);
		if (!updated) throw new Error("Internal error");
		
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


export const getProductById = async(req: Request, res: Response) => {
	try {
		if(!req.body.productId) throw new Error("Product id is required");
		let product = await productService.getProductById(req.body.productId);

        if (!product) throw new Error("Product not founnd")
		res.status(201).json(product);

	} catch (error) {
		if (error instanceof Error) {
	    	res.status(400).json({error: error.message});
		}
		else {
	    	res.status(500).json({error: "internal error"});
		}
	}
}


export const deleteProduct = async (req: Request, res: Response) => {
	try {
		let deleted = await productService.deleteProduct(req.params.id);
        if (deleted) {
			res.status(201).json({"Product": "deleted successfully"});
		}
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


export const getProducts = async (req: Request, res: Response) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const result = await productService.getProducts(page);
		res.status(200).json({
        	success: true,
        	data: result.data,
        	pagination: result.pagination,
        });
	} catch (error) {
		res.status(500).json({
        	success: false,
        	message: "Failed to fetch products",
        	"error": error
      });

	}
}