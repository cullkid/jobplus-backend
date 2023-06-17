//importing functions and packages from their roots
const router = require("express-promise-router")();
const sectorController = require("../controllers/sector.controller");
const auth = require("../middleware/auth.middleware");

//route
router.post(
  "/sectors",
  sectorController.upload,
  // auth,
  sectorController.createSector
);

router.get(
  "/sectors",
  auth,
  sectorController.upload,
  sectorController.getAllSectors
);

router.get(
  "/sectors/find/:id",
  auth,
  sectorController.upload,
  sectorController.getJobBySector
);

router.get(
  "/sectors-with-categories",
  auth,
  sectorController.upload,
  sectorController.getAllSectorsWithCategories
);

router.delete("/sectors/:id", auth, sectorController.deleteSector);

router.put(
  "/sectors/:id",
  sectorController.upload,
  auth,
  sectorController.editSector
);

//exporting router to be use in app.js
module.exports = router;
