<template lang="">
  <div
    class="movie"
    :style="{ backgroundImage: `url(${movie.Poster})` }">
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      // props의 데이터 타입이랑 초기값 지정
      type: Object, 
      // 객, 배, 함은 참조형 데이터라서 함수로 만들어 반환하게 해줘야 데이터 불변성이 지켜짐
      default: () => ({})
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
