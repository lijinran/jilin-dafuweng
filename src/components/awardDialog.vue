<template>
  <div class="dialog-mask" v-if="showDialog" @click="handleCLose">
    <div class="dialog-cover" :class="type" @click.stop="">
      <div class="dialog-header">{{header}}</div>
      <div class="dialog-body">
        <div class="award-img">
          <img :src="img">
        </div>
        <div class="award-name">{{name}}</div>
      </div>
      <div class="dialog-footer">
        <img class="dialog-footer-btn" :src="buttonImg" @click="handleConfirm">
        <div class="tips">{{tips}}</div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 获奖弹窗
 */
export default {
  name: 'ShakerAwardDialog',
  props: {
    type: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      showDialog: false,
      header: '',
      img: '',
      name: '',
      buttonImg: '',
      tips: '',
      // 对话框关闭的回调函数
      onClose: null,
      // 对话框点击确认按钮的回调函数
      onConfirm: null,
      // 对话框数据重置的回调函数
      onReset: null,
      vm: null
    }
  },
  methods: {
    // 处理对话框关闭事件、调用传入的对话框关闭回调函数
    async handleCLose () {
      this.showDialog = false
      if (typeof this.onClose === 'function' && this.vm != null) {
        await this.onClose.apply(this.vm)
      } else if (typeof this.onClose === 'function') {
        await this.onClose()
      }
      this.resetDialog()
    },
    // 处理对话框确认事件、调用传入的对话框确认回调函数
    async handleConfirm () {
      this.showDialog = false
      if (typeof this.onConfirm === 'function' && this.vm != null) {
        await this.onConfirm.apply(this.vm)
      } else if (typeof this.onConfirm === 'function') {
        await this.onConfirm()
      }
      this.resetDialog()
    },
    // 调用传入的对话框数据重置回调函数
    handleReset () {
      if (typeof this.onReset === 'function' && this.vm != null) {
        this.onReset.apply(this.vm)
      } else if (typeof this.onReset === 'function') {
        this.onReset()
      }
    },
    // 重置对话框数据
    resetDialog () {
      this.showDialog = false
      this.header = ''
      this.img = ''
      this.name = ''
      this.tips = ''
      this.buttonImg = ''
      this.onClose = null
      this.onConfirm = null
      this.vm = null
      this.handleReset()
      this.onReset = null
    },
    // 根据传入的配置显示对话框
    show (options) {
      this.showDialog = true
      this.header = options.header
      this.img = options.img
      this.name = options.name
      this.buttonImg = options.buttonImg
      this.tips = options.tips
      this.header = options.header
      this.onClose = options.onClose
      this.onConfirm = options.onConfirm
      this.onReset = options.onReset
      this.vm = options.vm
    },
    // 隐藏对话框
    hidden () {
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog-mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba(black, 0.5);
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 99999;
    .shaker-dialog {
      background-image: url('../assets/dialog-award-bg.png') !important;
    }
    .box-dialog {
      width: flexWidth(500) !important;
      height: flexHeight(575) !important;
      left: flexWidth(124) !important;
      background-image: url('../assets/images/mysterious/dialog-award-bg.png') !important;
      .dialog-header {
        margin-top: flexHeight(50) !important;
      }
    }
    .dialog-cover {
      width: flexWidth(519);
      height: flexHeight(540);
      background-size: 100% 100%;
      position: fixed;
      top: flexHeight(260);
      left: flexWidth(114);
      .dialog-header {
        width: 100%;
        height: flexHeight(60);
        line-height: flexHeight(60);
        margin-top: flexHeight(35);
        text-align: center;
        font-size: pxToImg(36);
        font-weight: 600;
        color: #000000;
      }
      .dialog-body {
        height: flexHeight(285);
        text-align: center;
        display: flex !important;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .award-img {
          margin-top: flexHeight(10);
          img {
            width: flexWidth(151);
          }
        }
        .award-name {
          font-size: pxToImg(26);
          font-weight: 500;
          color: rgb(253, 60, 61);
          margin-top: flexHeight(10);
        }
      }
      .dialog-footer {
        width: 100%;
        height: flexHeight(160);
        text-align: center;
        text-align: center;
        .dialog-footer-btn {
          width: flexWidth(264);
          height: flexHeight(102);
          background-size: 100% 100%;
          margin: auto;
        }
        .tips {
          font-size: pxToImg(24);
        }
      }
    }
  }
</style>