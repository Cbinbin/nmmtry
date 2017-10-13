const deviceId_find_db = require('./tcp/deviceId_find_db')
const save_to_db = require('./tcp/save_to_db')
const to_app_data = require('./tcp/to_app_data')
const myEmitter = require('./tcp/emitter')
const redis = require('./redis_tcp')


let huancun = ''
let stampKeyArr = []
let incNum = 0
let runSaveToDB = true


const server = net.createServer()
server.on('connection', handleConnection);

server.listen(9000, function() {  
  console.log('server listening to %j', server.address());
})

function saveDB(run, stampArr) {
  let nextRun = true
  if(run && stampArr.length > 0) {
    setTimeout(() => {
      for(var i = 0; i < 2; i++) {
        if(stampArr[i]) {
          redis.get(stampArr[i], (err, replie)=> {
            if(err) return console.log('redisErr:' + err)

            save_to_db(JSON.parse(replie))
          })
        }
      }
      stampArr.splice(0, 2)
      if(stampArr.length == 0) nextRun = false
      if(nextRun) saveDB(run, stampArr)
      else return 
    }, 1000*3 )
    stampArr.splice(0, 2)
    if(stampArr.length == 0) {
      return true
    }
  }
}

function handleConnection(conn) {

  const remoteAddress = conn.remoteAddress + ':' + conn.remotePort
  // logger.info('new client connection from %s', remoteAddress)

  conn.on('data', onConnData)
  conn.once('close', onConnClose)
  conn.on('error', onConnError)

  conn.setEncoding('utf8')

  async function onConnData(d) {
    // logger.info('connection data from %s: %j', remoteAddress, d)
    // logger.info('DRM_DATA:', d)
    // logger.info('DRM_DATA:', transform_data(d))
    if(d.replace(/\$\$/g, '') !== d) {
      // console.log(true)
      d = huancun + d.replace(/\$\$/g, '')
      huancun = ''
    } else {
      huancun += d
      return 
    }
    
    const dataSource = verify_source(d)
    const nowtime_stamp = new Date().getTime().toString()
    incNum += 1
    stampKeyArr.push(`drm_${nowtime_stamp}_${incNum}`)
    
    if(dataSource === 'hardware') {
      try {
        const normal_data = transform_data(d, conn)
        // console.log(normal_data)
        const device_data = await deviceId_find_db(normal_data)
        if(device_data) {
          myEmitter.emit('coming', to_app_data(normal_data))
          redis.set(`drm_${nowtime_stamp}_${incNum}`, JSON.stringify(normal_data))
        } else {
          logger.info(`save failed: Didn't found this deviceId`)
          console.log(`Didn't found this deviceId`)
          // conn.write('NONOP')
        }
        const judgeS = await saveDB(runSaveToDB, stampKeyArr)
        if(judgeS) {
          runSaveToDB = true
        } else runSaveToDB = false
        console.log('runSaveToDB: ' + runSaveToDB)
      } catch(e) {
        console.error(e)
      }
      conn.write('NOP')
    }

    incNum >= 1000000 ? incNum = 0 : null

    if(dataSource === 'app') {

    }
  }

  function onConnClose() {
    logger.info('connection from %s closed', remoteAddress);
  }

  function onConnError(err) {
    logger.info('Connection %s error: %s', remoteAddress, err.message);
  }
}

module.exports = server