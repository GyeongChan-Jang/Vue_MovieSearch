/* eslint-disable vue/multi-word-component-names */
<template lang="">
  <RouterLink
    to="/"
    class="logo">
    <span>Movie</span>Box
  </RouterLink>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
@import "../scss/main";
.logo {
  font-family: "Kdam Thmor Pro", sans-serif;
  font-size: 30px;
  color: $black;
  text-decoration: none;
  &:hover {
    color: $black;
  }
  span {
    color: $primary;
    font-weight: bolder;
  }
}
</style>
