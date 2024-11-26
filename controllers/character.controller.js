const db = require('../models');
const FavoriteCharacter = db.FavoriteCharacter;

class CharacterController {
    // Biến để lưu trữ characterId giữa các request
    static characterId;

    // Thêm nhân vật vào danh sách yêu thích
    async addFavorite(req, res) {
        try {
            const { characterId, characterName, thumbnail } = req.body;

            // Tìm character trong db
            const existingCharacter = await FavoriteCharacter.findOne({
                where: { marvelid: characterId }
            });

            if (existingCharacter) {
                // Nếu đã tồn tại, tăng number_of_like lên 1
                await existingCharacter.increment('number_of_like', { by: 1 });
                await existingCharacter.save();

                res.status(200).json({
                    success: true,
                    message: 'Đã tăng lượt thích cho nhân vật'
                });
            } else {
                // Nếu chưa tồn tại, tạo mới
                await FavoriteCharacter.create({
                    marvelid: characterId,
                    name: characterName,
                    thumbnail: thumbnail,
                    number_of_like: 1
                });

                res.status(200).json({
                    success: true,
                    message: 'Đã thêm nhân vật mới vào danh sách yêu thích'
                });
            }
        } catch (error) {
            console.error('Lỗi:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi xử lý yêu cầu'
            });
        }
    }

    // Lấy danh sách nhân vật từ Marvel API
    async getCharacterList(req, res) {
        try {
            const response = await fetch('http://gateway.marvel.com/v1/public/characters?ts=1667722238&apikey=df17d2ee72f64e3bea59f98b87e57bb9&hash=18b5a5757dc9077ff8f8fbab26a6a4fb');
            const data = await response.json();

            const charactersData = data.data.results.map(character => ({
                id: character.id,
                name: character.name,
                modified: character.modified,
                thumbnail: {
                    path: character.thumbnail.path,
                    extension: character.thumbnail.extension
                }
            }));

            res.json(charactersData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi tải danh sách nhân vật' });
        }
    }

    // Nhận và lưu Character ID
    sendCharacterId(req, res) {
        CharacterController.characterId = req.body.characterId;
        console.log('Received characterId:', CharacterController.characterId);
        res.send('Character ID received successfully');
    }

    // Lấy chi tiết nhân vật từ Marvel API
    async getCharacterDetail(req, res) {
        if (!CharacterController.characterId) {
            return res.status(400).json({ message: 'Chưa có Character ID' });
        }

        try {
            const response = await fetch(`http://gateway.marvel.com/v1/public/characters/${CharacterController.characterId}?ts=1667722238&apikey=df17d2ee72f64e3bea59f98b87e57bb9&hash=18b5a5757dc9077ff8f8fbab26a6a4fb`);
            const data = await response.json();

            const charactersData = data.data.results.map(character => ({
                id: character.id,
                name: character.name,
                modified: character.modified,
                thumbnail: {
                    path: character.thumbnail.path,
                    extension: character.thumbnail.extension
                }
            }));

            res.json(charactersData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi tải chi tiết nhân vật' });
        }
    }
}

module.exports = CharacterController;