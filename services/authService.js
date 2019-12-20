const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');
const encrypt = require('../module/encrytion');
const passport = require('passport');
const Auth = require('../module/auth/jwt');
/**
 * models을 가져오려면 index를 가져와야한다. ArticleModel를 가져오면 안된다!
 */
const {User} = require('../models');

module.exports = {
    join: ({ email, nick, password }) => {
        return new Promise(async (resolve, reject) => {
            const exUser = await User.findOne({ where: { email } });
            if (exUser) {
                resolve({
                    json: utils.successFalse(sc.CONFLICT, rm.ALREADY_EMAIL)
                });
                return;
            }
            const encryptResult = await encrypt.encrypt(password);
            if(!encryptResult){
                resolve({
                    json: utils.successFalse(sc.CONFLICT,rm.PASSWORD_ENCRYPTION_FAIL)
                });
                return;
            }
            let user;
            try {
                user = await User.create({
                    email : email,
                    nick : nick,
                    password : encryptResult.hashed,
                    salt : encryptResult.salt,
                });
            } catch (error) {
                if(!user){
                    reject({
                        json: utils.successFalse(sc.CONFLICT, rm.JOIN_FAIL)
                    });
                    return;
                }
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS, rm.JOIN_SUCCESS, user)
            });
        });
    },
    login: ({ email, password }) => {
        return new Promise(async (resolve, reject) => {
            const exUser = await User.findOne({ where: { email } });
            if (exUser.length == 0) {
                resolve({
                    json: utils.successFalse(sc.CONFLICT, rm.NO_EMAIL)
                });
                return;
            }
            const hash = await encrypt.encryptWithSalt(password, exUser.salt);
            if(user.password != hash){
                resolve({
                    json: utils.successFalse(sc.CONFLICT, rm.MISS_MATCH_PASSWORD)
                })
                return;
            }
            const token = await Auth.sign(user);
            resolve({
                json : utils.successTrue(sc.SUCCESS, rm.LOGIN_SUCCESS, token)
            });
        });
    },
}