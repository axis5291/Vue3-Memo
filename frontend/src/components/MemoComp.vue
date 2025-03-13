<template>
  <div class="memo">
    <input type="text" v-model="state.data2" />

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
      data1:["메모1", "메모2", "메모3"],
      data2:"",
     });
    const add=()=>{
      state.data1.push(state.data2);
      state.data2="";  
     
    };

    axios.get("/api/memos").then((res)=>{
      console.log(res.data);
    });

    return { state, add };
  },
};
</script>

<style lang="scss" scoped>
//  scss를 사용하려면 lang="scss"를 추가해야 한다., 별도로 설치

.memo {
    .act {
        padding: 10px 10px 5px 5px;
        text-align: right;
    }
  
  ul {
    list-style-type: none;
    padding: 15px;
    margin: 0;

    li {
      padding: 5px 10px;
      margin: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f5eded;
    }
  }
}
</style>
