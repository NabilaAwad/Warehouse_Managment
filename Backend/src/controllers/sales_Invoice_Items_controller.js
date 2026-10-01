const salesInvoiceItemsService =
  require("../services/sales_Invoice_Items_service");

const getAllSalesInvoicesItems = async (req, res) => {
  try {
    const items =
      await salesInvoiceItemsService.getAllSalesInvoicesItems();

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get sales invoice items",
      error: error.message,
    });
  }
};

const createSalesInvoiceItem = async (req, res) => {
  try {
    const item =
      await salesInvoiceItemsService.createSalesInvoiceItem(
        req.body
      );

    res.status(201).json(item);
  } catch (error) {
    console.error(
      "CREATE SALES INVOICE ITEM ERROR:",
      error
    );

    if (error.message === "Insufficient stock") {
      return res.status(400).json({
        message:
          "الكمية المطلوبة غير متوفرة في المخزون",
      });
    }

    if (
      error.message === "Sales invoice not found"
    ) {
      return res.status(404).json({
        message: "Sales invoice not found",
      });
    }

    res.status(500).json({
      message:
        "حدث خطأ أثناء إنشاء فاتورة البيع",
    });
  }
};

const updateSalesInvoiceItem = async (req, res) => {
  try {
    const item =
      await salesInvoiceItemsService.updateSalesInvoiceItem(
        req.params.id,
        req.body
      );

    res.json(item);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update sales invoice item",
      error: error.message,
    });
  }
};

const deleteSalesInvoiceItem = async (req, res) => {
  try {
    const item =
      await salesInvoiceItemsService.deleteSalesInvoiceItem(
        req.params.id
      );

    res.json(item);
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete sales invoice item",
      error: error.message,
    });
  }
};

module.exports = {
  getAllSalesInvoicesItems,
  createSalesInvoiceItem,
  updateSalesInvoiceItem,
  deleteSalesInvoiceItem,
};