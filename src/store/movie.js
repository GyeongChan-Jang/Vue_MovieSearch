import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    message: 'Search for the movie title!',
    loading: false,
    theMovie: {}
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
    // context 안에서 commit과 state를 사용하기 위해 구조 분해 할당!
    async searchMovies({ state, commit }, payload) {
      // 사용자가 여러번 검색 버튼을 누를 경우 이전 요청이 완료되지 않았을 때는 검색이 실행되지 않도록 break
      if (state.loading) return
      commit('updateState', {
        message: '',
        loading: true
      })
      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID') // 중복 제거
        })

        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)

        // 추가 요청!
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page++) {
            if (page > payload.number / 10) break
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = res.data
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
            })
          }
        }
      } catch (message) {
        commit('updateState', {
          movies: [],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if (state.loading) return

      commit('updateState', {
        theMovie: {},
        loading: true
      })

      try {
        const res = await _fetchMovie(payload)
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
      } catch (err) {
        // 에러가 날 경우 영화 상세정보를 비워줌!
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

// 언더바에 뜻은 이 JS파일에서만 쓰인다는 의미
// axios로 요청하는 함수를 따로 만듦
// 또한 omdb api의 경우 잘못된 데이터를 요청해도 요쳥응답은 제대로 나오지만 데이터는 보내지 않는 경우가 있음
// 이럴 때의 예외처리를 위한 이유로도 따로 함수를 만드는 것이 좋음
function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id
    ? `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        // 요청은 제대로 됐지만 데이터 없이 에러를 반환하는 경우 처리
        if (res.data.Error) reject(res.data.Error)
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
