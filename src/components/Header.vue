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
    <div
      class="user"
      @click="toAbout">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>
<script>
import {mapState} from 'vuex'
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
  computed: {
    ...mapState('about', ['image', 'name'])
    },
  methods: {
    isMatch(path) {
      if(!path) return 
      return path.test(this.$route.fullPath) // test 메서드 -> 정규표현식을 받아 일지하는지 판별, fullPath -> route 전체 경로
    },
    toAbout() {
      this.$router.push('/about')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/main";
  header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    position: relative;
    .logo {
      margin-right: 40px;
    }
    .user {
      width: 40px;
      height: 40px;
      padding: 6px;
      border-radius: 50%;
      background-color: $gray-200;
      cursor: pointer;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 40px;
      margin: auto;
      transition: .4s;
      &:hover {
        background-color: darken($gray-200, 10%); // scss 내장함수
      }
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    @include media-breakpoint-down(sm) {
      .nav {
        display: none;
      }
    }
  }
</style>
