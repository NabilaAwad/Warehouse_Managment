const dashboardService = require("../services/dashboard_service");

const getDashboardStats = async (req, res) => {
  try {
    const stats = await dashboardService.getDashboardStats();

    res.status(200).json(stats);
  } catch (error) {
    console.error("GET DASHBOARD STATS ERROR:", error);

    res.status(500).json({
      message: "Failed to load dashboard statistics",
    });
  }
};

module.exports = {
  getDashboardStats,
};