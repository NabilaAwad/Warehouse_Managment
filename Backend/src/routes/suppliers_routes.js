const express = require("express");
const suppliersController = require("../controllers/suppliers_controller");

const router = express.Router();

router.get("/", suppliersController.getAllSuppliers);
router.post("/", suppliersController.createSuppliers);
router.post("/:id", suppliersController.updateSuppliers);
router.delete("/:id", suppliersController.deleteSuppliers);

module.exports = router;