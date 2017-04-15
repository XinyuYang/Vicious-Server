/**
 * Created by Tianyou on 2017/3/30.
 */

var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('viciousdelicious:cake50@ds155080.mlab.com:55080/heroku_xdjx3gtb');

router.get('/', function(req, res) {
    console.log("fetching recipes");
    var collection = db.get('recipes');
    collection.find({}, function(err, recipes){
        if (err) throw err;
        res.json(recipes);
    });
});

router.get('/beverage', function(req, res) {
    console.log("fetching beverage recipes");
    var collection = db.get('recipes');
    collection.find({category: "Beverage"}, function(err, recipes){
        if (err) throw err;
        res.json(recipes);
    });
});

router.get('/food', function(req, res){
    console.log("fetching food recipes");
    var collection = db.get('recipes');
    collection.find({category: "Food"}, function(err, recipes){
        if (err) throw err;
        res.json(recipes);
    })
})


router.post('/', function(req, res) {
    console.log("posting recipes");
    var collection = db.get('recipes');
    collection.insert({
        title : req.body.title,
        img : req.body.img,
        subtitle1:req.body.subtitle1,
        subtitle2:req.body.subtitle2,
        ingredients:req.body.ingredients,
        slides:req.body.slides
        //done : false
    }, function(err, recipe) {
        if (err)
            res.send(err);
    });
});

router.delete('/:recipe_id', function(req, res) {

    var collection = db.get('recipes');
    collection.remove({
        _id : req.params.recipe_id
    }, function(err, recipe) {

    });
});


module.exports = router;
