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
       if (err) console.log(err);
   
});

router.get('/', function(req, res, next) {
	
    var sql2="	SELECT company.company_id,company.company,company.type,equant.eqid,equant.equip,equant.quantity FROM company INNER JOIN equant ON company.company_id=equant.company_id;";
    con.query(sql2, function (err,result) {
        if(err){throw err;
            res.end('error');}
        else{console.log(result);}
        var len = Object.keys(result).length;
		if(len>0)
			res.render('match', { title: 'match',data:result});    
else 
  res.render('access', { title:'access',result:result,len:len });  })

	    
});
router.post('/', function(req, res, next) {
	

	
    var mj = new Array();
	mj=req.body;
for(var myKey in mj) {
	
   console.log("key:"+myKey+", value:"+mj[myKey]);   
}
if(req.body.company_id>0){
	    var sql2="SELECT * FROM company where company_id="+req.body.company_id;
    con.query(sql2, function (err,result) {
        if(err){
            res.end('error');}
        else{console.log(result);}
        var len = Object.keys(result).length;
		if(len==1)
			res.render('show', { title: '',data:result});    
else 
  res.render('access', { title:'access',result:result,len:len });  });
	
}
else{  
	var sql2="SELECT * FROM equips where eqid="+req.body.eqid;
    con.query(sql2, function (err,result) {
        if(err){
            res.end('error');}
        else{console.log(result);}
        var len = Object.keys(result).length;
		if(len>1)
			res.render('showequip', { title: '',data:result});    
else 
  res.render('access', { title:'access',result:result,len:len });  });}
	 });



module.exports = router;

