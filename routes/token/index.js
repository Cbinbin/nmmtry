const router = require('express').Router()
  , Check = require('../../utils/Check')
  , checks = new Check

const user = require('./user')

checks.token(router)

router.use('/user', user)

module.exports = router