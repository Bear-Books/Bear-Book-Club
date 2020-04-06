var express = require('express');
var router = express.Router();
var User = require('../models/Users');
var UserDatabase = require('../models/UserDatabase');


router.get('/getUserDatabase', function(req, res, next)
{
    UserDatabase.find({}, function (err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
});

router.get('/getOneUser', function(req, res, next){
  var name = "evan kelly";
  UserDatabase.find({user_name:name}, function(err, docs){
    if(docs.length){
      console.log(docs.length);
      console.log("help");

    }else{
      console.log('insert');
    }
  });
});

/**
 * Adds comments to our database
 */
router.post('/addUserDatabase', function(req, res, next) {

  // Extract the request body which contains the comments
  ud = new UserDatabase(req.body);
  ud.save(function (err, savedUser) {

      if (err)
          throw err;

      res.json({
          "user_name": savedUser._user_name
      });
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Book page */
router.get('/Book', function(req, res, next) {
  var isbn = req.query.isbn;
  res.render('Book', { book_isbn: isbn });
});

/* GET About Us page */
router.get('/AboutUs', function(req, res, next) {
  res.render('AboutUs', { title: 'Express' });
});

router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Express' });
});

//get chat page
router.get('/chat', function(req, res, next){
  res.render('chat', {title: 'express'});
});

router.get('/getUsers', function(req, res, next)
{
    User.find({}, function (err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
});


/* GET Login page */
router.get('/Login', function(req, res, next) {
  res.render('Login', { title: 'Express' });
});

/* GET User page */

router.get('/User', function(req, res, next) {
  var user_name = req.query.username;
  res.render('User', { username: user_name });
});

/* GET AllUsers page */
router.get('/AllUsers', function(req, res, next) {
  res.render('AllUsers', { title: 'Express' });
});

module.exports = router;
