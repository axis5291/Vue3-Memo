const mariadb = require('mariadb');

// MariaDB와 연결할 "풀(Pool)" 생성 (다중 연결을 관리하기 위함)
const pool = mariadb.createPool({
     host: '127.0.0.1',    // 데이터베이스 서버 주소 (로컬호스트)
     user:'root',          // 데이터베이스 로그인 계정 (설정에 따라 다름)
     password: 'erlia22',  // 데이터베이스 로그인 비밀번호 (설정에 따라 다름)
     connectionLimit: 100, // 최대 동시 연결 개수 (100개 이상의 연결을 시도하면 대기 또는 오류 발생)
     database: 'memodb',   // 사용할 데이터베이스 이름
});  

// 외부에서 이 모듈을 불러와 사용할 수 있도록 `run()` 함수를 정의하여 내보냄 (exports)
module.exports = {    
    async run(queryData, params) {  // 비동기(async) 함수로 실행 → await을 사용하여 동기적인 흐름으로 처리 가능
        return new Promise((resolve, reject) => {  // ✅ 비동기 작업을 동기작업을 처리하기 위해 매개변수 2개가 있는Promise 객체로 감싸서 반환, 성공 시 resolve() 호출, 실패 시 reject() 호출
            pool.getConnection()   // 데이터베이스 연결 가져오기
                .then(conn => {
                    conn.query(queryData, params)   // ✅ 쿼리 실행 (플레이스홀더(?물음표 사용) 사용 가능)
                        .then((res) => {
                            resolve(res);  // ✅ 쿼리 결과를 Promise가 성공적으로 완료될 때 호출됩니다.
                            conn.end();    // ✅ 사용한 연결을 닫아줌 (중요)
                        })
                        .catch(err => {  // ✅ 쿼리 실행 중 에러 발생 시
                            console.log("쿼리 실행 중 오류 발생:", err); 
                            conn.end();  // ✅ 에러 발생 시에도 연결을 닫아줌 (연결 누수 방지)
                            reject(err); // ✅ Promise를 reject하여 오류를 호출한 곳에서 처리할 수 있도록 함
                        });
                })
                .catch(err => {  // ✅ 연결 가져오기(pool.getConnection()) 중 에러 발생 시
                    console.log("데이터베이스 연결 실패:", err);
                    reject(err);
                });
        });
    }
}   
