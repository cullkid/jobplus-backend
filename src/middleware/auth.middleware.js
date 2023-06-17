// importing functions and packages from their roots
const db = require("../config/database");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = async (req, res, next) => {
  // retrieve token from headers, for browser saving token login in localhost
  // const token = req.headers.authorization.replace("Bearer ", "");

  //retrieve token from header, for postman test
  const token = req.session.token;

  if (!token) {
    return res.status(401).send({ error: "Please Authenticate" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [
      decoded.id,
    ]);

    if (!rows[0]) {
      throw new Error("User not found");
    }

    req.user = rows[0];

    next();
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

//export auth.middleware function
module.exports = auth;
