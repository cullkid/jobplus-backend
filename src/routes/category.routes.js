//importing functions and packages from their roots
const router = require("express-promise-router")();
const categoryController = require("../controllers/category.controller");
const auth = require("../middleware/auth.middleware");

//route
router.post("/categories", auth, categoryController.createCategory);
router.put("/categories/:id", auth, categoryController.editCategory);
router.delete("/categories/:id", auth, categoryController.deleteCategory);
router.get("/categories", auth, categoryController.getAllCategories);

//export routes
module.exports = router;
