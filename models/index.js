const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Blog = require('./blogModel')(sequelize, Sequelize);
db.Article = require('./articleModel')(sequelize, Sequelize);
db.Comment = require('./commentModel')(sequelize, Sequelize);

/** 1:N */
db.Blog.hasMany(db.Article);
db.Article.belongsTo(db.Blog);

/** N:M */
db.Article.belongsToMany(db.Comment, { through : 'ArticleComment' });
db.Comment.belongsToMany(db.Article, { through : 'ArticleComment' });