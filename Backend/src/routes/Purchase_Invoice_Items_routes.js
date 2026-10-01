const express = require("express");

const purchaseInvoiceItemsController = require("../controllers/Purchase_Invoice_Items_controller");

const router = express.Router();

router.get("/", purchaseInvoiceItemsController.getAllPurchaseInvoiceItems);

router.post("/", purchaseInvoiceItemsController.createPurchaseInvoiceItem);

router.put("/:id", purchaseInvoiceItemsController.updatePurchaseInvoiceItem);

router.delete("/:id", purchaseInvoiceItemsController.deletePurchaseInvoiceItem);

module.exports = router;
