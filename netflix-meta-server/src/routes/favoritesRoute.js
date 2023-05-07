const express = require("express");
const router = express.Router();
const favoriteController = require("../app/controllers/FavoriteController");

router.get("/:userId", favoriteController.getMoviesByUserId);
router.post("/", favoriteController.add);
router.delete("/:userId", favoriteController.remove);

module.exports = router;
