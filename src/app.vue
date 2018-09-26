<template>
  <div>
    this is app.
    <button @click="notify">notify</button>
    <!-- <Notification content="this is notification"/> -->
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {}
  },

  methods: {
    notify() {
      this.$notify({
        content: 'this is notify from service',
        btn: '关闭'
      })
    }
  }
}
</script>

<style lang="less" scoped></style>

