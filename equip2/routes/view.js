var express = require('express');
var router = express.Router();
var fs = require('fs');
var url=require('url');

var mysql = require('mysql');
var dbcon = require('./dbcon');
var con = mysql.createConnection(dbcon.con);
router.get('/', function(req, res, next) {
	
	res.render('view', { title: 'view' });
 
     
});
router.post('/', function(req, res, next) {
	var fdate=req.body.fdate;
	var tdate=req.body.tdate;
	fdate=fdate.replace('-','');
	tdate=tdate.replace('-','');
	fdate=fdate.replace('-','');
	tdate=tdate.replace('-','');
	console.log(req.body.fdate);
	
 
  var sql2="SELECT * FROM contract where conid='"+req.body.conid+"' ";
    con.query(sql2, function (err,xresult) {
        if(err){ res.end('error');
          console.log('err');  }
        else{console.log('xresult');}
        var len = Object.keys(xresult).length;
		if(len==1){
			console.log(xresult[0].Client);
			var a=xresult[0].Client;
			var oh=xresult[0].Working_Days;
			oh=oh*xresult[0].Working_Hours;
			//oh=oh*day/30;
			a=a.replace(/\s/g,'_');  
			var next=a+"_"+xresult[0].conid;
			var sql="SELECT SUM( Fuel ) as Fuel,SUM( PPE ) as PPE,SUM( Alcohol ) as Alcohol,SUM(Breakdown_Hours) as Breakdown_Hours,SUM(Operation_Hours) as Operation_Hours,SUM(Full_Drum) as Full_Drum,SUM(Dry_Run) as Dry_Run From "+next+" WHERE LBID BETWEEN '"+fdate+"' AND '"+tdate+"'";
			//		RTO	Driver_Availability	Over_Speeding	GPS	Parking	Toppling	Breakdown_Hours	Operation_Hours	Full_Drum	Dry_Run
    con.query(sql, function (err,result) {
        if(err){
          console.log(err); 
		 res.render('view', { title:'view' }); }
	else{console.log(sql);
	if(oh<result[0]['Operation_Hours'])
		result[0]['Operation_Hours']=result[0]['Operation_Hours']-oh;
	else
		result[0]['Operation_Hours']=0;
		var eq=xresult[0].Equipment;
			var fp=xresult[0].Fuel_Provider;
			var fe=xresult[0].Fuel_Power;
	if(!(eq =='Transit Mixer' || eq == 'Bulker' || eq == 'Tipper'))
	{ delete result[0].Full_Drum;
	delete result[0].Dry_Run;
	console.log(eq);}
	else if(!(fp =='owner' && fe=='client')){
		delete result[0].Full_Drum;
	delete result[0].Dry_Run;	
	console.log(fp);
	console.log(fe);
	}
	else
	{
		//fd===0?
var fuelrate=70;
var fd=1/xresult[0].Full_Drum;
xresult[0].Full_Drum=fd*fuelrate;
var dr=1/xresult[0].Dry_Run;
xresult[0].Dry_Run=dr*fuelrate;
//round
	}
	var tp=new Array;
	for(var myKey in result[0]) {
		if(xresult[myKey]>=0)
		{ tp[0][myKey]=(result[0][myKey] * xresult[0][myKey]);  
		console.log(tp[0][myKey],myKey); }
}
	res.render('resultview', { title: 'Result',data:result,xdata:xresult,datasum:tp});  }
	});	
			  
		}
			
else 
  res.render('view', { title:'view' });  }) 
});

module.exports = router;