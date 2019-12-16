const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

/**
 * models을 가져오려면 index를 가져와야한다. blogModel를 가져오면 안된다!
 */
const {Blog, Article, Comment} = require('../models');

module.exports = {
    readAll: () => {
        return new Promise(async (resolve, reject) => {
            const blog = await Blog.findAll({});
            if(blog.length == 0) {
                resolve({
                    json: utils.successFalse(sc.NO_CONTENT, rm.BLOG_EMPTY)
                });
                return;
            }
            if (!blog) {
                resolve({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.BLOG_READ_ALL_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS, rm.BLOG_READ_ALL_SUCCESS, blog)
            });
        });
    },
    readblogId: ({
        id
    }) => {
        return new Promise(async (resolve, reject) => {
            const blog = await Blog.findOne({
                where: {
                    id : id,
                }
            });
            if(blog.length == 0) {
                resolve({
                    json: utils.successFalse(sc.NO_CONTENT, rm.BLOG_READ_BLOGIDX_FAIL)
                });
                return;
            }
            if (!blog) {
                resolve({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.BLOG_READ_BLOGIDX_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS, rm.BLOG_READ_BLOGIDX_SUCCESS, blog)
            });
        });
    },
    readHost: ({
        host
    }) => {
        return new Promise(async (resolve, reject) => {
            const blog = await Blog.findAll({
                where: {
                    host : host
                }
            });
            if(blog.length == 0) {
                resolve({
                    json: utils.successFalse(sc.NO_CONTENT, rm.BLOG_READ_HOST_FAIL)
                });
                return;
            }
            if (!blog) {
                resolve({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.BLOG_READ_HOST_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(sc.CREATED, rm.BLOG_READ_HOST_SUCCESS, blog)
            });
        });
    },
    create: ({
        host,
        introduce
    }) => {
        return new Promise(async (resolve, reject) => {
            let blog;
            try {
                blog = await Blog.create({
                        host: host,
                        introduce: introduce,
                });
                
            } catch (error) {
                reject({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.BLOG_CREATE_FAIL)
                });
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS, rm.BLOG_CREATE_SUCCESS, blog)
            });
        });
    },
    update: ({
        blogIdx,
        introduce
    }) => {
        return new Promise(async (resolve, reject) => {
            const blog = await Blog.update({
                introduce : introduce
            }, {
                where : { blogIdx : blogIdx },
            });
            if (!blog) {
                resolve({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.BLOG_UPDATE_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS, rm.BLOG_UPDATE_SUCCESS)
            });
        });
    },
    delete: ({blogIdx}) => {
        return new Promise(async (resolve, reject) => {
            let blog;
            try {
                blog = await Blog.destroy({
                    where:{
                        blogIdx: blogIdx
                    }
                });
                
            } catch (error) {
                reject({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.BLOG_DELETE_FAIL)
                });
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS, rm.BLOG_DELETE_SUCCESS)
            });
        });
    },
};