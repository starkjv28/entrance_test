/* eslint-disable no-undef */
require('dotenv').config()

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  pool: { min: 0, max: 7 } // toi da 7 connection
});

knex.raw("SELECT VERSION()").then(() => {
  console.log(`connection to db successful!`);
});

module.exports = {
  DB: knex
};