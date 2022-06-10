import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home.vue'
import About from './About.vue'

export default createRouter({
  // Hash와 history 모드가 있음
  // 여기선 Hash 모드로 사용 -> #catetory
  // https://google.com/#/search
  history: createWebHashHistory(),
  // pages
  // hppts://google.com/about
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    }
  ]
})
