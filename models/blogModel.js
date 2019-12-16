module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Blog', {
        blogIdx: {
            field: 'blogIdx',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        host: {
            field: 'host',
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        introduce: {
            field: 'introduce',
            type: DataTypes.STRING(30),
            allowNull: true,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        underscored: true, // underscore : _
        freezeTableName: true, // Database 이름에 s가 붙는걸 막는다.
        timestamps: false, // 자동으로 생성되는 cratedAt, updatedAt을 막는다.
    });

};