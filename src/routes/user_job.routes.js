//importing functions and packages from their roots
const router = require("express-promise-router")();
const userJobControllers = require("../controllers/user_job.controller");
const auth = require("../middleware/auth.middleware");

//route
router.post("/user-jobs", auth, userJobControllers.createUserJob);
router.get(
  "/user-jobs",
  auth,
  userJobControllers.getAllAvailableUserJobsByUserAndType
);

router.delete(
  "/user-jobs/:id",
  auth,
  userJobControllers.deleteParticularUserJob
);

router.delete(
  "/user-jobs",
  auth,
  userJobControllers.deleteAllUserJobsTypeByUserAndType
);

module.exports = router;
