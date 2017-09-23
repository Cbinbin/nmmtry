const log4js = require('log4js')

class LogNoted {
  constructor() {
    log4js.configure({
      appenders: {
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
      }, 
      categories: {
        default: { appenders: ['console'], level: 'all' },
        infoLog: { appenders: ['infoFile'], level: 'info' },
        errorLog: { appenders: ['errorFile'], level: 'error' },
        warnLog: { appenders: ['warnFile'], level: 'warn' },
        debugLog: { appenders: ['debugFile'], level: 'debug' },
        traceLog: { appenders: ['traceFile'], level: 'trace' },
        fatalLog: { appenders: ['fatalFile'], level: 'fatal' },
      }
    })

    this.defaultLogger = log4js.getLogger('default')
    this.loggerIn = log4js.getLogger('infoLog')
    this.loggerEr = log4js.getLogger('errorLog')
    this.loggerWa = log4js.getLogger('warnLog')
    this.loggerDe = log4js.getLogger('debugLog')
    this.loggerTr = log4js.getLogger('traceLog')
    this.loggerFa = log4js.getLogger('fatalLog')

    console.info = this.defaultLogger.info.bind(this.defaultLogger)
    console.error = this.defaultLogger.error.bind(this.defaultLogger)
    console.warn = this.defaultLogger.warn.bind(this.defaultLogger)
    console.debug = this.defaultLogger.debug.bind(this.defaultLogger)
    console.trace = this.defaultLogger.trace.bind(this.defaultLogger)
    console.fatal = this.defaultLogger.fatal.bind(this.defaultLogger)
  }

  noteInfo(str) {
    this.loggerIn.info(str)
    this.defaultLogger.info(str)
  }

  noteError(str) {
    this.loggerEr.error(str)
    this.defaultLogger.error(str)
  }

  noteWarn(str) {
    this.loggerWa.warn(str)
    this.defaultLogger.warn(str)
  }

  noteDebug(str) {
    this.loggerDe.debug(str)
    this.defaultLogger.debug(str)
  }

  noteTrace(str) {
    this.loggerTr.trace(str)
    this.defaultLogger.trace(str)
  }

  noteFatal(str) {
    this.loggerFa.fatal(str)
    this.defaultLogger.fatal(str)
  }

  connectLogger() {    //I didn't know why to do?
    const loggerA = log4js.getLogger()
    return log4js.connectLogger(loggerA)
  }

}

module.exports = LogNoted
