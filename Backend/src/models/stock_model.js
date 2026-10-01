
const pool = require("../config/database");

const getAllStock = async () => {
  const result = await pool.query(
    "SELECT * FROM stock"
  );

  return result.rows;
};

// Increase stock
// Used by Purchase Invoices
const increaseStock = async (
  warehouse_id,
  material_id,
  quantity
) => {
  const result = await pool.query(
    `INSERT INTO stock
     (warehouse_id, material_id, quantity)
     VALUES ($1, $2, $3)
     ON CONFLICT (warehouse_id, material_id)
     DO UPDATE SET
       quantity = stock.quantity + EXCLUDED.quantity
     RETURNING *`,
    [
      warehouse_id,
      material_id,
      quantity,
    ]
  );

  return result.rows[0];
};

// Decrease stock
// Used when stock is decreased outside a transaction
const decreaseStock = async (
  warehouse_id,
  material_id,
  quantity
) => {
  const result = await pool.query(
    `UPDATE stock
     SET quantity = quantity - $1
     WHERE warehouse_id = $2
       AND material_id = $3
       AND quantity >= $1
     RETURNING *`,
    [
      quantity,
      warehouse_id,
      material_id,
    ]
  );

  if (result.rows.length === 0) {
    throw new Error("Insufficient stock");
  }

  return result.rows[0];
};

// Decrease stock inside a transaction
// Used by Sales Invoices
const decreaseStockWithClient = async (
  client,
  warehouse_id,
  material_id,
  quantity
) => {
  const result = await client.query(
    `UPDATE stock
     SET quantity = quantity - $1
     WHERE warehouse_id = $2
       AND material_id = $3
       AND quantity >= $1
     RETURNING *`,
    [
      quantity,
      warehouse_id,
      material_id,
    ]
  );

  if (result.rows.length === 0) {
    throw new Error("Insufficient stock");
  }

  return result.rows[0];
};

// Create stock manually
const createStock = async (data) => {
  const quantity = Number(data.quantity);

  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new Error(
      "Stock quantity must be greater than 0"
    );
  }

  try {
    const result = await pool.query(
      `INSERT INTO stock
       (warehouse_id, material_id, quantity)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [
        data.warehouse_id,
        data.material_id,
        quantity,
      ]
    );

    return result.rows[0];
  } catch (error) {
    // PostgreSQL unique constraint
    if (error.code === "23505") {
      throw new Error(
        "Stock already exists for this warehouse and material"
      );
    }

    throw error;
  }
};

// Update stock manually
const updateStock = async (id, data) => {
  const quantity = Number(data.quantity);

  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new Error(
      "Stock quantity must be greater than 0"
    );
  }

  // We only update the quantity.
  // Warehouse and material cannot be changed
  // for an existing stock record.
  const result = await pool.query(
    `UPDATE stock
     SET quantity = $1
     WHERE id = $2
     RETURNING *`,
    [
      quantity,
      id,
    ]
  );

  if (result.rows.length === 0) {
    throw new Error("Stock not found");
  }

  return result.rows[0];
};

// Delete stock manually
const deleteStock = async (id) => {
  const result = await pool.query(
    `DELETE FROM stock
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Stock not found");
  }

  return result.rows[0];
};

module.exports = {
  getAllStock,
  createStock,
  updateStock,
  deleteStock,
  increaseStock,
  decreaseStock,
  decreaseStockWithClient,
};

