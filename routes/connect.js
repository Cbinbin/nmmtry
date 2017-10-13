const router = require('express').Router()
  , WX = require('../utils/wechat/WX')
  , wx = new WX()

router.get('/', (req, res)=> {
  const url = wx.getAuthUrl()
  res.send({code: 200, msg: 'ok', url: url})
})

module.exports = router