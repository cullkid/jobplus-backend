//importing functions and packages from their roots
const router = require("express-promise-router")();
const userJobControllers = require("../controllers/user_job.controller");
const auth = require("../middleware/auth.middleware");

//informing the app.js to get any file with ...
// "/user-jobs" or other available url, ...
//also include 'auth' that was imported to prevent the user ...
//accessing the sector without either sign in or login
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
