const router = require('express').Router()
  , MgoObject = require('./utils/MgoObject')

router.get('/', (req, res)=> {
  const userMo = new MgoObject('User')
  userMo.set('img', ['1', '2', '3', '4'])
  userMo.set('img2', new Date())
  userMo.set('sss', 'string')
  userMo.set('ssss', true)
  userMo.set('obj', {one: 'one'})
  userMo.set('nun', 123)
  userMo.save().then((user)=> {
    res.send(user)
  })
  // res.send('ok')
})

module.exports = router