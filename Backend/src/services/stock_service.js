const stockModel = require("../models/stock_model");
const getAllStock = async () => {
  const stock = await stockModel.getAllStock();
  return stock;
};
const createStock = async (data) => {
  const stock = await stockModel.createStock(data);
  return stock;
};
const updateStock = async (id, data) => {
  const stock = await stockModel.updateStock(id, data);
  return stock;
};
const deleteStock = async (id) => {
  const stock = await stockModel.deleteStock(id);
  return stock;
};
const increaseStock = async (warehouse_id, material_id, quantity) => {
  const stock = await stockModel.increaseStock(
    warehouse_id,
    material_id,
    quantity,
  );
  return stock;
};
const decreaseStock = async (warehouse_id, material_id, quantity) => {
  const stock = await stockModel.decreaseStock(
    warehouse_id,
    material_id,
    quantity,
  );
  return stock;
};
module.exports = {
  getAllStock,
  createStock,
  updateStock,
  deleteStock,
  increaseStock,
  decreaseStock,
};
