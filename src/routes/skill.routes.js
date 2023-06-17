//importing functions and packages from their roots
const router = require("express-promise-router")();
const skillController = require("../controllers/skill.controller");
const auth = require("../middleware/auth.middleware");

//route
router.post("/skills", auth, skillController.createSkill);
router.get("/skills", auth, skillController.getAllSkills);
router.put("/skills/:id", auth, skillController.editSkill);
router.delete("/skills/:id", auth, skillController.deleteSkill);

//export routes
module.exports = router;
