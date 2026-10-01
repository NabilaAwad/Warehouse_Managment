const express = require("express");

const router = express.Router();

const salesInvoiceController = require("../controllers/salesInvoices_controller");

router.get("/", salesInvoiceController.getAllSalesInvoices);

router.get("/:id", salesInvoiceController.getSalesInvoiceById);

router.post("/", salesInvoiceController.createSalesInvoice);

router.put("/:id", salesInvoiceController.updateSalesInvoice);

router.delete("/:id", salesInvoiceController.deleteSalesInvoice);

module.exports = router;
