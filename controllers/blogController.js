const BlogService = require('../services/blogsService');

const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

module.exports = {
    readAll: async (req, res) => {
        BlogService.readAll()
        .then(({
            json
        }) => 
            res.send(json)
        ).catch(err => {
            console.log(err);
            res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        });
    },
    readblogIdx: async (req, res) => {
        const {
            blogIdx
        } = req.body;
        if(!blogIdx) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        BlogService.readblogIdx({blogIdx})
        .then(({
            json
        }) => 
            res.send(json)
        ).catch(err => {
            console.log(err);
            res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        })
    },
    readHost: async (req, res) => {
        const {
            host
        } = req.body;
        if(!host) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        BlogService.readHost({host})
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
            host,
            comment
        } = req.body;
        if(!host) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        BlogService.create({host, comment})
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
        const {
            comment
        } = req.body;
        if(!comment) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        BlogService.update({comment})
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
            blogIdx
        } = req.body;
        if(!blogIdx) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        BlogService.delete({blogIdx})
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