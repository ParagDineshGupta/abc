//get sari company laye
//post company ke basis pr equips laye
//date

var express = require('express');
var router = express.Router();
var fs = require('fs');
var url=require('url');
var mysql = require('mysql');
var con = mysql.createConnection({
   host: "mydbinstance.cq4rkzpvmufw.ap-south-1.rds.amazonaws.com",
    user: "parag",
    password: "equipshare",
    database: "equipshare"


});
con.connect(function(err) {
    if (err) throw err;
});

/* GET home page. */
router.get('/', function(req, res, next) {
	
	
	var company = req.query.company;
	var sql="select * from  equant where company_id="+company;
	con.query(sql, function (err,result) {
		 if(err){throw err;
            res.end('error');}
        else{
			console.log(result);
			//console.log(result[0].equip);
			//console.log(result[0]['equip']);
			Object.keys(result).forEach(function(prop) {
  // `prop` is the property name
  console.log(prop);
  // `data[prop]` is the property value
  console.log(result[prop]);
});
		}
        //var len = Object.keys(result).length;
		//if(len>0)
			 res.send(result);
        //else 
          //   res.send('paragGupta');	
	});
	
	
	
   
});

module.exports = router;
