const Joi = require('joi');
const productSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Product name is required',
        'string.empty': 'Product name cannot be empty',
        'string.base': 'Product must be a string'
    }),
    description: Joi.string().optional().required().messages({
        'string.empty': 'Description cannot be empty',
        'any.required': 'Product name is required',
    }),
    price: Joi.number().required().messages({
        'any.required': 'Product price is required',
        'number.base': 'Price must be a number'
    }),
    quantity: Joi.number().required().messages({
        'any.required': 'Product quantity is required',
        'number.base': 'Quantity must be a number'
    })
});
module.exports = { productSchema };