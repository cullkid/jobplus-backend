//insert profile into bd & check if user id already has profile
const router = require("express-promise-router")();
const profileController = require("../controllers/profile.controller");
const auth = require("../middleware/auth.middleware");

//making a post of many url into controller and add it also to the app.js to ..
//let it inform the frontend whenever the url in posted
router.post("/profiles", auth, profileController.createProfile);
router.put("/profiles/:id", auth, profileController.editProfile);

//export router to be use in app.js

module.exports = router;
