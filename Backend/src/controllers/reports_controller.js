const reportsService = require("../services/reports_service");

const getInventoryReport = async (req, res) => {
  try {
    const report = await reportsService.getInventoryReport();

    res.status(200).json(report);
  } catch (error) {
    console.error("GET INVENTORY REPORT ERROR:", error);

    res.status(500).json({
      message: "Failed to get inventory report",
    });
  }
};


const getItemMovementReport = async (req, res) => {
  try {
    const report = await reportsService.getItemMovementReport();

    res.status(200).json(report);
  } catch (error) {
    console.error("GET ITEM MOVEMENT REPORT ERROR:", error);

    res.status(500).json({
      message: "Failed to get item movement report",
    });
  }
};


const getPurchaseInvoicesReport = async (req, res) => {
  try {
    const report = await reportsService.getPurchaseInvoicesReport();

    res.status(200).json(report);
  } catch (error) {
    console.error("GET PURCHASE INVOICES REPORT ERROR:", error);

    res.status(500).json({
      message: "Failed to get purchase invoices report",
    });
  }
};


const getSalesInvoicesReport = async (req, res) => {
  try {
    const report = await reportsService.getSalesInvoicesReport();

    res.status(200).json(report);
  } catch (error) {
    console.error("GET SALES INVOICES REPORT ERROR:", error);

    res.status(500).json({
      message: "Failed to get sales invoices report",
    });
  }
};


const getBestSellingMaterialsReport = async (req, res) => {
  try {
    const report =
      await reportsService.getBestSellingMaterialsReport();

    res.status(200).json(report);
  } catch (error) {
    console.error(
      "GET BEST SELLING MATERIALS REPORT ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to get best selling materials report",
    });
  }
};


const getMostAvailableMaterialsReport = async (req, res) => {
  try {
    const report =
      await reportsService.getMostAvailableMaterialsReport();

    res.status(200).json(report);
  } catch (error) {
    console.error(
      "GET MOST AVAILABLE MATERIALS REPORT ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to get most available materials report",
    });
  }
};


const getMaterialsWithBalanceReport = async (req, res) => {
  try {
    const report =
      await reportsService.getMaterialsWithBalanceReport();

    res.status(200).json(report);
  } catch (error) {
    console.error(
      "GET MATERIALS WITH BALANCE REPORT ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to get materials with balance report",
    });
  }
};


const getMaterialsWithoutBalanceReport = async (req, res) => {
  try {
    const report =
      await reportsService.getMaterialsWithoutBalanceReport();

    res.status(200).json(report);
  } catch (error) {
    console.error(
      "GET MATERIALS WITHOUT BALANCE REPORT ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to get materials without balance report",
    });
  }
};


module.exports = {
  getInventoryReport,
  getItemMovementReport,
  getPurchaseInvoicesReport,
  getSalesInvoicesReport,
  getBestSellingMaterialsReport,
  getMostAvailableMaterialsReport,
  getMaterialsWithBalanceReport,
  getMaterialsWithoutBalanceReport,
};