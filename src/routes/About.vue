/* eslint-disable vue/multi-word-component-names */
<template lang="">
  <div class="about">
    <div class="photo">
      <Loader
        v-if="imageLoading"
        absolute />
      <img
        :src="image"
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ github }}</div>
    <div>{{ phone }}</div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Loader from '../components/Loader.vue'
export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  }, 
  computed: {
    // mapState가 반환된 결과가 하나씩 등록될 수 있도록 전개연산자 사용
    // mapState는 객체 데이터를 반환하기 때문에 전개연산자를 이용해 풀어줌
    ...mapState('about', ['image', 'name', 'email', 'blog', 'phone'])
  },
  mounted() {
    // 라이플싸이클에서는 비동기 처리 할 수 없음, 비동기 함수를 따로 만들고 라이프싸이클에서는 실행만!
    this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/main.scss";

.about {
  text-align: center;
  font-family: "Varela Round", sans-serif;
  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background: $gray-200;
    position: relative;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .name {
    font-size: 40px;
    margin-bottom: 20px;
  }
}
</style>
