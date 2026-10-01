const pool = require("../config/database");

const getAllPurchaseInvoices = async () => {
  const result = await pool.query(
    "SELECT * FROM purchase_invoices"
  );

  return result.rows;
};

const createPurchaseInvoice = async (data) => {
  const result = await pool.query(
    `INSERT INTO purchase_invoices
     (supplier_id, warehouse_id, date)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [
      data.supplier_id,
      data.warehouse_id,
      data.date,
    ]
  );

  return result.rows[0];
};

const updatePurchaseInvoice = async (id, data) => {
  const result = await pool.query(
    `UPDATE purchase_invoices
     SET supplier_id = $1,
         warehouse_id = $2,
         date = $3
     WHERE id = $4
     RETURNING *`,
    [
      data.supplier_id,
      data.warehouse_id,
      data.date,
      id,
    ]
  );

  return result.rows[0];
};

const deletePurchaseInvoice = async (id) => {
  const result = await pool.query(
    `DELETE FROM purchase_invoices
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

const getPurchaseInvoiceById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM purchase_invoices
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllPurchaseInvoices,
  createPurchaseInvoice,
  updatePurchaseInvoice,
  deletePurchaseInvoice,
  getPurchaseInvoiceById
};