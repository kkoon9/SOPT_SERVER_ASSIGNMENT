const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./userModel')(sequelize, Sequelize);
db.Blog = require('./blogModel')(sequelize, Sequelize);
db.Article = require('./articleModel')(sequelize, Sequelize);
db.Comment = require('./commentModel')(sequelize, Sequelize);
db.Hashtag = require('./hashtagModel')(sequelize, Sequelize);
db.Photo = require('./photoModel')(sequelize,Sequelize);

/** 1:N Blog : Article */
db.Blog.hasMany(db.Article);
db.Article.belongsTo(db.Blog);

/** 1:N Article : Comment */
db.Article.hasMany(db.Comment);
db.Comment.belongsTo(db.Article);

/** 1:N Article : Photo */
db.Article.hasMany(db.Photo);
db.Photo.belongsTo(db.Article);

/** N:M */
db.Article.belongsToMany(db.Hashtag, { through : 'ArticleHashtag' });
db.Hashtag.belongsToMany(db.Article, { through : 'ArticleHashtag' });

module.exports = db;