const { Client } = require('pg');

require('dotenv').config();

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 3307,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  await client.connect();
  return client;

}

module.exports = getConnection;

