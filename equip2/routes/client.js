var url=require('url');
var mysql = require('mysql');
var qs=require('querystring');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "experimental"

});
con.connect(function(err) {
    if (err) throw err;
    console.log('conected');

});

var express = require('express');
var router = express.Router();
var app = express();

router.get('/', function(req, res, next) {

  res.render('login', { title: 'login',edata:'' });


});

router.post('/', function(req, res, next) {

    var user=req.body.user;
  var psw=req.body.psw;
	 var sql2="SELECT * FROM contract where conid='"+user+"' and Client_Password ='"+psw+"'";
    con.query(sql2, function (err,result) {
        if(err){
            res.end('error');}
        else{}
        var len = Object.keys(result).length;
    var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d');
console.log(formatted);
    if(len==1)
      res.render('client', { title: 'client',LBID:formatted,data:result});    
else 
  res.render('login', { title:'login',edata:'Wrong Password' });  }) 

});

module.exports = router;
