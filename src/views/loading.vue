<template>
  <div class="loading">
    <div class="boy"></div>
    <div class="jindut">
      <div class="jiazai" :style="{width: loadProgress +'%'}"></div>
    </div>
    <div class="ing">加载中...</div>
  </div>
</template>

<script>
import dialogKnowPng from "@/assets/dialog-btn-know.png";
import loadingPng from "@/assets/loading.png";
import gameNamePng from "@/assets/game-name.png";
import btnRulePng from "@/assets/btn-rule.png";
import pigeonPng from "@/assets/pigeon.png";
import myprizesPng from "@/assets/my-prizes.png";
import rightTips from "@/assets/right-tips.png";
import btnbox from "@/assets/btn-mysterious-box.png";
import btnrank from "@/assets/btn-rank.png";
import dialogBackPng from "@/assets/dialog-btn-back.png";
import dialogStartPng from "@/assets/dialog-btn-start.png";
import awardNoPng from "@/assets/award-no.png";
import awardPointPng from "@/assets/award-point.png";
import awardBtnImmediateReceivePng from "@/assets/immdiate-receive.png";
import loadingbg from "@/assets/loading-bg.jpg";
import homebg from "@/assets/home-bg.jpg";
import chromons1 from "@/assets/chromons1.png";
import shakerGif from "@/assets/shaker.gif";
import boyGif from "@/assets/boy.gif";

import API from "@/api/Api";
import CommonUtil from "@/utils/common";
import StorageUtil from '@/utils/storage'
import {mapMutations} from 'vuex'

export default {
  name: "Loading",
  inject: ['hiddenShareMenu'],
  data: function () {
    return {
      longitude: "",
      latitude: "",
      loadProgress: 0,
    };
  },
  mounted() {
    document.title = "loading...";
    // 隐藏分享按钮
    this.hiddenShareMenu()
    try {
      this.showgeoLocation();
    } catch (e) {
      this.$logger.error("手机定位失败", e);
      this.loadImg();
    }
    this.upateLoadingStatus(true)
  },
  methods: {
    ...mapMutations({
      upateLoadingStatus: 'upateLoadingStatus'
    }),
    // 浏览器定位
    showgeoLocation() {
      let options = {
        enableHighAccuracy: true,
        maximunAge: 0,
        timeout: 2000,
      };
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.showError,
          options
        );
      } else {
        console.log("该手机不支持定位");
      }
    },
    showPosition(position) {
      console.log('showPosition', position)
      if (CommonUtil.isNotNull(position)) {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
      }
      this.onload();
    },
    showError(error) {
      console.log('showError', error);
      this.onload();
    },
    LocationErr() {
      CommonUtil.jiashuju();
      this.loadImg();
    },
    async onload() {
      try {
        let params = {
          lng: this.longitude,
          lat: this.latitude,
          ip: "",
        };
        console.log('params', params)
        let response = await API.queryLocationInfo(params);
        console.log('response', response)
        if (response.code == 200) {
          window.localStorage.setItem("project", "jilin/jilin-seven-v3");
          let barcode = {
            materialId: 131,
            barcode: window.th.gqBarcode2020,
            city: response.data.city,
            area: response.data.area,
            province: response.data.province,
            comId: 164,
            ip: response.data.ip,
          };
          //这是个假数据,跟积分商城的命名一致
          window.sessionStorage.setItem(
            "jilin/jilin-seven-v3barcodeData",
            JSON.stringify(barcode)
          );
          this.loadImg();
        } else {
          this.LocationErr();
        }
      } catch (e) {
        console.log("调用经纬度转地址失败", e)
        this.$logger.error("调用经纬度转地址失败", e);
        this.LocationErr();
      }
    },
    loadImg() {
      console.log('loadImg')
      let imgArr = [
        dialogKnowPng,
        loadingPng,
        gameNamePng,
        btnRulePng,
        pigeonPng,
        myprizesPng,
        rightTips,
        btnbox,
        btnrank,
        dialogBackPng,
        dialogStartPng,
        awardNoPng,
        awardPointPng,
        awardBtnImmediateReceivePng,
        loadingbg,
        homebg,
        chromons1,
        shakerGif,
        boyGif,
      ];
      let con = 0;
      for (let i in imgArr) {
        const image = new Image();
        image.onload = () => {
          con++;
          this.loadingProgress(con, imgArr.length);
        };
        image.src = imgArr[i];
      }
    },
    async loadingProgress(cur, total) {
      let progress = (cur / total) * 100;
      progress = Math.round(progress);
      if (progress >= 100) {
        progress = 100;
        // let wxLogin = window.localStorage.getItem("wxLogin");
        let wxLogin = null
        try {
          wxLogin = StorageUtil.getWxLoginData()
        } catch (e) {
          return
        }
        let userToken = wxLogin && wxLogin.userToken;
        let phoneNumber = wxLogin && wxLogin.phone;
        if (userToken) {
          let params = {
            phone: phoneNumber
          }
          let response = await API.queryPhoneBind(params)
          console.log('response', response)
          switch (response.code) {
            case 200:
              this.$router.push({ path: "/home" });
              break;
            case 201:
              window.location.href = window.th.pinless
              break;
            case 601:
              this.$alert.show(response.msg)
              break;
          }
        } else {
          CommonUtil.jiashuju();
          CommonUtil.wxLoginFun();
        }
      }
      this.loadProgress = progress;
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
.loading {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/loading-bg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .boy {
    width: widthToHomeImg(153);
    height: heightToHomeImg(166);
    background-image: url("../assets/boy.gif");
    background-size: 100% 100%;
    position: fixed;
    top: heightToHomeImg(700);
    left: widthToHomeImg(140);
  }
  .jindut {
    width: widthToHomeImg(476);
    height: heightToHomeImg(18);
    padding: heightToHomeImg(1) widthToHomeImg(2) heightToHomeImg(2);
    background-image: url("../assets/loading.png");
    background-size: 100% 100%;
    position: fixed;
    top: heightToHomeImg(860);
    left: widthToHomeImg(135);
  }
  .jiazai {
    background: #ffcf64;
    background: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      from(#ffeaba),
      to(#ffbd2e)
    );
    height: heightToHomeImg(18);
    border-radius: 25px;
  }
  .ing {
    width: widthToHomeImg(750);
    position: fixed;
    top: heightToHomeImg(900);
    text-align: center;
  }
}
</style>
