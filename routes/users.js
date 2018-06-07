var url=require('url');
var mysql = require('mysql');
var qs=require('querystring');
var dbcon = require('./dbcon');
var con = mysql.createConnection(dbcon.con);

var express = require('express');
var router = express.Router();
var app = express();


router.post('/', function(req, res, next) {
    var mobile=req.body.mob;
    var submit=req.body.submit;
    var sql2 = "INSERT INTO customer VALUES ('','"+mobile+"', '"+submit+"','unchecked','')";

    con.query(sql2, function (err,result) {

        if(err){
            res.end('error');}
        else{console.log("1 record inserted, ID: " + result.insertId);

        }
    });
    var sql2="SELECT * FROM customers";
    con.query(sql2, function (err,result) {
        if(err){throw err;
            res.end('error');}
        else{console.log(result);}
        var len = Object.keys(result).length;
        res.render('access', { title:'access',result:result,len:len });})


});

module.exports = router;
