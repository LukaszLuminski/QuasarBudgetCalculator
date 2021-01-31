export default ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!store.getters.isLoggedIn) {
        next({ path: '/login' })
      } else {
        next() // go to wherever I'm going
      }
    } else if (to.matched.some(record => record.meta.hideIfAuth)) {
      if (store.getters.isLoggedIn) {
        next({ path: '/' })
      } else {
        next()
      }
    } else {
      next() // does not require auth, make sure to always call next()!
    }
  })
}
