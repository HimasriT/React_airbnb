var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator');

var methodOveride = require('method-override');

var user_id = "#";

var monk = require('monk');
var db = monk('127.0.0.1:27017/Airbnb', function (err, db) {
	if (err) {
		console.error("Db is not connected", err.message);
	}
	else {
		console.log("DB is connected");
	}
});


router.get('/', function (req, res) {
	var collection = db.get('properties');
	collection.find({}, function (err, props) {
		if (err) throw err;
		res.json(props);
	});
});

router.get('/properties/new', function (req, res) {
	res.render('new.ejs');

});

router.get('/reservations/newuser', function (req, res) {
	res.render('newuser.ejs');
});

router.get('/reservations', function (req, res) {
	var t = new URLSearchParams(req.query);
	console.log(t);
	if (t == 0) {
		console.log("No query value");
		console.log(req.query);
		var collection = db.get('reservations');
		collection.find({}, function (err, props) {
			//res.json(videos);
			if (err) throw err;
			res.render('indexuser.ejs', { props: props })
		});
	}
	else {
		console.log("yes");
		console.log(typeof (String(req.query.user_id)));
		var collection = db.get('reservations');
		collection.find({ user_id: String(req.query.user_id) }, function (err, result) {
			if (err) throw err;
			res.render('showuserid.ejs', { users: result });
		});
	}

});

router.post('/reservations', function (req, res) {
	console.log(req.body);
	var collection = db.get('reservations');
	collection.insert({
		check_in: req.body.check_in,
		check_out: req.body.check_out,
		no_of_days: req.body.no_of_days,
		amount_paid: req.body.amount_paid,
		ratings: req.body.ratings,
		property_id: req.body.property_id,
		user_id: req.body.user_id,
		payment_id: req.body.payment_id
	}, function (err, pr) {
		if (err) throw err;
		res.redirect('/reservations');
	});
});

router.delete('/reservations/:id', function (req, res) {
	var collection = db.get('reservations');
	collection.remove({ _id: req.params.id }, function (err, result) {
		if (err) throw err;
		res.redirect('/reservations');
	});
});

router.get('/reservations/:id', function (req, res) {
	var collection = db.get('reservations');
	collection.find({ _id: req.params.id }, function (err, result) {
		if (err) throw err;
		console.log(result);
		res.render('showuser.ejs', { user: result[0] });
	});
});

router.get('/new', function (req, res) {
	res.render('new.ejs');
});

router.get('/properties', function (req, res) {
	t = new URLSearchParams(req.query);
	console.log(t);
	var collection = db.get('properties');
	if (t == 0 && user_id === "#") {
		console.log("No query value");
		console.log(req.query);
		collection.find({}, function (err, props) {
			if (err) throw err;
			res.render('index.ejs', { props: props })
		});
	}
	else {
		if (t == 0) {
			collection.find({ host_id: user_id ,availability:"true"}, function (err, result) {
				if (err) throw err;
				res.render('index.ejs', { props: result });
			});
		}
		else {
			console.log(typeof (String(req.query.user_id)));
			user_id = String(req.query.user_id);
			console.log("Inside else");
			console.log(user_id);
			collection.find({ host_id: String(req.query.user_id) ,availability:"true"}, function (err, result) {
				if (err) throw err;
				res.render('index.ejs', { props: result });
			});
		}

	}

});

router.get('/properties/fav', function (req, res) {
	var t = new URLSearchParams(req.query);
	console.log(t);
	if (t == 0) {
		console.log("No query value");
		console.log(req.query);
		var collection = db.get('properties');
		collection.find({}, function (err, props) {
			//res.json(videos);
			if (err) throw err;
			res.render('favdisplay.ejs', { props: props })
		});
	}
	else {
		console.log("yes");
		console.log(typeof (String(req.query.prop_id)));
		var collection = db.get('properties');
		collection.find({ _id : String(req.query.prop_id) }, function (err, result) {
			if (err) throw err;
			res.render('favdisplay.ejs', { props: result });
		});
	}
});

router.post('/properties', [
	check('name', 'Please enter a property name')
		.isEmail().isLength({ min: 1 })
	// check('name', 'Name length should be 10 to 20 characters')
	// 	.isLength({ min: 10, max: 20 }),
	// check('mobile', 'Mobile number should contains 10 digits')
	// 	.isLength({ min: 10, max: 10 }),
	// check('password', 'Password length should be 8 to 10 characters')
	// 	.isLength({ min: 8, max: 10 })
], function (req, res) {
	var collection = db.get('properties');
	collection.insert({
		name: req.body.name,
		city_name: req.body.city_name,
		host: "Hosted by " + req.body.host,
		path: req.body.image,
		path2: req.body.image,
		amenities: req.body.amenities,
		ratings: req.body.ratings.toFixed(1),
		night_fee: "$" + req.body.night_fee + " / night",
		service_fee: "$" + req.body.service_fee + " / stay",
		cleaning_fee: "$" + req.body.cleaning_fee + " / stay",
		short_description: req.body.short_description,
		description: req.body.description,
		host_id: req.body.host_id,
		bedrooms: req.body.bedrooms
	}, function (err, pr) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.json(errors)
		}
		res.redirect('/properties');
	});
});

router.post('/properties/edit/:id', function (req, res) {
	var collection = db.get('properties');
	var new_record = {
		name: req.body.name,
		city_name: req.body.city_name,
		host: "Hosted by " + req.body.host,
		path: req.body.image,
		path2: req.body.image,
		amenities: req.body.amenities,
		ratings: req.body.ratings,
		night_fee: "$" + req.body.night_fee + " / night",
		service_fee: "$" + req.body.service_fee + " / stay",
		cleaning_fee: "$" + req.body.cleaning_fee + " / stay",
		short_description: req.body.short_description,
		description: req.body.description,
		host_id: req.body.host_id,
		bedrooms: req.body.bedrooms
	};

	collection.update({ _id: req.params.id }, { $set: new_record }, { upsert: true }, function (err, pr) {
		if (err) throw err;
		res.redirect('/properties');
	});
});

router.post('/properties/update/:id', function(req, res) {
	//req.body is used to read form input
	var collection = db.get('properties');
	var new_record = {
		availability:"false"
	};

	collection.update({ _id:req.params.id }, {$set : new_record}, {upsert:true}, function(err, pr){
		if (err) throw err;
		// if insert is successfull, it will return newly inserted object
	  	//res.json(video);
		res.redirect('/properties');
	});
});


router.delete('/properties/:id', function (req, res) {
	var collection = db.get('properties');
	collection.remove({ _id: req.params.id }, function (err, result) {
		if (err) throw err;
		res.render('show.ejs', { pr: result[0] });
	});
});

router.get('/properties/:id/edit', function (req, res) {
	var collection = db.get('properties');
	collection.find({ _id: req.params.id }, function (err, result) {
		if (err) throw err;
		res.render('edit.ejs', { pr: result[0] });
	});
});

router.get('/properties/:id', function (req, res) {
	var collection = db.get('properties');
	collection.find({ _id: req.params.id }, function (err, result) {
		if (err) throw err;
		res.render('show.ejs',{pr:result[0]});
	});
});

router.get('/cart', function (req, res) {
	var t = new URLSearchParams(req.query);
	console.log(req.query.user_id);
	try {
		var collection = db.get('cart');
	}
	catch {
		console.log("NO");
	}
	collection.find({ User_id: String(req.query.user_id) }, function (err, result) {
		if (err) throw err;
		res.render('cartuseids.ejs', { carts: result });
	});
	// }
});

router.get('/cart/:id', function (req, res) {
	var collection = db.get('cart');
	collection.find({ _id: req.params.id }, function (err, result) {
		if (err) throw err;
		res.render('cart.ejs', { cart: result[0] });
	});
});

router.post('/cart/edit/:id', function (req, res) {
	var collection = db.get('cart');
	console.log("POST")
	console.log(req.body);
	var new_record = {
		No_of_days: req.body.No_of_days,
		Total_Cost: req.body.Total_Cost,
		Number_of_persons: req.body.number_of_persons,
		Property_id: req.body.property_id,
		User_id: req.body.User_id
	};
	collection.update({ _id: req.params.id }, { $set: new_record }, { upsert: true }, function (err, pr) {
		if (err) throw err;
		res.redirect('/properties');
	});

});

router.get('/cart/:id/edit', function (req, res) {
	var collection = db.get('cart');
	collection.find({ _id: req.params.id }, function (err, result) {
		if (err) throw err;
		res.render('editcart.ejs', { cart: result[0] });
	});
});

router.delete('/cart/:id', function (req, res) {
	var collection = db.get('cart');
	collection.remove({ _id: req.params.id }, function (err, result) {
		if (err) throw err;
		res.redirect('/properties');

	});
});

module.exports = router;
