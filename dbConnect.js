const mongoose = require('mongoose')
  , db = mongoose.connection

mongoose.connect('mongodb://localhost/nmmdb', {useMongoClient: true})
db.on('error', (err)=> {
  console.error(`connect error: ${err}`)
})
db.once('open', ()=> {
  console.log('mongoose opened!')
})