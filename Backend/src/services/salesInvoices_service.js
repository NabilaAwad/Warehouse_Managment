const pool = require("../config/database");

const salesInvoiceModel = require("../models/salesInvoices_model");
const salesInvoiceItemsModel = require("../models/sales_Invoice_Items_model");
const stockModel = require("../models/stock_model");

const getAllSalesInvoices = async () => {
  const invoices =
    await salesInvoiceModel.getAllSalesInvoices();

  return invoices;
};

const createSalesInvoice = async (data) => {
  if (!Array.isArray(data.items) || data.items.length === 0) {
    throw new Error(
      "Sales invoice must contain items"
    );
  }

  const client = await pool.connect();

  try {
    // Start transaction
    await client.query("BEGIN");

    // 1. Create invoice
    const invoice =
      await salesInvoiceModel.createSalesInvoiceWithClient(
        client,
        data
      );

    // 2. Create items + decrease stock
    for (const item of data.items) {
      // Decrease stock first
      await stockModel.decreaseStockWithClient(
        client,
        data.warehouse_id,
        item.material_id,
        item.quantity
      );

      // Create invoice item
      await salesInvoiceItemsModel.createSalesInvoiceItemWithClient(
        client,
        {
          invoice_id: invoice.id,
          material_id: item.material_id,
          quantity: item.quantity,
          price: item.price,
        }
      );
    }

    // Everything succeeded
    await client.query("COMMIT");

    return invoice;
  } catch (error) {
    // Something failed
    await client.query("ROLLBACK");

    throw error;
  } finally {
    // Return connection to pool
    client.release();
  }
};

const updateSalesInvoice = async (id, data) => {
  const invoice =
    await salesInvoiceModel.updateSalesInvoice(
      id,
      data
    );

  return invoice;
};

const deleteSalesInvoice = async (id) => {
  const invoice =
    await salesInvoiceModel.deleteSalesInvoice(id);

  return invoice;
};

const getSalesInvoiceById = async (id) => {
  const invoice =
    await salesInvoiceModel.getSalesInvoiceById(id);

  return invoice;
};

module.exports = {
  getAllSalesInvoices,
  createSalesInvoice,
  updateSalesInvoice,
  deleteSalesInvoice,
  getSalesInvoiceById,
};