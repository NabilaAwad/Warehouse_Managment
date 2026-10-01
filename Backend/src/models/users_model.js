const pool = require("../config/database");
const getAllUsers = async () => {
  const result = await pool.query(
    "SELECT * FROM users"
  );

  return result.rows;
};
const createusers = async (data) => {
  const result = await pool.query(
    "INSERT INTO users (name , user_name , password , role , company_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [data.name, data.user_name, data.password, data.role, data.company_id],
  );

  return result.rows[0];
};

const updateusers = async (data,id) => {
  const result = await pool.query(
    "UPDATE users (name , user_name , password , role , company_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [data.name, data.user_name, data.password, data.role, data.company_id],
  );

  return result.rows[0];
};

const deleteusers = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id],
  );

  return result.rows[0];
};

module.exports = {
  getAllUsers,
  createusers,
  updateusers,
  deleteusers
};