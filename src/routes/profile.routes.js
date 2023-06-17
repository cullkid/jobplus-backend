//insert profile into bd & check if user id already has profile
const router = require("express-promise-router")();
const profileController = require("../controllers/profile.controller");
const auth = require("../middleware/auth.middleware");

//route
router.post("/profiles", auth, profileController.createProfile);
router.put("/profiles/:id", auth, profileController.editProfile);
router.post("/profiles/match", auth, profileController.matchJobWithProfile);

//export router to be use in app.js

module.exports = router;
