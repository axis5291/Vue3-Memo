<template>
  <div class="memo">
    <input type="text" v-model="state.inputData" placeholder="메모를 입력하세요" class="input-box" />

    <div class="act">
      <button class="btn btn-primary" @click="add()">+추가</button>
    </div>

    <ul>
      <li v-for="data in state.severData" :key="data.id" @click="edit(data.id)">{{ data.content }}</li>
        <!-- 객체들이 들어있는 배열(severData)에서 객체 하나를 꺼내서 data로 받아서 사용 -->
       <!-- 각각의 메모를 클릭하면 edit(data.id)를 통하여 수정할 수 있습니다. data.content의  content는 실제 디비의 컬럼명-->

    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { reactive } from "vue";
export default {
  setup() {
    const state=reactive({
      severData:[],   //서버에서 가져온 메모 내용을 저장
      inputData:"",   //input 태그에 입력한 내용을 저장
     });

    const add=()=>{     
      if(!state.inputData){  //내용을 입력하지 않으면  
        alert("메모를 입력하세요");
        return;  
      } //if

      axios.post("api/memos", {contentData:state.inputData}).then((res)=>{  
      //{message:state.data2}  객체형태 ->{key:value}, axios는 객체를 제이슨형태로 변환해서 전송
          console.log("서버로 전송한 내용:", res.data);
          state.severData=res.data;    // 서버에서 최신 메모 목록을 받아와 업데이트
          state.inputData="";           // 입력창 초기화
      });
    };//add()  새로운 메모 추가

    const edit=(id)=>{   //메모의 내용을 수정하는 기능
    const content=prompt("수정할 내용을 입력하세요", state.severData.find(data=>data.id===id).content);
    console.log("수정한 내용:", content);

      if(content!=null){  //content가 null이면 아래는 수행하지 않음.(수정한게 아무것도 없으면)
        axios.put("/api/edit", {indexData:id, contentData:content}).then((res)=>{  //객체하나에 2개의 데이터를 전송
          state.severData=res.data;  //이 코드를 추가해주어야 수정된 내용이 즉시 반영된다.
          console.log("서버에서 보낸 메세지:", res.data);
        });
      }
   }//edit()

    axios.get("/api/memos").then((res)=>{
      state.severData=res.data;
      console.log("get()으로 서버에서 가져온 내용:", res.data);  
      console.log("첫 번째 메모 내용:", res.data[0]?.content);

    });//axios.get()

    return { state, add, edit };
  },
};
</script>

<style lang="scss" scoped>
.memo {
  display: flex;
  flex-direction: column;
  align-items: center; // 요소들을 가운데 정렬
  width: 100%;
  padding: 20px;

  .input-box {
    width: 80%; /* 입력창 너비 조정 */
    max-width: 400px; /* 최대 너비 설정 */
    padding: 10px;
    text-align: center; /* 텍스트를 가운데 정렬 */
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .act {
    text-align: center;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 15px;
    margin: 0;
    width: 100%;
    max-width: 400px;

    li {
      padding: 5px 10px;
      margin: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f5eded;
      text-align: left;
    }
  }
}
</style>