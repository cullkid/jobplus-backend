//importing functions and packages from their roots
const db = require("../config/database");

// create  category with name & sector id that will be sent from controller
const createCategory = async (body) => {
  const { name, sector_id } = body;

  //insert the category bd name we want to create inside database
  const { rows } = await db.query(
    "INSERT INTO categories (name, sector_id) VALUES ($1, $2) RETURNING *",
    [name, sector_id]
  );

  return rows[0];
};

// get all categories created by insert into category db and select all and send to controller
const getAllCategories = async () => {
  const { rows } = await db.query("SELECT * FROM categories");

  return rows;
};

// update category with category id wanted to edit/updat and body used to change the exist one, sent from controler
const editCategory = async (id, body) => {
  const { name, sector_id } = body; //body will contain sector id to be edit and name of category that will replace the old one

  //insert into db & inform the db to accept the edit coming in, the id from db must be = to id wanted to edit
  const { rows } = await db.query(
    "UPDATE categories SET name = $1, sector_id = $2 WHERE id = $3 RETURNING *",
    [name, sector_id, id]
  );

  return rows[0];
};

// delete category id sent from controller & be sure the id from db match the id wanted to delete
const deleteCategory = async (id) => {
  const { rows } = await db.query(
    "DELETE FROM categories WHERE id = $1 RETURNING *",
    [id]
  );

  return rows[0];
};

//export all category.service functions
module.exports = {
  createCategory,
  getAllCategories,
  editCategory,
  deleteCategory,
};
