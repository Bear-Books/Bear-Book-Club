var express = require('express');
var router = express.Router();
var User = require('../models/Users');

var UserDatabase = require('../models/UserDatabase');

router.get('/getUserDatabase', function(req, res, next)
{
  console.log("go ther");
  
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
      

  /* updates the user's reading list */
  router.post('/updateUser/:userName/:whichList',function(req,res,next) {

    var userNameFind = req.params.userName.substr(1);
    userNameFind = userNameFind.substr(0, userNameFind.length-1);
    var whichList = req.params.whichList;
    var JSON = req.body;
    
    //console.log(bookJSON);
    
    if (whichList == "rList") {
      //console.dir(userNameFind);
      //console.dir(whichList);
      //console.dir(JSON);
      UserDatabase.updateOne({user_name: userNameFind}, {

          $addToSet: {
              to_read_list: JSON
          }
      },  function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
        res.json({"status": "update successful"});
      });
    }
    
    if (whichList == "cList") {
      UserDatabase.updateOne({user_name: userNameFind}, {

        $addToSet: {
            have_read_list: JSON
        }
    },  function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log(success);
      }
      res.json({"status": "update successful"});
    });
    }
  });

  router.post('/deleteBook/:userName/:whichList/:bookTitle',function(req,res,next) {

    var userNameFind = req.params.userName.substr(1);
    
    var whichList = req.params.whichList.substr(1);
    var bookFound = req.params.bookTitle.substr(1); 
    
    if (whichList == "removeBookR") {
      //console.dir(userNameFind);
      //console.dir(whichList);
      //console.dir(JSON);
      console.log(userNameFind);
      console.log(whichList);
      console.log(bookFound);
      UserDatabase.findOneAndUpdate(
        {'user_name': userNameFind}, 
        { $pull: 
          { "to_read_list" : { "title": bookFound } } 
        
        },function (error, success) {

          if (error) {
              console.log(error);
              console.log("seeing this");
              res.json({"status": "Update did not work"});
          } else {
              console.log(success);
          }
          res.json({"status": "update successful"});
        });
    }
    
    if (whichList == "removeBookC") {
      
      console.log(userNameFind);
      console.log(whichList);
      console.log(bookFound);
      UserDatabase.findOneAndUpdate(
        {'user_name': userNameFind}, 
        { $pull: 
          { "have_read_list" : { "title": bookFound } } 
        
        },function (error, success) {

          if (error) {
              console.log(error);
              console.log("seeing this");
              res.json({"status": "Update did not work"});
          } else {
              console.log(success);
          }
          res.json({"status": "update successful"});
        });
    }
  });
  /**
 * Adds comments to our database
 */
router.post('/addComment', function(req, res, next) {

  var name = req.query.user_name;


      UserDatabase.updateOne({user_name:name}, {

        $push :{
            comment: req.body
        }
    },  function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log(success);
      }
      res.json({"status": "update successful"});
    });         

            // Extract the request body which contains the comments
            // comment = (req.body);
            // comment.save(function (err, savedComment) {

            //     if (err)
            //         throw err;

            //     res.json({
            //         "id": savedComment._id
            //     });
            // });
});

router.get('/getComments', function(req, res, next)
{

  var name = "evan kelly";

    UserDatabase.find({user_name:name}, function (err, comments) {
        if (err)
            res.send(err);

            console.log(comments);
        res.json(comments);
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



var http = require('http');


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