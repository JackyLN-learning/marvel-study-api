const express = require("express");
const router = express.Router();
const favouriteCharacter = require("../controllers/favouriteCharacter/favouriteCharacter.controller");

router.get("/", favouriteCharacter.getAllFavouriteCharacters);
router.get("/:favouriteId", favouriteCharacter.getFavouriteCharacter);
router.get("/:favouriteId/test", favouriteCharacter.test);

module.exports = router;
