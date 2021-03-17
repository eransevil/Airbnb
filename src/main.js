import Vue from 'vue'
import app from './app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '../style/scss/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
