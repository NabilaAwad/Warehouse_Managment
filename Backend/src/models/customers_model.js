const pool = require("../config/database");
const getAllCustomers = async () => {
  const result = await pool.query("SELECT * FROM customers");

  return result.rows;
};

const createCustomers = async (data) => {
  const result = await pool.query(
    "INSERT INTO customers (name , phone , email , address , created_at , company_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [data.name, data.phone, data.email, data.address, data.created_at, data.company_id],
  );

  return result.rows[0];
};

const updateCustomers = async (data,id) => {
  const result = await pool.query(
    "UPDATE customers (name , phone , email , address , created_at , company_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [data.name, data.phone, data.email, data.address, data.created_at, data.company_id, id],
  );

  return result.rows[0];
};

const deleteCustomers = async (id) => {
  const result = await pool.query(
    "DELETE FROM customers WHERE id = $1 RETURNING *",
    [id],
  );

  return result.rows[0];
};

module.exports = {
  getAllCustomers,
  createCustomers,
  updateCustomers,
  deleteCustomers
};
