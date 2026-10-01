const pool = require("../config/database");
const getAllSuppliers = async () => {
  const result = await pool.query(
    "SELECT * FROM suppliers"
  );

  return result.rows;
};


const createSuppliers = async (data) => {
  const result = await pool.query(
    "INSERT INTO suppliers (name , phone , email , address , created_at , company_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [data.name, data.phone, data.email, data.address, data.created_at, data.company_id],
  );

  return result.rows[0];
};

const updateSuppliers = async (data, id) => {
  const result = await pool.query(
    `UPDATE suppliers
     SET name = $1,
         phone = $2,
         email = $3,
         address = $4,
         company_id = $5
     WHERE id = $6
     RETURNING *`,
    [
      data.name,
      data.phone,
      data.email,
      data.address,
      data.company_id,
      id,
    ],
  );

  return result.rows[0];
};

const deleteSuppliers = async (id) => {
  const result = await pool.query(
    "DELETE FROM suppliers WHERE id = $1 RETURNING *",
    [id],
  );

  return result.rows[0];
};


module.exports = {
  getAllSuppliers,
  createSuppliers,
  updateSuppliers,
  deleteSuppliers
};