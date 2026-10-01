const express = require("express");

const router = express.Router();

const {
  getInventoryReport,
  getItemMovementReport,
  getPurchaseInvoicesReport,
  getSalesInvoicesReport,
  getBestSellingMaterialsReport,
  getMostAvailableMaterialsReport,
  getMaterialsWithBalanceReport,
  getMaterialsWithoutBalanceReport,
} = require("../controllers/reports_controller");


router.get("/inventory", getInventoryReport);

router.get("/item-movement", getItemMovementReport);

router.get("/purchase-invoices", getPurchaseInvoicesReport);

router.get("/sales-invoices", getSalesInvoicesReport);

router.get("/best-selling", getBestSellingMaterialsReport);

router.get("/most-available", getMostAvailableMaterialsReport);

router.get("/with-balance", getMaterialsWithBalanceReport);

router.get("/without-balance", getMaterialsWithoutBalanceReport);


module.exports = router;