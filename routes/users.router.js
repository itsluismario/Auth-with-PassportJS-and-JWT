const express = require('express');
const UsersService = require('../services/users.service')
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, parcialUpdateUserSchema, getUserSchema, deleteUserSchema } = require('../schemas/users.schema');


// -- Service
const service = new UsersService();

// -- Router
const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
        const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
    res.status(201).json(newUser);
    } catch (error) {
      next(error)
    }
})

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(parcialUpdateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
});

router.put('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
});

router.delete('/:id',
  validatorHandler(deleteUserSchema, 'params'),
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
