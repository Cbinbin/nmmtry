const request = require('superagent')
  , WXBizDataCrypt = require('../WXBizDataCrypt')
  , wxxcxApis = require('../wxxcxApis')
  , appID = process.env.XCXID2
  , appSecret = process.env.XCXSECRET2

class XCX {
  constructor(obj) {
    this.xcxId = obj && obj.AppID ? obj.AppID : appID
    this.xcxSecret = obj && obj.AppSecret ? obj.AppSecret : appSecret
    this.templateId = obj && obj.TemplateId ? obj.TemplateId : null
  }

  getInfo(params) {
    params = params ? params : {}
    let { code, iv, encryptedData } = params
    var xcxinfo = new Promise((resolve, reject)=> {
      if (!code || !iv || !encryptedData) return resolve({
        errCode: 505,
        data: 'Missing Query String!',
      })
      request.get(`${wxxcxApis.session}?appid=${this.xcxId}&secret=${this.xcxSecret}&js_code=${code}&grant_type=authorization_code`)
      .end((err, result)=> {
        if(err) return reject(JSON.stringify(err))
        if(!JSON.parse(result.text).errcode) {
          const sessionKey = JSON.parse(result.text).session_key
          const pc = new WXBizDataCrypt(this.xcxId, sessionKey)
          const wxInfo = pc.decryptData(encryptedData, iv)
          delete wxInfo.watermark
          resolve({
            errCode: 0,
            data: wxInfo,
          })
        } else resolve({
          errCode: JSON.parse(result.text).errcode,
          data: JSON.parse(result.text),
        })
      })
    })
    return xcxinfo
  }

  getToken() {
    var xcxtoken = new Promise((resolve, reject)=> {
      request.get(`${wxxcxApis.token}?grant_type=client_credential&appid=${this.xcxId}&secret=${this.xcxSecret}`)
      .end((err, result)=> {
        if(err) return reject(JSON.stringify(err))
        if(JSON.parse(result.text).errcode != null) return resolve({
          errCode: JSON.parse(result.text).errcode,
          data: JSON.parse(result.text)
        })
        let accessToken = JSON.parse(result.text).access_token
        resolve({
          errCode: 0,
          accessToken: accessToken,
          data: JSON.parse(result.text)
        })
      })
    })
    return xcxtoken
  }

  sendTempMsg(obj) {
    var tempmsg = new Promise((resolve, reject)=> {
      this.getToken().then((tokenData)=> {
        if(tokenData.errCode) return reject(JSON.stringify(tokenData.data))
        request.post(`${wxxcxApis.send}?access_token=${tokenData.accessToken}`)
        .send({
          touser: obj.openId,
          template_id: obj.templateId || this.templateId,
          page: obj.page,    //'pages/login/login'
          form_id: obj.formId,
          data: obj.value
        })
        .set('Content-Type', 'application/json')
        .end((err, result)=> {
          if(err) return reject(JSON.stringify(err))
          console.log(result.text)
          resolve({
            errCode: 0,
            data: JSON.parse(result.text)
          })
        })
      })
    })
    return tempmsg
  }

  sendServiceMsg(obj) {
    var servimsg = new Promise((resolve, reject)=> {
      this.getToken().then((tokenData)=> {
        if(tokenData.errCode) return reject(JSON.stringify(tokenData.data))
        request.post(`${wxxcxApis.customSend}?access_token=${tokenData.accessToken}`)
        .send({
          touser: obj.openId,
          msgtype: obj.type,
          text: {
            content: obj.text
          }
        })
        .end((err, result)=> {
          if(err) return reject(JSON.stringify(err))
          console.log(result.text)
          resolve({
            errCode: 0,
            data: JSON.parse(result.text)
          })
        })
      })
    })
    return servimsg
  }



}

module.exports = XCX
