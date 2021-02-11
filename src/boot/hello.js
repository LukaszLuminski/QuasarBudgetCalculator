import hello from 'hellojs'

export default ({ Vue }) => {
  hello.init({
    facebook: '167199871652637'
  })
  Vue.prototype.$hello = hello
}
