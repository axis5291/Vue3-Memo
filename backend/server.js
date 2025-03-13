const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // 클라이언트에서 넘오온 JSON 데이터를 JavaScript 객체로 변환

const memos=["서버의 메모-1", "서버의 메모-2", "서버의 메모-3"];

app.get('/api/memos', (req, res) => {
    res.send(memos);
});

app.post('/api/memos', (req, res) => {
    const newMemo = req.body.message;
    memos.push(newMemo);  // 전송된 메세지를 memos 배열에 추가
    res.send(newMemo+"로 보내신 메세지가 서버에 저장되었습니다.");    // 추가된 메세지를 응답으로 전송
});

app.listen(port, () => {
    console.log(`✅ 서버 실행 중: http://localhost:${port}`);
});
