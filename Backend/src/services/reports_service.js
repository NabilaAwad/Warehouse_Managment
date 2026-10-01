const reportsModel = require("../models/reports_model");

const getInventoryReport = async () => {
  return await reportsModel.getInventoryReport();
};

const getItemMovementReport = async () => {
  return await reportsModel.getItemMovementReport();
};

const getPurchaseInvoicesReport = async () => {
  return await reportsModel.getPurchaseInvoicesReport();
};

const getSalesInvoicesReport = async () => {
  return await reportsModel.getSalesInvoicesReport();
};

const getBestSellingMaterialsReport = async () => {
  return await reportsModel.getBestSellingMaterialsReport();
};

const getMostAvailableMaterialsReport = async () => {
  return await reportsModel.getMostAvailableMaterialsReport();
};

const getMaterialsWithBalanceReport = async () => {
  return await reportsModel.getMaterialsWithBalanceReport();
};

const getMaterialsWithoutBalanceReport = async () => {
  return await reportsModel.getMaterialsWithoutBalanceReport();
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