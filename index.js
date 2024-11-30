// const fetch = require('node-fetch');
const fetch = import('node-fetch');
const express = require('express');
const app = express();
const db = require('./models');
const characterRoutes = require('./routes/character.routes.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;



app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Sử dụng routes
app.use('/api', characterRoutes);

// Đồng bộ database và khởi động server
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log('Server đang chạy trên cổng ${port}');
    });
});