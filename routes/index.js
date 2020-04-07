var express = require('express');
var router = express.Router();
var User = require('../models/Users');
var UserDatabase = require('../models/UserDatabase');
var ChatDatabase = require('../models/ChatDatabase');



router.get('/getUserDatabase', function(req, res, next)
{
    UserDatabase.find({}, function (err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
});

router.get('/getMessageDatabase', function(req, res, next)
{
    ChatDatabase.find({}, function (err, messages) {
        if (err)
            res.send(err);

        res.json(messages);
    });
});

router.get('/getOneUser', function(req, res, next){
  var name = req.query.user_name;
  console.log("this is the single user: "+name);
  UserDatabase.findOne({user_name:name}, function(err, docs){
    if(err) res.send(err);
    console.log(docs);
    res.json(docs);
    /*
    if(docs.length){
      console.log(docs.length);
      console.log("found "+docs.user_name);
      res.json(docs);
      
    }else{
      console.log('insert new username');
    }
    */
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

/**
 * Adds comments to our database
 */
router.post('/addMessageDatabase', function(req, res, next) {

  // Extract the request body which contains the comments
  cd = new ChatDatabase(req.body);
  cd.save(function (err, savedMessage) {

      if (err)
          throw err;

      res.json({
          "user_name": savedMessage._user_name
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
