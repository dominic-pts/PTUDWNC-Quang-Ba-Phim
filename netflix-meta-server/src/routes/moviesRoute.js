const express = require("express");
const router = express.Router();
const movieController = require("../app/controllers/MovieController");

router.get("/", movieController.getAll);
router.get("/:id", movieController.findById);
router.post("/", movieController.create);
router.put("/:id", movieController.update);
router.delete("/:id", movieController.deleteById);

module.exports = router;
