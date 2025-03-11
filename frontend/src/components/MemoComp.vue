<template>
  <div class="memo">
    <div class="act">
      <button class="btn btn-primary">+추가</button>
    </div>

    <ul>
      <li v-for="d in data" :key="index">{{ d }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  setup() {
    const data = [
      "메모 1 내용입니다.",
      "메모 2 내용입니다.",
      "메모 3 내용입니다.",
      "메모 4 내용입니다.",
      "메모 5 내용입니다.",
    ];
    return { data };
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
