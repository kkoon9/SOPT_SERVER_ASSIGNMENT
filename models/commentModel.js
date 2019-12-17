module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Comment', {
        nick: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        timestamps: true,
    });
};