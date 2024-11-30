const db = require("../../models");
const FavoriteCharacter = db.FavoriteCharacter;

const getAll = async () => {
  return await FavoriteCharacter.findAll();
};

const getOne = async (favouriteId) => {
  return await FavoriteCharacter.findOne({
    where: {
      id: favouriteId
    }
  })
}

module.exports = {
  getAll,
  getOne,
};
