const request = require('superagent')
  , wxApis = require('../wxApis')
  , appId = process.env.APPID
  , appSecret= process.env.APPSECRET
  , redirectUri= process.env.REDIRECTURL

class WX {
  constructor() {

  }

  getAuthUrl(state) {
    const scope = 'snsapi_userinfo'
      , url = `${wxApis.webAuth}?appid=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&state=${state || 'NT'}#wechat_redirect`
    return url
  }

  getAccessToken(code) {
    var getToken = new Promise((resolve, reject)=> {
      request.get(`${wxApis.webAcToken}?appid=${appId}&secret=${appSecret}&code=${code}&grant_type=authorization_code`)
      .end((err, result)=> {
        if(err) reject(JSON.strignify(err))
        // console.log(JSON.parse(result.text)['access_token'])
        if(result.statusCode === 200 && !JSON.parse(result.text).errcode) {
          resolve(JSON.parse(result.text))
        } else {
          resolve({
            errCode: JSON.parse(result.text).errcode,
            data: JSON.parse(result.text),
          })
        }
      })
    })
    return getToken
  }

  getInfo(obj, language) {
    var getInfo = new Promise((resolve, reject)=> {
      request.get(`${wxApis.webInfo}?access_token=${obj.access_token}&openid=${obj.openid}&lang=${language || 'zh_CN'}`)
      .end((err, result)=> {
        if(err) reject(JSON.strignify(err))
        if(result.statusCode === 200 && !JSON.parse(result.text).errcode) {
          resolve(JSON.parse(result.text))
        } else {
          resolve({
            errCode: JSON.parse(result.text).errcode,
            data: JSON.parse(result.text),
          })
        }
      })
    })
    return getInfo
  }

  getRefreshToken(refresh_token) {
    var getToken = new Promise((resolve, reject)=> {
      request.get(`${wxApis.webRefreshToken}?appid=${appId}&grant_type=refresh_token&refresh_token=${refresh_token}`)
      .end((err, result)=> {
        if(err) reject(JSON.strignify(err))
        if(result.statusCode === 200 && !JSON.parse(result.text).errcode) {
          resolve(JSON.parse(result.text))
        } else {
          resolve({
            errCode: JSON.parse(result.text).errcode,
            data: JSON.parse(result.text),
          })
        }
      })
    })
    return getToken
  }

  getOverToken(cgiToken) {
    var overToken = new Promise((resolve, reject)=> {
      request.get(`${wxApis.webRefreshToken}?appid=${appId}&grant_type=refresh_token&refresh_token=${refresh_token}`)
      .end((err, result)=> {
        if(err) reject(JSON.strignify(err))
        if(result.statusCode === 200 && !JSON.parse(result.text).errcode) {
          resolve(JSON.parse(result.text))
        } else {
          resolve({
            errCode: JSON.parse(result.text).errcode,
            data: JSON.parse(result.text),
          })
        }
      })
    })
    return overToken
  }

}

module.exports = WX
