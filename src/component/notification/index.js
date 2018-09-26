import Notification from './notification'
import Component from './function.js'
export default {
  install(Vue) {
    Vue.component(Notification.name, Notification)
    Object.defineProperty(Vue.prototype, '$notify', { value: Component })
  }
}
