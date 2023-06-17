//importing functions and packages from their roots
const db = require("../config/database");

// create new company
const createCompany = async (body) => {
  const { name, district, city } = body;

  const company = await db.query(
    "INSERT INTO companies (name, district, city) VALUES ($1, $2, $3) RETURNING *",
    [name, district, city]
  );

  return company.rows[0];
};

// get all created companies
const getAllCompanies = async () => {
  const companies = await db.query("SELECT * FROM companies");

  return companies.rows;
};

// edit created company by it's id
const editCompany = async (id, body) => {
  const { name, district, city } = body;

  const company = await db.query(
    "UPDATE companies SET name = $1, district = $2, city = $3 WHERE id = $4 RETURNING *",
    [name, district, city, id]
  );

  return company.rows[0];
};

// delete created company by id
const deleteCompany = async (id) => {
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
