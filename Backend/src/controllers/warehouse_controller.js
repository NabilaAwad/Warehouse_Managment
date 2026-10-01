const warehouseService = require("../services/warehouse_service");

const getAllWarehouses = async(req,res) =>{
    try{
      const warehouse = await warehouseService.getAllWarehouses();

      res.status(200).json(warehouse)
    }
    catch(error){
     console.error(error),

     res.status(500).json(
        {message:"Failed to get warehouse"}
     );
    }
}
const createWarehouses = async (req, res) => {
  try {
    const Warehouse = await warehouseService.createWarehouse(req.body);

    res.status(201).json(Warehouse);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create warehouse",
    });
  }
};
const updateWarehouse = async (req, res) => {
  try {
    const Warehouse = await warehouseService.updateWarehouse(req.params.id,req.body);

    res.status(200).json(Warehouse);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update Warehouse",
    });
  }
};
const deleteWarehouse = async (req, res) => {
  try {
    const Warehouse = await warehouseService.deleteWarehouse(req.params.id);

    res.status(200).json(Warehouse);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete Warehouse",
    });
  }
};
module.exports = {
    getAllWarehouses,
    createWarehouses,
    updateWarehouse,
    deleteWarehouse
}