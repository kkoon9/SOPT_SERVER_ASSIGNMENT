const randToken = require('rand-token');    // random token 받아오기 위한 모듈
const jwt = require('jsonwebtoken');    // jwt key발급을 위한 모듈
const options = {   // jwt key 발급할 때 사용할 옵션들
    algorithm: "HS256", // 사용할 알고리즘
    expiresIn: "1m",    // 유효기간 (시간 표현식을 구글링하면 나옴)
    issuer: "genie" // 토큰 발행한 사람의 이름 지정
};

module.exports = {
    sign: (user) => {
        const payload = {   // payload : 토큰에 담길 내용 작성
            idx: user.idx,
            grade: user.grade,
            name: user.name
        };
        
        const result = {
            token: jwt.sign(payload, process.env.sSECRET_PRIVATE_KEY, options),  // 메소드의 인자들 : (저장할 것, 내가 지정한 secret key, 키를 만들기 위한 옵션)
            refreshToken: randToken.uid(256)
        };
        return result;
    },
    
    verify: (token) => {    // 토큰 해독하는 메소드
        let decoded;
        try {
            decoded = jwt.verify(token, secretOrPrivateKey);    // token을 decoded에 넣는다. (제공되는 메소드)
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
               return -3;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                return -2;
            } else {
                console.log("invalid token");
                return -2;
            }
        }
        return decoded; // 해독한 값 return
    },
    
    refresh: (user) => {
    }
};