import axios from 'axios'

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
    async searchMovies({ commit }, payload) {
      const { title, type, year, number } = payload
      const OMDB_API_KEY = '7035c60c'
      const res = await axios.get(
        `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`
      )
      const { Search, totalResults } = res.data
      commit('updateState', {
        movies: Search
      })
    }
  }
}
