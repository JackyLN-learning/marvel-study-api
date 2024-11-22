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

        // Thực thi một truy vấn SQL (ví dụ: lấy tất cả dữ liệu từ bảng users)
        // client.query('SELECT * FROM users', (err, res) => {
        //     if (err) {
        //         console.error('Lỗi khi thực hiện truy vấn:', err.stack);
        //     } else {
        //         console.log(res.rows); // Hiển thị kết quả truy vấn
        //     }
        // });

        // Đóng kết nối
        client.end();
    })
    .catch(err => {
        console.error('Lỗi khi kết nối:', err.stack);
    });