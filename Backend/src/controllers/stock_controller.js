const stockService = require("../services/stock_service");
const getAllStock = async (req, res) => {
  try {
    const stock = await stockService.getAllStock();
    res.status(200).json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get stock" });
  }
};
const createStock = async (req, res) => {
  try {
    const { warehouse_id, material_id, quantity } = req.body;
    if (
      !warehouse_id ||
      !material_id ||
      quantity === undefined ||
      quantity === null
    ) {
      return res
        .status(400)
        .json({ message: "Warehouse, material and quantity are required" });
    }
    const numericQuantity = Number(quantity);
    if (!Number.isFinite(numericQuantity) || numericQuantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be a number greater than 0" });
    }
    const stock = await stockService.createStock({
      warehouse_id,
      material_id,
      quantity: numericQuantity,
    });
    res.status(201).json(stock);
  } catch (error) {
    console.error(error);
    if (
      error.message === "Stock already exists for this warehouse and material"
    ) {
      return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: "Failed to create stock" });
  }
};
const updateStock = async (req, res) => {
  try {
    const { warehouse_id, material_id, quantity } = req.body;
    if (
      !warehouse_id ||
      !material_id ||
      quantity === undefined ||
      quantity === null
    ) {
      return res
        .status(400)
        .json({ message: "Warehouse, material and quantity are required" });
    }
    const numericQuantity = Number(quantity);
    if (!Number.isFinite(numericQuantity) || numericQuantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be a number greater than 0" });
    }
    const stock = await stockService.updateStock(req.params.id, {
      warehouse_id,
      material_id,
      quantity: numericQuantity,
    });
    res.status(200).json(stock);
  } catch (error) {
    console.error(error);
    if (error.message === "Stock not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Failed to update stock" });
  }
};
const deleteStock = async (req, res) => {
  try {
    const stock = await stockService.deleteStock(req.params.id);
    res.status(200).json(stock);
  } catch (error) {
    console.error(error);
    if (error.message === "Stock not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Failed to delete stock" });
  }
};
module.exports = { getAllStock, createStock, updateStock, deleteStock };
