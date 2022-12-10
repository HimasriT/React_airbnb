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
    try {
        var collection = db.get('favorites');
    }
    catch {
        console.log("NO");
    }
    collection.find({ User_id: String(req.query.user_id) }, function (err, result) {
        if (err) throw err;
        res.render('favoriteuseids.ejs', { favorites: result });
    });
});

/*router.get('/favorites', function (req, res) {
    
}); */

router.get('/favorites/:id', function (req, res) {
    var collection = db.get('favorties');
    collection.find({ _id: req.params.id }, function (err, result) {
        if (err) throw err;
        res.render('favorites', { favorite: result[0] });
    });
});

router.get('/favorites', function (req, res) {
    var t = new URLSearchParams(req.query);
    if (t == 0) {
        var collection = db.get('favorites');
        collection.find({}, function (err, props) {
            if (err) throw err;
            res.render('indexfavorite', { props: props })
        });
    }
    else {
        var collection = db.get('favorites');
        collection.find({ User_id: String(req.query.user_id) }, function (err, result) {
            if (err) throw err;
            res.render('showfavorite', { users: result });
        });
    }

});

router.post('/favorites', function (req, res) {
    var collection = db.get('favorites');
    collection.insert({
        ratings: req.body.ratings,
        Property_id: req.body.Property_id,
        User_id: req.body.User_id
    }, function (err, pr) {
        if (err) throw err;
        res.redirect('/favorties');
    });
});

router.delete('/favorties/:id', function (req, res) {
    var collection = db.get('favorites');
    collection.remove({ _id: req.params.id }, function (err, result) {
        if (err) throw err;
        res.redirect('/favorties');
    });
});

router.get('/favorites/deletefav/:id', function (req, res) {
    console.log("Entered into delete");
    var collection = db.get('favorites');
    collection.remove({ _id: req.params.id }, function (err, result) {
        if (err) throw err;
        res.redirect('/favorties');
    });
});

router.get('/favorites/:id', function (req, res) {
    var collection = db.get('favorites');
    collection.find({ _id: req.params.id }, function (err, result) {
        if (err) throw err;
        res.render('showfavorite', { user: result[0] });
    });
});

router.delete('/favorites/:id', function (req, res) {
    var collection = db.get('favorites');
    collection.remove({ _id: req.params.id }, function (err, result) {
        if (err) throw err;
        res.redirect('/favorties');
    });
});

module.exports = router;