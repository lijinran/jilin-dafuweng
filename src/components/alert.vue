<template>
  <div class="alert-mask" v-show="showAlert" @click="closeAlert">
    <div class="alert-cover" :style="alertCoverStyle">{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  data() {
    return {
      showAlert: false,
      message: '',
      config: {}
    }
  },
  computed: {
    alertCoverStyle () {
      let styleObj = {}
      Object.entries(this.config).forEach(item => {
        styleObj[`${item[0]}`] = `${item[1]}`
      })
      return styleObj
    }
  },
  methods: {
    show (message, duration = 2000, config = {}) {
      this.message = message
      this.config = config
      this.showAlert = true
      let _this = this
      setTimeout(function(){
        _this.showAlert = false
        _this.message = ''
      }, duration)
    },
    closeAlert () {
      if (this.config.closeable) {
        this.showAlert = false
      }
    },
    // 隐藏
    hidden () {
      this.showAlert = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .alert-mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    .alert-cover {
      background: rgba(0, 0, 0, 0.8);
      padding: flexWidth(45);
      font-size: pxToImg(36);
      font-weight: 400;
      color: #FFFFFF;
      line-height: flexHeight(45);
      position: fixed;
      left: 50%;
      top: flexHeight(330);
      transform: translateX(-50%);
      border-radius: 10px;
      text-align: center;
    }
  }
</style>