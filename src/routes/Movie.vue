<template lang="">
  <div class="container">
    <div class="skeletons">
      <div class="skeleton poster"></div>
      <div class="specs">
        <div class="skeleton title"></div>
        <div class="skeleton spec"></div>
        <div class="skeleton plot"></div>
        <div class="skeleton etc"></div>
        <div class="skeleton etc"></div>
      </div>
    </div>
    <Loader
      :size="3"
      :z-index="9"
      fixed />
  </div>
</template>
<script>
import Loader from '../components/Loader.vue'
export default {
  components: {
    Loader
  },
  created() {
    this.$store.dispatch('movie/searchMoviewithId', {
      id: this.$route.params.id
    })
    // console.log(this.$store.)
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/main";
  .container {
    padding-top: 40px;
  }
  .skeletons {
    display: flex;
    .poster {
      // 감소 너비 사용X => 화면 줄어들어도 크기 고정
      flex-shrink: 0;
      width: 500px;
      height: 500px * 3/2;
      margin-right: 70px;
    }
    .specs {
      // 최대한 많은 너비를 차지하도록
      flex-grow:1
    }
    .skeleton {
      border-radius: 10px;
      background-color: $gray-200;
      &.title {
        width: 80%;
        height: 70px;
      }
      &.spec {
        width: 60%;
        height: 30px;
        margin-top: 20px;
      }
      &.plot {
        width: 100%;
        height: 250px;
        margin-top: 20px;
      }
      &.etc {
        width: 50%;
        height: 50px;
        margin-top: 20px;
      }
    }
  }
</style>
