/**
 * Created by Tianyou on 2017/3/30.
 */

var express = require('express');
var router = express.Router();


var monk = require('monk');
var db = monk('viciousdelicious:cake50@ds155080.mlab.com:55080/heroku_xdjx3gtb');

/*
GET all recipes.
Location where the url 'https://viciousdelicious.herokuapp.com/api/recipes' comes from
 */
router.get('/', function(req, res) {
    console.log("fetching recipes");
    var collection = db.get('recipes'); //get recipes from the database.
    collection.find({}, function(err, recipes){
        if (err) throw err;
        res.json(recipes); //sends a JSON response composed of a stringified version of recipes data.
    });
});

/*
GET beverage recipes.
 */
router.get('/beverage', function(req, res) {
    console.log("fetching beverage recipes");
    var collection = db.get('recipes');
    collection.find({category: "Beverage"}, function(err, recipes){ //find those whose category is Beverage in collection
        if (err) throw err;
        res.json(recipes); //sends a JSON response composed of a stringified version of recipes data.
    });
});

/*
GET food recipes.
 */
router.get('/food', function(req, res){
    console.log("fetching food recipes");
    var collection = db.get('recipes');
    collection.find({category: "Food"}, function(err, recipes){ //find those whose category is Food in collection
        if (err) throw err;
        res.json(recipes);//sends a JSON response composed of a stringified version of recipes data.
    })
})



router.post('/', function(req, res) {
    console.log("posting recipes");
    var collection = db.get('recipes');
    collection.insert({ //adding data to the recipes.
        title : req.body.title,
        img : req.body.img,
        subtitle1:req.body.subtitle1,
        subtitle2:req.body.subtitle2,
        ingredients:req.body.ingredients,
        slides:req.body.slides
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
