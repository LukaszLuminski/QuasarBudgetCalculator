import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import auth from './modules/auth'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

// Vuex persist object
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth']
})

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING,
    // Persist state
    plugins: [vuexLocal.plugin]
  })

  return Store
}
