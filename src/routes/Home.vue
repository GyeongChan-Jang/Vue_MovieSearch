/* eslint-disable vue/multi-word-component-names */
<template lang="">
  <Headline />
  <Search />
  <MovieList />
</template>
<script>
import Headline from '../components/Headline'
import Search from '../components/Search'
import MovieList from '..//components/MovieList'
export default {
  components: {
    Headline,
    Search,
    MovieList
  },
  created() {
    this.$store.commit('movie/resetMovies')
  }
}
</script>
<style lang="">
  
</style>
