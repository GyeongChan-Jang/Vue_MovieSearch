export default {
  // module!
  namespaced: true,
  // data!
  state: () => ({
    movies: []
  }),
  // computed!
  getters: {
    movieIds(state) {
      return state.movies.map((m) => m.omdbID)
    }
  },
  // methods!
  // 변이 - state의 데이터들을 변경시켜줄 수 있음, 다른 곳에서는 수정 불가
  mutations: {
    resetMovies(state) {
      state.movies = []
    }
  },
  // 비동기로 동작함! async/await 안해도 됨
  actions: {}
}
