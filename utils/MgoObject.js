const mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , queryString = require('querystring')
  , fs = require('fs')
  , collections = mongoose.Collection

class MgoObject {
  constructor(str) {
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
      , schemaParamValues = changeSchemaParam(schemaParam).schemaParamValues
      , schemaParamRe = changeSchemaParam(schemaParam).schemaParamRe
    
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
    this.schemaParamRe = schemaParamRe
    this.modelName = str
    this.objValue = {}
    // this.mgoModel = null

  }

  set(key, value) {
    // console.log(this.mgoSchema.get(key))
    // if(!this.mgoSchema.get(key)) {
    // }
    if(!this.schemaParam[key]) {
      this.schemaParam[key] = { type: instanceofValue(value) }
    }
    var schemaParamKeys = Object.keys(this.schemaParam)
      , schemaParamValues = changeSchemaParam(this.schemaParam).schemaParamValues
      , schemaParamRe = changeSchemaParam(this.schemaParam).schemaParamRe
    
    fs.writeFile(`utils/paramFile/${this.modelName}.txt`, [schemaParamKeys, schemaParamValues], (err)=> {
      if(err) return console.error('fs.writeFile error')
    })
    this.mgoSchema = new Schema(this.schemaParam, {
      timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'updatedTime',
      }
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




function changeSchemaParam(schemaParam) {
  var schemaParamKeys = Object.keys(schemaParam)
    , schemaParamValues = []
    , schemaParamRe = {}
  schemaParamKeys.forEach((item, index)=> {
    var schemaParamOne = {}
    schemaParamOne.type = objFieldToStr(schemaParam[item].type)
    if(schemaParam[item].default) schemaParamOne.default = objFieldToStr(schemaParam[item].default)
    if(schemaParam[item].required) schemaParamOne.required = objFieldToStr(schemaParam[item].required)
    schemaParamRe[item] = schemaParamOne
    schemaParamValues[index] = queryString.stringify(schemaParamOne)
  })
  return {
    schemaParamRe: schemaParamRe,
    schemaParamValues: schemaParamValues,
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
  if(typeof val == 'object') {
    if(val instanceof String) type = String
    else if(val instanceof Number) type = Number
    else if(val instanceof Boolean) type = Boolean
    else if(val instanceof Date) type = Date
    else if(val instanceof Array) type = Array
    else if(val instanceof Object) type = Object
  } else if(typeof val == 'string') {
    type = String
  } else if(typeof val == 'boolean') {
    type = Boolean
  } else if(typeof val == 'number') {
    type = Number
  }
  return type
}

module.exports = MgoObject
