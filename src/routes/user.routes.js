//impoting express-promise-router package from package.json
const router = require("express-promise-router")();

//importing user.controller.js
const userController = require("../controllers/user.controller");

//route
router.post("/users", userController.createUser);

//export
module.exports = router;
