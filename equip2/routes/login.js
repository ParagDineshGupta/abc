var express = require('express');
var router = express.Router();
var fs = require('fs');
var url=require('url');
var md5 = require('md5');
var aesjs = require('aes-js');
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "mydbinstance.cq4rkzpvmufw.ap-south-1.rds.amazonaws.com",
    user: "parag",
    password: "equipshare",
    database: "equipshare"

});
con.connect(function(err) {
      if (err) console.log(err);
    else
        res.end('error');

});
router.get('/', function(req, res, next) {
	
	res.render('login', { title: 'login' });
 
//console.log(md5('message'));
 //res.render('client', { title: 'client' });
     
});
router.post('/', function(req, res, next) {
	
    	var mj = new Array();
	mj=req.body;
	var user=req.body.user;
	var psw=req.body.psw;

for(var myKey in mj) {
   console.log("key:"+myKey+", value:"+mj[myKey]);   
}
 
  var sql2="SELECT * FROM contract where conid='"+user+"' and Client_Password ='"+psw+"'";
    con.query(sql2, function (err,result) {
        if(err){throw err;
            res.end('error');}
        else{console.log('result');}
        var len = Object.keys(result).length;
		var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d');
console.log(formatted);
		if(len==1)
			res.render('client', { title: 'client',LBID:formatted,data:result});    
else 
  res.render('login', { title:'login' });  }) 
  


});


module.exports = router;

