var express = require('express');
var router = express.Router();
var fs = require('fs');
var url=require('url');

router.get('/', function(req, res, next) {
  //unset session
 res.render('home', { title: 'Equipshare' });   
});


module.exports = router;

