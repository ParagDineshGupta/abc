//get sari company laye
//post company ke basis pr equips laye
//date

var express = require('express');
var router = express.Router();
var fs = require('fs');
var url=require('url');
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "experimental"

});
con.connect(function(err) {
    if (err) console.log(err);
});

/* GET home page. */
router.get('/', function(req, res, next) {
	
	var sql="select * from  company group by company";
	con.query(sql, function (err,result) {
		 if(err){throw err;
            res.end('error');}
        else{console.log('result');}
        var len = Object.keys(result).length;
		if(len>0)
			 res.render('orders',{ title: 'orders',data:result });
        else 
             res.render('access', { title:'access',result:result,len:len }); 	
	});

   
});

router.post('/', function(req, res, next) {
    var mj = new Array();
	var ij = new Array();
	mj=req.body;
	
	
	
for(var myKey in mj) {   console.log("key:"+myKey+", value:"+mj[myKey]);   }

var len=req.body.vender;
len=len.length;

for( i=0;i<len;i++){
	if(len==1)
{
	ij=mj;
}
else{
	for(var myKey in mj) {   
ij[myKey]=mj[myKey][i];
 }
}

 for(var myKey in ij) {   
console.log("key:"+myKey+", value:"+ij[myKey]);
 }
 //console.log(mj);
 //console.log(typeof mj);
 //console.log(ij);
 //var myObj = {};
 //console.log(typeof ij);
 
	
 var sql="insert into `order` values(0,'"+ij['vender']+"','"+ij['equip']+"',"+ij['capacity']+","+ij['quantity']+",'"+ij['rentout']+"','"+ij['returndate']+"')"
 
 //myObj=JSON.stringify(myObj);
 //con.query('INSERT INTO `order` SET ?',ij,function(err,result){
	 con.query(sql,function(err,result){
	 if(err){console.log(err);}
        else{console.log(result);}
});
 }


var sql="select * from  company group by company";
	con.query(sql, function (err,result) {
		 if(err){throw err;
            res.end('error');}
        else{console.log('result');}
        var len = Object.keys(result).length;
		if(len>0)
			 res.render('orders',{ title: 'orders',data:result });
        else 
             res.render('access', { title:'access',result:result,len:len }); 	
	});


	 });
module.exports = router;
