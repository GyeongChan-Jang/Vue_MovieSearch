<template lang="">
  <!-- loading이 tru이면 나올 요소와 그렇지 않은 요소 분리 -->
  <div class="container">
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <Loader
        :size="3"
        :z-index="9"
        :fixed="true" />
    </template>
    <div
      v-else
      class="movie-details">
      <div 
        :style="{backgroundImage: `url(${reqeustDiffSizeImage(theMovie.Poster)})`}"
        class="poster">
        <Loader 
          v-if="imageLoading"
          absolute />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>            
        </div>
        <p class="plot">
          {{ theMovie.Plot }}
        </p>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <!-- theMovie 안 데이터 중 구조분해할당으로 Source, Value를 받고 별칭으로 name, score 사용, title은 html 속성(tooltip) -->
            <div
              v-for="{Source: name, Value: score} in theMovie.Ratings"
              :key="name"
              :title="name"
              class="rating">
              <img
                :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`"
                :alt="name" />
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          Genre
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
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
    ...mapState('movie', ['theMovie', 'loading'])
  },
  created() {
    // mapActions를 활용한 리팩토링
    this.$store.dispatch('movie/searchMovieWithId', {
      id: this.$route.params.id
    })
    // console.log(this.$store.)
  },
  // 이미지 resizing 하는 함수!
  methods: {
    reqeustDiffSizeImage(url, size=700) {
      if(!url || url === 'N/A') {
        this. imageLoading = false
        return ''
      } else {
        const src = url.replace('SX300', `SX${size}`)
        this.$loadImage(src).then(() => this.imageLoading = false)
        return src
      }
      
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/main";
  .container {
    padding-top: 40px;
  
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
  .movie-details {
    display: flex;
    color: $gray-600;
    .poster {
      flex-shrink: 0;
      width: 500px;
      height: 500px * 3 / 2;
      margin-right: 70px;
      border-radius: 10px;
      background-size: cover;
      position: relative;
    }
    .specs {
      flex-grow: 1;
      .title {
        color: $black;
        font-family: 'Varela Round', sans-serif;
        font-size: 70px;
        /* line-height: 1배 -> 글자 크기에 맞게만 줄높이 지정 */
        line-height: 1;
        margin-bottom: 30px;
      }
      .labels {
        color: $primary;
        span {
          &::after {
            content: "\00b7";
            margin: 0 6px;
          }
          &:last-child::after {
            display: none;
          }
        }
      }
      .plot {
        margin-top: 20px;
        font-weight: 900;
      }
      .ratings {
        .rating-wrap {
          display: flex;
          .rating {
            display: flex;
            align-content: center;
            margin-right: 32px;
            img {
              height: 30px;
              flex-shrink: 0;
              margin-right: 6px;
            }
          }
        }
      }
      h3 {
        margin: 24px 0 6px;
        color: $black;
        font-family: 'Varela Round', sans-serif;
        font-size: 20px;
      }
    }
    @include media-breakpoint-down(lg) {
    .poster {
      width: 300px;
      height: 300px * 3 / 2;
      margin-right: 40px;
      }
    }
    @include media-breakpoint-down(md) {
      display: block;
      .poster {
        margin-bottom: 40px;
      }
    }
    @include media-breakpoint-down(sm) {
      .specs {
        .title {
          font-size: 50px;
          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
