const MongoClient = require('mongodb').MongoClient
const Config = require('./config')

class Db {
  static getInstance(){
    if(!Db.instance){
      Db.instance=new Db()
    }
    return  Db.instance
  }
  constructor(){
    this.dbClient = ''
    this.connect()
  }
  connect(){
    let that = this
    return  new Promise((resolve, reject) => {
      if(that.dbClient){
        resolve(that.dbClient)
      }else{
        MongoClient.connect(Config.dburl,function(err, client){
          if(err){
            reject(err)
          } else {
            var db = client.db(Config.dbName)
            that.dbClient = db
            resolve(db)
          }
        })
      }
    })
  }

  find(col, json){
    return  new Promise((resolve, reject) => {
      this.connect().then((db)=>{
        var result = db.collection(col).find(json)
        result.toArray((err, docs)=>{
          if(err){
            reject(err)
          }else{
            resolve(docs)
          }
        })
      })
    })
  }

  insert(col, json){
    return new Promise((resolve, reject) => {
      this.connect().then((db)=>{
        db.collection(col).insertOne(json, (err, result)=>{
          if(err){
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }
  
  update(col,json, params){
    return new Promise((resolve, reject) => {
      this.connect().then((db)=>{
        db.collection(col).updateOne(json, {$set: params},(err, result)=>{
          if(err){
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }

  delete(col,json){
    return new Promise((resolve, reject) => {
      this.connect().then((db)=>{
        db.collection(col).deleteOne(json,(err, result)=>{
          if(err){
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }
  
}

module.exports = Db

