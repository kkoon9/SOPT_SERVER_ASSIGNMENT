const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    res.send(utils.successFalse(sc.FORBIDDEN, rm.NEED_LOGIN));
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    }
    res.send(utils.successFalse(sc.BAD_REQUEST, rm.CANT_ACCESS));
};
