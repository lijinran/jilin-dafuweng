<template>
  <div class="rule-mask" @click="handleClose">
    <div class="rule-cover" @click.stop="">
      <div class="rule-title">{{ruleTitle}}</div>
      <div class="rule-detail">
        <img :src="rule" alt="">
      </div>
      <div class="rule-opt-confirm">
        <div class="btn-confirm" @click="handleConfirm"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rule',
  props: {
    rule: {
      type: String,
      required: true
    },
    ruleTitle: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    handleConfirm () {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
  .rule-mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    .rule-cover {
      width: flexWidth(580);
      height: flexHeight(880);
      position: fixed;
      top: flexHeight(115);
      // left: flexWidth(115);
      background-color: white;
      border-radius: flexWidth(10);
      background-image: url('../assets/rule-bg.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: bottom ;
      .rule-title {
        width: 100%;
        height: flexHeight(80);
        line-height: flexHeight(80);
        text-align: center;
        font-size: pxToImg(34);
        font-weight: bold;
      }
      .rule-detail {
        height: flexHeight(690);
        line-height: flexHeight(38);
        padding: 0px flexWidth(40);
        // text-align: center;
        font-size: pxToImg(28);
        word-break: break-all;
        overflow-y: scroll;
        img {
          width: 100%;
        }
      }
      .rule-opt-confirm {
        padding-top: flexHeight(15);
        .btn-confirm {
          width: flexWidth(241);
          height: flexHeight(80);
          background-image: url('../assets/btn-confirm.png');
          background-size: 100% 100%;
          margin: auto;
        }
      }
    }
  }
</style>