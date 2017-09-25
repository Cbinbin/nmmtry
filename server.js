const express = require('express')
  , server = express()
  , LogNoted = require('./log.js')
  , mylogger = new LogNoted({
    info: true,
    error: true,
    warn: true,
  })

const cors = require('cors')
  , bodyParser = require('body-parser')

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.use('/logs', express.static('logs'))
// server.use(mylogger.connectLogger())    //http请求体打印 eg. [2017-09-24 17:04:34.050] [INFO] default - ::1 - - "GET / HTTP/1.1" 304 - "" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36"

require('./dbConnect')
require('dotenv').config()

const port = process.env.PORT
  , home = require('./home')

server.use('/', home)

// mylogger.noteInfo('I am a Info')
// mylogger.noteError('I am a Error')
// mylogger.noteWarn('I am a Warn')
// mylogger.noteDebug('I am a Debug')
// mylogger.noteTrace('I am a Trace')
// mylogger.noteFatal('I am a Fatal')
// console.info('1')
// console.error('2')
// console.warn('3')
// console.debug('4')
// console.trace('5')
// console.fatal('6')

server.listen(port, ()=> {
  console.log('Server is ruuning on port: ' + port)
})
