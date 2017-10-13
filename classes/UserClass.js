// const User = require('../models/User')

// class UserClass {

//   createOne(obj) {
//     var userone = new Promise((resolve, reject)=> {
//       var newOne = new User({
//         openId: obj.openid || null,
//         unionId: obj.unionid || null,
//         wxName: obj.nickname || null,
//         avatar: obj.headimgurl || null,
//         gender: obj.sex || 0,
//         province: obj.province || null,
//         city: obj.city || null,
//         country: obj.country || null,
//       })
//       newOne.save((err)=> {
//         if(err) return reject(err)
//         resolve(newOne)
//       })
//     })
//     return userone
//   }

//   findOneOpId(opId) {
//     var userone = new Promise((resolve, reject)=> {
//       User.findOne({openId: opId}, {__v: 0})
//       .exec((err, user)=> {
//         if(err) return reject(err)
//         resolve(user)
//       })
//     })
//     return userone
//   }

//   findOne(uId) {
//     var userone = new Promise((resolve, reject)=> {
//       User.findOne({_id: uId}, {__v: 0})
//       .exec((err, user)=> {
//         if(err) return reject(err)
//         resolve(user)
//       })
//     })
//     return userone
//   }

//   updateOneUnId(uId, unId) {
//     var userone = new Promise((resolve, reject)=> {
//       User.findOne({_id: uId}, {__v: 0})
//       .exec((err, user)=> {
//         if(err) return reject(err)
//         if(!user) return resolve(null)
//         user.unionId = unId || user.unionId
//         user.save((err)=> {
//           if(err) return reject(err)
//           resolve(user)
//         })
//       })
//     })
//     return userone
//   }

// }

// module.exports = UserClass