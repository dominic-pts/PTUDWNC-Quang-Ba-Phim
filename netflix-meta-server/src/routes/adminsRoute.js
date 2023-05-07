const express = require("express");
const router = express.Router();
const adminController = require("../app/controllers/AdminController");

router.get("/", adminController.getAll);
router.get("/:id", adminController.findById);
router.post("/register", adminController.register);
router.post("/login", adminController.login);
router.put("/:id/updatePasswordById", adminController.updatePasswordById);
router.delete("/:id", adminController.deleteById);

module.exports = router;
