//importing functions and packages from their roots
const { Pool } = require("pg");
require("dotenv").config();

//creating new database
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// console.log("pool", process.env.DB_PASSWORD);
//connecting to database
pool.on("connect", () => {
  console.log("connected to the database");
});

//exporting a query with the pool
module.exports = {
  query: (text, params) => pool.query(text, params),
};
