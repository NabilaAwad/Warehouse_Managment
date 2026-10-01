const salesInvoiceService = require("../services/salesInvoices_service");

const getAllSalesInvoices = async (req, res) => {
  try {
    const invoices =
      await salesInvoiceService.getAllSalesInvoices();

    res.json(invoices);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get sales invoices",
      error: error.message,
    });
  }
};

const createSalesInvoice = async (req, res) => {
  try {
    const invoice =
      await salesInvoiceService.createSalesInvoice(
        req.body
      );

    res.status(201).json(invoice);
  } catch (error) {
    console.error(
      "CREATE SALES INVOICE ERROR:",
      error
    );

    if (error.message === "Insufficient stock") {
      return res.status(400).json({
        message:
          "الكمية المطلوبة غير متوفرة في المخزون",
      });
    }

    if (
      error.message ===
      "Sales invoice must contain items"
    ) {
      return res.status(400).json({
        message:
          "يجب أن تحتوي فاتورة البيع على مادة واحدة على الأقل",
      });
    }

    res.status(500).json({
      message: "Failed to create sales invoice",
      error: error.message,
    });
  }
};

const updateSalesInvoice = async (req, res) => {
  try {
    const invoice =
      await salesInvoiceService.updateSalesInvoice(
        req.params.id,
        req.body
      );

    res.json(invoice);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update sales invoice",
      error: error.message,
    });
  }
};

const deleteSalesInvoice = async (req, res) => {
  try {
    const invoice =
      await salesInvoiceService.deleteSalesInvoice(
        req.params.id
      );

    res.json(invoice);
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete sales invoice",
      error: error.message,
    });
  }
};

const getSalesInvoiceById = async (req, res) => {
  try {
    const invoice =
      await salesInvoiceService.getSalesInvoiceById(
        req.params.id
      );

    if (!invoice) {
      return res.status(404).json({
        message: "Sales invoice not found",
      });
    }

    res.json(invoice);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get sales invoice",
      error: error.message,
    });
  }
};

module.exports = {
  getAllSalesInvoices,
  createSalesInvoice,
  updateSalesInvoice,
  deleteSalesInvoice,
  getSalesInvoiceById,
};