<template lang="">
  <div class="container">
    <div class="inner">
      <div class="messate">
        {{ message }}
      </div>
      <MovieItem
        v-for="movie in movies"
        :key="movie.omdbID"
        :movie="movie" />
    </div>
  </div>
</template>
<script>
import MovieItem from './MovieItem.vue'
export default {
  components: {
      MovieItem
    },
  computed: {
    // 검색 했을 때 반응성 있게 데이터가 갱신되어야 해서 computed에서 정의
    movies() {
      // $store로 스토어 접근 state 중 movie 모듈 사용 movies 데이터 가져옴
      return this.$store.state.movie.movies
    },
    message() {
      return this.$store.state.movie.message
    }
  }
}
</script>
<style lang="">
  
</style>
