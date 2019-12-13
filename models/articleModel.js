module.exports = (sequelize, DataTypes) => {
    return sequelize.define('article', {
        articleIdx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        writer: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        content: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })
};