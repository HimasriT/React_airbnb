var express = require('express');
var router = express.Router();

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); */
console.log("Inside properties router");

var monk = require('monk');
var db = monk('127.0.0.1:27017/Airbnb', function(err, db){
    if(err){
       console.error("Db is not connected", err.message);
    }
    else{
        console.log("DB is connected");
    }
});


router.get('/', function(req, res) {
	console.log("inside this");
	var collection = db.get('properties');
	collection.find({}, function(err, props){
		if (err) throw err;
		res.json(props);
	  	//res.render('index',{ props : props})
	});
});

  router.get('/new', function(req, res) {
      res.render('new');
  });
  
  router.get('/properties', function(req, res) {
      console.log("inside this");
      var collection = db.get('properties');
      collection.find({}, function(err, props){
          if (err) throw err;
          //res.json(videos);
            res.render('index',{ props : props})
      });
  });
  
  router.post('/', function(req, res) {
      //req.body is used to read form input
      var collection = db.get('properties');
      collection.insert({ 
          place: req.body.title,
          host: req.body.host,
          path: req.body.image,
          amenities: req.body.amenities,
          ratings: req.body.ratings,
          night_fee: req.body.night_fee,
          service_fee: req.body.service_fee,
          cleaning_fee: req.body.cleaning_fee,
          short_description: req.body.short_description,
          description:req.body.description
      }, function(err, pr){
          if (err) throw err;
          // if insert is successfull, it will return newly inserted object
            //res.json(video);
          res.redirect('/');
      });
  });
  
  router.get('/:id', function(req, res) {
      var collection = db.get('properties');
      collection.find({ _id: req.params.id }, function(err, result){
          if (err) throw err;
          //  res.render('show', { pr : result[0] });
          res.json(result);
      });
  });

module.exports = router;

