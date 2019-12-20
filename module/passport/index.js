const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../../models');

module.exports = (passport) => {
/** serializeUser
 * req.session 객체에 어떤 데이터를 저장할지 선택한다.
 * 매개변수로 user를 받아, don 함수에 두 번째 인자로 user.id를 넘긴다.
 * done 함수의 첫 번째 인자는 에러 발생 시 사용한다.
 * ******* 사용자 정보 객체를 세션에 아이디로 저장하는 것 *********
 */
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
/** deserializeUser
 * 매 요청 시 실행된다.
 * passport.session() 미들웨어가 이 메서드를 호출한다.
 * seriailizeUser에서 세션에 저장했던 아이디를 받아 데이터베이스에서 사용자 정보를 조회한다.
 * 조회한 정보를 req.user에 저장하므로 앞으로 req.user를 통해 로그인한 사용자의 정보를 가져올 수 있다.
 * ******* 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러오는 것 *********
 */
    
    passport.deserializeUser((id, done) => {
        User.findOne({ where : { id } })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local(passport);
    kakao(passport);
};

/** 전체 과정
 * 1. 로그인 요청이 들어온다.
 * 2. passport.authenticate 메서드 호출
 * 3. 로그인 전략 수행
 * 4. 로그인 성공시 사용자 정보 객체와 req.login 호출
 * 5. req.login 메서드가 passport.serializeUser 호출
 * 6. req.session에 사용자 아이디만 저장
 * 7. 로그인 완료
 */

 /** 로그인 이후의 과정
  * 1. 모든 요청에 passport.session 미들웨어가 passport.deserializeUser 메서드 호출
  * 2. req.session에 저장된 아이디로 데이터베이스에서 사용자 조회
  * 3. 조회된 사용자 정보를 req.user에 저장
  * 4. 라우터에서 req.user 객체 사용 가능
  */