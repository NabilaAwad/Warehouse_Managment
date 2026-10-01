const warehouseModel = require("../models/warehouse_model");

const getAllWarehouses = async () =>{
const warehouse= await warehouseModel.getAllWarehouses();

return warehouse;
}
const createWarehouse = async (data) => {
  const warehouse = await warehouseModel.createWarehouse(data);

  return warehouse;
};
const updateWarehouse = async (id,data) => {
  const warehouse = await warehouseModel.updateWarehouse(id,data);

  return warehouse;
};
const deleteWarehouse = async (id) => {
  const warehouse = await warehouseModel.deleteWarehouse(id);

  return warehouse;
};

module.exports = {
    getAllWarehouses,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse
};