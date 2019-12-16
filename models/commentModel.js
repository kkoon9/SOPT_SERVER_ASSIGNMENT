module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {
        commentIdx: {
            field: 'commentIdx',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nick: {
            field: 'nick',
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        content: {
            field: 'contnet',
            type: DataTypes.STRING(30),
            allowNull: false,
        },
     }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        underscored: true,
        freezeTableName: true,
        timestamps: false,
    
    });
};