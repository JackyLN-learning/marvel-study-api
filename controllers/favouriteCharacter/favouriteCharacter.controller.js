const favouriteCharacterService = require("../../services/favourite-characters/favouriteCharacter.service");
const { isUUID } = require("../../utils/uuid");

const getAllFavouriteCharacters = async (req, res) => {
  // Get all Favourite Characters in table favourite_character
  const result = await favouriteCharacterService.getAllFavouriteCharacters();

  console.log("getAllFavouriteCharacters");
  return res.json({
    message: "Success in getAllFavouriteCharacters",
    result: result,
  });
};

const getFavouriteCharacter = async (req, res) => {
  // Get 1 Favourite Characters in table favourite_character by favourite Character Id
  const favouriteId = req.params.favouriteId;
  // validateId
  if (!favouriteId) {
    return res.status(400).json({
      message: "favouriteId is not provided",
    });
  }
  if (!isUUID(favouriteId)) {
    return res.status(400).json({
      message: "favouriteId is not a valid uuid",
    });
  }

  const result = await favouriteCharacterService.getOneFavouriteCharacter(
    favouriteId
  );

  if (!result) {
    return res.status(404).json({
      message: "favourite Character not found",
    });
  }

  console.log("getFavouriteCharacter");
  return res.json({
    message: "Success in getFavouriteCharacter",
    data: result,
  });
};

const test = (req, res) => {
  const favouriteId = req.params.favouriteId;

  return res.json({
    message: `Success in test with favouriteId=${favouriteId}`,
    favouriteId: favouriteId,
  });
};

module.exports = {
  getAllFavouriteCharacters,
  getFavouriteCharacter,
  test,
};
