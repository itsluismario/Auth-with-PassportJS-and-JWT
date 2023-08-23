const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');

class CustomersService {

  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    };
    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    });
    // Iterate through each user object and delete properties
    data.forEach(user => {
      delete user.dataValues.password;
      delete user.dataValues.recoveryToken;
    });

    return newCustomer;
  }

  async find() {
    const data = await models.Customer.findAll({
      include: ['user']
    });
    if(data.length === 0) {
      throw boom.notFound('There are no customers');
    }
    return data;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found')
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    if (!customer) {
      throw boom.notFound('Customer not found')
      }
    const response = await customer.update(changes);
    return response;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    if (!customer) {
      throw boom.notFound('Customer not found')
    }
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomersService;
