var express = require('express'),
 cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    MongoStore = require('connect-mongo')(expressSession);
var router = express.Router();
var app = express();


var fs = require('fs');
var mongoose = require('mongoose');
var random = require('mongoose-random');
var girlsSchema = mongoose.Schema({
    _id: Number
})


var ratingsSchema = mongoose.Schema({
    _id: Number
})
var db = mongoose.connection;
  var girls = mongoose.model( 'profiles',girlsSchema );
 var ratings = mongoose.model( 'ratings',ratingsSchema  );
 
 
db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function callback () {
router.get('/:type', function (req, res){
  var type = req.params.type;


 
  if(type == "cities"){



 db.once('open', function callback () {
  


  
    var fileJSON = require(__dirname + '/../public/javascripts/location_cities.json');
var jsonData = fileJSON;
var group = {
   key: ['city'],
    reduce: function(doc, out) {
      out.count++;
      
   },
   cond:{},
   initial: {
       count: 0
   },
   finalize: function(out) {
       
   }
};
     girls.collection.group(group.key, group.cond, {"count":0}, "function (obj, prev) { prev.count++; }", function(err, results) {
            	for(var i in results){
                results[i].gps=jsonData[results[i].city.toUpperCase()];
              }
              console.log(results);
              res.json("");

               fs.writeFile(__dirname + '/../public/javascripts/final.json', JSON.stringify(results), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); 

            });
    
  
});


  }else if(type == "profile"){
    var ville = req.query.city;
     var count = req.query.count;


  // authenticate once after you opened the database. What's the point of 
  // authenticating on-demand (for each query)?
 
    var rand = Math.floor(Math.random() * count);

     girls.find({city: ville},{ id: 1, pseudo: 1, age: 1, cover:1, birthday: 1, sex:1, city:1}, {skip: rand , limit: 1}, function(err, results) {
res.json(results);
            });

  }else if(type == "session"){
  
  	


 }else if(type=="getGirlsOfCities"){
  
var ville = req.query.city;
  
     girls.find({city: ville},{ id: 1, pseudo: 1, age: 1, cover:1, birthday: 1,sex:1, city:1}, function(err, results) {
res.json(results);
            });

 }else if(type=="viewProfile"){
 	
  var ville = req.query.city;
    var count = req.query.count;
var limit = 16;
  var sess = req.session
  
  if (sess.views) {
    sess.views++
    
  } else {
    sess.views = 1
   
  }
  console.log(sess.views);
 	if(sess.views==limit){
 		sess.views = 0;
 	res.jsonp({limit:1});
 	} else{
 		 var aid = req.query.id;
girls.find({'id':parseInt(aid, 10)},{ disabled_badges:0, enabled_badges:0, online: 0, last_cnx:0, last_cnx_label: false, in_contact: 0, points: 0, can_mail:0, is_faked: 0, is_blocked: 0} , function(err, results){

  res.jsonp(results);});
 		}	
 	
   
 
 }
});


});








module.exports = router;
