//importing functions and packages from their roots
const companyServices = require("../services/company.services");

// create new company db & send req to the service body(func)
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

// get all created companies sent from services
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

//edit created company by sending the id of company wanted to edit and body to replace old one
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

// delete created company by sending the id of the company to be delete to service
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

// export all the company.controller functions
module.exports = {
  createCompany,
  getAllCompanies,
  editCompany,
  deleteCompany,
};
