const Joi = require('joi');

const id = Joi.number().integer();
const userId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().min(1);

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  userId: userId,
});

const addingItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required()
});

const parcialUpdateOrderSchema = Joi.object({
  userId
});

const updateOrderSchema = Joi.object({
  userId: userId.required(),
});

module.exports = { getOrderSchema, createOrderSchema, parcialUpdateOrderSchema, updateOrderSchema, addingItemSchema };
