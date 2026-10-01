const pool = require("../config/database");

const getAllSalesInvoicesItems = async () => {
  const result = await pool.query(
    "SELECT * FROM sales_invoice_items"
  );

  return result.rows;
};

const createSalesInvoiceItem = async (data) => {
  const result = await pool.query(
    `INSERT INTO sales_invoice_items
     (invoice_id, material_id, quantity, price)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [
      data.invoice_id,
      data.material_id,
      data.quantity,
      data.price,
    ]
  );

  return result.rows[0];
};

const createSalesInvoiceItemWithClient = async (client, data) => {
  const result = await client.query(
    `INSERT INTO sales_invoice_items
     (invoice_id, material_id, quantity, price)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [
      data.invoice_id,
      data.material_id,
      data.quantity,
      data.price,
    ]
  );

  return result.rows[0];
};

const updateSalesInvoiceItem = async (id, data) => {
  const result = await pool.query(
    `UPDATE sales_invoice_items
     SET invoice_id = $1,
         material_id = $2,
         quantity = $3,
         price = $4
     WHERE id = $5
     RETURNING *`,
    [
      data.invoice_id,
      data.material_id,
      data.quantity,
      data.price,
      id,
    ]
  );

  return result.rows[0];
};

const deleteSalesInvoiceItem = async (id) => {
  const result = await pool.query(
    `DELETE FROM sales_invoice_items
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllSalesInvoicesItems,
  createSalesInvoiceItem,
  createSalesInvoiceItemWithClient,
  updateSalesInvoiceItem,
  deleteSalesInvoiceItem,
};