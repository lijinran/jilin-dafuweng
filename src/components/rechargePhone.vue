<template>
  <div class="recharge-phone-container" @click="close">
    <div class="recharge-phone-cover" @click.stop>
      <div class="header">话费充值</div>
      <div class="form-item">
        <div class="form-item-input">
          <input type="tel" v-model="phoneNumber" @input="validatePhoneNumber" maxlength="11" placeholder="请输入充值手机号码"/>
        </div>
        <div class="form-item-tips">{{phoneNumberValidMsg}}</div>
      </div>
      <div class="form-item">
        <div class="form-item-input">
          <input type="tel" v-model="rePhoneNumber" @input="validateRePhoneNumber"  maxlength="11" placeholder="再次输入充值号码"/>
        </div>
        <div class="form-item-tips">{{rePhoneNumberMsg}}</div>
      </div>
      <div class="form-item-operation">
        <img src="@/assets/images/mysterious/obtain-immediate.png" @click="confirm" class="obtain-immediate" alt="">
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 话费充值弹框
 */
export default {
  name: 'RechargePhone',
  data () {
    return {
      phoneNumber: '',
      rePhoneNumber: '',
      phoneNumberValidMsg: '',
      rePhoneNumberMsg: ''
    }
  },
  methods: {
    isMobile (phoneNumber) {
      return /^1[3-9]\d{9}$/.test(phoneNumber)
    },
    wonot(val){
      return !(/^[1](70|71|41|46|47|48|65|66|67||98|99)\d{8}$/.test(val));
    },
    validatePhoneNumber () {
      if (!this.isMobile(this.phoneNumber)) {
        this.phoneNumberValidMsg = '手机号码格式不正确'
      } else {
        this.phoneNumberValidMsg = ''
      }
    },
    validateRePhoneNumber () {
      if (!this.isMobile(this.rePhoneNumber)) {
        this.rePhoneNumberMsg = '手机号码格式不正确'
      } else if (!this.wonot(this.rePhoneNumber)) {
        this.rePhoneNumberMsg = '暂不支持此号码段充值'
      } else if (this.rePhoneNumber !== this.phoneNumber) {
        this.rePhoneNumberMsg = '两次号码输入不一致'
      } else {
        this.rePhoneNumberMsg = ''
      }
    },
    confirm () {
      this.validatePhoneNumber()
      this.validateRePhoneNumber()
      if (this.phoneNumberValidMsg === '' && this.rePhoneNumberMsg === '') {
        this.$emit('confirm', this.phoneNumber)
      }
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .recharge-phone-container {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    top: 0px;
    left: 0px;
    .recharge-phone-cover {
      width: flexWidth(420);
      height: flexHeight(496);
      min-height: 220px;
      background-size: 100% 100%;
      background-image: url('../assets/images/mysterious/dialog-award-bg.png');
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
        width: flexWidth(300);
        .form-item-input {
          height: flexHeight(50);
          border: solid 1px rgb(102, 56, 22);
          border-radius: 4px;
          padding: 8px 10px;
          overflow: hidden;
          input {
            border: none;
            width: 100%;
            height: 100%;
            outline: none;
          }
        }
        .form-item-tips {
          height: flexHeight(30);
          color: rgb(253, 61, 60);
          font-size: pxToImg(22);
          padding-left: flexWidth(5);
          padding-bottom: flexHeight(10);
        }
      }
      .form-item-operation {
        display: flex;
        justify-content: center;
        padding-top: flexHeight(5);
        .obtain-immediate {
          width: flexWidth(240);
          height: flexHeight(75);
          min-height: 45px;
        }
      }
    }
  }
</style>