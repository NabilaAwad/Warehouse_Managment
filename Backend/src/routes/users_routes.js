const express = require("express");
const usersController = require("../controllers/users_controller");

const router = express.Router();

router.get("/", usersController.getAllUsers);
router.post("/", usersController.createUsers);
router.post("/:id", usersController.updateUsers);
router.delete("/:id", usersController.deleteUsers);

module.exports = router;