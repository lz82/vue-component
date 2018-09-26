<!-- notification基础组件 -->
<!-- 仅有最基础功能，便于扩展 -->
<template>
  <transition
    name="fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div
      v-show="isShow"
      :style="style"
      class="notification"
      @mouseenter="clearTime"
      @mouseleave="createTime"
    >
      <span class="content">{{ content }}</span>
      <a
        class="btn close"
        @click="onCloseClick">{{ btn }}</a>
    </div>
  </transition>
</template>

<script type="text/javascript">
export default {
  name: 'Notification',

  props: {
    content: {
      type: String,
      required: true
    },

    btn: {
      type: String,
      default: 'close'
    }
  },

  data() {
    return {
      // 默认不显示，用于触发transition动画，如果初始值就是true,并不会触发transition的动画
      isShow: false
    }
  },

  computed: {
    // 由扩展组件传入，这里只做占位
    style () {
      return {}
    }
  },

  methods: {
    onCloseClick () {
      this.$emit('close')
    },

    afterLeave () {
      // https://cn.vuejs.org/v2/guide/transitions.html
      // transitions的状态变化钩子函数
      // 认为当触发after-leave时，transition的动画也结束了，可以安全的把组件销毁
      this.$emit('closed')
    },

    // 以下几个方法在扩展中具体实现
    afterEnter () {},

    clearTime () {
      // 光标移到组件上时，清除计时
    },

    createTime () {
      // 光标从组件上移开时，重新计时
    }
  }
}
</script>

<style lang="less" scoped>
.notification {
  display: inline-flex;
  background-color: #303030;
  color: rgba(255, 255, 255, 1);
  align-items: center;
  padding: 20px;
  min-width: 280px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  flex-wrap: wrap;
  transition: all .3s;
  .content {
    padding: 0;
  }

  .btn {
    color: #ff4081;
    padding-left: 24px;
    margin-left: auto;
    cursor: pointer;
  }
}
</style>
