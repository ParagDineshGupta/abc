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
    else
        res.end('error');
});

router.get('/', function(req, res, next) {
	
    var sql2="SELECT * FROM equipment";
    con.query(sql2, function (err,result) {
        if(err){throw err;
            res.end('error');}
        else{console.log('result');}
        var len = Object.keys(result).length;
		if(len>0)
			res.render('company', { title: 'Registration',data:result});    
else 
  res.render('access', { title:'access',result:result,len:len });  });

	    
});
router.post('/', function(req, res, next) {
	
    
	mj=req.body;
	console.log(mj);
	var quant = new Array();
   var iid;
var sql="INSERT INTO company values('','"+mj['company']+"','"+mj['cp']+"','"+mj['loc']+"','"+mj['mob']+"','"+mj['amob']+"','"+mj['email']+"','"+mj['web']+"','"+mj['type']+"','"+mj['state']+"')";
con.query(sql,function(err,result){
	 if(err){console.log(err);}
        else{
		 var abc=result.insertId;
		 iid=abc;
		 console.log(iid);
		   mj=req.body.equip;
		   var quant=req.body.txtbox1;
		   var power=req.body.power;
           sum=0;
		  if(typeof(req.body.txtbox1)!='object')
		  {
			  // 1 bar equant query
			  var sql2="INSERT INTO equant values('',"+iid+",'"+mj+"',"+quant+","+power+")";
			   con.query(sql2,function(err,result2){
			 
          if(err){console.log(sql2); }
         else{ 
		 var tid=result2.insertId;
		  i=sum;
		  sum=(quant-0)+(sum-0);
         while(quant>0){
			 
			 
	     var sql3="INSERT INTO equips values('',"+tid+",'"+mj+"','"+req.body.companies[i]+"','"+req.body.make[i]+"','"+req.body.locations[i]+"')";
         con.query(sql3,function(err,result3){
	     if(err){console.log(sql3);}
         else{ var lid=result3.insertId;
		 console.log(lid);} });	 
          quant--; 
		  i++;
		   }
		 
		 }
		  });
		 
		  }	 
       else{
		   	for(var myKey=0;myKey<mj.length;myKey++) 
		{if(!power[myKey]>0)
			power[myKey]=0;
	 var sql2="INSERT INTO equant values('',"+iid+",'"+mj[myKey]+"',"+quant[myKey]+","+power[myKey]+")";
	console.log("1:"+myKey);         
	console.log("2:"+myKey);
         con.query(sql2,function(err,result2){
			 console.log("3:"+myKey);
          if(err){console.log(sql2); }
         else{ console.log("4:"+myKey);
		 var tid=result2.insertId;
		 console.log("5:"+myKey);
		 console.log(tid);
		 console.log("6:"+myKey);		 
         console.log(mj.length);
		  i=sum;
		  sum=(quant[myKey]-0)+(sum-0);
         while(quant[myKey]>0){
			 
			 console.log("7:"+myKey);
	     var sql3="INSERT INTO equips values('',"+tid+",'"+mj[myKey]+"','"+req.body.companies[i]+"','"+req.body.make[i]+"','"+req.body.locations[i]+"')";
         con.query(sql3,function(err,result3){
	     if(err){console.log(sql3);}
         else{ var lid=result3.insertId;
		 console.log(lid);} });
          quant[myKey]--; 
		  i++;
		   console.log("8:"+myKey);}

		 
        }
        });
		
}
	   }		  
		   
		   
	
    }
	
});	

    var sql5="SELECT * FROM equipment";
    con.query(sql5, function (err,result5) {
        if(err){throw err;
            res.end('error');}
        else{console.log('result5');}
        var len = Object.keys(result5).length;
		if(len>0)
			res.render('company', { title: 'Registration',data:result5});    
else 
  res.render('access', { title:'access',result:result,len:len });  }) 

	 });



module.exports = router;

