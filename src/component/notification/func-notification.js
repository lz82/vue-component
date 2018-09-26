import Notification from './notification.vue'

// 这里只是普通字面量
// 用于扩展notification
const component = {
  extends: Notification,

  data () {
    return {
      verticalOffset: 0,
      height: 0,
      autoClose: 3000,
      timer: null
    }
  },

  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },

  mounted () {
    this.createTime()
  },

  methods: {
    afterEnter () {
      this.height = this.$el.offsetHeight
    },

    createTime () {
      this.timer = setTimeout(() => {
        this.isShow = false
      }, this.autoClose)
    },

    clearTime () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    }
  }
}

export default component
