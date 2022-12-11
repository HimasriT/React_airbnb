var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('127.0.0.1:27017/Airbnb', function (err, db) {
	if (err) {
		console.error("Db is not connected", err.message);
	}
});

router.get('/', function (req, res, next) {
	res.redirect('/properties');
});

router.get('/reservations/newuser', function (req, res) {
	res.render('newuser');
});

router.get('/cart', function (req, res) {
	var t = new URLSearchParams(req.query);
		try{
			var collection = db.get('cart');
		}
		catch{
			console.log("NO");
		}
		collection.find({ User_id: String(req.query.user_id) }, function (err, result) {
			if (err) throw err;
			res.render('cartuseids', { carts: result });
		});
});

router.get('/cart/:id', function (req, res) {
	var collection = db.get('cart');
	collection.find({ _id: req.params.id }, function (err, result) {
		if (err) throw err;
		res.render('cart', { cart: result[0] });
	});
});

router.get('/reservations', function (req, res) {
	var t = new URLSearchParams(req.query);
	if (t == 0) {
		console.log("No query value");
		console.log(req.query);
		var collection = db.get('reservations');
		collection.find({}, function (err, props) {
			if (err) throw err;
			res.render('indexuser', { props: props })
		});
	}
	else {
		console.log(req.query);
			var collection = db.get('reservations');
			collection.find({ user_id: String(req.query.user_id) }, function (err, result) {
			if (err) throw err;
			res.render('showuserid', { users: result });
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
		property_id: req.body.property_id,
		user_id: req.body.user_id,
		payment_id: req.body.payment_id
	}, function (err, pr) {
		if (err) throw err;
		res.redirect('/reservations');
	});
});

router.post('/reservations/:id', function (req, res) {
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
		res.render('showuser', { user: result[0] });
	});
});


router.post('/cart/edit/:id', function (req, res) {
	var collection = db.get('cart');
	console.log("POST")
	console.log(req.body);
	var new_record = {
		No_of_days:req.body.No_of_days,
		Total_Cost:req.body.Total_Cost,
		Number_of_persons:req.body.number_of_persons,
		Property_id:req.body.property_id,
		User_id:req.body.User_id		
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
		res.render('editcart', { cart: result[0] });
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