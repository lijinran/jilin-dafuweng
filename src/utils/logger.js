
import CommonUtil from '@/utils/common'

/**
 * 
 * 日志记录工具
 * @author ljr
 * 
 */
export default {
  // 所有日志层级
  allLevel: ['ERROR','WARN','INFO','DEBUG'],
  // 分别设置对应环境是否启用日志记录工具
  enable: {
    development: true,   // 开发环境
    test: true,          // 测试环境
    production: false    // 正式环境
  },
  // 各个环境对应的日志层级
  enviromentLevel: {
    development: 'DEBUG',  // 开发环境
    test: 'DEBUG',         // 测试环境
    production: 'ERROR'    // 正式环境
  },
  debug: function (...params) {
    if (!this.enable[process.env.NODE_ENV]) {
      return
    }
    let currentLevel = 'DEBUG'
    if (this.includeCurrentLevel(currentLevel)) {
      let dateString = CommonUtil.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss.S')
      let logStr = `[${dateString}][${currentLevel}]${params[0]} `
      console.groupCollapsed(logStr);
      this.printParams(params, currentLevel)
      console.groupEnd()
    }
  },
  info: function (...params) {
    if (!this.enable[process.env.NODE_ENV]) {
      return
    }
    let currentLevel = 'INFO'
    if (this.includeCurrentLevel(currentLevel)) {
      let dateString = CommonUtil.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss.S')
      let logStr = `[${dateString}]%c[${currentLevel}]%c${params[0]} `
      console.groupCollapsed(logStr, 'color:rgb(0,205,0)', 'color:rgb(34,34,34)');
      this.printParams(params, currentLevel)
      console.groupEnd()
    }
  },
  warn: function (...params) {
    if (!this.enable[process.env.NODE_ENV]) {
      return
    }
    let currentLevel = 'WARN'
    if (this.includeCurrentLevel(currentLevel)) {
      let dateString = CommonUtil.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss.S')
      let logStr = `[${dateString}]%c[${currentLevel}]%c${params[0]} `
      console.groupCollapsed(logStr, 'color:rgb(196,160,0)', 'color:rgb(34,34,34)');
      this.printParams(params, currentLevel)
      console.groupEnd()
    }
  },
  error: function (...params) {
    if (!this.enable[process.env.NODE_ENV]) {
      return
    }
    let currentLevel = 'ERROR'
    if (this.includeCurrentLevel(currentLevel)) {
      let dateString = CommonUtil.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss.S')
      let logStr = `[${dateString}]%c[${currentLevel}]%c${params[0]} `
      console.groupCollapsed(logStr, 'color:red', 'color:rgb(34,34,34)');
      this.printParams(params, currentLevel)
      console.groupEnd()
    }
  },
  printParams (param, level) {
    if (Array.isArray(param)) {
      param.forEach(item => {
        if (level === 'DEBUG') {
          console.trace(item)
        } else if (level === 'INFO') {
          console.trace(item)
        } else if (level === 'WARN') {
          console.trace(item)
        } else if (level === 'ERROR') {
          console.trace(item)
        }
      })
    }
  },
  includeCurrentLevel(level) {
    let enviroment = process.env.NODE_ENV
    let currentEnviromentLevel = this.enviromentLevel[enviroment]
    if (this.allLevel.indexOf(level) <= this.allLevel.indexOf(currentEnviromentLevel)) {
      return true
    } else {
      return false
    }
  }
}
