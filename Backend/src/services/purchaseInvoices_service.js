const purchaseInvoiceModel = require("../models/purchaseInvoices_model");
const stockService = require("./stock_service");

const getAllPurchaseInvoices = async () => {
  const invoices =
    await purchaseInvoiceModel.getAllPurchaseInvoices();

  return invoices;
};

const createPurchaseInvoice = async (data) => {
  const invoice =
    await purchaseInvoiceModel.createPurchaseInvoice(data);

  return invoice;
};

const updatePurchaseInvoice = async (id, data) => {
  const invoice =
    await purchaseInvoiceModel.updatePurchaseInvoice(id, data);

  return invoice;
};

const deletePurchaseInvoice = async (id) => {
  const invoice =
    await purchaseInvoiceModel.deletePurchaseInvoice(id);

  return invoice;
};

module.exports = {
  getAllPurchaseInvoices,
  createPurchaseInvoice,
  updatePurchaseInvoice,
  deletePurchaseInvoice,
};