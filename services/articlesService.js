const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

/**
 * models을 가져오려면 index를 가져와야한다. ArticleModel를 가져오면 안된다!
 */
const {Blog, Article, Comment} = require('../models');

module.exports = {
    readAll: () => {
        return new Promise(async (resolve, reject) => {
            const article = await Article.findAll({});
            if (article.length == 0) {
                resolve({
                    json: utils.successFalse(sc.NO_CONTENT, rm.NO_ARTICLE)
                });
                return;
            }
            if (!article) {
                resolve({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.ARTICLE_READ_ALL_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS, rm.ARTICLE_READ_ALL_SUCCESS, article)
            });
        });
    },
    read: ({
        blogId
    }) => {
        return new Promise(async (resolve, reject) => {
            const article = await Article.findAll({
                where: {
                    blogId: blogId,
                }
            });
            if (article.length == 0) {
                resolve({
                    json: utils.successFalse(sc.NO_CONTENT, rm.ARTICLE_READ_FAIL)
                });
                return;
            }
            if (!article) {
                resolve({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.ARTICLE_READ_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS, rm.ARTICLE_READ_SUCCESS, article)
            });
        });
    },
    create: ({
        blogId,
        title,
        writer,
        content
    }) => {
        return new Promise(async (resolve, reject) => {
            let article;
            try {
                article = await Article.create({
                    title: title,
                    writer: writer,
                    content: content,
                    BlogId : blogId
                });
            } catch (error) {
                reject({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.ARTICLE_CREATE_FAIL)
                });
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS, rm.ARTICLE_CREATE_SUCCESS, article)
            });
        });
    },
    update: ({
        id,
        content
    }) => {
        return new Promise(async (resolve, reject) => {
            const article = await Article.update({
                content: content
            }, {
                where: {
                    id: id
                },
            });
            if (!article) {
                resolve({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.ARTICLE_UPDATE_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS, rm.ARTICLE_UPDATE_SUCCESS)
            });
        });
    },
    delete: ({
        id
    }) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Article.destroy({
                    where: {
                        id: id
                    }
                });

            } catch (error) {
                reject({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.ARTICLE_DELETE_FAIL)
                });
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS, rm.ARTICLE_DELETE_SUCCESS)
            });
        });
    },
};