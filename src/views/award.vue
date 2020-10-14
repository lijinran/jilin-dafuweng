<template>
  <div class="rank-board-cover">
    <div class="table-head">
      <div class="table-head-item">奖品名称</div>
      <div class="table-head-item">奖品来源</div>
      <div class="table-head-item">获奖时间</div>
      <div class="table-head-item">领取状态</div>
    </div>
    <div class="table-row" 
         :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}" 
         v-for="(row, index) in rankData" 
         :key="index">
      <div class="table-row-item">{{row.name}}</div>
      <div class="table-row-item">{{row.source}}</div>
      <div class="table-row-item">{{row.date}}</div>
      <div class="table-row-item">
        <div v-if="row.status === 1" class="un-received">待领取</div>
        <div v-else class="received">已领取</div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 我的奖品
 */
export default {
  name: 'Award',
  inject: ['hiddenShareMenu'],
  data: function() {
    return {
      rankData:[
        {
          name: '5元话费',
          source: '大富翁',
          date: '2020-08-12 12:00:22',
          status: 1
        }, {
          name: '15方圆',
          source: '大富翁',
          date: '2020-08-12 12:00:22',
          status: 0
        }, {
          name: '华',
          source: '小兔子本月游戏',
          date: '2020-08-12 12:00:22',
          status: 0
        }
      ]
    }
  },
  mounted() {
    // 隐藏分享按钮
    this.hiddenShareMenu()
  }
}
</script>

<style lang="scss" scoped>
  $row-height: 60px;
  .rank-board-cover {
    width: 100vw;
    min-height: 100vh;
    background-image: url('../assets/rank-board-bg.png');
    background-size: 100% 100%;
    .table-head {
      width: 100vw;
      height: $row-height;
      background-color: white;
      display: flex;
      .table-head-item {
        display: inline-flex;
        width: 33%;
        height: $row-height;
        font-size: 16px;
        font-weight: 500;
        color: #191919;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    }
    .table-row {
      display: flex;
      align-items: center;
      .table-row-item {
        width: 25%;
        height: $row-height;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
         .received {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 32px;
          line-height: 32px;
          background: #DEDEDE;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 500;
          color: #656565;
        }
        .un-received {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 32px;
          line-height: 32px;
          border-radius: 16px;
          background: #FB3D3D;
          border-radius: 21px;
          font-size: 16px;
          font-weight: 500;
          color: #FFFFFF;
        }
      }
    }
    .odd-row {
      background-image: url('../assets/table-row-bg-1.png');
      background-size: 100% 100%;
    }
    .even-row {
      background-image: url('../assets/table-row-bg-2.png');
      background-size: 100% 100%;
    }
  }
</style>