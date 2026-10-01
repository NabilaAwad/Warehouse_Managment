const customerModel = require("../models/customers_model");

const getAllCustomers = async () => {
  const customers = await customerModel.getAllCustomers();

  return customers;
};
const createCustomers = async (data) => {
  const customers = await customerModel.createCustomers(data);

  return customers;
};
const updateCustomers = async (data,id) => {
  const customers = await customerModel.updateCustomers(data,id);

  return customers;
}
const deleteCustomers = async (id) => {
  const customers = await customerModel.deleteCustomers(id);

  return customers;
}

module.exports = {
  getAllCustomers,
  createCustomers,
  updateCustomers,
  deleteCustomers
};