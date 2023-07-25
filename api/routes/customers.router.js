const express = require('express');
const CustomersService = require('../services/customers.service')
const validatorHandler = require('../middlewares/validator.handler');
const { createCustomerSchema, updateCustomerSchema, parcialUpdateCustomerSchema, getCustomerSchema, deleteCustomerSchema } = require('../schemas/customers.schema.js');

// -- Service
const service = new CustomersService();

// -- Router
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
        const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
    res.status(201).json(newCustomer);
    } catch (error) {
      next(error)
    }
})

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(parcialUpdateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await service.update(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
});

router.put('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await service.update(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
});

router.delete('/:id',
  validatorHandler(deleteCustomerSchema, 'params'),
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
