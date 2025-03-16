const express = require('express');
const app = express();
const port = 3000;
const database = require('./database');  //외부에서 정의된파일을 불러들일 때 requrie()사용
//**database.js파일을 들여와서 정의된 함수를 database.run()으로 사용함.

app.use(express.json()); // 클라이언트에서 넘오온 JSON 데이터를 JavaScript 객체로 변환

const memos=["서버의 메모-1", "서버의 메모-2", "서버의 메모-3"];  //디비를 사용하지 않고 메모리 기반으로 사용했을 때 필요한 임시저장공간


//아래에서 res.send(result);를 한 이유는 작업한 이후로 새로 조회를 하여 테이블 전체의 내용을 다시 보낸다.
app.get('/api/memos', async (req, res) => {     // 비동기 함수 `app.get` 내부에서 비동기 작업을 동기적으로 처리하기 위해 `async`를 사용
    const result = await database.run("SELECT * FROM memodata");    // `database.run()`은 비동기 함수이며, `await`을 사용하여 쿼리가 완료될 때까지 기다림
    res.send(result);  // 데이터 조회가 완료된 후 클라이언트에 결과를 응답으로 전송
});

app.post('/api/memos', async(req, res) => {
    await database.run(`insert into memodata (content) values ('?')`, [req.body.contentData]);   //?로 처리하여 []배열형태로 값을 넘겨주면 해커의 쿼리조작공격에 안전할 수 있다.
    const result=await database.run("SELECT * FROM memodata");
    res.send(result);  // 추가된 메세지를 응답으로 전송
    
});  

app.put('/api/edit', async (req, res) => {   // `async` 키워드를 사용하여 비동기 함수로 선언 → 함수 내부에서 `await`을 사용할 수 있도록 함
    await database.run(`UPDATE memodata SET content=? WHERE id=?`, [req.body.contentData, req.body.indexData] );  //값을 2개로 배열형태로 넘김
     // `await`을 사용하여 update 쿼리가 완료될 때까지 기다림 → update가 끝나기 전에 다음 코드가 실행되지 않도록 함 (순서 보장)
    const result = await database.run("SELECT * FROM memodata");
    // update가 완료된 후에 select 실행  → `await`을 사용하여 최신 데이터가 조회될 때까지 기다림,  조회된 데이터를 콘솔에 출력 (배열 형태로 반환됨)
    console.log("result결과:", result);  
    res.send(result);   // 클라이언트에게 최신 데이터 응답 전송
});

// 비동기 함수는 바로 결과를 반환하지 않고, 나중에 결과를 가져옴 → 그래서 Promise 객체를 반환함
// Promise 객체를 반환하는 함수는 우리가 예상한 순서대로 실행되지 않음
// 이걸 동기적으로(순서대로) 실행하려면?
// ✅ await을 붙이면 → 그 함수가 끝날 때까지 기다렸다가 실행
// ✅ then()을 쓰면 → Promise의 결과를 받아서 실행
// 👉 그래서 Promise + await(or then()) 조합을 사용하면 비동기 코드도 동기적인 흐름처럼 짤 수 있다! 🚀

//디비를 사용하지 않았을 때 get방식
// app.get('/api/memos', (req, res) => {
//  res.send(memos);
// });

//디비를 사용하지 않았을 때 post방식
// app.post('/api/memos', (req, res) => {
//     const newMemo = req.body.message;
//     memos.push(newMemo);  // 전송된 메세지를 memos 배열에 추가
//     res.send(newMemo+"로 보내신 메세지가 서버에 저장되었습니다.");    // 추가된 메세지를 응답으로 전송
// });

//디비를 사용하지 않았을 때 put방식
// app.put('/api/edit', (req, res) => {
//     memos[req.body.indexData] = req.body.contentMessage;   //이방식이 아래것 보다 더 간단하다.
//    // memos.splice(req.body.indexData,1, req.body.contentMessage);   //splice(시작위치, 삭제할 요소 갯수, 추가할 요소)
//     res.send(memos+": 메모가 수정되었습니다.");
// });

app.listen(port, () => {
    console.log(`✅ 서버 실행 중: http://localhost:${port}`);
});
