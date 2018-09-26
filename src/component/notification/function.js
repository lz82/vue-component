import Vue from 'vue'
import Notification from './func-notification.js'

// 记录所有需要显示的notify组件
const instances = [];
// 组件Id
let seed = 1;

const notify = option => {
  // 定义Notify组件的构造函数
  // https://cn.vuejs.org/v2/api/#Vue-extend
  const NotificationConstructor = Vue.extend(Notification)

  // 接收参数
  const {
    content,
    btn,
    autoClose,
    ...rest // babel-plugin-transform-object-rest-spread 需要安装此插件
  } = option

  // 创造实例
  // props使用propsData传递
  const instance = new NotificationConstructor({
    propsData: {
      content: content,
      btn
    },

    data() {
      return {
        autoClose: autoClose || 3000,
        ...rest
      }
    }
  })

  // 设置唯一标识
  instance.id = `notification-${seed++}`
  // https://cn.vuejs.org/v2/api/#vm-mount
  // 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
  // 如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.isShow = true

  // 当存在多个notification时，计算底部高度
  // 设置初始底部距离为16
  let verticalOffset = 16
  instances.forEach(item => {
    verticalOffset += item.vm.$el.offsetHeight + 16 // 每个组件之间高度差为16
  })
  instance.verticalOffset = verticalOffset

  // 按钮关闭事件
  instance.vm.$on('close', () => {
    instance.vm.isShow = false
  })

  // 组件已安全关闭事件
  instance.vm.$on('closed', () => {
    // 1.0 移除dom
    document.body.removeChild(instance.vm.$el)
    // 2.0 destroy vm
    instance.vm.$destroy()
    let delIndex = instances.findIndex(i => i.id === instance.id)
    // 4.0 从所有组件的列表中移除被删除的组件
    if (delIndex > -1) {
      instances.splice(delIndex, 1)
    }
    // 3.0 被删除的组件上方的组件向下移动一格
    while(delIndex < instances.length) {
      instances[delIndex++].vm.verticalOffset -= (instance.height + 16)
    }
  })

  instances.push(instance)

  return instance
}

export default notify
