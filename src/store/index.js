import { createStore } from 'vuex'
import movie from './movie'
import about from './about'

// index store에서 모든 store 관리
export default createStore({
  modules: {
    movie,
    about
  }
})
