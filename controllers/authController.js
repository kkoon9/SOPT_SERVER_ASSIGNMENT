const AuthService = require('../services/authService');
const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

module.exports = {
  join: async (req, res) => {
    const {
      email,
      nick,
      password
    } = req.body;
    if (!email || !nick || !password) {
      const missParameters = Object.entries({
          email,
          nick,
          password
        })
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
      res.send(utils.successFalse(sc.BAD_REQUEST, `${rm.NULL_VALUE}, ${missParameters}`));
      return;
    }
    AuthService.join({
        email,
        nick,
        password
      })
      .then(({
          json
        }) =>
        res.send(json)
      ).catch(err => {
        console.log(err);
        res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
      });
  },
  login: async (req, res) => {
    const {
      email,
      password,
    } = req.body;
    if (!email || !password) {
      const missParameters = Object.entries({
          email,
          password
        })
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
      res.send(utils.successFalse(sc.BAD_REQUEST, `${rm.NULL_VALUE}, ${missParameters}`));
      return;
    }
    AuthService.login({
        email,
        password
      })
      .then(({
          json
        }) =>
        res.send(json)
      ).catch(err => {
        console.log(err);
        res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
      });
  },

};