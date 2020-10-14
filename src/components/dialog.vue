<template>
  <div class="dialog-mask" v-if="showDialog" @click="handleCLose">
    <div class="dialog-cover" :class="[type, `dialog-${icon}`]" @click.stop="">
      <div class="dialog-header">{{header}}</div>
      <div class="dialog-body dialog-content" v-if="content" v-html="content"></div>
      <div class="dialog-body" v-else>
        <img class="dialog-icon" src="@/assets/images/mysterious/obtain-success.png" alt="">
        <div class="dialog-title" v-if="title" v-html="title"></div>
        <div class="dialog-description" v-if="description" v-html="description"></div>
      </div>
      <div class="dialog-footer">
        <img class="dialog-footer-btn" :src="buttonImg" @click="handleConfirm">
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 对话框
 */
export default {
  name: 'Dialog',
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
      icon: '',
      content: '',
      title: '',
      description: '',
      buttonImg: '',
      // 对话框关闭的回调函数
      onClose: null,
      // 对话框点击确认按钮的回调函数
      onConfirm: null,
      // 对话框数据重置的回调函数
      onReset: null,
      vm: null,
      closeable: true
    }
  },
  methods: {
    // 处理对话框关闭事件、调用传入的对话框关闭回调函数
    async handleCLose () {
      if (this.closeable != undefined && !this.closeable) {
        return
      }
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
      this.icon = ''
      this.content = ''
      this.title = ''
      this.description = ''
      this.buttonImg = ''
      this.onClose = null
      this.onConfirm = null
      this.vm = null
      this.handleReset()
      this.onReset = null
      this.closeable = true
    },
    // 根据传入的配置显示对话框
    show (options) {
      this.showDialog = true
      this.header = options.header
      this.content = options.content
      this.title = options.title
      this.description = options.description
      this.buttonImg = options.buttonImg
      this.header = options.header
      this.icon = options.icon
      this.onClose = options.onClose
      this.onConfirm = options.onConfirm
      this.onReset = options.onReset
      this.vm = options.vm
      this.closeable = options.closeable
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
      background-image: url('../assets/dialog-bg.png') !important;
    }
    // 神秘洞窟弹框
    .box-dialog {
      width: flexWidth(500) !important;
      height: flexHeight(496) !important;
      left: flexWidth(124) !important;
      background-image: url('../assets/images/mysterious/dialog-award-bg.png') !important;
    }
    // 领取成功弹框
    .dialog-success {
      width: flexWidth(500) !important;
      height: flexHeight(496) !important;
      left: flexWidth(124) !important;
      background-image: url('../assets/images/mysterious/dialog-award-bg-1.png') !important;
      .dialog-body {
        height: flexHeight(265) !important;
        .dialog-icon {
          width: flexWidth(80);
          height: flexHeight(80);
          display: inline-block !important;
        }
        .dialog-title {
          font-size: pxToImg(32) !important;
          font-weight: normal !important;
          padding-top: flexHeight(10) !important;
        }
      }
    }
    .dialog-cover {
      width: flexWidth(519);
      height: flexHeight(460);
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
        height: flexHeight(230);
        text-align: center;
        display: flex !important;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .dialog-icon {
          display: none;
        }
        .dialog-title {
          width: 100%;
          height: flexHeight(65);
          line-height: flexHeight(65);
          padding-top: flexHeight(30);
          padding-bottom: flexHeight(10);
          text-align: center;
          font-size: pxToImg(36);
          font-weight: 600;
          color: rgb(253, 60, 61);
        }
        .dialog-description {
          font-size: pxToImg(28);
          font-weight: 500;
          line-height: flexHeight(40);
        }
      }
      .dialog-content {
        font-size: pxToImg(32);
        font-weight: 500;
        color: rgb(252, 61, 60);
        line-height: flexHeight(60);
        padding: 0px flexWidth(35);
        vertical-align: middle;
        display: table-cell;
      }
      .dialog-footer {
        width: 100%;
        height: flexHeight(135);
        text-align: center;
        text-align: center;
        .dialog-footer-btn {
          width: flexWidth(264);
          height: flexHeight(102);
          // background-image: url('../assets/dialog-btn-know.png');
          background-size: 100% 100%;
          margin: auto;
        }
      }
    }
  }
</style>