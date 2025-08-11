const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  // host: "192.168.5.95",
  host:"localhost",
  database: "agenor",
  password: "admin",
  port: 5432,
});


module.exports = pool;

module.exports = {
    query: (text, params) => pool.query(text, params),
}