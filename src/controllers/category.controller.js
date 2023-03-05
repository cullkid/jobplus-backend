//importing functions and packages from their roots
const categoryServices = require("../services/category.services");

// create categories
const createCategory = async (req, res) => {
  try {
    //send a bodey req to service containing categories db name/value to be create
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

// get created categories from services
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

//send an edit category req to services with the category db name/value to be edit
const editCategory = async (req, res) => {
  try {
    const category = await categoryServices.editCategory(
      req.params.id, //sending the category id to be edit into service
      req.body //sending the body/value to be replace with the old one into services
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

//send delete category req to service with the category id to be delete
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

//export all category.controller functions
module.exports = {
  createCategory,
  getAllCategories,
  editCategory,
  deleteCategory,
};
