const purchaseInvoiceItemsModel = require("../models/Purchase_Invoice_Items_model");
const purchaseInvoiceModel = require("../models/purchaseInvoices_model");
const stockService = require("./stock_service");

const getAllPurchaseInvoiceItems = async () => {
  const items =
    await purchaseInvoiceItemsModel.getAllPurchaseInvoiceItems();

  return items;
};

const createPurchaseInvoiceItem = async (data) => {
  // Create invoice item
  const item =
    await purchaseInvoiceItemsModel.createPurchaseInvoiceItem(data);

  // Get the invoice to know which warehouse it belongs to
  const invoice =
    await purchaseInvoiceModel.getPurchaseInvoiceById(
      data.invoice_id
    );

  // Increase stock
  await stockService.increaseStock(
    invoice.warehouse_id,
    data.material_id,
    data.quantity
  );

  return item;
};

const updatePurchaseInvoiceItem = async (id, data) => {
  const item =
    await purchaseInvoiceItemsModel.updatePurchaseInvoiceItem(
      id,
      data
    );

  return item;
};

const deletePurchaseInvoiceItem = async (id) => {
  const item =
    await purchaseInvoiceItemsModel.deletePurchaseInvoiceItem(id);

  return item;
};

module.exports = {
  getAllPurchaseInvoiceItems,
  createPurchaseInvoiceItem,
  updatePurchaseInvoiceItem,
  deletePurchaseInvoiceItem,
};