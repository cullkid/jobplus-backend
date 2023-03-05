//importing functions and packages from their roots
const db = require("../config/database");
const bcrypt = require("bcrypt");

//create a new user request sent from user.controler and sign the body(func)
const createUser = async ({
  first_name,
  last_name,
  email,
  password,
  confirm_password,
}) => {
  //checking if the email a user is signing in already exist in the database
  const checkEmail = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  //to show an error when trying to resign the same email
  if (checkEmail.rows.length > 0) {
    throw new Error("Email already exists");
  }

  //to throw error if password and confirm-password do not mactch
  if (password !== confirm_password) {
    throw new Error("passwords do not match");
  }

  //using bcrypt to hash the user password from showing the real passsword
  const hashedPassword = await bcrypt.hash(password, 10);

  //defining bd to "INSERT INTO" the users db and returen ..
  // all the value and passed them in rows
  const { rows } = await db.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [first_name, last_name, email, hashedPassword]
  );
  return rows;
};

//exporting all functions inside the user.services.js
module.exports = {
  createUser,
};
