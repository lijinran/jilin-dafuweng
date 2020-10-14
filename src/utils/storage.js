import LoggerUtil from '@/utils/logger'
import CommonUtil from '@/utils/common'
import ExceptionUtil from '@/utils/exception'

/**
 * 应用数据存储工具类
 * 摘自:/jilin-ucenter/components/ommon/common.js
 */

let DOC = document
let HOST = {
  prefix: window.localStorage.getItem("project") || "__jilin__",
  // prefix: '',
  port: process.env.BASE_URL
}
//存储键值对
function storeValue(key, value, type = "url", expiredays = "") {
  switch (type) {
    case "url":
      return "&" + encodeURIComponent(key) + "=" + encodeURIComponent(value);
    case "local":
      window.localStorage && localStorage.setItem(HOST.prefix + key, value);
      break;
    case "session":
      window.sessionStorage && sessionStorage.setItem(HOST.prefix + key, value);
      break;
    case "cookie":
      setCookie(HOST.prefix + key, value, expiredays);
      break;
  }
}
//提取值
function getValue(key, type = "url") {
  switch (type) {
    case "url": return getParamValue(key);
    case "local": return localStorage.getItem(HOST.prefix + key);
    case "session": return sessionStorage.getItem(HOST.prefix + key);
    case "cookie": return getCookie(HOST.prefix + key);
  }
}
//删除值
function deleteValue(key, type1) {
  var type = type1 || "all"
  if (!key) {
    localStorage.clear();
    sessionStorage.clear()
    return
  }
  switch (type) {
    case "all":
      localStorage.removeItem(HOST.prefix + key)
      sessionStorage.removeItem(HOST.prefix + key)
      setCookie(HOST.prefix + key, "", -1)
      break;
    case "local":
      localStorage.removeItem(HOST.prefix + key)
      break
    case "session":
      sessionStorage.removeItem(HOST.prefix + key)
      break
    case "cookie":
      setCookie(HOST.prefix + key, "", -1)
      break
  }
}
//设置cookie
function setCookie(c_name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  DOC.cookie = c_name + "=" + decodeURI(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

//获取cookie
function getCookie(cookieName) {
  var start = DOC.cookie.indexOf(cookieName + "=")
  if (start == -1) {
      return ""
  }
  start = start + cookieName.length + 1;
  var end = DOC.cookie.indexOf(";", start)
  if (end == -1) {
      end = DOC.cookie.length
  }
  return decodeURIComponent(DOC.cookie.substring(start, end))
}
//url中提取值辅助函数
function getUrlparams() {
  var src = window.location.search,
      arr = src.substr(1, src.length - 1).split("&"),
      returnObj = {}
  if (arr !== null) {
      for (var i = 0, l = arr.length; i < l; i++) {
          var value = arr[i].split("=")
          if (value && value.length > 1) {
              returnObj[decodeURIComponent(value[0])] = decodeURIComponent(value[1])
          }
      }
  }
  return returnObj;
}
//url中提取值
function getParamValue(name) {
  var param = getUrlparams()
  if (param[name]) {
      return param[name]
  }
  return null;
}
// 获取用户微信登录数据
function getWxLoginData () {
  let wxLogin = window.localStorage.getItem('wxLogin');
  if (process.env.NODE_ENV == 'development') {
    wxLogin = process.env.VUE_APP_WX_LOGIN
  }
  wxLogin = wxLogin && JSON.parse(wxLogin)
  if (CommonUtil.isEmpty(wxLogin)) {
    CommonUtil.jiashuju();
    CommonUtil.wxLoginFun()
    LoggerUtil.error('wxLogin为空，用户未登录', wxLogin)
    throw ExceptionUtil.UN_LOGIN
  }
  return wxLogin
}
function getBarData () {
  let barData = getValue('barcodeData', 'session')
  // let barData = {}
  // barData.barcode = window.th.gqBarcode2020;
  barData = barData && JSON.parse(barData);
  return barData
}
export default {
  storeValue: storeValue,
  getValue: getValue,
  deleteValue: deleteValue,
  getWxLoginData: getWxLoginData,
  getBarData: getBarData
}