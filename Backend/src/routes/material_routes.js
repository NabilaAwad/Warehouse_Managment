const express = require("express");
const materialController = require("../controllers/material_controller");

const router = express.Router();

router.get("/", materialController.getAllMaterials);
router.post("/", materialController.createMaterial);
router.post("/:id", materialController.updateMaterial);
router.delete("/:id", materialController.deleteMaterial);

module.exports = router;