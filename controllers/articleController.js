const ArticleService = require('../services/articlesService');

const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

module.exports = {
    readAll: async (req, res) => {
        ArticleService.readAll()
        .then(({
            json
        }) => 
            res.send(json)
        ).catch(err => {
            console.log(err);
            res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        });
    },
    read: async (req, res) => {
        const blogIdx = req.params.blogIdx;
        if(!blogIdx) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        ArticleService.read({blogIdx})
        .then(({
            json
        }) => 
            res.send(json)
        ).catch(err => {
            console.log(err);
            res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        })
    },
    create: async (req, res) => {
        const blogIdx = req.params.blogIdx;
        const {
            title,
            writer,
            content
        } = req.body;
        if (!blogIdx || !title || !writer || !content) {
            const missParameters = Object.entries({
                    blogIdx,
                    title,
                    writer,
                    content
                })
                .filter(it => it[1] == undefined).map(it => it[0]).join(',');
            res.send(utils.successFalse(sc.BAD_REQUEST, `${rm.NULL_VALUE}, ${missParameters}`));
            return;
        }
        ArticleService.create({
            blogIdx,
            title,
            writer,
            content
        })
        .then(({
            json
        }) => 
            res.send(json)
        ).catch(err => {
            console.log(err);
            res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        })
    },
    update: async (req, res) => {
        const blogIdx = req.params.blogIdx;
        const {
            content
        } = req.body;
        if (!blogIdx || !content) {
            const missParameters = Object.entries({
                    blogIdx,
                    content
                })
                .filter(it => it[1] == undefined).map(it => it[0]).join(',');
            res.send(utils.successFalse(sc.BAD_REQUEST, `${rm.NULL_VALUE}, ${missParameters}`));
            return;
        }
        ArticleService.update({
            blogIdx,
            title,
            content
        })
        .then(({
            json
        }) => 
            res.send(json)
        ).catch(err => {
            console.log(err);
            res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        })
    },
    delete: async (req, res) => {
        const blogIdx = req.params.blogIdx;
        if(!blogIdx) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        ArticleService.delete({blogIdx})
        .then(({
            json
        }) => 
            res.send(json)
        ).catch(err => {
            console.log(err);
            res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        })
    },
}