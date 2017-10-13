const router = require('express').Router()

const token = require('./token')
  , connect = require('./connect')
  , getcode = require('./getcode')
  , gettoken = require('./gettoken')
  , test = require('./testing')

router.use('/token', token)
router.use('/connect', connect)
router.use('/getcode', getcode)
router.use('/gettoken', gettoken)
router.use('/test', test)

module.exports = router