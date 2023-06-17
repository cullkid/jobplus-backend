//importing functions and packages from their roots
const categoryServices = require("../services/category.services");

// create categories
const createCategory = async (req, res) => {
  try {
    const category = await categoryServices.createCategory(req.body);

    return res.status(200).json({
      message: "category created sucessfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// get created categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryServices.getAllCategories();

    return res.status(200).json({
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// edit category
const editCategory = async (req, res) => {
  try {
    const category = await categoryServices.editCategory(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      message: "Updated category successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await categoryServices.deleteCategory(req.params.id);

    return res.status(200).json({
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//export
module.exports = {
  createCategory,
  getAllCategories,
  editCategory,
  deleteCategory,
};
