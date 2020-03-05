var express = require('express');
var router = express.Router();

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



/* GET Login page */
router.get('/Login', function(req, res, next) {
  res.render('Login', { title: 'Express' });
});

/* GET User page */
router.get('/User', function(req, res, next) {
  res.render('User', { title: 'Express' });
});

/* GET AllUsers page */
router.get('/AllUsers', function(req, res, next) {
  res.render('AllUsers', { title: 'Express' });
});

module.exports = router;
