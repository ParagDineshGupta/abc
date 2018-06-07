//get sari company laye
//post company ke basis pr equips laye


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
    if (err) throw err;
});

/* GET home page. */
router.get('/', function(req, res, next) {
	
	
	var company = req.query.company;
	var equip = req.query.equip;
	var sql="select * from  equant where company_id="+company+" and equip='"+equip+"'";
	con.query(sql, function (err,result) {
		 if(err){
            console.log(err);}
        else{
			console.log(result);
			console.log(result[0].power);
			console.log(result[0]['power']);
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
