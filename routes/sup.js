var url=require('url');
var mysql = require('mysql');
var qs=require('querystring');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "experimental"

});
con.connect(function(err) {
    if (err) throw err;
    console.log('conected');

});

var express = require('express');
var router = express.Router();
var app = express();


router.post('/', function(req, res, next) {

    var submit=req.body.submit;
    var sql2 = "update customer set action='checked' where id="+submit;

    con.query(sql2, function (err,result) {

        if(err){throw err;
            res.end('error');}
        else{console.log("1 record checked, ID: " + result.insertId);

        }
    });
    var sql2="SELECT * FROM customer where action='unchecked'";
    con.query(sql2, function (err,result) {
        if(err){throw err;
            res.end('error');}
        else{console.log(result);}


        var len = Object.keys(result).length;
        res.render('supply', { title:'supply',result:result,len:len });})


});

module.exports = router;
