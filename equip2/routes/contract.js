var url=require('url');
var mysql = require('mysql');
var qs=require('querystring');
var con = mysql.createConnection({
   host: "mydbinstance.cq4rkzpvmufw.ap-south-1.rds.amazonaws.com",
    user: "parag",
    password: "equipshare",
    database: "equipshare"

});
con.connect(function(err) {
    if (err) throw err;
    console.log('conected');

});

var express = require('express');
var router = express.Router();
var app = express();

router.get('/', function(req, res, next) {

    var sql2="SELECT * FROM equipment";
    con.query(sql2, function (err,result) {
        if(err){throw err;
            res.end('error');}
        else{console.log('result');}
        var len = Object.keys(result).length;
		if(len>0)
			res.render('contract', { title: 'Contract',contract:'',data:result});    
else 
  res.render('access', { title:'access',result:result,len:len });  })


});

router.post('/', function(req, res, next) {
   
	var mj = new Array();
	mj=req.body;

for(var myKey in mj) {
   console.log("key:"+myKey+", value:"+mj[myKey]);   
}


 con.query('INSERT INTO contract SET ?', mj,function(err,result){
	 if(err){console.log(err);
            res.end('error');}
        else{console.log(result);
		mj['Client'] = mj['Client'].replace(/\s/g,'_');  
		var sql2="create table "+mj['Client']+"_"+result.insertId+"(LBID Date,Fuel int DEFAULT 0,Operation_Hours int DEFAULT 0,PPE int DEFAULT 0,Alcohol int DEFAULT 0,Breakdown_Hours int DEFAULT 0,Full_Drum int DEFAULT 0,Dry_Run int DEFAULT 0,PRIMARY KEY (LBID))";
    con.query(sql2, function (err,result) {
        if(err){throw err;
            res.end('error');}
        else{console.log('result');}
         });
		
		
       var sql2="SELECT * FROM equipment";
    con.query(sql2, function (err,result) {
        if(err){throw err;
            res.end('error');}
        else{console.log('result');}
        var len = Object.keys(result).length;
        if(len>0)
            res.render('contract', { title: 'Contract',contract:'',data:result});    
else 
  res.render('access', { title:'access',result:result,len:len });  })}
		});


   


});

module.exports = router;
