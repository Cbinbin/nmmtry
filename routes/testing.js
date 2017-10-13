const router = require('express').Router()
  , XCX = require('../utils/wechat/XCX')
  , appID = process.env.XCXID
  , appSecret = process.env.XCXSECRET

router.get('/', (req, res)=> {
  var xcx = new XCX({
    AppID: appID,
    AppSecret: appSecret,
  })
  xcx.getInfo().then((data)=> {
    res.send(data)
  })
})

module.exports = router