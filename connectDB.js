const { Client } = require('pg');

// Thông tin kết nối đến PostgreSQL
const client = new Client({
    user: 'marvel',
    host: '146.190.95.233',
    database: 'marvel',
    password: 'qwerty123',
    port: 5432,
});

// Kết nối đến cơ sở dữ liệu
client.connect()
    .then(() => {
        console.log('Kết nối thành công!');
        // Đóng kết nối
        client.end();
    })
    .catch(err => {
        console.error('Lỗi khi kết nối:', err.stack);
    });