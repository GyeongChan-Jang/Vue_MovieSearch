<template lang="">
  <div class="container">
    <div
      :class="{'no-result': !movies.length}"
      class="inner">
      <div
        v-if="loading"
        class="spinner-grow text-primary"
        style="width: 3rem; height: 3rem;"></div>
      <div
        v-if="message"
        class="message">
        {{ message }}
      </div>
      <div 
        v-else
        class="movies">
        <MovieItem
          v-for="movie in movies"
          :key="movie.omdbID"
          :movie="movie" />
      </div>
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
    },
    loading() {
      return this.$store.state.movie.loading
    }
  }
}
</script>
<style lang="scss">
@import '../scss/main';
  .container {
    margin-top: 30px;
    .inner {
      background-color: $gray-200;
      padding: 10px 0;
      border-radius: 4px;
      text-align: center;
      &.no-result {
        padding: 70px 0;
      }
    }
    .message {
      color: $gray-400;
      font-size: 20px;
    }
    .movies {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
