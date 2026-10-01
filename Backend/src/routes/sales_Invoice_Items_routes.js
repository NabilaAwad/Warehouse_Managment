const express = require("express");

const router = express.Router();

const salesInvoiceItemsController =
  require("../controllers/sales_Invoice_Items_controller");

router.get(
  "/", salesInvoiceItemsController.getAllSalesInvoicesItems
);

router.post(
  "/", salesInvoiceItemsController.createSalesInvoiceItem
);

router.put(
  "/:id", salesInvoiceItemsController.updateSalesInvoiceItem
);

router.delete(
  "/:id", salesInvoiceItemsController.deleteSalesInvoiceItem
);

module.exports = router;

