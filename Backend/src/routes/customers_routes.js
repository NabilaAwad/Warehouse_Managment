const express = require("express");
const customersController = require("../controllers/customers_controller");

const router = express.Router();

router.get("/", customersController.getAllCustomers);
router.post("/", customersController.createCustomers);
router.post("/:id", customersController.updateCustomers);
router.post("/:id", customersController.deleteCustomers);

module.exports = router;