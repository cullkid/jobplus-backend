//importing functions and packages from their roots
const router = require("express-promise-router")();
const jobSkillController = require("../controllers/job_skill.controller");
const auth = require("../middleware/auth.middleware");

//informing the app.js to get any file with ...
// "/job-skills" or other available url, ...
//also include 'auth' that was imported to prevent the user ...
//accessing the sector without either sign in or login
router.post("/job-skills", auth, jobSkillController.createJobSkill);
router.get("/job-skills", auth, jobSkillController.getAllJobSkills);
router.delete("/job-skills/:id", auth, jobSkillController.deleteJobSkill);

//export routes
module.exports = router;
