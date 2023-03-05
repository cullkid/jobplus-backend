//importing functions and packages from their roots
const db = require("../config/database");

// create new company with the campany db name/value sent from controller
const createCompany = async (body) => {
  const { name, district, city } = body;

  //insert the company db name/value and check if is = to the one wanted to create
  const company = await db.query(
    "INSERT INTO companies (name, district, city) VALUES ($1, $2, $3) RETURNING *",
    [name, district, city]
  );

  return company.rows[0];
};

// get all created companies by inserting and select all created company and send to controller
const getAllCompanies = async () => {
  const companies = await db.query("SELECT * FROM companies");

  return companies.rows;
};

// edit created company with the created company id and the body to replace the old one, sent from controller
const editCompany = async (id, body) => {
  //the body that will replace the old one will have: name, district, city
  const { name, district, city } = body;

  //che if the id and value/db of company body using to replace old one match the old one
  const company = await db.query(
    "UPDATE companies SET name = $1, district = $2, city = $3 WHERE id = $4 RETURNING *",
    [name, district, city, id]
  );

  return company.rows[0];
};

// delete created company id sent from controller
const deleteCompany = async (id) => {
  // check if company wanted to delete exists by checking if the id exist in created company db
  const exists = await db.query("SELECT * FROM companies WHERE id = $1", [id]);

  if (!exists.rows[0]) {
    //throw error if it doesn't exist
    throw new Error("Company does not exist");
  }

  //then delete if the id do exist
  const company = await db.query(
    "DELETE FROM companies WHERE id = $1 RETURNING *",
    [id]
  );

  return company.rows[0];
};

// export all the company.services functions
module.exports = {
  createCompany,
  getAllCompanies,
  editCompany,
  deleteCompany,
};
