const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'equeue',
  password: 'ilovelondon08',
  port: 5432,
});

module.exports = pool;