var express = require('express');
var router = express.Router();
var fs = require('fs');
var url=require('url');
var mysql = require('mysql');
var dbcon = require('./dbcon');
var con = mysql.createConnection(dbcon.con);


router.get('/', function(req, res, next) {

	res.render('login', { title: 'login',edata:'' });    
});
router.post('/', function(req, res, next) {
	
    
	var user=req.body.user;
	var psw=req.body.psw;

  var sql2="SELECT * FROM admin_table where uname='"+user+"' and pass ='"+psw+"'";
    con.query(sql2, function (err,result) {
        if(err){res.render('login', { title: 'login' , edata:'Wrong User Name/Password ' });}
        else{
            // set session
            var len = Object.keys(result).length;
            if(len>0)
            res.render('admin/admin', { title: 'Admin Home'});
else
    res.render('login', { title: 'login' , edata:'Wrong User Name/Password ' });
            }
});
    });


module.exports = router;

