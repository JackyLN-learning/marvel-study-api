// const fetch = require('node-fetch');
const fetch = import('node-fetch');
const express = require('express');
const app = express();
const db = require('./models');
const characterRoutes = require('./routes/character.routes.js');
const favouriteCharacter = require('./routes/favourite_character.routes')
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;



app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Sử dụng routes
app.use('/api/character', characterRoutes); //http://localhost:3000/api/
app.use('/api/favourite_character', favouriteCharacter)

// Đồng bộ database và khởi động server
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server đang chạy trên cổng ${port}`);
    });
});