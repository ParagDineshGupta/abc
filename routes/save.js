var url=require('url');
var mysql = require('mysql');
var qs=require('querystring');
var dbcon = require('./dbcon');
var con = mysql.createConnection(dbcon.con);

var express = require('express');
var router = express.Router();
var app = express();

router.get('/', function(req, res, next) {

  res.render('login', { title: 'login' });


});

router.post('/', function(req, res, next) {

	var mj = new Array();
	mj=req.body;
var a=req.body.Client;
a=a.replace(/\s/g,'_'); 
var b=req.body.conid;
for(var myKey in mj) {
   console.log("key:"+myKey+", value:"+mj[myKey]);   
}
delete mj.Client;
delete mj.conid;


 con.query('INSERT INTO '+a+'_'+b+' SET ?', mj,function(err,result){
	 if(err){console.log(err);}
        else{console.log(result);
      }
	  res.render('login', { title: 'login2' });
		});


   


});

module.exports = router;
