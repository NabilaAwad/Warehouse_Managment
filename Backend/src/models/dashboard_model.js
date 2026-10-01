const pool = require("../config/database");

const getDashboardStats = async () => {
  const result = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM materials) AS materials,
      (SELECT COUNT(*) FROM warehouse) AS warehouses,
      (SELECT COUNT(*) FROM customers) AS customers,
      (SELECT COUNT(*) FROM suppliers) AS suppliers,
      (SELECT COALESCE(SUM(quantity), 0) FROM stock) AS total_stock,
      (SELECT COUNT(*) FROM purchase_invoices) AS purchase_invoices,
      (SELECT COUNT(*) FROM sales_invoices) AS sales_invoices
  `);

  return result.rows[0];
};

module.exports = {
  getDashboardStats,
};