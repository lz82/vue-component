import Vue from 'vue'

import App from './app'

import Notification from './component/notification'

import './styles/main.less'

Vue.use(Notification)

const vm = new Vue({
  render: h => h(App)
})

vm.$mount('#app')
