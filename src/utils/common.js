/**
 * 
 * 公用工具类
 * @author ljr
 * 
 */
export default {
  /**
   * 返回格式化的日期字符串 
   * 格式形如：'yyyy-MM-dd HH:mm:ss+S q'
   * @param date 日期
   * @param format 日期格式字符串
   * @returns {string}
   */
  formatDate(date, format) {
    var o = {
      'M+': date.getMonth() + 1, // 月
      'd+': date.getDate(), // 日
      'H+': date.getHours(),
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分钟
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return format
  },
  /**
   * 判断对象是否为null
   * undefined 和 null 都判断为 null
   * @param obj
   * @return {boolean}
   */
  isNull (obj) {
    if (obj === null || obj === undefined) {
      return true
    } else {
      return false
    }
  },
  /**
   *  判断对象是否不为null
   *  undefined 和 null 都判断为 null
   * @param obj
   * @return {boolean}
   */
  isNotNull (obj) {
    return !this.isNull(obj)
  },
  /**
   * 判断对象是否为空，以下情况为空
   * 1、对象为 null 或 undefined
   * 2、对象为空字符串或全都是空格
   * 3、对象为空对象{}，没有属性
   * 4、对象为空数组[],没有元素
   * @return {boolean}
   */
  isEmpty () {
    let flag = false
    let _this = this
    Array.from(arguments).forEach(function(obj) {
      if (_this.isNull(obj)) {
        // 为null
        flag = true
      } else if (typeof obj === 'string' && obj.trim() === '') {
        // 为空字符串 ''
        flag = true
      } else if (Object.keys(obj).length === 0) {
        // 为空对象 {} 或空数组 []
        flag = true
      }
    })
    return flag
  },
  /**
   * 判断对象是否不为空，以下情况为空
   * 1、对象为 null 或 undefined
   * 2、对象为空字符串或全都是空格
   * 3、对象为空对象{}，没有属性
   * 4、对象为空数组[],没有元素
   * @return {boolean}
   */
  isNotEmpty () {
    return !this.isEmpty(arguments)
  },
  /**
   * 判断对象的指定属性是否不为空，以下情况为空
   * 1、对象为 null 或 undefined
   * 2、对象为空字符串或全都是空格
   * 3、对象为空对象{}，没有属性
   * 4、对象为空数组[],没有元素
   * @return {boolean}
   */
  isNotEmptyProperty (obj, property) {
    if (this.isNotEmpty(obj) && this.isNotEmpty(obj[property])) {
      return true
    }
    return false
  },
  /**
   * 判断对象是否为空数组，以下情况返回true
   * 1、对象不是数组
   * 2、对象是数组但是元素个数为0
   * @param obj
   * @return {boolean}
   */
  isEmptyArray (obj) {
    if (Array.isArray(obj) && obj.length > 0) {
      return false
    } else {
      return true
    }
  },
  /**
   * 判断对象是否不为空数组，以下情况返回false
   * 1、对象不是数组
   * 2、对象是数组但是元素个数为0
   * @param obj
   * @return {boolean}
   */
  isNotEmptyArray (obj) {
    return !this.isEmptyArray(obj)
  },
  /**
   * 判断对象是否为空白字符串
   * 只要对象仅由任何空白字符，包括空格、制表符、换页符等等组成就会被认为是空白字符串
   * @param obj
   * @return {boolean}
   */
  isBlank (obj) {
    // \s -> 任何空白字符，包括空格、制表符、换页符等等
    // \f -> 匹配一个换页
    // \n -> 匹配一个换行符
    // \r -> 匹配一个回车符
    // \t -> 匹配一个制表符
    // \v -> 匹配一个垂直制表符
    if (this.isNull(obj) || /^\s*$/.test(obj)) {
      return true
    } else {
      return false
    }
  },
  /**
   * 判断对象是否不是空白字符串
   * 只要对象仅由任何空白字符，包括空格、制表符、换页符等等组成就会被认为是空白字符串
   * @param obj
   * @return {boolean}
   */
  isNotBlank (obj) {
    return !this.isBlank(obj)
  },
  /**
   * 判断对象的指定属性是否不为空白字符
   * @return {boolean}
   */
  isNotBlankProperty (obj, property) {
    if (this.isNotEmpty(obj) && this.isNotBlank(obj[property])) {
      return true
    }
    return false
  },
  wxLoginFun: () => {
    if (process.env.NODE_ENV != 'development') {
      let wappId = window.th.wappId,
        hosturl = location.origin || location.protocol + '//' + location.hostname,
        wredirectUri = `${window.th.Domain}?${hosturl}${window.th.callPage}`
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wappId}&redirect_uri=${wredirectUri}&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect`
      return false
    }
  },
  jiashuju() {
    window.localStorage.setItem("project", "jilin/jilin-seven-v3");
    let barcode = {
      materialId: 131,
      barcode: window.th.gqBarcode2020,
      city: "其他",
      area: "其他",
      province: "其他",
      comId: 164,
      ip: "",
    };
    //这是个假数据，跟积分商城的命名一致
    window.sessionStorage.setItem(
      "jilin/jilin-seven-v3barcodeData",
      JSON.stringify(barcode)
    );
  }
}
