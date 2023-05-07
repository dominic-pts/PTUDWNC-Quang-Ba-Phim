const express = require("express");
const router = express.Router();
const movieTypeController = require("../app/controllers/MovieTypeController");

router.get("/", movieTypeController.getAll);
router.get("/:id", movieTypeController.findById);
router.post("/", movieTypeController.create);
router.put("/:id", movieTypeController.update);
router.delete("/:id", movieTypeController.deleteById);

module.exports = router;
