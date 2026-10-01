const pool = require("../config/database");
const getAllWarehouses = async()=>{
    const result = await pool.query(
        "SELECT * From warehouse"
    );
    return result.rows;
}
const createWarehouse = async (data) => {
  const result = await pool.query(
    "INSERT INTO warehouse (name, location) VALUES ($1, $2) RETURNING *",
    [data.name, data.location]
  );

  return result.rows[0];
};

const updateWarehouse = async (id, data) => {
  const result = await pool.query(
    "UPDATE warehouse SET name = $1, location = $2 WHERE id = $3 RETURNING *",
    [data.name, data.location, id]
  );

  return result.rows[0];
};

const deleteWarehouse = async (id) => {
  const result = await pool.query(
    "DELETE FROM warehouse WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

module.exports = {
    getAllWarehouses,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse
}