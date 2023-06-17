//importing user.sevices.js
const userServices = require("../services/user.services");

// create a new user request sent in from user.route
const createUser = async (req, res) => {
  try {
    const user = await userServices.createUser(req.body);

    return res.status(201).send({ message: "User created", user });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

//export
module.exports = {
  createUser,
};
