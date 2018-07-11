import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import routes from './routes'
import App from './App'
import store from './store'

Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({ routes })

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
