<template lang="">
  <footer>
    <Logo />
    <a
      href="https://github.com/cham9994"
      target="_blank">
      (c){{ dateYear }} GyeongChan
    </a>
  </footer>
</template>
<script>
import Logo from './Logo.vue'
export default {
  components: {
    Logo
  },
  data() {
    return {
      dateYear: new Date().getFullYear()
    }
  }
}
</script>
<style lang="scss" scoped>
footer {
  padding: 70px 0;
  text-align: center;
  opacity: .3;
  .logo {
    // Logo 컴포: link -> a -> 수평으로 쌓임
    display: block;
    margin-bottom: 4px;
  }
}

</style>
