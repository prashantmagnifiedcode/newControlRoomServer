const joi = require('@hapi/joi');

const registerSchema = joi.object({
	name:joi.string().required(),
	email:joi.string().required(),
	password:joi.string().required().min(4)
})

const loginSchema = joi.object({
	email:joi.string().required(),
	password:joi.string().required().min(4)
})
const productSchema= joi.object({
	  name:joi.string().required(),
	  Brand:joi.string().required(),
	  BrandType:joi.string().required(),
	  description:joi.string().required(),
	  variant :joi.string().required(),
	//   price :joi.number().positive(),
	  originalPrice:joi.number().positive(), 
	//   originalquantity:joi.number().positive(),
	  quantity:joi.number().positive(),  
	//   quality :joi.string().required(),
	//   createdBy:joi.string().required(),  
	//   category:joi.string().required(),
	//   Status:joi.number().positive(),
	  images: joi.string().required(),
	//   reviews: joi.string().required(),
})

module.exports = {registerSchema,loginSchema,productSchema}