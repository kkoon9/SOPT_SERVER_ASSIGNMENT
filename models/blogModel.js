module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Blog', {
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
        freezeTableName: true, // Database 이름에 s가 붙는걸 막는다.
        timestamps: false, // 자동으로 생성되는 cratedAt, updatedAt을 막는다.
    });

};