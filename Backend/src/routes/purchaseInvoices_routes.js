const express = require("express");

const purchaseInvoiceController = require("../controllers/purchaseInvoices_controller");

const router = express.Router();

router.get("/", purchaseInvoiceController.getAllPurchaseInvoices);

router.post("/", purchaseInvoiceController.createPurchaseInvoice);

router.put("/:id", purchaseInvoiceController.updatePurchaseInvoice);

router.delete("/:id", purchaseInvoiceController.deletePurchaseInvoice);

module.exports = router;
