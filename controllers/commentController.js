const CommentService = require('../services/commentsService');

const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

module.exports = {
    readAll: async (req, res) => {
        CommentService.readAll()
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
        const articleIdx = req.params.articleIdx;
        if(!articleIdx) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        CommentService.read({articleIdx})
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
        const articleIdx = req.params.articleIdx;
        const {
            nick,
            content
        } = req.body;
        if (!articleIdx || !nick || !content) {
            const missParameters = Object.entries({
                    articleIdx,
                    nick,
                    content,
                })
                .filter(it => it[1] == undefined).map(it => it[0]).join(',');
            res.send(utils.successFalse(sc.BAD_REQUEST, `${rm.NULL_VALUE}, ${missParameters}`));
            return;
        }
        CommentService.create({
            articleIdx,
            nick,
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
        const articleIdx = req.params.articleIdx;
        const {
            content
        } = req.body;
        if (!articleIdx || !content) {
            const missParameters = Object.entries({
                    articleIdx,
                    content,
                })
                .filter(it => it[1] == undefined).map(it => it[0]).join(',');
            res.send(utils.successFalse(sc.BAD_REQUEST, `${rm.NULL_VALUE}, ${missParameters}`));
            return;
        }
        CommentService.update({articleIdx, contnet})
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
        const articleIdx = req.params.articleIdx;
        if(!articleIdx) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        CommentService.delete({articleIdx})
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