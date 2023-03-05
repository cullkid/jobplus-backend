//importing user.sevices.js
const userServices = require("../services/user.services");

// create a new user request sent in from user.route
const createUser = async (req, res) => {
  //send or post the user request i recieved from the ....
  //user.route to user.service, with the (body) as user.service function
  try {
    const user = await userServices.createUser(req.body);

    //return the respond if it was sucessful or it has error
    return res.status(201).send({ message: "User created", user });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

//exporting all functions inside the user.controller.js
module.exports = {
  createUser,
};
