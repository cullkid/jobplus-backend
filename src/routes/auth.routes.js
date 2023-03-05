// importing packages and functions
const router = require("express-promise-router")();
const authController = require("../controllers/auth.controllers");
// const auth = require("../middleware/auth.middleware");

router.post("/login", authController.loginAuth);
router.post("/logout", authController.logoutAuth);
router.get("/active", authController.activeAuth);

module.exports = router;
