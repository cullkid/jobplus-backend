//importing functions and packages.getAllJobs);
const router = require("express-promise-router")();
const jobController = require("../controllers/job.controller");
const auth = require("../middleware/auth.middleware");

//route
router.post("/jobs", auth, jobController.createJob);
router.get("/jobs", auth, jobController.getAllJobs);

router.put("/jobs/:id", auth, jobController.editJob);

router.delete("/jobs/:id", auth, jobController.deleteJob);

router.get(
  "/jobs-with-companies-and-skills",
  auth,
  jobController.getAllJobsWithCompaniesAndSkills
);
router.get("/jobs/search", auth, jobController.searchJobs);

router.get("/sector-jobs/:id", auth, jobController.listJobsInEachSector);

//export routes
module.exports = router;
