module.exports = (sequelize, DataTypes) => {
    return sequelize.define('article', {
        articleIdx: {
            field: 'articleIdx',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            field: 'title',
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        writer: {
            field: 'writer',
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        content: {
            field: 'content',
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        underscored: true,
        freezeTableName: true,
        timestamps: false,
    });
};