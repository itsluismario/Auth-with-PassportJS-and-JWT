const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor(){
  }

  async create(data) {
    const customer = await models.Customer.findOne({
      where: {
          '$user.id$': data.userId
      },
      include: ['user']
    });
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    const newOrder = await models.Order.create({
      customerId: customer.id
    });
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const data = await models.Order.findAll();
    if(data.length === 0) {
      throw boom.notFound('There are no orders');
    }
    return data;
  }

  async findByUser(userId) {
    const data = await models.Order.findAll({
      where: {
        '$customer.user.id$' : userId
      },
      include: {
        association: 'customer',
        include: ['user']
      }
    });
    if(data.length === 0) {
      throw boom.notFound('There are no orders');
    }
    return data;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    if (!order) {
      throw boom.notFound('Order not found')
      }
    const response = await order.update(changes);
    return response;
  }

  async delete(id) {
    const order = await this.findOne(id);
    if (!order) {
      throw boom.notFound('Order not found')
    }
    await order.destroy();
    return { id };
  }

}

module.exports = OrderService;
