const router = require('express').Router()

router.get('/', (req, res)=> {
  const code = req.query.code
  console.log(code)
  res.send({code: code})
})

module.exports = router

// info.openid
// info.nickname
// info.sex
// info.city
// info.province
// info.country
// info.headimgurl
