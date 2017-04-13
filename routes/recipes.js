/**
 * Created by Tianyou on 2017/3/30.
 */

var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('viciousdelicious:cake50@ds155080.mlab.com:55080/heroku_xdjx3gtb');

router.get('/', function(req, res) {
    var collection = db.get('recipes');
    collection.find({}, function(err, recipes){
        if (err) throw err;
        res.json(recipes);
    });
});

module.exports = router;
