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
 * Adds users to our database
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

/*
var UserDatabase = require('../models/UserDatabase');

router.get('/getUserDatabase', function(req, res, next)
{
  
  var name = req.query.user_name;

    UserDatabase.find({user_name:name}, function (err, users) {
      console.log("help");
      if(users.length > 0){
        console.log(users.length);
        console.log("Already in database");
      }
      else{
        console.log("Not in database");
      }

      
        if (err)
            res.send(err);

        res.json(users);
    });
});

*/
  router.post('/addUserDatabase', function(req, res, next) {
       console.log("got here")
         // Extract the request body which contains the comments
         ud = new UserDatabase(req.body);
         ud.save(function (err, savedUser) {
       
             if (err)
                 throw err;
       
             res.json({
                 //"user_name": savedUser._user_name
                 "user_name": savedUser.name
             });
         });
       });


// router.get('/getOneUser', function(req, res, next){
// 
//   UserDatabase.find({user_name:name}, function(err, docs){
//     if(docs.length){
//       console.log(docs.length);
//       console.log("Already in database");
//     }else{
         
//     }
//   });
// });

/**
 * Adds comments to our database
 * **/

  // router.post('/addUserDatabase', function(req, res, next) {
  //    console.log("got here")
  //      // Extract the request body which contains the comments
  //      ud = new UserDatabase(req.body);
  //      ud.save(function (err, savedUser) {
     
  //          if (err)
  //              throw err;
     
  //          res.json({
  //              //"user_name": savedUser._user_name
  //              "user_name": savedUser.name
  //          });
  //      });
  //    });



//var http = require('http');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Book page 
router.get('/Book', function(req, res, next) {
  var isbn = req.query.isbn;
  res.render('Book', { book_isbn: isbn });
}); */

/* GET Book page */
router.get('/Book', function(req, res, next) {
  //var isbn = req.query.isbn;
  res.render('Book', { title: 'Express'});
});

/* GET About Us page */
router.get('/AboutUs', function(req, res, next) {
  res.render('AboutUs', { title: 'Express' });
});


/* GET Search page and book sorter*/
/* Defunct, now done in jQuery */
router.get('/search', function(req, res, next) {

  var arraySort = require('array-sort');
  var searchString = req.originalUrl.split("?")[1].toLowerCase();
  var searchUrl = "http://openlibrary.org/search.json?q=" + searchString;
  var limit = 20;
  var top = [];
  
  /*
  http.get(searchUrl, function(res) {
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var bookJSON = JSON.parse(body);
        var bookObj = bookJSON.docs;

        sortBook = arraySort(bookObj, "isbn");
        //console.log("Got a response: ", bookObj);
        for (var i=0; i<limit; i++) {
          //console.log(sortBook[i]);
          
            top.push(sortBook[i]);
          
        }

        //console.dir(top.title);
        for (var i=0; i<limit; i++) {
          if (top[i].title) 
            console.dir(top[i].title);
          if (top[i].author_name) 
            console.dir(top[i].author_name);
      }
        
    });
    }).on('error', function(e){
          console.log("Got an error: ", e);
  }); */

  //console.log(searchUrl);
  
  res.render('search', { title: 'Express'});
  
});


//get chat page
router.get('/chat', function(req, res, next){
  res.render('chat', {title: 'express'});
});


/* GET Users page */

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
