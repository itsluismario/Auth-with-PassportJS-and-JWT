const express = require('express');
const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema,
        updateProductSchema,
        parcialUpdateProductSchema,
        getProductSchema,
        deleteProductSchema,
        queryProductSchema } = require('../schemas/products.schema');
const passport = require('passport');

// -- Service
const service = new ProductsService();

// -- Router
const router = express.Router();

router.get('/',
  validatorHandler(queryProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products)
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try{
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
})

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(parcialUpdateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
});

router.put('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
});

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(deleteProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await service.delete(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
});

module.exports = router;
