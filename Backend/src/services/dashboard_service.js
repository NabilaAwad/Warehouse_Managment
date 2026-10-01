const dashboardModel = require("../models/dashboard_model");

const getDashboardStats = async () => {
  return await dashboardModel.getDashboardStats();
};

module.exports = {
  getDashboardStats,
};