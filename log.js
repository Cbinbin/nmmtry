const log4js = require('log4js')

class LogNoted {
  constructor(obj) {
    var appendersParam = {
      console: {　
        type: 'console',
      },
      infoFile: {
        type: 'dateFile',
        filename: 'logs/info/logInfo',
        pattern: "-yyyyMMdd.log",
        maxLogSize: 1024,
        alwaysIncludePattern: true,
        backups: 3, 
      },
      errorFile: {
        type: 'dateFile',
        filename: 'logs/error/logError',
        pattern: "-yyyyMMdd.log",
        maxLogSize: 1024,
        alwaysIncludePattern: true,
        backups: 3, 
      },
      warnFile: {
        type: 'dateFile',
        filename: 'logs/warn/logWarn',
        pattern: "-yyyyMMdd.log",
        maxLogSize: 1024,
        alwaysIncludePattern: true,
        backups: 3, 
      },
      debugFile: {
        type: 'dateFile',
        filename: 'logs/debug/logDebug',
        pattern: "-yyyyMMdd.log",
        maxLogSize: 1024,
        alwaysIncludePattern: true,
        backups: 3, 
      },
      traceFile: {
        type: 'dateFile',
        filename: 'logs/trace/logTrace',
        pattern: "-yyyyMMdd.log",
        maxLogSize: 1024,
        alwaysIncludePattern: true,
        backups: 3, 
      },
      fatalFile: {
        type: 'dateFile',
        filename: 'logs/fatal/logFatal',
        pattern: "-yyyyMMdd.log",
        maxLogSize: 1024,
        alwaysIncludePattern: true,
        backups: 3, 
      },
    }
      , categoriesParam = {
      default: { appenders: ['console'], level: 'all' },
      infoLog: { appenders: ['infoFile'], level: 'info' },
      errorLog: { appenders: ['errorFile'], level: 'error' },
      warnLog: { appenders: ['warnFile'], level: 'warn' },
      debugLog: { appenders: ['debugFile'], level: 'debug' },
      traceLog: { appenders: ['traceFile'], level: 'trace' },
      fatalLog: { appenders: ['fatalFile'], level: 'fatal' },
    }

    obj.info ? null : ( delete appendersParam.infoFile, delete categoriesParam.infoLog )
    obj.error ? null : ( delete appendersParam.errorFile, delete categoriesParam.errorLog )
    obj.warn ? null : ( delete appendersParam.warnFile, delete categoriesParam.warnLog )
    obj.debug ? null : ( delete appendersParam.debugFile, delete categoriesParam.debugLog )
    obj.trace ? null : ( delete appendersParam.traceFile, delete categoriesParam.traceLog )
    obj.fatal ? null : ( delete appendersParam.fatalFile, delete categoriesParam.fatalLog )

    log4js.configure({
      appenders: appendersParam,
      categories: categoriesParam,
    })
    this.defaultLogger = log4js.getLogger('default')

    if(obj.info) {
      this.loggerIn = log4js.getLogger('infoLog')
      console.info = params=> {
        this.loggerIn.info(params)
        return this.defaultLogger.info(params)
      }
    }

    if(obj.error) {
      this.loggerEr = log4js.getLogger('errorLog')
      console.error = params=> {
        this.loggerEr.error(params)
        return this.defaultLogger.error(params)
      }
    }

    if(obj.warn) {
      this.loggerWa = log4js.getLogger('warnLog')
      console.warn = params=> {
        this.loggerWa.warn(params)
        return this.defaultLogger.warn(params)
      }
    }

    if(obj.debug) {
      this.loggerDe = log4js.getLogger('debugLog')
      console.debug = params=> {
        this.loggerDe.debug(params)
        return this.defaultLogger.debug(params)
      }
    }

    if(obj.trace) {
      this.loggerTr = log4js.getLogger('traceLog')
      console.trace = params=> {
        this.loggerTr.trace(params)
        return this.defaultLogger.trace(params)
      }
    }

    if(obj.fatal) {
      this.loggerFa = log4js.getLogger('fatalLog')
      console.fatal = params=> {
        this.loggerFa.fatal(params)
        return this.defaultLogger.fatal(params)
      }
    }

  }

  noteInfo(str) {
    if(this.loggerIn) {
      this.loggerIn.info(str)
      this.defaultLogger.info(str)
    } else return console.error(`'noteInfo' is not a function`)
  }

  noteError(str) {
    if(this.loggerEr) {
      this.loggerEr.error(str)
      this.defaultLogger.error(str)
    } else return console.error(`'noteError' is not a function`)
  }

  noteWarn(str) {
    if(this.loggerWa) {
      this.loggerWa.warn(str)
      this.defaultLogger.warn(str)
    } else return console.error(`'noteWarn' is not a function`)
  }

  noteDebug(str) {
    if(this.loggerDe) {
      this.loggerDe.debug(str)
      this.defaultLogger.debug(str)
    } else return console.error(`'noteDebug' is not a function`)
  }

  noteTrace(str) {
    if(this.loggerTr) {
      this.loggerTr.trace(str)
      this.defaultLogger.trace(str)
    } else return console.error(`'noteTrace' is not a function`)
  }

  noteFatal(str) {
    if(this.loggerFa) {
      this.loggerFa.fatal(str)
      this.defaultLogger.fatal(str)
    } else return console.error(`'noteFatal' is not a function`)
  }

  connectLogger() {    //I didn't know why to do?
    const loggerA = log4js.getLogger()
    return log4js.connectLogger(loggerA)
  }

}

module.exports = LogNoted
