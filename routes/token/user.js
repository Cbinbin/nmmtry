const router = require('express').Router()
  , UserClass = require('../../classes/UserClass')
  , usercls = new UserClass

router.get('/', (req, res)=> {
  const uId = req.nmmtry.userId
  usercls.findOne(uId).then((user)=> {
    if(!user) res.send({code: 444, msg: 'Not found', data: null})
    res.send({code: 200, msg: 'ok', data: user})
  })
})

module.exports = router