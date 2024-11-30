const repository = require("../../repositories/favoritecharacter/favorite-character.repository");

const getAllFavouriteCharacters = async () => {
  // set limit / pagination/
  return await repository.getAll();

  // return result.map((r) => {
  //   return {
  //     id: r.id,
  //     name: r.name,
  //     thumbnail: r.thumbnail,
  //     number_of_like: r.number_of_like,
  //   };
  // });
};

const getOneFavouriteCharacter = async (favouriteId) => {
  try {
    const result = await repository.getOne(favouriteId);

    let bravo = "";
    if (result.number_of_like > 10) {
      bravo = "top favourite";
    } else {
      bravo = "cũng tạm tạm";
    }
    // không trả ra createdAt và updatedAtupdatedAt
    // không trả ra marvelId
    return {
      id: result.id,
      name: result.name,
      thumbnail: result.thumbnail,
      number_of_like: result.number_of_like,
      bravo,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  getAllFavouriteCharacters,
  getOneFavouriteCharacter,
};
