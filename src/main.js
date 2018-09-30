import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import axios from "axios";

Vue.config.productionTip = false
const production = process.env.NODE_ENV === 'production'
axios.defaults.baseURL = production ? '/api' : 'http://localhost:8080/api'
new Vue({
  render: h => h(App)
}).$mount('#app')
