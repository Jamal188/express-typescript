import { checkSchema, validationResult, matchedData } from 'express-validator';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { IProduct, IProductPatch } from '../models/Product.ts';
import * as productService from '../services/productService.ts';



export const validateProduct = checkSchema({
	name: {
		isString: true,
		notEmpty: true,
		errorMessage: 'Product name is required!',
		trim: true,
		escape: true,
		isLength: {
			options: {max: 30},
			errorMessage: 'Product name cannot exceed 30 characters!'
		}
	},
	
	brand: {
		isString: true,
		notEmpty: true,
		errorMessage: 'Brand name is required!',
		trim: true,
		escape: true,
		isLength: {
			options: {max: 30},
			errorMessage: 'Brand name cannot exceed 30 characters!'
		}
	},

	description: {
		optional: true,
		isString: true,
		trim: true,
		escape: true,
		isLength: {
			options: {max: 300},
			errorMessage: 'Product description cannot exceed 300 characters!'
		}
	},
        price: {
		isFloat: {
			options : {min: 0.01},
			errorMessage: 'Product price cannot be negative!'
		},
		toFloat: true,

	},
	quantity: {
		isInt : {
			options: {min: 0},
			errorMessage: 'Product quantity cannot be negative!'
		}
	}
});



export const validateProductUpdate = checkSchema({
	name: {
		optional: true,
		isString: true,
		trim: true,
		escape: true,
		isLength: {
			options: {max: 30},
			errorMessage: 'Product name cannot exceed 30 characters!'
		}
	},
	
	brand: {
		optional: true,
		isString: true,
		trim: true,
		escape: true,
		isLength: {
			options: {max: 30},
			errorMessage: 'Brand name cannot exceed 30 characters!'
		}
	},

	description: {
		optional: true,
		isString: true,
		trim: true,
		escape: true,
		isLength: {
			options: {max: 300},
			errorMessage: 'Product description cannot exceed 300 characters!'
		}
	},
        price: {
		optional: true,
		isFloat: {
			options : {min: 0.01},
			errorMessage: 'Product price cannot be negative!'
		},
		toFloat: true,

	},
	quantity: {
		isInt : {
			options: {min: 0},
			errorMessage: 'Product quantity cannot be negative!'
		}
	}
});


export const handleProductValidation = async ( req: Request, res: Response, next: NextFunction) => {

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
	return;
  }
  
  const productData = req.body;
  productData.userId = req.userId;

  if (req.method === 'POST') {
    req.validatedProductData = productData as IProductPatch;

  } else if (req.method === 'PATCH') {
    req.validatedProductPatch = productData as IProductPatch;
  }

  next();
};


export const verifyProduct = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.userId) throw new Error("Login required");

	if(!req.params.id) throw new Error("Product id required");


	const result = await productService.verifyProduct(req.params.id, req.userId);

    if(!result) throw new Error("Permission denied");

	next();
};
