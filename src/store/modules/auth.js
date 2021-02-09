import axios from 'axios'

const state = {
  token: '',
  loggedIn: false,
  user: null,
  error: null
}

const getters = {
  isLoggedIn: (state) => {
    if (state.token && state.user) {
      return true
    } else {
      return false
    }
  },
  getUser: (state) => state.user,
  getToken: (state) => state.token,
  getError: (state) => state.error
}

const actions = {
  async onLogin ({ commit }, payload) {
    const URL = 'http://localhost:1337/auth/local'
    const data = payload.formData
    await axios.post(URL, data)
      .then(response => {
        commit('SET_USER', response.data.user)
        commit('SET_TOKEN', response.data.jwt)
        commit('PROCESS_ERROR', false)
        this.$router.push({ path: '/' })
      }
      )
      .catch(error => {
        console.log(error.response.data)
        commit('PROCESS_ERROR', error.response.data.message[0].messages[0].message)
      })
  },
  onLogout ({ commit }) {
    commit('CLEAR_USER', null)
    commit('CLEAR_TOKEN', null)
    this.$router.push({ path: '/login' })
  }
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
    state.loggedIn = true
  },
  CLEAR_USER (state, payload) {
    state.user = payload
    state.loggedIn = false
  },
  SET_TOKEN (state, payload) {
    state.token = payload
  },
  LOGOUT (state, payload) {
    state.token = payload
    state.user = payload
  },
  CLEAR_TOKEN (state, payload) {
    state.token = payload
  },
  PROCESS_ERROR (state, payload) {
    state.error = payload
  },
  CLEAR_ERROR (state) {
    state.error = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
