const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const pool = require('../../libs/postgres.pool');

class UsersService {

  constructor() {
    this.users = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
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

  create(data) {
    const newUser = {
      id: faker.string.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    const query = 'SELECT * FROM public.tasks';
    const response = await this.pool.query(query)
    return response.rows;
  }

  findOne(id) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user;
  }

  update(id, changes) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found')
      }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    }
    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found')
    }
    this.users.splice(index, 1)
    return { id };
  }
}

module.exports = UsersService;
