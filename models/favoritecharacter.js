const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const FavoriteCharacter = sequelize.define('FavoriteCharacter', {
        // UUID tự động sinh khi có bản ghi mới
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        // Marvel character ID 
        marvelid: {
            type: DataTypes.BIGINT, // int8
            allowNull: false,
            field: 'marvelid' // Tên cột trong database
        },
        // Tên nhân vật
        name: {
            type: DataTypes.STRING(255), // varchar
            allowNull: true,
            field: 'name'
        },
        // Đường dẫn ảnh thumbnail
        thumbnail: {
            type: DataTypes.STRING(500), // varchar 
            allowNull: true,
            field: 'thumbnail'
        },
        // Số lượng like
        number_of_like: {
            type: DataTypes.INTEGER, // int4
            defaultValue: 1,
            allowNull: false,
            field: 'number_of_like'
        }
    }, {
        // Tên bảng trong database
        tableName: 'favorite_character',
        
        // Tắt tính năng tự động thêm createdAt, updatedAt nếu không cần
        timestamps: true,

        // Hooks để xử lý trước khi tạo bản ghi
        hooks: {
            beforeCreate: (record) => {
                // Đảm bảo id được sinh nếu chưa có
                if (!record.id) {
                    record.id = uuidv4();
                }
            }
        }
    });

    return FavoriteCharacter;
};