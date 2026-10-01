const express = require("express");
const companyController = require("../controllers/company_controller");

const router = express.Router();

router.get("/", companyController.getAllCompany);
router.post("/", companyController.createCompany);
router.post("/:id", companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);

module.exports = router;