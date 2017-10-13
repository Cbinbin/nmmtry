const jsSHA = require('jssha')
  , jwt = require('jsonwebtoken')
  , tokenSalt = process.env.TOKENSALT

class Check {
  token(router) {
    router.use('*', (req, res, next) => {
      var token = req.query.token
      jwt.verify(token, tokenSalt, (err, decoded) => {
        if (!err) { 
          req.nmmtry = decoded
          next()
        } else res.send({code: 543, msg: `You have't permission`, data: err })
      })
    })
  }
}

module.exports = Check