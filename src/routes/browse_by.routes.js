const router = require("express-promise-router")();
const browseByController = require("../controllers/browse_by.controller");
const auth = require("../middleware/auth.middleware");

router.get(
  "/browse-by/sectors",
  // auth,
  browseByController.getAllJobsInEachSectors
);

router.get(
  "/browse-by/locations",
  // auth,
  browseByController.getAllJobsInEachLocation
);

//export router
module.exports = router;
