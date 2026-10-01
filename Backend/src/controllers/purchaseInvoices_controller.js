const purchaseInvoiceService = require("../services/purchaseInvoices_service");

const getAllPurchaseInvoices = async (req, res) => {
  try {
    const invoices =
      await purchaseInvoiceService.getAllPurchaseInvoices();

    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get purchase invoices",
    });
  }
};

const createPurchaseInvoice = async (req, res) => {
  try {
    const invoice =
      await purchaseInvoiceService.createPurchaseInvoice(
        req.body
      );

    res.status(201).json(invoice);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create purchase invoice",
    });
  }
};

const updatePurchaseInvoice = async (req, res) => {
  try {
    const invoice =
      await purchaseInvoiceService.updatePurchaseInvoice(
        req.params.id,
        req.body
      );

    res.status(200).json(invoice);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update purchase invoice",
    });
  }
};

const deletePurchaseInvoice = async (req, res) => {
  try {
    const invoice =
      await purchaseInvoiceService.deletePurchaseInvoice(
        req.params.id
      );

    res.status(200).json(invoice);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete purchase invoice",
    });
  }
};

module.exports = {
  getAllPurchaseInvoices,
  createPurchaseInvoice,
  updatePurchaseInvoice,
  deletePurchaseInvoice,
};