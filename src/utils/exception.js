import CommonUtil from '@/utils/common'

export default {
  EMPTY_API_RESPONSE: {
    code: 1001,
    name: 'emptyApiResponse',
    description: '接口返回数据为空',
    tips: '接口返回数据为空'
  },
  NETWORK_ERROR: {
    code: 1002,
    name: 'networkError',
    description: '接口请求失败',
    tips: '接口请求失败'
  },
  UN_LOGIN: {
    code: 1100,
    name: 'UnLoginException',
    description: '当前用户未登录',
    tips: '当前用户未登录，请先微信登录'
  },
  OVER_INVITE_LIMIT_TODAY: {
    code: 1101,
    name: 'overInviteLimitToday',
    description: '今天的分享次数已达上限',
    tips: '您今天的分享次数已达上限'
  },
  GET_WX_SHARE_CONFIG_FAIL: {
    code: 1102,
    name: 'getWxShareConfigFail',
    description: '获取微信分享权限验证配置失败',
    tips: '获取微信分享配置失败'
  },
  GET_USER_SHARE_TOKEN_FAIL: {
    code: 1103,
    name: 'getUserShareTokenFail',
    description: '未获取到分享用户token',
    tips: '获取分享信息失败'
  },
  autoHandler (vm, e) {
    if (CommonUtil.isNotBlankProperty(e, 'tips')) {
      vm.$alert.show(e.tips)
    }
  },
  assertEquals(exceptionType, exception) {
    return CommonUtil.isNotEmpty(exceptionType, exception) && exceptionType.code === exception.code
  }
}