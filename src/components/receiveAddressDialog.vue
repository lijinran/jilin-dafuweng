<template>
  <div class="recive-address-container" @click="close">
    <div class="recive-address-cover" @click.stop>
      <div class="header">请填写收货地址</div>
      <!-- 收货人姓名 -->
      <div class="form-item">
        <div class="form-item-input-cover">
          <label class="form-item-label">姓名</label>
          <div class="form-item-input">
            <input type="text" v-model="form.data.name" @input="validateName" maxlength="20" placeholder="请输入姓名"/>
          </div>
        </div>
        <div class="form-item-tips">{{form.validMsg.name}}</div>
      </div>
      <!-- 手机号码 -->
      <div class="form-item">
        <div class="form-item-input-cover">
          <label class="form-item-label">手机</label>
          <div class="form-item-input">
            <input type="tel" v-model="form.data.phoneNumber" @input="validatePhonenumber" maxlength="11" placeholder="请输入手机号码"/>
          </div>
        </div>
        <div class="form-item-tips">{{form.validMsg.phoneNumber}}</div>
      </div>
      <!-- 省、市、县 -->
      <div class="form-item">
        <div class="form-item-input-cover">
          <label class="form-item-label">地址</label>
          <div class="form-item-short-container">
            <div class="form-item-input form-item-input-short">
              <select name="select" v-model="form.data.province" @change="validateRegion">
                <option value="" selected disabled style="color: rgb(117, 117, 117)">省份</option>
                <option v-for="provinceData in provinceList" :key="provinceData[0]" :value="provinceData[0]" >{{provinceData[1]}}</option> 
              </select>
              <img src="@/assets/images/mysterious/icon-select.png" alt="">
            </div>
            <div class="form-item-input form-item-input-short">
              <select name="select" v-model="form.data.city" @change="validateRegion">
                <option value="" selected disabled style="color: rgb(117, 117, 117)">城市</option>
                <option v-for="cityData in cityList" :key="cityData[0]" :value="cityData[0]" >{{cityData[1]}}</option> 
              </select>
              <img src="@/assets/images/mysterious/icon-select.png" alt="">
            </div>
            <div class="form-item-input form-item-input-short">
              <select name="select" v-model="form.data.county" @change="validateRegion">
                <option value="" selected disabled style="color: rgb(117, 117, 117)">区县</option>
                <option v-for="contyData in countyList" :key="contyData[0]" :value="contyData[0]" >{{contyData[1]}}</option> 
              </select>
              <img src="@/assets/images/mysterious/icon-select.png" alt="">
            </div>
          </div>
        </div>
        <div class="form-item-tips">{{form.validMsg.region}}</div>
      </div>
      <!-- 详细地址 -->
      <div class="form-item">
        <div class="form-item-input-cover">
          <label class="form-item-label">地址</label>
          <div class="form-item-input">
            <input type="text" v-model="form.data.address" @input="validateAddress" placeholder="请输入详细地址"/>
          </div>
        </div>
        <div class="form-item-tips">{{form.validMsg.address}}</div>
      </div>
      <div class="form-tips">为了您能准时收货，请确保信息准确</div>
      <!-- 立即领取 -->
      <div class="form-item-operation">
        <img src="@/assets/images/mysterious/obtain-immediate.png" @click="confirm" class="obtain-immediate" alt="">
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 收货地址填写弹框
 */
import CommonUtil from '@/utils/common'
import ChinaAareaData from 'china-area-data'

export default {
  name: 'ReceiveAddressDialog',
  data () {
    return {
      form: {
        data: {
          name: '',          // 姓名
          phoneNumber: '',   // 电话号码
          province: '',      // 省
          provinceName: '',  
          city: '',          // 市 
          cityName: '',
          county: '',        // 县
          countyName: '',
          address: ''        // 地址
        },
        validMsg: {
          name: '',
          phoneNumber: '',
          region: '',
          address: ''
        }
      }
    }
  },
  computed: {
    provinceList () {
      return Object.entries(ChinaAareaData[86])
    },
    cityList () {
      let temObject = ChinaAareaData[this.form.data.province]
      if (CommonUtil.isNotNull(temObject)) {
        return Object.entries(temObject)
      } else {
        return []
      }
    },
    countyList () {
      let temObject = ChinaAareaData[this.form.data.city]
      if (CommonUtil.isNotNull(temObject)) {
        return Object.entries(temObject)
      } else {
        return []
      }
    }
  },
  watch: {
    'form.data.province': function () {
      if (CommonUtil.isNotBlank(this.form.data.province)) {
        this.form.data.provinceName = this.provinceList.filter(item=> item[0] === this.form.data.province)[0][1]
      } else {
        this.form.data.provinceName = ''
      }
      this.form.data.city = ''
      this.form.data.county = ''
    },
    'form.data.city': function () {
      if (CommonUtil.isNotBlank(this.form.data.city)) {
        this.form.data.cityName = this.cityList.filter(item=> item[0] === this.form.data.city)[0][1]
      } else {
        this.form.data.cityName = ''
      }
      this.form.data.county = ''
    },
    'form.data.county': function () {
      if (CommonUtil.isNotBlank(this.form.data.county)) {
        this.form.data.countyName = this.countyList.filter(item=> item[0] === this.form.data.county)[0][1]
      } else {
        this.form.data.countyName = ''
      }
    }
  },
  mounted () {
    let tem = ChinaAareaData
    this.$logger.debug(tem)
  },
  methods: {
    isMobile (phoneNumber) {
      return /^1[3-9]\d{9}$/.test(phoneNumber)
    },
    validateName () {
      if (CommonUtil.isBlank(this.form.data.name)) {
        this.form.validMsg.name = '姓名不能为空'
      } else {
        this.form.validMsg.name = ''
      }
    },
    validatePhonenumber () {
      if (!this.isMobile(this.form.data.phoneNumber)) {
        this.form.validMsg.phoneNumber = '手机号码格式不正确'
      } else {
        this.form.validMsg.phoneNumber = ''
      }
    },
    validateRegion () {
      if (CommonUtil.isBlank(this.form.data.province)) {
        this.form.validMsg.region = '请选择地址'
      } else if (CommonUtil.isBlank(this.form.data.city)) {
        this.form.validMsg.region = '请选择地址'
      } else if (CommonUtil.isBlank(this.form.data.county)) {
        this.form.validMsg.region = '请选择地址'
      } else {
        this.form.validMsg.region = ''
      }
    },
    validateAddress () {
      if (CommonUtil.isBlank(this.form.data.address)) {
        this.form.validMsg.address = '收货地址不能为空'
      } else {
        this.form.validMsg.address = ''
      }
    },
    valid () {
      this.validateName()
      this.validatePhonenumber()
      this.validateAddress()
      this.validateRegion()
      return CommonUtil.isBlank(this.form.validMsg.name)
             && CommonUtil.isBlank(this.form.validMsg.phoneNumber)
             && CommonUtil.isBlank(this.form.validMsg.address)
    },
    confirm () {
      if (!this.valid()) {
        return
      }
      this.$emit('confirm', this.form.data)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .recive-address-container {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    top: 0px;
    left: 0px;
    .recive-address-cover {
      width: flexWidth(550);
      height: flexHeight(660);
      background-size: 100% 100%;
      background-image: url('../assets/images/mysterious/dialog-award-bg-2.png');
      position: fixed;
      top: flexHeight(250);
      display: flex;
      flex-direction: column;
      align-items: center;
      .header {
        width: 100%;
        height: flexHeight(100);
        margin-top: flexHeight(20);
        margin-bottom: flexHeight(10);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: pxToImg(40);
        font-weight: bold;
      }
      .form-item {
        width: flexWidth(440);
        .form-item-input-cover {
          display: flex;
          justify-content: space-around;
          align-items: center;
          .form-item-label {
            font-size: pxToImg(30);
            display: inline-block;
            padding-right: flexWidth(5);
          }
          .form-item-input {
            width: flexWidth(316);
            height: flexHeight(40);
            border: solid 1px rgb(102, 56, 22);
            border-radius: 4px;
            padding: flexHeight(10) flexWidth(10);
            input {
              border: none;
              width: 100%;
              height: 100%;
              outline: none;
              font-size: pxToImg(30);
            }
          }
        }
        .form-item-short-container {
          display: flex;
          width: flexWidth(340);
          .form-item-input-short {
            margin-right: 5px;
            width: flexWidth(103) !important;
            padding: 8px 0px 8px 5px !important;
            display: flex;
            align-items: center;
            &:last-child {
              margin-right: 0px;
            }
            select {
              width: 100%;
              margin-right: flexWidth(16);
              font-size: pxToImg(30);
              height: 100%;
              border: none;
              outline: none;
              appearance:none;  
              -moz-appearance:none;   
              -webkit-appearance:none;
              background-color: white;   
            }
            img {
              position: relative;
              right: flexWidth(12);
              width: flexWidth(16);
              height: flexWidth(10);
            }
          }
        }
        .form-item-tips {
          height: flexHeight(25);
          color: rgb(253, 61, 60);
          font-size: pxToImg(22);
          padding-left: flexWidth(90);
          padding-bottom: flexHeight(10);
        }
      }
      .form-tips {
        font-size: pxToImg(18);
      }
      .form-item-operation {
        display: flex;
        justify-content: center;
        padding-top: flexHeight(5);
        .obtain-immediate {
          width: flexWidth(240);
          height: flexHeight(75);
        }
      }
    }
  }
</style>