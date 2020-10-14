<template>
  <div class="mysterious-box-cover">
    <div class="mysterious-rule" @click="displayRule" ></div>
    <div class="un-open-box" v-if="!openedBox"></div>
    <div class="opend-box" v-else></div>
    <div class="box-count-tips">
      <div class="arrow arrow-left"></div>
      <div class="box-count">共{{boxCount}}个待开启宝箱</div>
      <div class="arrow arrow-right"></div>
    </div>
    <div class="immediate-open-unable" v-if="boxCount <= 0" @click="showLackOpportunity"></div>
    <div class="immediate-open-able" v-else @click="openBox"></div>
    <div class="open-box-tips">
      <div>开宝箱获得的未领取奖品，</div>
      <div>请前往【我的奖品】页面进行领取/使用</div>
    </div>
    <!-- 秘籍 -->
    <rule v-if="showRule" @confirm="hiddenRule" @close="hiddenRule" :rule="shakerRule" :ruleTitle='ruletitle'></rule>
    <!-- 话费充值弹框 -->
    <recharge-phone v-if="showRechargePhone" @confirm="handleInputPhoneNumber" @close="handleCloseRechargePhone">
    </recharge-phone>
    <!-- 收货地址弹框 -->
    <receive-address-dialog v-if="showReceiveAddressDialog" @confirm="handleInputAddress"
      @close="handleCloseAddressDialog">
    </receive-address-dialog>
  </div>
</template>

<script>
import dialogBackToHomePng from "@/assets/images/mysterious/back-to-home.png";
import awardNoPng from "@/assets/award-no.png";
// import awardPhoneFeePng from "@/assets/award-phone-fee.png";
import awardPointPng from "@/assets/award-point.png";
// import awardRedPacketPng from "@/assets/award-red-packet.png";
import awardBtnImmediateReceivePng from "@/assets/immdiate-receive.png";
import dialogKnowPng from "@/assets/dialog-btn-know.png";
import RechargePhone from "@/components/rechargePhone.vue";
import ReceiveAddressDialog from "@/components/receiveAddressDialog.vue";
import rule from "@/components/rule";
import API from '@/api/Api'
import CommonUtil from '@/utils/common'
import StorageUtil from '@/utils/storage'

/**
 * 神秘宝箱——打开宝箱
 */
export default {
  name: "OpenBox",
  inject: ['hiddenShareMenu'],
  components: {
    rule,
    RechargePhone,
    ReceiveAddressDialog,
  },
  data() {
    return {
      openedBox: false,
      showRule: false,
      boxCount: 0,
      showRechargePhone: false,
      showReceiveAddressDialog: false,
      shakerRule: "",
      ruletitle:'开箱秘籍',
      openBoxResponseData: {},
      opening: false,
      // 获奖弹窗配置
      awardDialogConfig: {
        // 实物
        goods: {
          header: "恭喜您，获得",
          img: '',
          name: "",
          buttonImg: awardBtnImmediateReceivePng,
          tips: "填写收货地址即可领取成功",
          onConfirm: this.showObtainDialog,
          onClose: this.closeObtainDialog
        },
        // 红包
        redPacket: {
          header: "恭喜您，获得",
          img: '',
          name: "",
          buttonImg: awardBtnImmediateReceivePng,
          onConfirm: this.receiveAward,
          onClose: this.closeObtainDialog
        },
        // 话费
        phoneFee: {
          header: "恭喜您，获得",
          img: '',
          name: "",
          buttonImg: awardBtnImmediateReceivePng,
          onConfirm: this.showObtainFeeDialog,
          onClose: this.closeObtainDialog
        },
        // 积分
        point: {
          header: "恭喜您，获得",
          img: awardPointPng,
          name: "",
          buttonImg: awardBtnImmediateReceivePng,
          onConfirm: this.receiveAward,
          onClose: this.closeObtainDialog
        },
        // 未中奖
        noAward: {
          header: "很遗憾，未中奖",
          img: awardNoPng,
          name: "谢谢参与",
          buttonImg: dialogKnowPng, 
          onConfirm: this.receiveAward,
        },
      },
      dialogConfig: {
        // 弹窗——机会不足
        lackOpportunity: {
          header: "温馨提示",
          title: "您暂无待开启的宝箱",
          description: "参与大富翁活动<br/>有机会获得神秘洞窟寻宝机会哦",
          buttonImg: dialogBackToHomePng,
          onConfirm: this.navigateToHomePage,
        },
        // 弹窗——活动结束
        finishActivity: {
          header: "温馨提示",
          title: "很遗憾，活动已结束",
          buttonImg: dialogBackToHomePng,
          onConfirm: this.navigateToHomePage,
        },
        // 领取零钱成功
        obtainMoneySuccess: {
          header: "温馨提示",
          title: "领取成功",
          description: "请留意微信零钱到账通知",
          icon: "success",
          buttonImg: dialogKnowPng,
        },
        // 领取话费成功
        obtainPhoneFeeSuccess: {
          header: "温馨提示",
          title: "话费充值成功",
          description: "具体到账时间请留意运营商<br/>短信通知",
          icon: "success",
          buttonImg: dialogKnowPng,
        },
        // 领取邮寄物品成功
        obtainGiftSuccess: {
          header: "温馨提示",
          title: "领取成功",
          description: "活动结束后统一邮寄<br/>请耐心等待哦",
          icon: "success",
          buttonImg: dialogKnowPng,
        },
        // 领取积分成功
        obtainPointSuccess: {
          header: "温馨提示",
          title: "领取成功",
          description: "可在积分商城-积分记录中查询",
          icon: "success",
          buttonImg: dialogKnowPng,
        },
      },
    };
  },
  computed: {},
  beforeRouteLeave(to, from, next) {
    this.$boxAwardDialog.hidden();
    this.$boxDialog.hidden();
    next();
  },
  async mounted() {
    document.title = "神秘洞窟宝箱";
    // 隐藏分享按钮
    this.hiddenShareMenu()
    // this.showRechargePhone = true
    // this.showReceiveAddressDialog = true;
    // this.$boxAwardDialog.show(this.awardDialogConfig.redPacket)
    // this.$boxDialog.show(this.dialogConfig.lackOpportunity)
    // this.$boxDialog.show(this.dialogConfig.obtainPhoneFeeSuccess)
    try {
      // 查询可开宝箱个数
      let unOpenBoxResponse = await API.unPlayGame();
      this.$logger.debug('查询可开宝箱个数返回结果', unOpenBoxResponse)
      if (CommonUtil.isNotNull(unOpenBoxResponse.data)) {
        this.boxCount = unOpenBoxResponse.data.treasureNum
      }
    } catch(e) {
      this.$logger.error(e)
    }
  },
  methods: {
    showLackOpportunity() {
      this.$boxDialog.show(this.dialogConfig.lackOpportunity);
    },
    // 开宝箱
    async openBox() {
      if (this.opening) {
        return
      }
      this.opening = true
      this.boxCount--;
      this.openedBox = true;
      try {
        // 开宝箱
        let barData = StorageUtil.getBarData()
        let openBoxParams = {
          province:barData.province,
          city:barData.city,
          type: 'mystery'
        }
        let openBoxResponse = await API.doDrawLottery(openBoxParams)
        this.$logger.debug('宝箱开启结果', openBoxResponse)
        if (openBoxResponse.code == '2005') {
          this.opening = false
          this.$boxAwardDialog.show(this.awardDialogConfig.noAward);
          return
        }
        if (openBoxResponse.code == '200') {
          this.openBoxResponseData = openBoxResponse.data
          let prizeType = openBoxResponse.data.prizeType
          switch(prizeType) {
            // 红包
            case 1314: 
              this.awardDialogConfig.redPacket.img = openBoxResponse.data.logoUrl;
              this.awardDialogConfig.redPacket.name = openBoxResponse.data.prizeName;
              this.$boxAwardDialog.show(this.awardDialogConfig.redPacket);
              break;
            // 积分/礼券/成长值
            case 1302: 
            case 1322: 
            case 1317:
              this.awardDialogConfig.point.img = openBoxResponse.data.logoUrl;
              this.awardDialogConfig.point.name = openBoxResponse.data.prizeName;
              this.$boxAwardDialog.show(this.awardDialogConfig.point);
              break;
            // 话费
            case 130301: 
              this.awardDialogConfig.phoneFee.img = openBoxResponse.data.logoUrl;
              this.awardDialogConfig.phoneFee.name = openBoxResponse.data.prizeName;
              this.$boxAwardDialog.show(this.awardDialogConfig.phoneFee);
              break;
            // 实物
            case 1301: 
              this.awardDialogConfig.goods.img = openBoxResponse.data.logoUrl;
              this.awardDialogConfig.goods.name = openBoxResponse.data.prizeName;
              this.$boxAwardDialog.show(this.awardDialogConfig.goods);
              break;
            // 谢谢参与
            case 4000: 
              this.awardDialogConfig.noAward.img = openBoxResponse.data.logoUrl;
              this.awardDialogConfig.noAward.name = openBoxResponse.data.prizeName;
              this.$boxAwardDialog.show(this.awardDialogConfig.noAward);
              break;
          }
        }
        this.opening = false
      } catch (e) {
        this.opening = false
        this.$logger.error("宝箱开启失败", e);
        this.$alert.show('宝箱开启失败');
      }
    },
    closeObtainDialog () {
      this.openedBox = false
    },
    // 显示领取话费
    showObtainFeeDialog () {
      this.$boxAwardDialog.hidden()
      this.showRechargePhone = true
    },
    // 显示领取实物弹框
    showObtainDialog () {
      this.$boxAwardDialog.hidden()
      // 1301 自营实物
      // 1301 京东  /jilin/jilin-ucenter/trophy.html
      if (this.openBoxResponseData.prizeType === 1301 && this.openBoxResponseData.win == 1) {
        window.location.href = window.th.trophy
      } else if (this.openBoxResponseData.prizeType === 1301) {
        this.showReceiveAddressDialog = true
      }
    },
    // 显示秘籍
    async displayRule() {
      this.showRule = true;
      // TODO 活动规则从后台活动中的规则文案中获取。
      let params = {
          type: 'mystery'
      }
      const shakerRuleResponse = await API.getShakerRule(params);
      this.shakerRule = shakerRuleResponse.data.content;
    },
    // 隐藏秘籍
    hiddenRule() {
      this.showRule = false;
    },
    receiveAward() {
      let _this = this;
      return new Promise((resolve) => {
        _this.openedBox = false;
        resolve();
      });
    },
    navigateToHomePage() {
      this.$router.push({
        path: '/home',
        params: {
          hiddenBoy: true
        }
      });
    },
    // 处理话费充值
    async handleInputPhoneNumber(phoneNumber) {
      this.$logger.debug(phoneNumber);
      try {
        let params = {
          phone: phoneNumber,
          winId: this.openBoxResponseData.winId
        }
        let response = await API.useCalls(params)
        this.$alert.show(response.msg || response.data.msg)
        this.$logger.debug(response)
        if (response.code === 200) {
          this.handleCloseRechargePhone()
          return
        }
      } catch (e) {
        this.$logger.error('充值话费失败', e)
        this.$alert.show('充值话费失败')
      }
    },
    handleCloseRechargePhone() {
      this.openedBox = false
      this.showRechargePhone = false;
      this.$logger.debug("关闭话费充值弹框");
    },
    // 处理保存收获地址
    async handleInputAddress(receiveAddressData) {
      this.$logger.debug(receiveAddressData);
      try {
        let params = {
          winId: this.openBoxResponseData.winId,
          contacts: receiveAddressData.name,
          province: receiveAddressData.provinceName,
          city: receiveAddressData.cityName,
          area: receiveAddressData.countyName,
          county: '',
          address: receiveAddressData.address,
          phone: receiveAddressData.phoneNumber
        }
        let response = await API.saveReceiveAddress(params)
        this.$logger.debug(response, 3000)
        if (response.status === 200 && response.data.code !== 200) {
          this.$alert.show(response.data.msg)
          return
        } else {
          this.$alert.show(response.msg)
          this.handleCloseAddressDialog()
        }
      } catch (e) {
        this.$logger.error('保存收获地址失败', e)
        this.$alert.show('保存收获地址失败')
      }
    },
    handleCloseAddressDialog() {
      this.openedBox = false
      this.showReceiveAddressDialog = false;
      this.$logger.debug("关闭收货地址填写弹框");
    },
  },
};
</script>

<style lang="scss" scoped>
$home-img-width: 750;
$home-img-height: 1206;
@function heightToImg($px) {
  @return calc(100vh / #{$home-img-height} * #{$px});
}
@function widthToImg($px) {
  @return calc(100vw / #{$home-img-width} * #{$px});
}
@function pxToImg($px) {
  @return calc(100vmin / #{$home-img-width} * #{$px});
}
.mysterious-box-cover {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/images/mysterious/bg-mysterious-box-2.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .mysterious-rule {
    background-image: url("../assets/images/mysterious/rule.png");
    width: widthToImg(131);
    height: heightToImg(112);
    background-size: 100% 100%;
    position: fixed;
    top: heightToImg(327);
    right: widthToImg(23);
  }
  .un-open-box,
  .opend-box {
    width: widthToImg(583);
    height: heightToImg(578);
    background-size: 100% 100%;
    position: fixed;
    top: heightToImg(375);
    left: widthToImg(40);
  }
  .un-open-box {
    background-image: url("../assets/images/mysterious/un-open-box.png");
  }
  .opend-box {
    background-image: url("../assets/images/mysterious/opend.png");
  }
  .immediate-open-unable,
  .immediate-open-able {
    width: widthToImg(264);
    height: heightToImg(102);
    background-size: 100% 100%;
    position: fixed;
    top: heightToImg(966);
    left: widthToImg(238);
  }
  .immediate-open-unable {
    background-image: url("../assets/images/mysterious/immediate-open-1.png");
  }
  .immediate-open-able {
    background-image: url("../assets/images/mysterious/immediate-open-2.png");
    width: widthToImg(264);
    height: heightToImg(102);
    background-size: 100% 100%;
    position: fixed;
    top: heightToImg(966);
    left: widthToImg(238);
  }
  .box-count-tips {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: heightToImg(903);
    width: 100vw;
    .arrow {
      width: widthToImg(119);
      height: heightToImg(44);
      background-size: 100% 100%;
    }
    .arrow-left {
      margin-right: 4px;
      background-image: url("../assets/images/mysterious/arrow-left.png");
    }
    .box-count {
      color: rgb(251, 241, 205);
      font-size: pxToImg(30);
    }
    .arrow-right {
      background-image: url("../assets/images/mysterious/arrow-right.png");
    }
  }
  .open-box-tips {
    color: rgb(199, 106, 36);
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    top: heightToImg(1115);
    font-size: pxToImg(24);
  }
}
</style>