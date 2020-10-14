<template>
  <div class="rank-board-cover">
    <div class="table-head">
      <div class="table-head-item">
        排名
        <span>仅展示前100</span>
      </div>
      <div class="table-head-item">用户</div>
      <div class="table-head-item">登顶次数</div>
    </div>
    <div class="table-row"  :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0, 'my-recorder': index+1 === parseInt(user.rownum)}"
      v-for="(row, index) in rankData" :key="index">
      <div class="table-row-item">
        <span v-if="index === 0" class="number number-1"></span>
        <span v-else-if="index === 1" class="number number-2"></span>
        <span v-else-if="index === 2" class="number number-3"></span>
        <template v-else>
          {{row.rownum}}
        </template>
      </div>
      <div class="table-row-item name-item">
        <img v-if="row.head_img_url" :src="row.head_img_url" alt="">
        <img v-else :src="avatar" alt="">
        <span>{{row.nickname}}</span>
      </div>
      <div class="table-row-item count-item">{{row.reach_num}}</div>
    </div>
    <div class="list-null" v-if="!rankData.length">暂无排行数据</div>
    <div class="summary-mask"></div>
    <div class="summary-cover">
      <div class="summary-con">
        <div class="summary-item item-num">
          <div class="item-title">我的排名</div>
          <div class="item-value">{{user.rownum || '无'}}</div>
        </div>
        <div class="summary-item item-count">
          <div class="item-title">登顶次数</div>
          <div class="item-value">{{user.reach_num || 0}}次</div>
        </div>
        <div class="summary-item item-time">
          <div class="item-title">最后登顶时间</div>
          <div class="item-value" v-html="user.reach_time || '无'"></div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import avatar from "@/assets/avatarImg.jpg";
import API from "@/api/Api";
import CommonUtil from '@/utils/common'
/**
 * 排行榜
 */
export default {
  name: "RankBoard",
  inject: ['hiddenShareMenu'],
  data: function () {
    return {
      avatar: avatar,
      user:{
        rownum:0,
        reach_num:0,
        reach_time:''
      },
      rankData: [],
    };
  },
  async mounted() {
    // 隐藏分享按钮
    this.hiddenShareMenu()
    try {
      // TODO 调接口查询排行榜
      let params = {
        pageNumber: 1,
        pageSize: 100
      }
      let rankResult = await API.getRankRecord(params);
      this.rankData = rankResult.data.list;

      // TODO 自己的排行
      let userResult = await API.getRankByUserId();
      this.user.rownum = userResult.data.rownum||0;
      this.user.reach_num = userResult.data.reach_num||0;
      this.user.reach_time = CommonUtil.formatDate(new Date(userResult.data.reach_time), 'yyyy-MM-dd <br> HH:mm:ss')

    } catch (e) {
      this.$logger.error("初始化排行榜数据失败", e);
      this.$exception.autoHandler(this, e);
    }

  },
};
</script>

<style lang="scss" scoped>
$row-height: 60px;
.rank-board-cover {
  width: 100vw;
  min-height: 100vh;
  background-image: url("../assets/rank-board-bg.png");
  background-size: 100% 100%;
  padding-bottom: 180px;
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
      span {
        display: flex;
        font-size: 12px;
        font-weight: 500;
        color: #666666;
        line-height: 30px;
      }
    }
  }
  .table-row {
    display: flex;
    align-items: center;
    .table-row-item {
      width: 33%;
      height: $row-height;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 500;
    }
    .number {
      width: 35px;
      height: 37px;
      background-size: 80% 80%;
      background-repeat: no-repeat;
      background-position: center;
    }
    .number-1 {
      background-image: url("../assets/1.png");
    }
    .number-2 {
      background-image: url("../assets/2.png");
    }
    .number-3 {
      background-image: url("../assets/3.png");
    }
    .name-item {
      justify-content: flex-start;
      // padding-left: 5%;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 10px;
      }
    }
    @media screen and (min-width: 400px) {
      .name-item {
        padding-left: 5%;
      }
    }
    @media screen and (min-width: 520px) {
      .name-item {
        padding-left: 10%;
      }
    }
    .count-item {
      font-size: 18px;
    }
    @media screen and (min-width: 900px) {
      .name-item {
        padding-left: 15%;
      }
    }
    .count-item {
      font-size: 18px;
    }
  }
  .my-recorder {
    .table-row-item {
      color: red !important;
    }
  }
  .odd-row {
    background-image: url("../assets/table-row-bg-1.png");
    background-size: 100% 100%;
  }
  .even-row {
    background-image: url("../assets/table-row-bg-2.png");
    background-size: 100% 100%;
  }
  .summary-mask {
    height: $row-height;
    position: fixed;
    bottom: 120px;
    width: 100vw;
    background-image: linear-gradient(
      rgba(245, 220, 167, 0.5),
      rgba(245, 220, 167, 1)
    );
  }
  .summary-cover {
    position: fixed;
    bottom: 0px;
    width: 100vw;
    height: 120px;
    background-color: rgba(245, 220, 167, 1);
    .summary-con {
      width: calc(100% - 40px);
      height: 60px;
      border-radius: 10px;
      margin: 20px;
      background-color: rgb(250, 237, 208);
      display: flex;
      padding: 10px 0px;
      .summary-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-right: 1px solid rgb(218, 198, 160);
        &:last-child {
          border-right: none;
        }
        .item-tile {
          height: 20px;
          font-size: 12px;
          font-weight: 500;
        }
        .item-value {
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 12px;
          font-weight: 500;
          color: #e02525;
        }
      }
      .item-num {
        width: 30%;
      }
      .item-count {
        width: 35%;
      }
      .item-time {
        width: 35%;
      }
    }
  }
  .list-null {
    text-align: center;
    padding: 5vw 0;
  }
}
</style>