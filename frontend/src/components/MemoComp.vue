<template>
  <div class="memo">
    <input type="text" v-model="state.data2" placeholder="메모를 입력하세요" class="input-box" />

    <div class="act">
      <button class="btn btn-primary" @click="add()">+추가</button>
    </div>

    <ul>
      <li v-for="data, index in state.data1" :key="index">{{ data }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { reactive } from "vue";
export default {
  setup() {
    const state=reactive({
      data1:[],
      data2:"",
     });

    const add=()=>{
      state.data1.push(state.data2);
     
      axios.post("api/memos", {message:state.data2}).then((res)=>{  
     //{message:state.data2}  객체형태 ->{key:value}, axios는 객체를 제이슨형태로 변환해서 전송
         console.log("서버로 전송한 내용:"+res.data);
     });
      state.data2="";  
     
    };

    axios.get("/api/memos").then((res)=>{
      state.data1=res.data;
      console.log("서버에서 가져온 내용:"+res.data);
    });

    return { state, add };
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