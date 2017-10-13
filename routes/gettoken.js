const router = require('express').Router()
  // , infoToToken = require('../funcs/infoToToken')
  , WX = require('../utils/wechat/WX')
  , wx = new WX()

router.get('/', (req, res)=> {
  // const code = req.query.code
  // wx.getAccessToken(code).then((data)=> {
  //   if(data.errCode) return res.send({code: 444, msg: 'getAccessToken error', err: data.data})
  //   wx.getInfo(data).then((info)=> {
  //     if(info.errCode) return res.send({code: 444, msg: 'getInfo error', err: info.data})
  //     infoToToken(info).then((data2)=> {
  //       res.send({code: 200, msg: 'ok', token: data2.token})
  //     })
  //   })
  // })
})

module.exports = router