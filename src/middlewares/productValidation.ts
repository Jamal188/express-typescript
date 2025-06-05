import { checkSchema, validationResult, matchedData } from 'express-validator';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { IProduct, IProductPatch } from '../models/Product.ts';

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
});


export const handleProductValidation = async ( req: Request, res: Response, next: NextFunction) => {

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
     res.status(400).json({ errors: errors.array() });

  }


  const productData = req.body;

  if (!req.body.userId) {
    res.status(403);
  }
  req.userId = req.body.userId;

  if (req.method === 'POST') {
    req.validatedProductData = productData as IProduct;

  } else if (req.method === 'PATCH') {
    req.validatedProductPatch = productData as IProductPatch;
  }

  next();
};
