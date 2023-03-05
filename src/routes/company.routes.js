//importing functions and packages from their roots
const router = require("express-promise-router")();
const companyController = require("../controllers/company.controller");
const auth = require("../middleware/auth.middleware");

//informing the app.js to get any file with ...
// "/companies" or other available url, ...
//also include 'auth' that was imported to prevent the user ...
//accessing the sector without either sign in or login
router.post("/companies", auth, companyController.createCompany);
router.put("/companies/:id", auth, companyController.editCompany);
router.delete("/companies/:id", auth, companyController.deleteCompany);
router.get("/companies", auth, companyController.getAllCompanies);

//export routes
module.exports = router;
