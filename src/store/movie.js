import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    message: '',
    loading: false
  }),
  getters: {
    movieIds(state) {
      return state.movies.map((m) => m.omdbID)
    }
  },
  mutations: {
    updateState(state, payload) {
      // 속성의 이름들을 배열로 반환 => ['movies', 'message', 'loading']
      // 로직 대박!
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  actions: {
    // context 안에서 commit만 사용사도록 구조분해 할당
    async searchMovies({ state, commit }, payload) {
      const { title, type, year, number } = payload
      const OMDB_API_KEY = '7035c60c'
      const res = await axios.get(
        `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`
      )
      const { Search, totalResults } = res.data
      commit('updateState', {
        movies: _uniqBy(Search, 'imdbID') // 중복 제거
      })

      const total = parseInt(totalResults, 10)
      const pageLength = Math.ceil(total / 10)
      console.log(number)

      // 추가 요청!
      if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page++) {
          if (page > number / 10) break
          const res = await axios.get(
            `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
          )
          const { Search } = res.data
          commit('updateState', {
            movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
          })
        }
      }
    }
  }
}
