/* eslint-disable vue/multi-word-component-names */
<template lang="">
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink
          :class="{active: isMatch(nav.path)}"
          :to="nav.href"
          active-class="active"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>
<script>
import Logo from './Logo'
export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: 'Home',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie/:id',
          path: /^\/movie/ // '/movie로 시작하는 경로'
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  methods: {
    isMatch(path) {
      if(!path) return 
      console.log(this.$route)
      return path.test(this.$route.fullPath) // test 메서드 -> 정규표현식을 받아 일지하는지 판별, fullPath -> route 전체 경로
    }
  }
}
</script>
<style lang="scss" scoped>
  header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    .logo {
      margin-right: 40px;
    }
  }
</style>
