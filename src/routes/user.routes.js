//impoting express-promise-router package from package.json
const router = require("express-promise-router")();

//importing user.controller.js
const userController = require("../controllers/user.controller");

//send or post a users request to the controller
router.post("/users", userController.createUser);

//exporting user.route.js
module.exports = router;
