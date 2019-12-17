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
        const articleId = req.params.articleId;
        if(!articleId) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        CommentService.read({articleId})
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
        const {
            nick, 
            content
        } = req.body;
        const articleId = req.params.articleId;
        if (!articleId || !nick || !content) {
            const missParameters = Object.entries({
                    articleId,
                    nick,  
                    content
                })
                .filter(it => it[1] == undefined).map(it => it[0]).join(',');
            res.send(utils.successFalse(sc.BAD_REQUEST, `${rm.NULL_VALUE}, ${missParameters}`));
            return;
        }
        CommentService.create({
            articleId,
            nick, 
            content})
        .then(({
            json
        }) => 
            res.send(json)
        ).catch(err => {
            res.send(err);
        })
    },
    update: async (req, res) => {
        const {
            id,
            content
        } = req.body;
        if (!id || !content) {
            const missParameters = Object.entries({
                    id,
                    content
                })
                .filter(it => it[1] == undefined).map(it => it[0]).join(',');
            res.send(utils.successFalse(sc.BAD_REQUEST, `${rm.NULL_VALUE}, ${missParameters}`));
            return;
        }
        CommentService.update({id, content})
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
        const {
            id
        } = req.body;
        if(!id) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        CommentService.delete({id})
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