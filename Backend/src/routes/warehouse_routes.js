const express = require("express");
const warehouseController = require("../controllers/warehouse_controller");

const router = express.Router();

router.get("/",warehouseController.getAllWarehouses)
router.post("/",warehouseController.createWarehouses)
router.post("/:id",warehouseController.updateWarehouse)
router.delete("/:id",warehouseController.deleteWarehouse)

module.exports=router;

