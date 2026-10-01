const companyModel = require("../models/company_model");

const getAllCompany = async () => {
  const company = await companyModel.getAllcompany();

  return company;
};

const createCompany = async (data) => {
  const company = await companyModel.createCompany(data);

  return company;
};

const updateCompany = async (id, data) => {
  const company = await companyModel.updateCompany(id, data);

  return company;
};

const deleteCompany = async (id) => {
  const company = await companyModel.deleteCompany(id);

  return company;
};

module.exports = {
  getAllCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};