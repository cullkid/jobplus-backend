//importing
const companyServices = require("../services/company.services");

// create new company
const createCompany = async (req, res) => {
  try {
    const company = await companyServices.createCompany(req.body);
    res.status(201).send({
      message: "Company created successfully",
      data: company,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await companyServices.getAllCompanies(); //wating res from service
    res.status(200).send({
      message: "Available created companies",
      data: companies,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//edit created company
const editCompany = async (req, res) => {
  try {
    const company = await companyServices.editCompany(req.params.id, req.body);
    res.status(200).send({
      message: "Updated successfully",
      data: company,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// delete created company
const deleteCompany = async (req, res) => {
  try {
    const company = await companyServices.deleteCompany(req.params.id);
    res.status(200).send({
      message: "Deleted successfully",
      data: company,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// export
module.exports = {
  createCompany,
  getAllCompanies,
  editCompany,
  deleteCompany,
};
