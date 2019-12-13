module.exports = (sequelize, DataTypes) => {
    return sequelize.define('blog', {
        blogIdx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        host: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        comment: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })
};