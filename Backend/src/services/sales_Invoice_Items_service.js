const salesInvoiceItemsModel = require("../models/sales_Invoice_Items_model");
const salesInvoiceModel = require("../models/salesInvoices_model");
const stockService = require("./stock_service");

const getAllSalesInvoicesItems = async () => {
  const items =
    await salesInvoiceItemsModel.getAllSalesInvoicesItems();

  return items;
};

const createSalesInvoiceItem = async (data) => {
  const invoice =
    await salesInvoiceModel.getSalesInvoiceById(
      data.invoice_id
    );

  if (!invoice) {
    throw new Error("Sales invoice not found");
  }

  await stockService.decreaseStock(
    invoice.warehouse_id,
    data.material_id,
    data.quantity
  );

  const item =
    await salesInvoiceItemsModel.createSalesInvoiceItem(
      data
    );

  return item;
};

const updateSalesInvoiceItem = async (id, data) => {
  const item =
    await salesInvoiceItemsModel.updateSalesInvoiceItem(
      id,
      data
    );

  return item;
};

const deleteSalesInvoiceItem = async (id) => {
  const item =
    await salesInvoiceItemsModel.deleteSalesInvoiceItem(
      id
    );

  return item;
};

module.exports = {
  getAllSalesInvoicesItems,
  createSalesInvoiceItem,
  updateSalesInvoiceItem,
  deleteSalesInvoiceItem,
};