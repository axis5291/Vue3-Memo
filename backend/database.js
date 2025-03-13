const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: '127.0.0.1',    //수정한 부분
     user:'root',          //수정한 부분
     password: 'erlia22',  //수정한 부분
     connectionLimit: 100, //새로고침을 100번하면 디비가 끊김...숫자를 늘리면 더 많은 새로고침이 가능
     database: 'memodb',   //수정한 부분

});

module.exports = {
    async run(queryData){  //수정한 부분, 비동기처리추가: async
        return new Promise((resolve) => {    //수정한 부분
                pool.getConnection()
                .then(conn => {
                    conn.query(queryData)   //수정한 부분
                     .then((res) => {
                        resolve(res);
                     })
                    .catch(err => {
                         console.log(err); 
                         conn.end();
                    })
                
                }).catch(err => {
               
                });

        });

        
    }
}