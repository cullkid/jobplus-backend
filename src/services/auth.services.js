// //importing functions and packages from their roots
const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async ({ email, password }) => {
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (rows.length === 0) {
    throw new Error("Email or password is incorrect");
  }

  const validPassword = await bcrypt.compare(password, rows[0].password);

  if (!validPassword) {
    throw new Error("Incorrect password");
  }

  const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });

  return token;
};

const active = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // //selecting the user owner of the decoded id
  // const { rows } = await db.query(
  //   `SELECT *
  //    FROM users
  //     WHERE id = $1`, [
  //   decoded.id,
  // ]);

  const { rows } = await db.query(
    `SELECT
      u.id,
     u.email,
      u.first_name,
      u.last_name,

      json_agg(profiles.*) AS profiles

     FROM users AS u

     LEFT JOIN "profiles" ON u.id = profiles.user_id

      WHERE u.id = $1

       GROUP BY u.id`,
    [decoded.id]
  );

  return rows[0];
};

//exporting aut.service.js
module.exports = {
  login,
  active,
};
