const express = require("express");

const stockController = require("../controllers/stock_controller");

const router = express.Router();

router.get("/", stockController.getAllStock);

router.post("/", stockController.createStock);

router.put("/:id", stockController.updateStock);

router.delete("/:id", stockController.deleteStock);

module.exports = router;