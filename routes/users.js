var express = require('express');
var router = express.Router();
var User = require('../models/UserDatabase');

var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/User', function(req, res, next) {
    res.render('User', { title: 'Express' });
  });


/*
 Creates a JWT
 */
function createJwt(profile) {
  return jwt.sign(profile, 'CSIsTheWorst', {
      expiresIn: '10d'
  });
}

module.exports = router;
