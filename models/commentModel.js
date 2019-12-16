module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Comment', {
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
        freezeTableName: true,
        timestamps: false,
    
    });
};