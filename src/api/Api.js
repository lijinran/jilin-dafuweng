import HttpUtil from '@/utils/http'

let ApiConfigData = {
  // 查看当前用户还有多少次掷色子的机会
  getUserShakerCount: {
    url: 'cloud2.activity.api/monopoly/getRemainChance',
    type: 'GET',
    options: {
      userToken: true
    }
  },
  // 摇色子获取点数
  rolldice: {
    url: 'cloud2.activity.api/monopoly/rolldice',
    type: 'GET',
    options: {
      userToken: true,
      emptyResponseQuickFail: true
    }
  },
  // 格子奖励---暂不用
  gridAward: {
    url: 'cloud2.activity.api/monopoly/gridAward',
    type: 'GET',
    options: {
      userToken: true,
      emptyResponseQuickFail: true
    }
  },
  // 登顶()
  reach: {
    url: 'cloud2.activity.api/monopoly/reach',
    type: 'GET',
    options: {
      userToken: true,
      emptyResponseQuickFail: true
    }
  },
  // 用户所在格子点数
  getCurrentGrid: {
    url: 'cloud2.activity.api/monopoly/getCurrentGrid',
    type: 'GET',
    options: {
      userToken: true,
      emptyResponseQuickFail: true
    }
  },
  // 用户宝箱增加
  gainTreasureNum: {
    url: 'cloud2.activity.api/mystery/gainTreasureNum',
    type: 'GET',
    options: {
      userToken: true,
      emptyResponseQuickFail: true
    }
  },
  // 用户开宝箱
  openTreasure: {
    url: 'cloud2.activity.api/mystery/openTreasure',
    type: 'GET',
    options: {
      userToken: true,
      emptyResponseQuickFail: true
    }
  },
  // 用户是否没有玩游戏
  unPlayGame: {
    url: 'cloud2.activity.api/mystery/unPlayGame',
    type: 'GET',
    options: {
      userToken: true,
      emptyResponseQuickFail: true
    }
  },
  // 抽奖
  doDrawLottery: {
    url: 'cloud2.activity.api/monopoly/doDrawLottery',
    type: 'GET',
    options: {
      userToken: true,
      emptyResponseQuickFail: true
    }
  },
  // 使用话费
  useCalls: {
    url: 'cloud2.member.api/member/userGain/useCalls.do',
    type: 'GET',
    options: {
      userToken: true,
      barCode: true,
      emptyResponseQuickFail: true
    }
  },
  // 保存收获地址
  saveReceiveAddress: {
    url: 'cloud2.member.api/member/userGain/createAddress.do',
    type: 'GET',
    options: {
      userToken: true,
      emptyResponseQuickFail: true
    }
  },
  //获取登顶排行  
  getRankRecord: {
    url: 'cloud2.activity.api/rank/getRankRecord',
    type: 'GET',
    options: {
      userToken: true,
      emptyResponseQuickFail: true
    }
  },
  //获取用户自己的登顶排行 
  getRankByUserId: {
    url: 'cloud2.activity.api/rank/getRankByUserId',
    type: 'GET',
    options: {
      userToken: true,
      emptyResponseQuickFail: true
    }
  },
  // 活动规则 type （monopoly：大富翁，mystery：神秘洞窟）
  getShakerRule: {
    url: 'cloud2.activity.api/monopoly/monopolyDescription',
    type: 'GET',
    options: {
      userToken: true,
      emptyResponseQuickFail: true
    }
  },
  // 时间接口
  getLimitTime: {
    url: 'cloud2.activity.api/monopoly/getLimitTime',
    type: 'GET',
    options: {
      userToken: true,
      emptyResponseQuickFail: true
    }
  },

  // 国庆用户增加摇色子机会
  addChanceByShare: {
    url: 'cloud2.activity.api/monopoly/addChanceByShare',
    type: 'GET',
    options: {
      userToken: true,
      emptyResponseQuickFail: true
    }
  },

  // 检查是否达到分享上限 - 暂不用
  checkInviteLimit: {
    url: 'cloud2.member.api/userArchitectureTask/checkInviteLimit.do',
    type: 'GET',
    options: {
      userToken: true,
      emptyResponseQuickFail: true
    }
  },
  // 获取用户分享token 加 type=monopoly
  getInviteToken: {
    url: 'cloud2.member.api/member/userInfo/encryptedUser.do',
    type: 'GET',
    options: {
      userToken: true,
    }
  },
  // 获取微信分享配置信息
  getShareConfig: {
    url: 'cloud2.member.api/member/userInfo/shareMessage.do',
    type: 'GET',
    options: {
      userToken: true,
    }
  },

  //经纬度转地址
  queryLocationInfo: {
    url: 'cloud2.barcode.api/order/info/queryLocationInfo.do',
    type: 'GET',
    options: {
      userToken: false,
    }
  },
  // 查询手机号是否绑定
  queryPhoneBind: {
    url: 'cloud2.member.api/member/userInfo/queryPhoneIsBind.do',
    type: 'GET',
    options: {
      userToken: true
    }
  }



}

export default HttpUtil.decorateApi(ApiConfigData)