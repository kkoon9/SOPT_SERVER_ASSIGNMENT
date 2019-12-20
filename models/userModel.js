module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
      email: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      salt: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      /**
       * provider가 local이면 로컬 로그인
       * provider가 kakao면 카카오 로그인
       */
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
    }, {
        freezeTableName: true,
        timestamps: false,
    })
};
