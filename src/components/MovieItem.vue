<template lang="">
  <div>
    {{ movie.imdbID }}
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
<style lang="">
  
</style>
