const express = require('express')
  , server = express()
  , LogNoted = require('./log.js')
  , mylogger = new LogNoted()

const cors = require('cors')
  , bodyParser = require('body-parser')

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.use('/logs', express.static('logs'))
server.use(mylogger.connectLogger())

require('dotenv').config()

const port = process.env.PORT

mylogger.noteInfo('I am a Info')
mylogger.noteError('I am a Error')
mylogger.noteWarn('I am a Warn')
mylogger.noteDebug('I am a Debug')
mylogger.noteTrace('I am a Trace')
mylogger.noteFatal('I am a Fatal')

server.listen(port, ()=> {
  console.log('Server is ruuning on port: ' + port)
  console.info('1')
  console.error('2')
  console.warn('3')
  console.debug('4')
  console.trace('5')
  console.fatal('6')
})
