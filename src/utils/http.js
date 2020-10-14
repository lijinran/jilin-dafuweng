import Axios from 'axios'
import CommonUtil from '@/utils/common'
import StorageUtil from '@/utils/storage'
import ExceptionUtil from '@/utils/exception'
import LoggerUtil from '@/utils/logger'
import VueInstance from '@/main'

/**
 * HTTP 类型 API 请求工具类
 * 
 * API可选配置项：
 * 1、url: 必填，接口地址
 * 2、type: 必填，请求类型，支持GET、POST、HEAD、PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH请求类型
 * 3、options.userToken 可选，是否在请求参数中注入微信登录的 userToken，true:注入，false:不注入
 * 4、options.barCode 可选，是否注入 barCode ，true:注入, false:不注入
 * 5、options.emptyResponseQuickFail 可选，true:接口返回数据为空时进行快速失败，抛出 EMPTY_API_RESPONSE 异常 ，false:不启用快速失败机制
 * 
 * @author ljr
 */
export default {
  /**
   * 根据传入的 API 配置对象封装对应的 API 函数
   * api配置对象可选参数：

   * @param ApiConfigData API 配置对象
   * @return 封装后的 API 对象
   */
  decorateApi (ApiConfigData) {
    let apiObject = {};
    let _this = this
    Object.keys(ApiConfigData).forEach(function (apiName) {
      let apiConfig = ApiConfigData[apiName]
      apiObject[apiName] = _this.generateHttpApiFunction(apiConfig)
    });
    return apiObject;
  },
  /**
   * 根据 API 配置的 HTTP 请求类型生成对应的 API 函数
   * @param apiConfig api配置信息
   * @return HTTP API Promise 对象
   */
  generateHttpApiFunction (apiConfig) {
    let apiFunction = null
    switch (apiConfig.type) {
      case 'GET': apiFunction = this.generateHttpGetApi(apiConfig); break;
      case 'POST': apiFunction = this.generatHttpePostApi(apiConfig); break;
      case 'HEAD': apiFunction = this.generateHttpHeadApi(apiConfig); break;
      case 'PUT': apiFunction = this.generateHttpPutApi(apiConfig); break;
      case 'DELETE': apiFunction = this.generateHttpDeleteApi(apiConfig); break;
      case 'CONNECT': apiFunction = this.generateHttpConnectApi(apiConfig); break;
      case 'OPTIONS': apiFunction = this.generateHttpOptionsApi(apiConfig); break;
      case 'TRACE': apiFunction = this.generateHttpTraceApi(apiConfig); break;
      case 'PATCH': apiFunction = this.generateHttpPatchApi(apiConfig); break;
    }
    return apiFunction
  },
  /**
   * 生成 HTTP GET 请求类型的 API 函数
   * @param apiConfig api配置信息
   * @return HTTP API Promise 对象
   */
  generateHttpGetApi (apiConfig) {
    let _this = this
    return function () {
      let apiData = _this.injectParameters(apiConfig, arguments)
      return new Promise((resolve, reject) => {
        let url = `${_this.getBaseUrl()}${apiConfig.url}${_this.decorateGetParameters(apiConfig, apiData)}`
        Axios.get(url)
        .then(response => {
          if (_this.emptyResponseQuickFail(apiConfig, response)) {
            reject(ExceptionUtil.EMPTY_API_RESPONSE)
          } else {
            if(response.data.code==601){
              console.log('登录超时')
              CommonUtil.jiashuju()
              CommonUtil.wxLoginFun()
            }else{
              resolve(response.data)
            }
            
          }
        })
        .catch(error => {
          LoggerUtil.error(error)
          _this.handleNetworkErrorException(reject, error)
          _this.handleInterServerError(error)
          reject(error)
        })
      })
    }
  },
  /**
   * 生成 HTTP POST 请求类型的 API 函数
   * @param apiConfig api配置信息
   * @return HTTP API Promise 对象
   */
  generatHttpePostApi (apiConfig) {
    let _this = this
    return function () {
      let apiData = _this.injectParameters(apiConfig, arguments)
      return new Promise((resolve, reject) => {
        let url = `${_this.getBaseUrl()}${apiConfig.url}`
        Axios.post(url, apiData)
        .then((response) => {
          if (_this.emptyResponseQuickFail(apiConfig, response)) {
            reject(ExceptionUtil.EMPTY_API_RESPONSE)
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          LoggerUtil.error(error)
          _this.handleNetworkErrorException(reject, error)
          _this.handleInterServerError(error)
          reject(error)
        })
      })
    }
  },
  /**
   * 生成 HTTP HEAD 请求类型的 API 函数
   * @param apiConfig api配置信息
   * @return HTTP API Promise 对象
   */
  generateHttpHeadApi (apiConfig) {
    let _this = this
    return function () {
      return new Promise((resolve, reject) => {
        Axios.head(apiConfig.url)
        .then((response) => {
          if (_this.emptyResponseQuickFail(apiConfig, response)) {
            reject(ExceptionUtil.EMPTY_API_RESPONSE)
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(error)
        })
      })
    }
  },
  /**
   * 生成 HTTP PUT 请求类型的 API 函数
   * @param apiConfig api配置信息
   * @return HTTP API Promise 对象
   */
  generateHttpPutApi (apiConfig) {
    let _this = this
    return function () {
      return new Promise((resolve, reject) => {
        Axios.put(apiConfig.url)
        .then((response) => {
          if (_this.emptyResponseQuickFail(apiConfig, response)) {
            reject(ExceptionUtil.EMPTY_API_RESPONSE)
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(error)
        })
      })
    }
  },
  /**
   * 生成 HTTP DELETE 请求类型的 API 函数
   * @param apiConfig api配置信息
   * @return HTTP API Promise 对象
   */
  generateHttpDeleteApi (apiConfig) {
    let _this = this
    return function () {
      return new Promise((resolve, reject) => {
        Axios.delete(apiConfig.url)
        .then((response) => {
          if (_this.emptyResponseQuickFail(apiConfig, response)) {
            reject(ExceptionUtil.EMPTY_API_RESPONSE)
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(error)
        })
      })
    }
  },
  /**
   * 生成 HTTP CONNECT 请求类型的 API 函数
   * @param apiConfig api配置信息
   * @return HTTP API Promise 对象
   */
  generateHttpConnectApi (apiConfig) {
    let _this = this
    return function () {
      return new Promise((resolve, reject) => {
        Axios.connect(apiConfig.url)
        .then((response) => {
          if (_this.emptyResponseQuickFail(apiConfig, response)) {
            reject(ExceptionUtil.EMPTY_API_RESPONSE)
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(error)
        })
      })
    }
  },
  /**
   * 生成 HTTP OPTIONS 请求类型的 API 函数
   * @param apiConfig api配置信息
   * @return HTTP API Promise 对象
   */
  generateHttpOptionsApi (apiConfig) {
    let _this = this
    return function () {
      return new Promise((resolve, reject) => {
        Axios.options(apiConfig.url)
        .then((response) => {
          if (_this.emptyResponseQuickFail(apiConfig, response)) {
            reject(ExceptionUtil.EMPTY_API_RESPONSE)
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(error)
        })
      })
    }
  },
  /**
   * 生成 HTTP TRACE 请求类型的 API 函数
   * @param apiConfig api配置信息
   * @return HTTP API Promise 对象
   */
  generateHttpTraceApi (apiConfig) {
    let _this = this
    return function () {
      return new Promise((resolve, reject) => {
        Axios.trace(apiConfig.url)
        .then((response) => {
          if (_this.emptyResponseQuickFail(apiConfig, response)) {
            reject(ExceptionUtil.EMPTY_API_RESPONSE)
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(error)
        })
      })
    }
  },
  /**
   * 生成 HTTP PATCH 请求类型的 API 函数
   * @param apiConfig api配置信息
   * @return HTTP API Promise 对象
   */
  generateHttpPatchApi (apiConfig) {
    let _this = this
    return function () {
      return new Promise((resolve, reject) => {
        Axios.patch(apiConfig.url)
        .then((response) => {
          if (_this.emptyResponseQuickFail(apiConfig, response)) {
            reject(ExceptionUtil.EMPTY_API_RESPONSE)
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(error)
        })
      })
    }
  },
  /**
   * 封装 HTTP GET 请求类型的请求参数
   * @param apiConfig api配置信息
   * @param parameterObject 对象形式的请求参数
   * @return 字符串形式的请求参数
   */
  decorateGetParameters (apiConfig, parameterObject) {
    if (CommonUtil.isEmpty(parameterObject)) {
      return ''
    }
    let urlParameter = '?'
    // 数据
    Object.keys(parameterObject).forEach((parameterName, index) => {
      let flag = index === 0 ? '' : '&'
      urlParameter += `${flag}${parameterName}=${parameterObject[parameterName]}`
    })
    return urlParameter
  },
  /**
   * 根据 API 配置信息注入 userToken 等数据
   * @param apiConfig API 配置
   * @param apiData 接口参数
   * @return 注入 token 等内容的请求参数对象
   */
  injectParameters (apiConfig, apiData) {
    // data
    let injectedParameters = {}
    if (CommonUtil.isNotEmpty(apiData) && CommonUtil.isNotNull(apiData[0])) {
      injectedParameters = Object.assign(apiData[0])
    }
    let wxLogin = StorageUtil.getWxLoginData()
    let barData = StorageUtil.getBarData()
    // userToken
    if (apiConfig.options.userToken) {
      let userToken = wxLogin.userToken;
      injectedParameters['userToken'] = userToken
    }
    // barcode
    if (apiConfig.options.barCode) {
      let barcode = barData.barcode;
      injectedParameters['barcode'] = barcode
    }
    return injectedParameters
  },
  /**
   * 启用接口快速失败机制，调用接口后不需要再判断返回数据是否为空
   * options.emptyResponseQuickFail 设置为true,
   * 且接口返回值为空时返回true， 否则返回false
   * @param apiConfig 接口配置
   * @param apiResponse 接口返回数据
   */
  emptyResponseQuickFail (apiConfig, apiResponse) {
    if (CommonUtil.isNotEmpty(apiConfig.options) && apiConfig.options.emptyResponseQuickFail && CommonUtil.isEmpty(apiResponse)) {
      LoggerUtil.error(ExceptionUtil.EMPTY_API_RESPONSE)
      return true
    } else {
      return false
    }
  },
  handleNetworkErrorException(reject, error){
    if (error.toString().indexOf('Network Error') !== -1) {
      VueInstance.$alert.show('网络异常')
      reject(ExceptionUtil.NETWORK_ERROR)
    }
  },
  handleInterServerError(error){
    if (error.response.status === 500) {
      VueInstance.$alert.show('网络异常，请稍后重试')
    }
  },
  getBaseUrl () {
    return process.env.VUE_APP_URL
  }
}