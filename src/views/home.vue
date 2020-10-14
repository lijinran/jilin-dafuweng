<template>
  <div class="home">
    <div class="game-name"></div>
    <div class="btn-rule" @click="displayRule"></div>
    <div class="pigeon"></div>
    <div class="my-prizes" @click="navigateToAward"></div>
    <div class="boy" ref="boy">
      <div v-if="!flag.boyMoving">
        <div class="boy-tips boy-left-tips" v-if="showLeftTips">{{boy.currentTip}}</div>
        <div class="boy-tips boy-right-tips" v-else>{{boy.currentTip}}</div>
      </div>
    </div>
    <div class="btn-rank" @click="navigateToRankBoard"></div>
    <div class="chance-container">
      <div class="chance">
        还有
        <span class="chance-count">{{boy.count}}</span>
        次机会
      </div>

      <div class="delay">
        <span v-if="etimes > 0">{{`${delayTimeText}后` }}</span>可摇骰子
      </div>
    </div>
    <template>
      <div class="before-shaker" v-if="flag.chromons.beforeShaker" @click="startShaker"></div>
      <div class="shaking" v-if="flag.chromons.shaking"></div>
      <div class="success" v-if="flag.chromons.success"
        :style="{backgroundImage: 'url(' + coverImgUrl + ')', backgroundSize:'contain'}"></div>
      <div class="after-shaker" v-if="flag.chromons.afterShaker"></div>
    </template>
    <div class="click-tips"></div>
    <div class="btn-mysterious-box" @click="navigateToMysteriousBox"></div>
    <rule v-if="flag.showRule" @confirm="hiddenRule" @close="hiddenRule" :rule="shakerRule" :ruleTitle='ruletitle'></rule>
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
import dialogKnowPng from "@/assets/dialog-btn-know.png";
import dialogBackPng from "@/assets/dialog-btn-back.png";
import dialogStartPng from "@/assets/dialog-btn-start.png";
import awardNoPng from "@/assets/award-no.png";
// import awardPhoneFeePng from "@/assets/award-phone-fee.png";
import awardPointPng from "@/assets/award-point.png";
// import awardRedPacketPng from "@/assets/award-red-packet.png";
import awardBtnImmediateReceivePng from "@/assets/immdiate-receive.png";
import chromons1 from "@/assets/chromons1.png";
import chromons2 from "@/assets/chromons2.png";
import chromons3 from "@/assets/chromons3.png";
import chromons4 from "@/assets/chromons4.png";
import chromons5 from "@/assets/chromons5.png";
import chromons6 from "@/assets/chromons6.png";
import RechargePhone from "@/components/rechargePhone.vue";
import ReceiveAddressDialog from "@/components/receiveAddressDialog.vue";
import StorageUtil from "@/utils/storage";
import rule from "@/components/rule";
import API from "@/api/Api";
import CommonUtil from '@/utils/common'
import {mapGetters} from 'vuex'
import shareImg from "@/assets/shareImg.jpg";

export default {
  name: "Home",
  components: {
    rule,
    RechargePhone,
    ReceiveAddressDialog,
  },
  inject: ['showShareMenu'],
  data: function () {
    return {
      openBoxTimoutId: null,
      // 标志
      flag: {
        // 掷色子
        chromons: {
          beforeShaker: true,
          shaking: false,
          afterShaker: false,
          success: false,
        },
        // 弹窗
        showDialog: false,
        showRule: false,
        boyMoving: false,
        disableShaker: false
      },
      showRechargePhone: false,
      showReceiveAddressDialog: false,
      LotteryResponseData: {},
      etimes: 0,
      timeObj: {
        m: 0,
        s: 0
      },
      timeObjIntervalId: null,
      // 人参娃娃相关数据
      boy: {
        count: 0,
        index: null,
        forward2: [4, 14],
        forward3: [22],
        back2: [7, 19],
        toStartPoint: [10],
        homeImgWidth: 750,
        homeImgHeight: 1206,
        currentTip: "",
        tipList: [
          "欢迎参与大富翁活动",
          "每天赠送1次掷骰子机会哦",
          "每日分享1次可获得掷骰子机会哦",
          "每日前50包首验可获得掷骰子机会哦",
          "跳动到指定格子可能会前进或后退哦",
          "跳动到数字格子可抽取缤纷好礼哦",
          "人参娃娃达到终点就要重新开始哦",
          "到达终点就有机会进入排行榜哦",
          "参与神秘洞窟寻宝后记得去开宝箱哦",
        ],
        position: [
          {
            left: 0,
            top: 700,
          },
          {
            left: 90,
            top: 700,
          },
          {
            left: 185,
            top: 700,
          },
          {
            left: 280,
            top: 700,
          },
          {
            left: 375,
            top: 700,
          },
          {
            left: 465,
            top: 700,
          },
          {
            left: 565,
            top: 700,
          },
          {
            left: 545,
            top: 625,
          },
          {
            left: 533,
            top: 560,
          },
          {
            left: 523,
            top: 490,
          },
          {
            left: 435,
            top: 490,
          },
          {
            left: 360,
            top: 490,
          },
          {
            left: 275,
            top: 490,
          },
          {
            left: 200,
            top: 490,
          },
          {
            left: 115,
            top: 490,
          },
          {
            left: 35,
            top: 490,
          },
          {
            left: 50,
            top: 425,
          },
          {
            left: 58,
            top: 378,
          },
          {
            left: 68,
            top: 328,
          },
          {
            left: 138,
            top: 328,
          },
          {
            left: 208,
            top: 328,
          },
          {
            left: 278,
            top: 328,
          },
          {
            left: 348,
            top: 328,
          },
          {
            left: 420,
            top: 328,
          },
          {
            left: 490,
            top: 328,
          },
        ],
      },
      alertDialogConfig: {
        "min-width": "190px",
      },
      dialogConfig: {
        // 弹窗——活动未开启
        notTime: {
          header: "温馨提示",
          title: "活动未开启",
          content: '<span style="color:#fd3c3d;">敬请期待</span>',
          buttonImg: dialogKnowPng,
        },
        // 弹窗——活动未开始
        beforeStartActivity: {
          header: "温馨提示",
          title: "活动未开始",
          description:
            '将于<span style="color:#fd3c3d;"></span>开启<br/>敬请期待',
          buttonImg: dialogKnowPng,
        },
        // 弹窗——活动结束
        finishActivity: {
          header: "温馨提示",
          title: "活动已结束",
          description:
            '未领取的奖品和未开启的宝箱<br/>将保留到<span style="color:#fd3c3d;"></span><br/>过期失效，请尽快领取哦',
          buttonImg: dialogKnowPng,
        },
        // 弹窗——到达终点
        endActivity: {
          header: "恭喜您",
          title: "成功到达终点",
          description: "到达终点次数越多排名越高<br/>继续加油哦",
          buttonImg: dialogBackPng,
          onConfirm: this.moveToStart,
          onClose: this.moveToStart,
        },
        // 弹窗——参与次数已达上限
        overLimit: {
          header: "温馨提示",
          content:
            '<span style="color:#fd3c3d;">哎呀，您今天参与次数已达上限<br>明天再来吧</span>',
          buttonImg: dialogKnowPng,
        },
        // 弹窗——机会不足
        lackOpportunity: {
          header: "温馨提示",
          title: "机会不足",
          description:
            '每日分享可得一次机会<br/>完成首验可得<span style="color:#fd3c3d;">1</span>次机会,每日最多<span style="color:#fd3c3d;">50</span>次',
          buttonImg: dialogKnowPng,
        },
        // 弹窗——解锁新活动
        unlockActivity: {
          header: "恭喜您，解锁",
          title: "",
          description: "完成游戏即可抽取缤纷好礼",
          buttonImg: dialogStartPng,
          onConfirm: this.todk,
          closeable: false
        },
        // 弹窗——开宝箱
        toOpenBox: {
          header: "恭喜您，解锁",
          title: "",
          description: "完成游戏即可抽取缤纷好礼",
          buttonImg: dialogStartPng,
          onConfirm: this.toOpenBox,
          closeable: false
        },
        // 弹窗——摇色子过于频繁
        tooFrequently: {
          header: "温馨提示",
          content:
            '<span style="color:#fd3c3d;">哎呀，您摇骰子过于频繁<br/>请30分钟后再来吧!<span>',
          buttonImg: dialogKnowPng,
        },
        // 弹窗——网络异常
        networkError: {
          header: "温馨提示",
          title: "网络异常",
          description: "请刷新页面重新尝试",
          buttonImg: dialogKnowPng,
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
        }
      },
      // 获奖弹窗配置
      awardDialogConfig: {
        goods:{
          header: "恭喜您，获得",
          img: "",
          name: "",
          buttonImg: awardBtnImmediateReceivePng,
          tips: "填写收货地址即可领取成功",
          onConfirm: this.showObtainDialog
        },
        redPacket: {
          header: "恭喜您，获得",
          img: '',
          name: "",
          buttonImg: awardBtnImmediateReceivePng,
          onConfirm: this.receiveAward,
        },
        phoneFee: {
          header: "恭喜您，获得",
          img: '',
          name: "",
          buttonImg: awardBtnImmediateReceivePng,
          onConfirm: this.showObtainFeeDialog
        },
        point: {
          header: "恭喜您，获得",
          img: awardPointPng,
          name: "",
          buttonImg: awardBtnImmediateReceivePng,
        },
        noAward: {
          header: "很遗憾，未中奖",
          img: awardNoPng,
          name: "谢谢参与",
          buttonImg: dialogKnowPng,
        },
      },
      shakerRule: "",
      ruletitle:'活动规则',
      coverImgUrl: chromons1,
    };
  },
  computed: {
    ...mapGetters({
      getLoadingStatus: 'getLoadingStatus'
    }),
    dialogData() {
      return this.beforeStartDialog;
    },
    showLeftTips() {
      return (
        [6, 7, 8, 9, 10, 11, 12, 24, 25, 26].indexOf(this.boy.index) !== -1
      );
    },
    delayHour () {
      return parseInt(this.etimes / 3600)
    },
    delayMinute() {
      return parseInt(this.etimes % 3600 / 60)
    },
    delaySecond() {
      return this.etimes % 60
    },
    delayTimeText () {
      let str = ''
      if (this.delayHour > 0) {
        str += `${this.delayHour}时`
      }
      if (this.delayMinute > 0) {
        str += `${this.delayMinute}分`
      }
      if (this.delaySecond > 0) {
        str += `${this.delaySecond}秒`
      }
      return str
    },
    delayTimeTextShort () {
      let str = ''
      if (this.delayHour > 0) {
        str += `${this.delayHour}小时`
      }
      if (this.delayMinute > 0) {
        str += `${this.delayMinute}分钟`
      }
      return str
    }
  },
  async mounted() {
    document.title = '长白山大富翁'
    // 显示分享按钮
    this.showShareMenu()
    // 微信分享配置
    console.log('before get share config')
    try {
      await this.share();
    } catch (e) {
      console.log('微信分享配置异常:', e)
    }
    console.log('after get share config')
    if (!this.getLoadingStatus) {
      this.$router.push('/loading')
    }
    // 隐藏人参娃娃
    if (CommonUtil.isNotBlank(this.$route.params.hiddenBoy) && this.$route.params.hiddenBoy) {
      this.hiddenBoy()
    }
    try {
      // TODO 调接口查询当前用户当前还有多少次掷色子的机会
      const shakerCountResult = await API.getUserShakerCount();
      this.boy.count = shakerCountResult.data;
      // TODO 调接口查询时间倒计时
      const timeResult = await API.getLimitTime();
      this.$logger.debug('时间倒计时', timeResult)
      if (timeResult.code == 6002) {
        this.etimes = Number(timeResult.msg);
        if (this.timeObjIntervalId != null) {
          clearInterval(this.timeObjIntervalId)
        }
        this.updateDelayTime()
        this.$forceUpdate();
      }

      // if (shakerCountResult.data <= 0) {  //不用弹
      //   this.$shakerDialog.show(this.dialogConfig.lackOpportunity);
      // }

      //TODO 获取当前所在格子数
      const gridNumData = await API.getCurrentGrid();
      if (gridNumData.code == 200) {
        this.moveToSpecificPosition(gridNumData.data);
        this.boy.index = gridNumData.data;
        // 显示人参娃娃
        this.displayBoy()
      }
      if (gridNumData.count == 0) {
        let barData = StorageUtil.getBarData();
        console.log('barData', barData)
        let LotteryParams = {
          province: barData.province,
          city: barData.city,
        };
        const LotteryData = await API.doDrawLottery(LotteryParams);
        await this.displayDrawResult(LotteryData);
      }

      // TODO 如用户获得参与额外活动机会，但未参与，下次进入页面后将弹框提示用户必须参与额外活动。
      const gameData = await API.unPlayGame();
      if (gameData.data && gameData.data.status == "0") {
        this.dialogConfig.unlockActivity.title=gameData.data.actName;
        this.$shakerDialog.show(this.dialogConfig.unlockActivity);
        this.flag.disableShaker = true
      }
      // if (gameData.data.treasureNum > 0) {
      //   this.dialogConfig.toOpenBox.title=gameData.data.actName;
      //   this.$shakerDialog.show(this.dialogConfig.toOpenBox);
      // }
    } catch (e) {
      this.$logger.error("初始化掷色子数据失败", e);
      this.$exception.autoHandler(this, e);
    }

    this.autoUpdateTips();
  },
  destroyed () {
    if (this.openBoxTimoutId != null) {
      clearTimeout(this.openBoxTimoutId)
    }
  },
  methods: {
    // 微信分享
    async share() {
      console.log('share()')
      let _this = this;
      let hosturl = location.origin || location.protocol + "//" + location.hostname;
      console.log('hosturl:', hosturl)
      let wxShareConfigData = {}
      try {
        const requestParams = {
          url: window.location.href.split('#')[0],
          type: "monopoly",
        };
        console.log('requestParams:', requestParams)
        console.log('getShareConfig')
        wxShareConfigData = await API.getShareConfig(requestParams);
        console.log('wxShareConfigData', wxShareConfigData)
        if (CommonUtil.isEmpty(wxShareConfigData)) {
          throw _this.$exception.GET_WX_SHARE_CONFIG_FAIL;
        }
      } catch (e) {
        console.log('获取微信分享配置失败!', e)
      }
      return new Promise(function(resolve, reject){
        try {
          if (wxShareConfigData.code == 200) {
            _this.$wx.config({
              debug: false,
              appId: wxShareConfigData.data.appId || window.th.wappId,
              timestamp: wxShareConfigData.data.timestamp,
              nonceStr: wxShareConfigData.data.nonceStr,
              signature: wxShareConfigData.data.signature,
              jsApiList: [
                "checkJsApi",
                "onMenuShareAppMessage",
                "hideMenuItems",
                "onMenuShareTimeline",
              ],
            });
            _this.$wx.ready(() => {
              console.log('wx.ready()')
              // sessionStorage.removeItem('WX_CONFIG_FLAG')
              _this.$wx.showOptionMenu(); //显示分享按钮
              _this.$wx.onMenuShareAppMessage({
                title: "长白山大富翁-欢喜迎双节，福利不停歇！",
                desc: "喜迎双节，普天同庆，快来参与大富翁活动，缤纷好礼天天送，还有机会获得神秘洞窟寻宝游戏机会哦！",
                link: hosturl + "/jilin/jilin-shaker/home",
                imgUrl: shareImg,
                success: (res) => {
                  console.log(res + "分享成功");
                  _this.add();
                },
                // cancel: res => {}
              });
              _this.$wx.onMenuShareTimeline({
                title: "长白山大富翁-欢喜迎双节，福利不停歇！",
                link: hosturl + "/jilin/jilin-shaker/home",
                desc: "喜迎双节，普天同庆，快来参与大富翁活动，缤纷好礼天天送，还有机会获得神秘洞窟寻宝游戏机会哦！",
                imgUrl: shareImg,
                success: (res) => {
                  console.log(res + "分享成功");
                  _this.add();
                },
                // cancel: res => {}
              });
              _this.$wx.showMenuItems({
                menuList: [
                  "menuItem:share:appMessage",
                  "menuItem:share:timeline",
                ],
              });
              _this.$wx.hideMenuItems({
                menuList: [
                  "menuItem:setFont",
                  "menuItem:share:qq",
                  "menuItem:share:weiboApp",
                  "menuItem:favorite",
                  "menuItem:share:facebook",
                  "menuItem:share:QZone",
                  "menuItem:editTag",
                  "menuItem:delete",
                  "menuItem:copyUrl",
                  "menuItem:readMode",
                  "menuItem:originPage",
                  "menuItem:openWithQQBrowser",
                  "menuItem:openWithSafari",
                  "menuItem:share:email",
                  "menuItem:share:brand",
                ],
              });
              resolve()
            });
            _this.$wx.error(res => {
              let wxConfigFlag = sessionStorage.getItem('WX_CONFIG_FLAG')
              // console.log('wxConfigFlag', wxConfigFlag)
              if (CommonUtil.isBlank(wxConfigFlag)) {
                // setTimeout(function(){
                let newUrl = `${hosturl}${process.env.VUE_APP_ROUTER_BASE}home`
                console.log('newUrl', newUrl)
                window.location.href = newUrl
                // }, 1000)
              }
              sessionStorage.setItem('WX_CONFIG_FLAG', 'CONFIG_ERROR')
              console.log('wx.error()', res)
              reject(res)
            })
          }
        } catch (e) {
          console.log('微信分享失败！', e)
          _this.$logger.error("微信分享失败！", e);
          _this.$exception.autoHandler(_this, e);
          reject(e)
        }
      })
    },
    async add() {
      const addData = await API.addChanceByShare();
      console.log(addData);
      if (addData.code === 200) {
        console.log(500)
        this.$alert.show('分享成功');
        this.reload()
      } else {
        this.$alert.show(addData.msg);
      }
    },
    reload() {
      this.$router.go(0)
    },
    updateDelayTime (){
      let _this = this
      this.timeObjIntervalId = setInterval(function(){
        if (_this.etimes == 0) {
          clearInterval(_this.timeObjIntervalId)
          return
        }
        _this.etimes--
      }, 1000)
    },
    hiddenBoy () {
      this.$refs['boy'].style.display = "none"
    },
    displayBoy () {
      this.$refs['boy'].style.display = "block"
    },
    // 开始掷色子
    async startShaker() {
      // 人参娃娃正在移动
      if (this.flag.boyMoving || this.flag.disableShaker) {
        return;
      }
      this.flag.boyMoving = true;
      try {
        // TODO 活动未开放前点击骰子或其他按钮时弹出提示框，告知活动未开始，及开始时间。
        const gridNumData = await API.getCurrentGrid();
        if (gridNumData.code == 2003) {
          //活动未开始
          this.dialogConfig.beforeStartActivity.description =
            '将于<span style="color:#fd3c3d;">' +
            gridNumData.msg +
            "</span>开启<br/>敬请期待";
          this.$shakerDialog.show(this.dialogConfig.beforeStartActivity);
          this.flag.boyMoving = false
          return false;
        }
        if (gridNumData.code == 2004) {
          //已结束
          this.dialogConfig.finishActivity.description =
            '未领取的奖品和未开启的宝箱<br/>将保留到<span style="color:#fd3c3d;">' +
            gridNumData.msg +
            "</span><br/>过期失效，请尽快领取哦";
          this.$shakerDialog.show(this.dialogConfig.finishActivity);
          this.flag.boyMoving = false
          return false;
        }
        if (gridNumData.code == 2002) {
          //活动暂未开启
          this.$shakerDialog.show(this.dialogConfig.notTime);
          this.flag.boyMoving = false
          return false;
        }

        // TODO 活动已结束用户进入此页面，骰子置灰，不可摇骰子，点击骰子或其他按钮时弹出提示框，告知活动已结束，及领奖截止时间。
        // 掷色子次数已达最大次数
        if (this.boy.count <= 0) {
          this.$shakerDialog.show(this.dialogConfig.lackOpportunity);
          this.flag.boyMoving = false
          return false;
        }
        this.flag.chromons.beforeShaker = false;
        this.flag.chromons.shaking = true;
        this.openBoxTimoutId = setTimeout(async () => {
          try {
            // TODO 调接口查询当前用户所得骰子点数
            // let count = Math.ceil(Math.random() * 10 % 5)
            const rolldiceData = await API.rolldice();
            if (rolldiceData.code == 200) {
              let count = rolldiceData.data;
              this.showImg(rolldiceData.data);
              this.$alert.show(`恭喜您 前进${count}格`);
              this.boy.count--;
              console.log('finishShaker')
              this.finishShaker();
              console.log('doDrawLottery')
              console.log('getBarData')
              let barData = StorageUtil.getBarData();
              console.log('barData', barData)
              let LotteryParams = {
                province: barData.province,
                city: barData.city,
              };
              const LotteryData = await API.doDrawLottery(LotteryParams);
            /**
             * TODO 调接口后台执行抽奖逻辑
             *      判断用户在历史扫码验真记录中是否有首验记录，如无首验则根据无首验活动概率出奖品；
             *      如有首验则根据有首验活动概率进行抽奖，并告知用户是获得奖品还是额外活动。
             */
              console.log('move')
              await this.move(count);
              await this.checkPosition(LotteryData);
              this.flag.boyMoving = false;
            } else if (rolldiceData.code == 6001) {
              this.flag.chromons.shaking = false;
              this.$shakerDialog.show(this.dialogConfig.lackOpportunity);
              this.flag.boyMoving = false
            } else if (rolldiceData.code == 6002) {
              this.etimes = parseInt(rolldiceData.msg)
              if (this.timeObjIntervalId != null) {
                clearInterval(this.timeObjIntervalId)
              }
              this.updateDelayTime()
              this.flag.chromons.shaking = false;
              this.dialogConfig.tooFrequently.content = `<span style="color:#fd3c3d;">哎呀，您摇骰子过于频繁<br/>请${this.delayTimeTextShort}后再来吧!<span>`
              this.$shakerDialog.show(this.dialogConfig.tooFrequently);
              this.flag.chromons.beforeShaker = true;
              this.flag.boyMoving = false
            } else if (rolldiceData.code == 6003) {
              this.flag.chromons.shaking = false;
              this.$shakerDialog.show(this.dialogConfig.overLimit);
              this.flag.chromons.beforeShaker = true;
              this.flag.boyMoving = false
            } else if (rolldiceData.code == 6007) {
              this.flag.chromons.shaking = false;
              this.$alert.show('您还有奖品未领取，请刷新页面领取奖品')
              this.flag.chromons.beforeShaker = true;
              this.flag.boyMoving = false
            } else {
              this.flag.chromons.shaking = false;
              this.$alert.show(rolldiceData.msg, 2000, this.alertDialogConfig);
              this.flag.chromons.beforeShaker = true;
              this.flag.boyMoving = false
            }
          } catch (e) {
            this.$logger.error(e)
            this.flag.chromons.shaking = false;
            this.flag.chromons.beforeShaker = true;
            this.flag.boyMoving = false
          }
        }, 1000);
        /**
           * TODO 每次只玩筛子都得更新当前用户还有多少次掷色子的机会
           */
        const shakerCountResult = await API.getUserShakerCount();
        this.boy.count = shakerCountResult.data;
      } catch (e) {
        this.$logger.error(e)
        this.flag.chromons.shaking = false;
        this.flag.chromons.beforeShaker = true;
        this.flag.boyMoving = false
      }
    },
    // 完成掷色子
    finishShaker() {
      this.flag.chromons.success = true;
      this.flag.chromons.shaking = false;
      this.randomDisplayOneTips();
      setTimeout(() => {
        this.flag.chromons.success = false;
        this.flag.chromons.afterShaker = true;
        this.resetChromonsPosition();
      }, 1000);
    },
    // 重置色子到开始的位置
    resetChromonsPosition() {
      this.flag.chromons.afterShaker = false;
      this.flag.chromons.beforeShaker = true;
    },
    widthToHomeImg(px) {
      return `calc(100vw / ${this.boy.homeImgWidth} * ${px})`;
    },
    heightToHomeImg(px) {
      return `calc(100vh / ${this.boy.homeImgHeight} * ${px})`;
    },
    // 逐个移动指定个数的格子
    async move(count) {
      let flag = count > 0 ? 1 : -1;
      for (let i = 0; i < Math.abs(count); i++) {
        this.boy.index += flag;
        await this.moveTo(this.boy.index);
        if (this.boy.index >= this.boy.position.length) {
          /**
           * TODO 调接口记录到达1次终点
           */
          // const reachData = await API.reach();  不能调用，很危险
          // if (reachData.code == 200) {
          //   console.log("到终点");
          // }
          this.$shakerDialog.show(this.dialogConfig.endActivity);
          return;
        }
      }
      return new Promise((resolve) => {
        resolve();
      });
    },
    // 跳转至开始格子
    moveToStart() {
      this.moveTo(1);
    },
    // 跳转至洞窟
    todk() {
      this.$router.push("/chooseBox");
    },
    toOpenBox() {
      this.$router.push("/openBox");
    },
    // 从当前格子移动到指定格子
    moveTo(index) {
      this.boy.index = index;
      let _this = this;
      return new Promise((resolve) => {
        setTimeout(() => {
          let position = _this.boy.position[index - 1];
          if (position === undefined) {
            return;
          }
          _this.$refs["boy"].style.left = _this.widthToHomeImg(position.left);
          _this.$refs["boy"].style.top = _this.heightToHomeImg(position.top);
          resolve();
        }, 1000);
      });
    },
    /**
     * 移动人参娃娃到指定格子
     * 下标从 1 开始，
     * 例如:移动到第一个格子传入1
     *      移动到第二个格子传入2
     * @params index 格子下标，从 1 开始
     */
    moveToSpecificPosition(index) {
      if (index <= 0 || index > this.boy.position.length) {
        this.$logger.error(
          `人参娃娃指定下标不在当前地图格子范围内，传入下标[${index}]，当前地图格子数:${this.boy.position.length}，人参娃娃跳转到指定格子失败！`
        );
        return;
      }
      let specificPosition = this.boy.position[index - 1];
      this.$refs["boy"].style.left = this.widthToHomeImg(specificPosition.left);
      this.$refs["boy"].style.top = this.heightToHomeImg(specificPosition.top);
    },
    // 检查当前位置是否是规则格子
    async checkPosition(LotteryData) {
      if (this.boy.forward2.indexOf(this.boy.index) !== -1) {
        this.$alert.show("恭喜您 前进2格");
        await this.move(2);
      }
      if (this.boy.forward3.indexOf(this.boy.index) !== -1) {
        this.$alert.show("恭喜您 前进3格");
        await this.move(3);
      }
      if (this.boy.back2.indexOf(this.boy.index) !== -1) {
        this.$alert.show("很遗憾 后退2格");
        await this.move(-2);
      }
      if (this.boy.toStartPoint.indexOf(this.boy.index) !== -1) {
        this.$alert.show("很遗憾 回到起点");
        await this.moveTo(1);
      }
      this.displayDrawResult(LotteryData)
    },
    displayDrawResult(LotteryData) {
      if (this.boy.index !== 1 && this.boy.index < this.boy.position.length) {
        if (LotteryData.code == 200) {
          this.LotteryDataData = LotteryData.data
          this.LotteryResponseData = LotteryData.data
          let prizeType = LotteryData.data.prizeType
          switch(prizeType) {
            // 红包
            case 1314: 
              this.awardDialogConfig.redPacket.img = LotteryData.data.logoUrl;
              this.awardDialogConfig.redPacket.name = LotteryData.data.prizeName;
              this.$boxAwardDialog.show(this.awardDialogConfig.redPacket);
              break;
            // 积分/礼券/成长值
            case 1302: 
            case 1322: 
            case 1317:
              this.awardDialogConfig.point.img = LotteryData.data.logoUrl;
              this.awardDialogConfig.point.name = LotteryData.data.prizeName;
              this.$boxAwardDialog.show(this.awardDialogConfig.point);
              break;
            // 话费
            case 130301: 
              this.awardDialogConfig.phoneFee.img = LotteryData.data.logoUrl;
              this.awardDialogConfig.phoneFee.name = LotteryData.data.prizeName;
              this.$boxAwardDialog.show(this.awardDialogConfig.phoneFee);
              break;
            // 实物
            case 1301: 
              this.awardDialogConfig.goods.img = LotteryData.data.logoUrl;
              this.awardDialogConfig.goods.name = LotteryData.data.prizeName;
              this.$boxAwardDialog.show(this.awardDialogConfig.goods);
              break;
            // 神秘洞窟
            case 1324: 
              this.dialogConfig.unlockActivity.title=LotteryData.data.prizeName;
              this.$shakerDialog.show(this.dialogConfig.unlockActivity);
              break;
            // 谢谢参与
            case 4000: 
              this.awardDialogConfig.noAward.img = LotteryData.data.logoUrl;
              this.awardDialogConfig.noAward.name = LotteryData.data.prizeName;
              this.$shakerAwardDialog.show(this.awardDialogConfig.noAward);
              break;
          }
        } else if (LotteryData.code == 2005) {
            this.$shakerAwardDialog.show(this.awardDialogConfig.noAward);
          return
        }else{
          this.$alert.show(LotteryData.msg);
        }
      }
    },
    // 处理话费充值
    async handleInputPhoneNumber(phoneNumber) {
      this.$logger.debug(phoneNumber);
      try {
        let params = {
          phone: phoneNumber,
          winId: this.LotteryResponseData.winId
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
      this.showRechargePhone = false;
      this.$logger.debug("关闭话费充值弹框");
    },
    // 处理保存收获地址
    async handleInputAddress(receiveAddressData) {
      this.$logger.debug(receiveAddressData);
      try {
        let params = {
          winId: this.LotteryResponseData.winId,
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
      this.showReceiveAddressDialog = false;
      this.$logger.debug("关闭收货地址填写弹框");
    },
    showImg(num) {
      switch (num) {
        case 1:
          this.coverImgUrl = chromons1;
          break;
        case 2:
          this.coverImgUrl = chromons2;
          break;
        case 3:
          this.coverImgUrl = chromons3;
          break;
        case 4:
          this.coverImgUrl = chromons4;
          break;
        case 5:
          this.coverImgUrl = chromons5;
          break;
        case 6:
          this.coverImgUrl = chromons6;
          break;
      }
    },
    autoUpdateTips() {
      this.randomDisplayOneTips();
      setInterval(this.randomDisplayOneTips, 5000);
    },
    randomDisplayOneTips() {
      let randomValue = Math.ceil(
        (Math.random() * 10) % (this.boy.tipList.length - 1)
      );
      this.boy.currentTip = this.boy.tipList[randomValue];
    },
    // 关闭弹窗
    closeDialog() {
      this.flag.showDialog = false;
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
      if (this.LotteryResponseData.prizeType === 1301 && this.LotteryResponseData.win == 1) {
        window.location.href = window.th.trophy
      } else if (this.LotteryResponseData.prizeType === 1301) {
        this.showReceiveAddressDialog = true
      }
    },
    // 显示规则
    async displayRule() {
      // 人参娃娃跳动过程中直接退出
      if (this.flag.boyMoving) {
        return
      }
      this.flag.showRule = true;
      // TODO 活动规则从后台活动中的规则文案中获取。
      let params = {
          type: 'monopoly'
      }
      const shakerRuleResponse = await API.getShakerRule(params);
      this.shakerRule = shakerRuleResponse.data.content;
    },
    // 隐藏规则
    hiddenRule() {
      this.flag.showRule = false;
    },
    // 跳转至排行榜页面
    navigateToRankBoard() {
      // 人参娃娃跳动过程中直接退出
      if (this.flag.boyMoving) {
        return
      }
      this.$router.push("/rank");
    },
    // 跳转至我的奖品
    navigateToAward() {
      // 人参娃娃跳动过程中直接退出
      if (this.flag.boyMoving) {
        return
      }
      // this.$router.push("/award");
      window.location.href = window.th.trophy;
    },
    // 跳转至开宝箱
    navigateToMysteriousBox() {
      // 人参娃娃跳动过程中直接退出
      if (this.flag.boyMoving) {
        return
      }
      this.$router.push("/openBox");
    },
  },
};
</script>

<style lang="scss" scoped>
$home-img-width: 750;
$home-img-height: 1206;
@function heightToHomeImg($px) {
  @return calc(100vh / #{$home-img-height} * #{$px});
}
@function widthToHomeImg($px) {
  @return calc(100vw / #{$home-img-width} * #{$px});
}
@function pxToHomeImg($px) {
  @return calc(100vmin / #{$home-img-width} * #{$px});
}
.home {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/home-bg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .game-name {
    width: widthToHomeImg(451);
    height: heightToHomeImg(250);
    background-image: url("../assets/game-name.png");
    background-size: 100% 100%;
    position: fixed;
    top: heightToHomeImg(23);
    left: widthToHomeImg(155);
  }
  .btn-rule {
    width: widthToHomeImg(113);
    height: heightToHomeImg(60);
    background-image: url("../assets/btn-rule.png");
    background-size: 100% 100%;
    position: fixed;
    top: heightToHomeImg(111);
    right: widthToHomeImg(10);
  }
  .pigeon {
    width: widthToHomeImg(69);
    height: heightToHomeImg(86);
    background-image: url("../assets/pigeon.png");
    background-size: 100% 100%;
    position: fixed;
    top: heightToHomeImg(195);
    right: widthToHomeImg(47);
  }
  .boy {
    display: none;
    width: widthToHomeImg(230);
    height: heightToHomeImg(250);
    background-image: url("../assets/boy.gif");
    background-size: 100% 100%;
    position: fixed;
    top: heightToHomeImg(700);
    left: widthToHomeImg(0);
    .boy-tips {
      width: widthToHomeImg(209);
      height: heightToHomeImg(113);
      background-size: 100%;
      background-repeat: no-repeat;
      color: rgb(175, 128, 45);
      padding: heightToHomeImg(15) widthToHomeImg(15);
      text-align: center;
      font-size: pxToHomeImg(22);
      position: relative;
      left: widthToHomeImg(125);
      top: heightToHomeImg(-70);
    }
    .boy-right-tips {
      background-image: url("../assets/right-tips.png") !important;
    }
    .boy-left-tips {
      background-image: url("../assets/left-tips.png") !important;
      left: widthToHomeImg(-155) !important;
    }
  }
  // 我的奖品
  @keyframes myPrizesAnimation {
    50% {
      top: heightToHomeImg(535);
    }
    100% {
      top: heightToHomeImg(547);
    }
  }
  .my-prizes {
    width: widthToHomeImg(105);
    height: heightToHomeImg(101);
    background-image: url("../assets/my-prizes.png");
    background-size: 100% 100%;
    position: fixed;
    top: heightToHomeImg(547);
    right: widthToHomeImg(8);
    animation: myPrizesAnimation 2s infinite;
    z-index: 9999;
  }
  // 掷色子之前
  @keyframes beforeShakerAnimation {
    40% {
      // top: heightToHomeImg(925);
      bottom: heightToHomeImg(127);
    }
    100% {
      // top: heightToHomeImg(945);
      bottom: heightToHomeImg(107);
    }
  }
  .before-shaker {
    width: widthToHomeImg(158);
    height: widthToHomeImg(156);
    background-image: url("../assets/chromons1.png");
    background-size: 100% 100%;
    position: fixed;
    // top: heightToHomeImg(945);
    bottom: heightToHomeImg(107);
    left: widthToHomeImg(299);
    animation: beforeShakerAnimation 1s infinite;
  }
  // 掷色子中
  @keyframes shakingAnimation {
    0% {
      top: heightToHomeImg(929);
    }
    100% {
      top: heightToHomeImg(470);
    }
  }
  .shaking {
    width: widthToHomeImg(280);
    height: heightToHomeImg(280);
    background-image: url("../assets/shaker.gif");
    background-size: 100% 100%;
    position: fixed;
    left: widthToHomeImg(248);
    animation: shakingAnimation 1s;
    animation-fill-mode: forwards;
  }
  .success {
    width: widthToHomeImg(158);
    height: widthToHomeImg(156);
    position: fixed;
    left: widthToHomeImg(299);
    top: heightToHomeImg(520);
  }
  // 掷色子结束
  @keyframes afterShaker {
    0% {
      top: heightToHomeImg(500);
    }
    10% {
      top: heightToHomeImg(500);
    }
    100% {
      top: heightToHomeImg(965);
    }
  }
  .after-shaker {
    width: widthToHomeImg(158);
    height: widthToHomeImg(156);
    background-image: url("../assets/chromons1.png");
    background-size: 100% 100%;
    position: fixed;
    top: heightToHomeImg(929);
    left: widthToHomeImg(299);
    animation: afterShaker 2s;
  }
  .click-tips {
    width: widthToHomeImg(108);
    height: heightToHomeImg(21);
    background-image: url("../assets/click-tips.png");
    background-size: 100% 100%;
    position: fixed;
    right: widthToHomeImg(147);
    top: heightToHomeImg(1024);
  }
  .btn-rank {
    width: widthToHomeImg(224);
    height: heightToHomeImg(102);
    position: fixed;
    top: heightToHomeImg(1067);
    left: widthToHomeImg(86);
    background-image: url("../assets/btn-rank.png");
    background-size: 100% 100%;
  }
  .chance-container {
    position: fixed;
    top: heightToHomeImg(1000);
    left: widthToHomeImg(100);
    .chance {
      text-align: center;
      font-size: pxToHomeImg(20);
      font-weight: 500;
      color: #583a24;
      line-height: heightToHomeImg(30);
      .chance-count {
        color: rgb(198, 34, 2);
        font-weight: bold;
      }
    }
    .delay {
      text-align: center;
      font-size: pxToHomeImg(20);
      font-weight: 500;
      color: #b77a4c;
      line-height: heightToHomeImg(30);
    }
  }
  .btn-mysterious-box {
    width: widthToHomeImg(224);
    height: heightToHomeImg(102);
    position: fixed;
    top: heightToHomeImg(1067);
    right: widthToHomeImg(84);
    background-image: url("../assets/btn-mysterious-box.png");
    background-size: 100% 100%;
  }
}
</style>
