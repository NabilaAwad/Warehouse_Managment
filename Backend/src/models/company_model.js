const pool = require("../config/database");
const getAllcompany = async () => {
  const result = await pool.query(
    "SELECT * FROM company"
  );

  return result.rows;
};

const createCompany = async (data) => {
  const result = await pool.query(
    "INSERT INTO company (name) VALUES ($1) RETURNING *",
    [data.name]
  );

  return result.rows[0];
}

const updateCompany = async (id, data) => {
  const result = await pool.query(
    "UPDATE company SET name = $1 WHERE id = $2 RETURNING *",
    [data.name, id]
  );

  return result.rows[0];
};

const deleteCompany = async (id) => {
  const result = await pool.query(
    "DELETE FROM company WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllcompany,
  createCompany,
  updateCompany,
  deleteCompany
};