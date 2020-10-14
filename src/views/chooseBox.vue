<template>
  <div class="mysterious-box-cover">
    <div v-for="(index) in 14" :key="index" :class="`box box${index}`" @click="chooseBox(index)">
      <div class="choose-box-flag" v-if="hasChoosedBox(index)"></div>
      <div class="max-3-tips" v-if="fourthBox === index"></div>
    </div>
    <div class="need-three-box" v-if="showNeedThreeBoxTips"></div>
    <div class="choose-box choose-box-0" v-if="boxCount === 0" @click="openBox"></div>
    <div class="choose-box choose-box-1" v-else-if="boxCount === 1" @click="openBox"></div>
    <div class="choose-box choose-box-2" v-else-if="boxCount === 2" @click="openBox"></div>
    <div class="choose-box choose-box-3" v-else-if="boxCount === 3" @click="openBox"></div>
    <div class="choose-box-tips">请点击选择3个宝箱</div>
  </div>
</template>

<script>
import dialogBackToHomePng from '@/assets/images/mysterious/back-to-home.png'
import API from "@/api/Api";

/**
 * 神秘宝箱——选择宝箱
 */
export default {
  name: "ChooseBox",
  inject: ['hiddenShareMenu'],
  data() {
    return {
      alertDialogConfig: {
        "min-width": "190px",
      },
      fourthBox: -1,
      choosedBoxList: [],
      showNeedThreeBoxTips: false,
      dialogConfig: {
        // 已参与过
        yicanyu: {
          header: "温馨提示",
          title: "您已参与过本活动啦",
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
      },
    };
  },
  computed: {
    boxCount() {
      return this.choosedBoxList.length;
    },
    hasChoosedBox() {
      return function (index) {
        if (this.choosedBoxList.indexOf(index) !== -1) {
          return true;
        } else {
          return false;
        }
      };
    },
  },
  mounted() {
    document.title = "神秘洞窟";
    // 隐藏分享按钮
    this.hiddenShareMenu()
    let closeConfig = Object.assign(this.alertDialogConfig)
    closeConfig.closeable = true
    this.$alert.show("请点击选择3个宝箱", 3000, closeConfig);
  },
  methods: {
    chooseBox(index) {
      this.showNeedThreeBoxTips = false;
      if (this.choosedBoxList.indexOf(index) !== -1) {
        this.choosedBoxList.splice(this.choosedBoxList.indexOf(index), 1);
        this.fourthBox = -1;
        return;
      }
      if (this.choosedBoxList.length >= 3) {
        this.fourthBox = index;
        return;
      }
      if (this.choosedBoxList.indexOf(index) === -1) {
        this.choosedBoxList.push(index);
      }
    },
    async openBox() {
      this.showNeedThreeBoxTips = this.boxCount < 3;
      if (this.boxCount >= 3) {
        let boxNumData = await API.gainTreasureNum();
        if (boxNumData.code == 200) {
          this.$router.push("/openBox");
        }else if(boxNumData.code == 6005) {
          this.$boxDialog.show(this.dialogConfig.yicanyu)
        }else {
          this.$alert.show(boxNumData.msg, 2000, this.alertDialogConfig);
        }
      }
    },
    navigateToHomePage () {
      this.$router.push('/')
    }
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
@mixin importImg($width, $height, $url, $top, $left) {
  width: widthToImg($width);
  height: heightToImg($height);
  background-image: url($url);
  background-size: 100% 100%;
  position: fixed;
  top: heightToImg($top);
  left: widthToImg($left);
}
.mysterious-box-cover {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/images/mysterious/bg-mysterious-box-1.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  @keyframes shakbox {
    0% {
      transform: translateX(-6%);
    }
    50% {
      transform: translateX(6%);
    }
    100% {
      transform: translateX(-6%);
    }
  }
  .box {
    animation: shakbox 3s infinite linear;
  }
  .box1 {
    animation: shakbox 2.75s infinite;
    @include importImg(
      115,
      96,
      "../assets/images/mysterious/box/15.png",
      293,
      259
    );
  }
  .box2 {
    animation: shakbox 3s infinite;
    @include importImg(
      105,
      102,
      "../assets/images/mysterious/box/14.png",
      334,
      570
    );
    .choose-box-flag {
      left: widthToImg(50) !important;
    }
  }
  .box13 {
    animation: shakbox 3.25s infinite;
    @include importImg(
      97,
      84,
      "../assets/images/mysterious/box/12.png",
      389,
      141
    );
    .max-3-tips {
      left: widthToImg(-55) !important;
    }
  }
  .box14 {
    animation: shakbox 3.5s infinite;
    @include importImg(
      104,
      91,
      "../assets/images/mysterious/box/11.png",
      418,
      407
    );
  }
  .box3 {
    animation: shakbox 3.75s infinite;
    @include importImg(
      101,
      100,
      "../assets/images/mysterious/box/10.png",
      509,
      246
    );
    .choose-box-flag {
      left: widthToImg(50) !important;
    }
    .max-3-tips {
      left: widthToImg(-50) !important;
    }
  }
  .box4 {
    animation: shakbox 3.5s infinite;
    @include importImg(
      164,
      149,
      "../assets/images/mysterious/box/9.png",
      588,
      69
    );
    .choose-box-flag {
      top: heightToImg(-5) !important;
    }
    .max-3-tips {
      left: widthToImg(-20) !important;
      margin-top: heightToImg(-25) !important;
    }
  }
  .box5 {
    animation: shakbox 3.25s infinite;
    @include importImg(
      112,
      137,
      "../assets/images/mysterious/box/8.png",
      620,
      330
    );
  }
  .box6 {
    animation: shakbox 3.5s infinite;
    @include importImg(
      118,
      110,
      "../assets/images/mysterious/box/7.png",
      743,
      10
    );
    .max-3-tips {
      left: widthToImg(-15) !important;
    }
  }
  .box7 {
    animation: shakbox 3s infinite;
    @include importImg(
      144,
      98,
      "../assets/images/mysterious/box/4.png",
      808,
      193
    );
  }
  .box8 {
    animation: shakbox 2.75s infinite;
    @include importImg(
      147,
      93,
      "../assets/images/mysterious/box/5.png",
      810,
      350
    );
    .choose-box-flag {
      left: widthToImg(50) !important;
    }
  }
  .box9 {
    animation: shakbox 3s infinite;
    @include importImg(
      103,
      90,
      "../assets/images/mysterious/box/6.png",
      787,
      495
    );
    .choose-box-flag {
      left: widthToImg(40) !important;
    }
    .max-3-tips {
      left: widthToImg(-50) !important;
    }
  }
  .box10 {
    animation: shakbox 3.25s infinite;
    @include importImg(
      144,
      107,
      "../assets/images/mysterious/box/2.png",
      915,
      97
    );
  }
  .box11 {
    animation: shakbox 3.5s infinite;
    @include importImg(
      147,
      93,
      "../assets/images/mysterious/box/17.png",
      900,
      471
    );
  }
  .box12 {
    animation: shakbox 3.75s infinite;
    @include importImg(
      134,
      104,
      "../assets/images/mysterious/box/1.png",
      996,
      603
    );
  }
  .choose-box-flag {
    background-image: url("../assets/images/mysterious/choose-box-flag.png");
    width: widthToImg(87);
    height: heightToImg(87);
    background-size: 100% 100%;
    position: relative;
    left: widthToImg(60);
    top: heightToImg(-20);
  }
  .max-3-tips {
    background-image: url("../assets/images/mysterious/max-3-tips.png");
    width: widthToImg(197);
    height: heightToImg(48);
    background-size: 100% 100%;
    position: relative;
    left: widthToImg(-40);
    top: heightToImg(-100%);
    margin-top: heightToImg(-48);
  }
  .need-three-box {
    @include importImg(
      234,
      48,
      "../assets/images/mysterious/need-three-box.png",
      948,
      258
    );
  }
  .choose-box {
    width: widthToImg(360);
    height: heightToImg(102);
    background-size: 100% 100%;
    position: fixed;
    top: heightToImg(1000);
    left: 50%;
    transform: translateX(-50%);
  }
  .choose-box-0 {
    background-image: url("../assets/images/mysterious/choose-box-0.png");
  }
  .choose-box-1 {
    background-image: url("../assets/images/mysterious/choose-box-1.png");
  }
  .choose-box-2 {
    background-image: url("../assets/images/mysterious/choose-box-2.png");
  }
  .choose-box-3 {
    background-image: url("../assets/images/mysterious/choose-box-3.png");
  }
  .choose-box-tips {
    position: fixed;
    top: heightToImg(1110);
    left: 50%;
    transform: translateX(-50%);
    font-size: pxToImg(30);
    color: rgb(200, 106, 36);
  }
}
</style>