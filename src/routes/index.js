import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import About from './About'
import Movie from './Movie'
import NotFound from './NotFound'

export default createRouter({
  // Hash와 history 모드가 있음
  // 여기선 Hash 모드로 사용 -> #catetory
  // https://google.com/#/search
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  // pages
  // hppts://google.com/about
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})
