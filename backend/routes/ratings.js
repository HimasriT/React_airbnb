var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('127.0.0.1:27017/Airbnb', function (err, db) {
    if (err) {
        console.error("Db is not connected", err.message);
    }
});

router.get('/', function (req, res, next) {
    var t = new URLSearchParams(req.query);
    var collection = db.get('ratings');
    collection.find({ User_id: String(req.query.user_id) }, function (err, result) {
        if (err) throw err;
        res.render('ratingsuseids.ejs', { ratings: result });
    });
});

router.get('/:id', function (req, res) {
    var collection = db.get('ratings');
    collection.find({ _id: req.params.id }, function (err, result) {
        if (err) throw err;
        res.render('ratings', { favorite: result[0] });
    });
});

router.get('/ratings', function (req, res) {
    var t = new URLSearchParams(req.query);
    if (t == 0) {
        var collection = db.get('ratings');
        collection.find({}, function (err, props) {
            if (err) throw err;
            res.render('indexratings', { props: props })
        });
    }
    else {
        var collection = db.get('ratings');
        collection.find({ User_id: String(req.query.user_id) }, function (err, result) {
            if (err) throw err;
            res.render('showratings', { users: result });
        });
    }

});

router.post('/ratings', function (req, res) {
    var collection = db.get('ratings');
    collection.insert({
        ratings: req.body.ratings,
        Property_id: req.body.Property_id,
        User_id: req.body.User_id
    }, function (err, pr) {
        if (err) throw err;
        res.redirect('/ratings');
    });
});

router.post('/:id', function (req, res) {
    var collection = db.get('ratings');
    collection.remove({ _id: req.params.id }, function (err, result) {
        if (err) throw err;
        res.redirect('/ratings');
    });
});

router.get('/ratings/:id', function (req, res) {
    var collection = db.get('ratings');
    collection.find({ _id: req.params.id }, function (err, result) {
        if (err) throw err;
        res.render('showratings', { user: result[0] });
    });
});

module.exports = router;