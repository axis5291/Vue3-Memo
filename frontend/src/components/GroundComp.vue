<template>
  <!-- 여기 GroundComp는  제일 밑바탕이 되는 페이지입니다.-->
  <div class="ground "> 
    <HeaderComp />
    <MemoComp />
    <FooterComp />
  </div>
</template>

<script>
import HeaderComp from './HeaderComp.vue';
import FooterComp from './FooterComp.vue';
import MemoComp from './MemoComp.vue';
export default { 
 components: {    
  HeaderComp, FooterComp, MemoComp
 }
}
</script>
