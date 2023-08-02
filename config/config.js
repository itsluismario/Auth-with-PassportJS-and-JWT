require('dotenv').config({ path: './config/.env'});

/**
 * @description variables of database server
 */

const config = {
  env: process.env.NODE_ENV || 'dev',
  isPord: process.env.NODE_ENV === 'production',
  dbDriver: process.env.DB_DRIVER,
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  apiKey: process.env.API_KEY,
}

module.exports = { config };
