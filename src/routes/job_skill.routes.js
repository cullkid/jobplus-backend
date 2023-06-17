//importing functions and packages from their roots
const router = require("express-promise-router")();
const jobSkillController = require("../controllers/job_skill.controller");
const auth = require("../middleware/auth.middleware");

//route
router.post("/job-skills", auth, jobSkillController.createJobSkill);
router.get("/job-skills", auth, jobSkillController.getAllJobSkills);
router.delete("/job-skills/:id", auth, jobSkillController.deleteJobSkill);

//export routes
module.exports = router;
