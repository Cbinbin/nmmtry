const mongoose = require('mongoose')
  , queryString = require('querystring')
  , fs = require('fs')
  , collections = mongoose.Collection

class MgoObject {
  constructor(str) {
    const Schema = mongoose.Schema
    var schemaParam = str === 'Wechatuser' ? {
      openId: { type: String, required: true },
      unionId: { type: String },
      wxName: { type: String, required: true },
      avatar: { type: String },
      gender: { type: Number },
      province: { type: String },
      city: { type: String },
      createdTime: { type: Date, default: Date.now },
      updatedTime: { type: Date, default: Date.now },
    } : {
      createdTime: { type: Date, default: Date.now },
      updatedTime: { type: Date, default: Date.now },
    }
    var schemaParamKeys = Object.keys(schemaParam)
      , schemaParamValues = []
    schemaParamKeys.forEach((item, index)=> {
      schemaParam[item].type = objFieldToStr(schemaParam[item].type)
      if(schemaParam[item].default) schemaParam[item].default = objFieldToStr(schemaParam[item].default)
      if(schemaParam[item].required) schemaParam[item].required = objFieldToStr(schemaParam[item].required)
      schemaParamValues[index] = queryString.stringify(schemaParam[item])
    })
    try {
      var paramData = fs.readFileSync(`utils/paramFile/${str}.txt`)
        , paramDataArr = paramData.toString().split(',')
        , paramDataArrLen = paramDataArr.length
        , paramDataKeys = []
        , schemaParamObj = {}
      paramDataArr.forEach((item, index)=> {
        var paramDataLen2 = paramDataArr[(index + paramDataArrLen/2)]
        if(index < paramDataArrLen/2) {
          paramDataLen2 = queryString.parse(paramDataLen2)
          paramDataLen2.type = strToObjField(paramDataLen2.type)
          if(paramDataLen2.default) paramDataLen2.default = strToObjField(paramDataLen2.default)
          if(paramDataLen2.required) paramDataLen2.required = strToObjField(paramDataLen2.required)
          schemaParamObj[paramDataArr[index]] = paramDataLen2
        }
      })
      schemaParam = schemaParamObj
    } catch(error) {
      schemaParam = schemaParam
      fs.writeFile(`utils/paramFile/${str}.txt`, [schemaParamKeys, schemaParamValues], (err)=> {
        if(err) return console.error('fs.writeFile error')
      })
    }
    const newSchema = new Schema(schemaParam, {
      timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'updatedTime',
      }
    })

    this.mgoSchema = newSchema
    this.schemaParam = schemaParam
    this.modelName = str
    this.objValue = {}
    // this.mgoModel = null

  }

  set(key, value) {
    console.log(this.mgoSchema.get(key))
    // if(!this.mgoSchema.get(key)) {
    // }
    this.schemaParam[key] = { type: objFieldToStr(instanceofValue(value)) }
    var schemaParamKeys = Object.keys(this.schemaParam)
      , schemaParamValues = []
    // console.log(this.schemaParam)
    schemaParamKeys.forEach((item, index)=> {
      this.schemaParam[item].type = objFieldToStr(this.schemaParam[item].type)
      if(this.schemaParam[item].default) this.schemaParam[item].default = objFieldToStr(this.schemaParam[item].default)
      if(this.schemaParam[item].required) this.schemaParam[item].required = objFieldToStr(this.schemaParam[item].required)
      schemaParamValues[index] = queryString.stringify(this.schemaParam[item])
    })
    fs.writeFile(`utils/paramFile/${this.modelName}.txt`, [schemaParamKeys, schemaParamValues], (err)=> {
      if(err) return console.error('fs.writeFile error')
    })
    this.objValue[key] = value || null
  }

  save() {
    var saveone = new Promise((resolve, reject)=> {
      var mgoModel 
      try {
        mgoModel = mongoose.model(this.modelName)
        console.log('1')
      } catch(error) {
        mgoModel = mongoose.model(this.modelName, this.mgoSchema)
        console.log('2')
      }
      var newMgoModel = new mgoModel(this.objValue)
      newMgoModel.save((err)=> {
        if(err) return reject(JSON.stringify(err))
        resolve(newMgoModel)
      })
    })
    return saveone
  }

}

function objFieldToStr(type) {
  var str = type
  switch(type) {
    case String: str = 'String';break
    case Number: str = 'Number';break
    case Boolean: str = 'Boolean';break
    case Array: str = 'Array';break
    case Object: str = 'Object';break
    case Date: str = 'Date';break
    case Date.now: str = 'Date.now';break
    case true: str = 'true';break
    default: null
  }
  return str
}

function strToObjField(str) {
  var objField = str
  switch(str) {
    case 'String': objField = String;break
    case 'Number': objField = Number;break
    case 'Boolean': objField = Boolean;break
    case 'Array': objField = Array;break
    case 'Object': objField = Object;break
    case 'Date': objField = Date;break
    case 'Date.now': objField = Date.now;break
    case 'true': objField = true;break
    case 'string': objField = String;break
    case 'number': objField = Number;break
    case 'boolean': objField = Boolean;break
    case 'array': objField = Array;break
    case 'object': objField = Object;break
    case 'date': objField = Date;break
    default: null
  }
  return objField
}

function instanceofValue(val) {
  var type = null
  if(val instanceof String) type = String
  else if(val instanceof Number) type = Number
  else if(val instanceof Boolean) type = Boolean
  else if(val instanceof Date) type = Date
  else if(val instanceof Array) type = Array
  else if(val instanceof Object) type = Object
  return type
}

module.exports = MgoObject
