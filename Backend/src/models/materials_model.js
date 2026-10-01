const pool = require("../config/database");
const getAllMaterials = async () => {
  const result = await pool.query(
    "SELECT * FROM materials"
  );

  return result.rows;
};

const createMaterial = async (data) => {
  const result = await pool.query(
    "INSERT INTO materials (name, unit) VALUES ($1, $2) RETURNING *",
    [data.name, data.unit]
  );

  return result.rows[0];
};

const updateMaterial = async (id, data) => {
  const result = await pool.query(
    "UPDATE materials SET name = $1, unit = $2 WHERE id = $3 RETURNING *",
    [data.name, data.unit, id]
  );

  return result.rows[0];
};

const deleteMaterial = async (id) => {
  const result = await pool.query(
    "DELETE FROM materials WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial
};