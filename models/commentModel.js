module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {
        commentIdx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nick: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        content: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })
};