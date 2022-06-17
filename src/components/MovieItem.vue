<template lang="">
  <RouterLink
    :to="`/movie/${movie.imdbID}`"
    class="movie"
    :style="{ backgroundImage: `url(${movie.Poster})` }">
    <Loader 
      v-if="imageLoading"
      :size="1.5"
      absolute />
    <div class="info">
      <div class="year"> 
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </RouterLink>
</template>

<script>
import Loader from './Loader.vue'

export default {
  components: {
    Loader
  },
  props: {
    movie: {
      // props의 데이터 타입이랑 초기값 지정
      type: Object, 
      // 객, 배, 함은 참조형 데이터라서 함수로 만들어 반환하게 해줘야 데이터 불변성이 지켜짐
      default: () => ({})
    }
  },
  data() {
    return {
      imageLoading: true
    }
  },
  // html과 연결된 직후인 mounted가 적절!
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const poster = this.movie.Poster
      if(poster === 'N/A' || !poster) {
        this.imageLoading = false
      } else {
        await this.$loadImage(poster)
      this.imageLoading = false
      }
      
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/main";
  .movie {
    $width: 200px;
    width: $width;
    margin: 10px;
    height: $width * 3 / 2;
    border-radius: 4px;
    background-color: $gray-400;
    background-size: cover;
    overflow: hidden;
    position: relative;
    &:hover::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      border: 6px solid $primary
    }
    .info {
      background-color: rgba($black, .3);
      width: 100%;
      padding: 14px;
      font-size: 14px;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 0;
      backdrop-filter: blur(10px);
      .year {
        color: $primary;
        font-weight: bold;
      }
      .title {
        color: $white;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
</style>
