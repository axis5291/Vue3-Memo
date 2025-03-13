const express = require('express');
const app = express();
const port = 3000;
const database = require('./database');

app.use(express.json()); // 클라이언트에서 넘오온 JSON 데이터를 JavaScript 객체로 변환

const memos=["서버의 메모-1", "서버의 메모-2", "서버의 메모-3"];

app.get('/api/memos', async(req, res) => {   //비동기처리 추가: async
    const result=await database.run("SELECT * FROM memodata");
    res.send(result);
});

app.post('/api/memos', async(req, res) => {
    const newMemo = req.body.contentMessage;
    await database.run(`insert into memodata (content) values ('${newMemo}')`);  
    const result=await database.run("SELECT * FROM memodata");
    res.send(result);  // 추가된 메세지를 응답으로 전송
    
});  

app.put('/api/edit', async(req, res) => {
    await database.run(`update  memodata set content='${req.body.contentMessage}' where id=${req.body.indexData}`);  
    const result=await database.run("SELECT * FROM memodata");
   // const result=await database.run(`SELECT content FROM memodata where id=${req.body.indexData}`);
    res.send(result);
});

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
