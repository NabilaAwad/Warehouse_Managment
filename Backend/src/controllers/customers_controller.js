const customersService = require("../services/customers_service");

const getAllCustomers = async (req, res) => {
  try {
    const customers = await customersService.getAllCustomers();

    res.status(200).json(customers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get materials",
    });
  }
};
const createCustomers = async (req, res) => {
  try {
    const customers = await customersService.createCustomers(req.body);

    res.status(200).json(customers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create materials",
    });
  }
};
const updateCustomers = async (req, res) => {
  try {
    const customers = await customersService.updateCustomers(req.params.id,req.body);

    res.status(200).json(customers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update materials",
    });
  }
};
const deleteCustomers = async (req, res) => {
  try {
    const customers = await customersService.deleteCustomers(req.params.id);

    res.status(200).json(customers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete materials",
    });
  }
};

module.exports = {
  getAllCustomers,
  createCustomers,
  updateCustomers,
  deleteCustomers
};