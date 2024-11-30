const express = require('express');
const CharacterController = require('../controllers/character.controller');

const router = express.Router();
const characterController = new CharacterController();

// Route thêm nhân vật yêu thích
router.post('/favorite', characterController.addFavorite.bind(characterController));

// Route lấy danh sách nhân vật
router.get('/characterList', characterController.getCharacterList.bind(characterController));

// Route nhận ID nhân vật
router.post('/sendCharacterId', characterController.sendCharacterId.bind(characterController));

// Route chi tiết nhân vật
router.get('/characterDetail', characterController.getCharacterDetail.bind(characterController));

module.exports = router;