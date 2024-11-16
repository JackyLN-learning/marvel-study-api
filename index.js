const fetch = require('node-fetch');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;


app.use(cors());
app.use(bodyParser.json());

app.get('/characterList', (req, res) => {
        fetch('http://gateway.marvel.com/v1/public/characters?ts=1667722238&apikey=df17d2ee72f64e3bea59f98b87e57bb9&hash=18b5a5757dc9077ff8f8fbab26a6a4fb')
        .then(response => response.json())
        .then(data => {
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
        })
        .catch(error => console.error(error));
});
let characterId;
app.post('/sendCharacterId', (req, res) => {
    characterId = req.body.characterId;
    console.log('Received characterId:', characterId);
    // Xử lý giá trị characterId ở đây

    // Trả về phản hồi cho client
    res.send('Character ID received successfully');

});


// app.get('/characterDetail', async (req, res) => {
//     // const characterId = req.params.characterId;
//     try {
//         const response = await fetch('http://gateway.marvel.com/v1/public/characters/${characterId}?ts=1667722238&apikey=df17d2ee72f64e3bea59f98b87e57bb9&hash=18b5a5757dc9077ff8f8fbab26a6a4fb');
//         const data = await response.json();

//         const charactersData = data.data.results.map(character => ({
//             id: character.id,
//             name: character.name,
//             modified: character.modified,
//             thumbnail: {
//                 path: character.thumbnail.path,
//                 extension: character.thumbnail.extension
//             }
//         }));

//         res.json(charactersData);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch data' });
//     }
// });


app.get('/characterDetail', (req, res) => {
    fetch(`http://gateway.marvel.com/v1/public/characters/${characterId}?ts=1667722238&apikey=df17d2ee72f64e3bea59f98b87e57bb9&hash=18b5a5757dc9077ff8f8fbab26a6a4fb`)
        .then(response => response.json())
        .then(data => {
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
        })
        .catch(error => console.error(error));
});


app.listen(port, () => {
    console.log(`API Server is running at http://localhost:${port}`);
});