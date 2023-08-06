const express = require('express');
const CategoriesService = require('../services/categories.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkAdminRole, checkRoles } = require('../middlewares/auth.handler');
const { createCategorySchema, updateCategorySchema, parcialUpdateCategorySchema,
getCategorySchema, deleteCategorySchema } = require('../schemas/categories.schema');
const passport = require('passport');

// -- Service
const service = new CategoriesService();

// -- Router
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/',
  validatorHandler(getCategorySchema, 'params'),
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
  checkRoles('admin','customer'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
});

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(parcialUpdateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
});

router.put('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
});

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(deleteCategorySchema, 'params'),
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

