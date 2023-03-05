//importing functions and packages from their roots
const router = require("express-promise-router")();
const skillController = require("../controllers/skill.controller");
const auth = require("../middleware/auth.middleware");

//informing the app.js to get any file with ...
// "/skills" or other available url, ...
//also include 'auth' that was imported to prevent the user ...
//accessing the sector without either sign in or login
router.post("/skills", auth, skillController.createSkill);
router.get("/skills", auth, skillController.getAllSkills);
router.put("/skills/:id", auth, skillController.editSkill);
router.delete("/skills/:id", auth, skillController.deleteSkill);

//export routes
module.exports = router;
