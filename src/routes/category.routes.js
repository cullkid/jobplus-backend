//importing functions and packages from their roots
const router = require("express-promise-router")();
const categoryController = require("../controllers/category.controller");
const auth = require("../middleware/auth.middleware");

//informing the app.js to get any file with ...
// "/categories" or other available url, ...
//also include 'auth' that was imported to prevent the user ...
//accessing the sector without either sign in or login

router.post("/categories", auth, categoryController.createCategory);
router.put("/categories/:id", auth, categoryController.editCategory);
router.delete("/categories/:id", auth, categoryController.deleteCategory);
router.get("/categories", auth, categoryController.getAllCategories);

//export routes
module.exports = router;
