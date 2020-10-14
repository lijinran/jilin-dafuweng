<template>
  <div id="app">
    <router-view />
    <!-- 提示框 -->
    <alert ref="alert"></alert>
    <!-- 掷色子弹窗对话框 -->
    <Dialog ref="shakerDialog" type="shaker-dialog"></Dialog>
    <!-- 神秘洞窟弹窗对话框 -->
    <Dialog ref="boxDialog" type="box-dialog"></Dialog>
    <!-- 掷色子获奖弹窗 -->
    <AwardDialog ref="shakerAwardDialog" type="shaker-dialog"></AwardDialog>
    <!-- 神秘洞窟获奖弹窗 -->
    <AwardDialog ref="BoxAwardDialog" type="box-dialog"></AwardDialog>
  </div>
</template>

<script>
import Vue from "vue";
import alert from "@/components/alert";
import Dialog from "@/components/dialog";
import AwardDialog from "@/components/awardDialog";
export default {
  name: "APP",
  components: {
    alert,
    Dialog,
    AwardDialog,
  },
  provide () {
    return {
      showShareMenu: this.showShareMenu,
      hiddenShareMenu: this.hiddenShareMenu
    }
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  mounted() {
    if (!this.isWeiXinNavigator()) {
      window.location.href = window.th.noscan;
    }
    Vue.prototype.$alert = this.$refs.alert;
    Vue.prototype.$shakerDialog = this.$refs.shakerDialog;
    Vue.prototype.$boxDialog = this.$refs.boxDialog;
    Vue.prototype.$shakerAwardDialog = this.$refs.shakerAwardDialog;
    Vue.prototype.$boxAwardDialog = this.$refs.BoxAwardDialog;
  },
  methods: {
    isWeiXinNavigator() {
      let ua = navigator.userAgent.toLowerCase();
      return ua.match(/MicroMessenger/i) == "micromessenger";
    },
    // 显示分享按钮
    showShareMenu() {
      console.log('显示分享按钮')
      this.$wx.showMenuItems({
        menuList: [
          'menuItem:share:timeline', // 分享到朋友圈
          'menuItem:share:appMessage' // 分享给朋友
        ],
        success: function (res) {
          console.log('显示分享按钮成功！', res)
        },
        fail: function (res) {
          console.log('显示分享按钮失败！', res)
        }
      })
    },
    // 隐藏分享按钮
    hiddenShareMenu() {
      console.log('隐藏分享按钮')
      this.$wx.hideMenuItems({
        menuList: [
          'menuItem:share:timeline', // 分享到朋友圈
          'menuItem:share:appMessage'// 分享给朋友
        ],
        success: function (res) {
          console.log('隐藏分享按钮成功！', res)
        },
        fail: function (res) {
          console.log('隐藏分享按钮失败！', res)
        }
      })
    }
  },
};
</script>

<style>
html,
body,
div {
  margin: 0px;
  padding: 0px;
}
</style>
