const pool = require("../config/database");


// 1. Inventory Report
const getInventoryReport = async () => {
  const result = await pool.query(
    `SELECT
       s.id,
       s.warehouse_id,
       w.name AS warehouse_name,
       s.material_id,
       m.name AS material_name,
       s.quantity
     FROM stock s
     JOIN warehouse w
       ON s.warehouse_id = w.id
     JOIN materials m
       ON s.material_id = m.id
     ORDER BY w.name, m.name`
  );

  return result.rows;
};


// 2. Item Movement Report
const getItemMovementReport = async () => {
  const result = await pool.query(
    `SELECT
       m.id AS material_id,
       m.name AS material_name,

       COALESCE(
         (
           SELECT SUM(pii.quantity)
           FROM purchase_invoice_items pii
           WHERE pii.material_id = m.id
         ),
         0
       ) AS purchased_quantity,

       COALESCE(
         (
           SELECT SUM(sii.quantity)
           FROM sales_invoice_items sii
           WHERE sii.material_id = m.id
         ),
         0
       ) AS sold_quantity

     FROM materials m
     ORDER BY m.name`
  );

  return result.rows;
};


// 3. Purchase Invoice List
const getPurchaseInvoicesReport = async () => {
  const result = await pool.query(
    `SELECT
       pi.id,
       pi.supplier_id,
       s.name AS supplier_name,
       pi.warehouse_id,
       w.name AS warehouse_name,
       pi.date
     FROM purchase_invoices pi
     LEFT JOIN suppliers s
       ON pi.supplier_id = s.id
     LEFT JOIN warehouse w
       ON pi.warehouse_id = w.id
     ORDER BY pi.date DESC`
  );

  return result.rows;
};


// 4. Sales Invoice List
const getSalesInvoicesReport = async () => {
  const result = await pool.query(
    `SELECT
       si.id,
       si.customer_id,
       c.name AS customer_name,
       si.warehouse_id,
       w.name AS warehouse_name,
       si.date
     FROM sales_invoices si
     LEFT JOIN customers c
       ON si.customer_id = c.id
     LEFT JOIN warehouse w
       ON si.warehouse_id = w.id
     ORDER BY si.date DESC`
  );

  return result.rows;
};


// 5. Best Selling Materials
const getBestSellingMaterialsReport = async () => {
  const result = await pool.query(
    `SELECT
       m.id AS material_id,
       m.name AS material_name,
       COALESCE(SUM(sii.quantity), 0) AS sold_quantity
     FROM materials m
     LEFT JOIN sales_invoice_items sii
       ON sii.material_id = m.id
     GROUP BY m.id, m.name
     HAVING COALESCE(SUM(sii.quantity), 0) > 0
     ORDER BY sold_quantity DESC`
  );

  return result.rows;
};


// 6. Most Available Materials
const getMostAvailableMaterialsReport = async () => {
  const result = await pool.query(
    `SELECT
       m.id AS material_id,
       m.name AS material_name,
       COALESCE(SUM(s.quantity), 0) AS available_quantity
     FROM materials m
     LEFT JOIN stock s
       ON s.material_id = m.id
     GROUP BY m.id, m.name
     HAVING COALESCE(SUM(s.quantity), 0) > 0
     ORDER BY available_quantity DESC`
  );

  return result.rows;
};


// 7. Materials With Balance
const getMaterialsWithBalanceReport = async () => {
  const result = await pool.query(
    `SELECT
       m.id AS material_id,
       m.name AS material_name,
       SUM(s.quantity) AS quantity
     FROM materials m
     JOIN stock s
       ON s.material_id = m.id
     GROUP BY m.id, m.name
     HAVING SUM(s.quantity) > 0
     ORDER BY m.name`
  );

  return result.rows;
};


// 8. Materials Without Balance
const getMaterialsWithoutBalanceReport = async () => {
  const result = await pool.query(
    `SELECT
       m.id AS material_id,
       m.name AS material_name,
       COALESCE(SUM(s.quantity), 0) AS quantity
     FROM materials m
     LEFT JOIN stock s
       ON s.material_id = m.id
     GROUP BY m.id, m.name
     HAVING COALESCE(SUM(s.quantity), 0) = 0
     ORDER BY m.name`
  );

  return result.rows;
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