const pool = require("../config/database");

const getAllSalesInvoices = async () => {
  const result = await pool.query(
    "SELECT * FROM sales_invoices"
  );

  return result.rows;
};

const createSalesInvoice = async (data) => {
  const result = await pool.query(
    `INSERT INTO sales_invoices
     (customer_id, warehouse_id, date)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [
      data.customer_id,
      data.warehouse_id,
      data.date,
    ]
  );

  return result.rows[0];
};

const createSalesInvoiceWithClient = async (client, data) => {
  const result = await client.query(
    `INSERT INTO sales_invoices
     (customer_id, warehouse_id, date)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [
      data.customer_id,
      data.warehouse_id,
      data.date,
    ]
  );

  return result.rows[0];
};

const updateSalesInvoice = async (id, data) => {
  const result = await pool.query(
    `UPDATE sales_invoices
     SET customer_id = $1,
         warehouse_id = $2,
         date = $3
     WHERE id = $4
     RETURNING *`,
    [
      data.customer_id,
      data.warehouse_id,
      data.date,
      id,
    ]
  );

  return result.rows[0];
};

const deleteSalesInvoice = async (id) => {
  const result = await pool.query(
    `DELETE FROM sales_invoices
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

const getSalesInvoiceById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM sales_invoices
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllSalesInvoices,
  createSalesInvoice,
  createSalesInvoiceWithClient,
  updateSalesInvoice,
  deleteSalesInvoice,
  getSalesInvoiceById,
};