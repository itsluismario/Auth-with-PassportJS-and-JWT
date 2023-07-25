const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class UsersService {

  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        eamil: faker.internet.email()
      });
    }
  }

  async create(data) {
    const IsUser = await models.User.findOne({
        where: {
          email: data.email
          }
      });
    if (IsUser) {
      throw boom.conflict('User already exists');
    }
    const newUser = await models.User.create(data);
    return newUser;
  }


  async find() {
    const data = await models.User.findAll({
      include: ['customer']
    });
    if(data.length === 0) {
      throw boom.notFound('There are no users');
    }
    return data;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound('User not found')
      }
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound('User not found')
    }
    await user.destroy();
    return { id };
  }
}

module.exports = UsersService;
