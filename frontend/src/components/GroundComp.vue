<template>
  <!-- 여기 GroundComp는  제일 밑바탕이 되는 페이지입니다.-->
  <div class="ground "> 
    <HeaderComp />
    <div>Content</div>
  </div>
</template>

<script>
import HeaderComp from './HeaderComp.vue';
export default { 
 components: {    
  HeaderComp
 }
}
</script>
