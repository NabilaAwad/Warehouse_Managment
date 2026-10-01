const purchaseInvoiceItemsService = require("../services/purchase_invoice_items_service");

const getAllPurchaseInvoiceItems = async (req, res) => {
  try {
    const items =
      await purchaseInvoiceItemsService.getAllPurchaseInvoiceItems();

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get purchase invoice items",
    });
  }
};

const createPurchaseInvoiceItem = async (req, res) => {
  try {
    const item =
      await purchaseInvoiceItemsService.createPurchaseInvoiceItem(
        req.body
      );

    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create purchase invoice item",
    });
  }
};

const updatePurchaseInvoiceItem = async (req, res) => {
  try {
    const item =
      await purchaseInvoiceItemsService.updatePurchaseInvoiceItem(
        req.params.id,
        req.body
      );

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update purchase invoice item",
    });
  }
};

const deletePurchaseInvoiceItem = async (req, res) => {
  try {
    const item =
      await purchaseInvoiceItemsService.deletePurchaseInvoiceItem(
        req.params.id
      );

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete purchase invoice item",
    });
  }
};

module.exports = {
  getAllPurchaseInvoiceItems,
  createPurchaseInvoiceItem,
  updatePurchaseInvoiceItem,
  deletePurchaseInvoiceItem,
};