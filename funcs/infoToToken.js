// const jwt = require('jsonwebtoken')
//   , UserClass = require('../classes/UserClass')
//   , tokenSalt = process.env.TOKENSALT

// function jwtSign(obj) {
//   var getjwttoken = new Promise((resolve, reject)=> {
//     jwt.sign({userId: obj._id}, 
//     tokenSalt, 
//     {expiresIn: '15d'}, 
//     (err, token)=> {
//       if(err) return reject(JSON.stringify(err))
//       resolve(token)
//     })
//   })
//   return getjwttoken
// }

// function infoToToken(wxInfo) {
//   var returntoken = new Promise((resolve, reject)=> {
//     var usercls = new UserClass
//     usercls.findOneOpId(wxInfo.openid).then((same)=> {
//       if(same) {
//         if(!same.unionId) {
//           usercls.updateOneUnId(same._id, wxInfo.unionid)
//         }
//         jwtSign(same).then((token)=> {
//           resolve({
//             user: same,
//             token: token,
//           })
//         })
//       } else {
//         usercls.createOne(wxInfo).then((user)=> {
//           jwtSign(user).then((token)=> {
//             resolve({
//               user: user,
//               token: token,
//             })
//           })
//         })
//       }
//     })
//   })
//   return returntoken
// }

// module.exports = infoToToken
