//Not currently Used. Is in place to show users online when functionality added.

var mongo = require('mongodb');
var url = "mongodb://"+process.env.MONGO_USER+":"+process.env.MONGO_PASS+"@ds235785.mlab.com:35785/singletempo";
module.exports = {
 

  userOn: function(data, callback){
    console.log('accesssed')
    mongo.MongoClient.connect(url, function(err,db){
      db.collection('chat').update({chats: "array"}, 
                                     {$push: {usersOnline: data }}, function(){
        db.collection('chat').findOne({chats: "array"}, function(err,result){
          console.log(result.usersOnline)
          callback(result.usersOnline)
        })
       
      })
    
    })   
  },
  userOff: function(data,callback){
          mongo.MongoClient.connect(url, function(err,db){
    db.collection('chat').findOne({chats: "array"}, function(err, result){
      console.log("res "+result.usersOnline+" data "+data)
      var i = result.usersOnline.indexOf(data)
      var updater = result.usersOnline.splice(i,1)
      console.log("updater "+result.usersOnline)
  
      db.collection('chat').update({chats: "array", 
                                    $set: {usersOnline: result.userOnline }}, function(){
        db.collection('chat').findOne({chats: "array"}, function(err,result2){
          console.log("Updated to: "+result2.usersOnline)
          callback(result2.usersOnline)
        })
       
      })
        })
    })   
    }
}