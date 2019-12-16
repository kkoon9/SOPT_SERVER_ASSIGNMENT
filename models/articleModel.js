module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Article', {
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
        freezeTableName: true,
        timestamps: false,
    });
};