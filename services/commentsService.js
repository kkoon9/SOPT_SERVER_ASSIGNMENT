const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

/**
 * models을 가져오려면 index를 가져와야한다. ArticleModel를 가져오면 안된다!
 */
const {Comment} = require('../models');

module.exports = {
    readAll: () => {
        return new Promise(async (resolve, reject) => {
            const comment = await Comment.findAll({});
            if (comment.length == 0) {
                resolve({
                    json: utils.successFalse(sc.NO_CONTENT, rm.NO_COMMENT)
                });
                return;
            }
            if (!comment) {
                resolve({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.COMMENT_READ_ALL_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS, rm.COMMENT_READ_ALL_SUCCESS, comment)
            });
        });
    },
    read: ({
        articleId
    }) => {
        return new Promise(async (resolve, reject) => {
            const comment = await Comment.findAll({
                where: {
                    articleId: articleId,
                }
            });
            if (comment.length == 0) {
                resolve({
                    json: utils.successFalse(sc.NO_CONTENT, rm.COMMENT_READ_FAIL)
                });
                return;
            }
            if (!comment) {
                resolve({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.COMMENT_READ_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS, rm.COMMENT_READ_SUCCESS, comment)
            });
        });
    },
    create: ({
        articleId,
        nick,
        content
    }) => {
        return new Promise(async (resolve, reject) => {
            let comment;
            try {
                comment = await Comment.create({
                    nick: nick,
                    content: content,
                    ArticleId : articleId
                });
            } catch (error) {
                reject({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.COMMENT_CREATE_FAIL)
                });
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS, rm.COMMENT_CREATE_SUCCESS, comment)
            });
        });
    },
    update: ({
        id,
        content
    }) => {
        return new Promise(async (resolve, reject) => {
            const comment = await Comment.update({
                content: content
            }, {
                where: {
                    id: id
                },
            });
            if (!comment) {
                resolve({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.COMMENT_UPDATE_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS, rm.COMMENT_UPDATE_SUCCESS)
            });
        });
    },
    delete: ({
        id
    }) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Comment.destroy({
                    where: {
                        id: id
                    }
                });

            } catch (error) {
                reject({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.COMMENT_DELETE_FAIL)
                });
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS, rm.COMMENT_DELETE_SUCCESS)
            });
        });
    },
};