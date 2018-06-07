var express = require('express');
var router = express.Router();
var fs = require('fs');
var url=require('url');
// var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "experimental"

// });
// con.connect(function(err) {
//   if (err) throw err;
//  console.log('conected');

// });
/* GET home page. */
router.get('/', function(req, res, next) {var q=url.parse(req.url,"true").query;
console.log(q);
    if(q.user=='customer'&& q.psw=='786')
    {   var sql2="SELECT * FROM customers";
    con.query(sql2, function (err,result) {
            if(err){throw err;
                res.end('error');}
            else{console.log(result);}


        var len = Object.keys(result).length;
        res.render('access', { title:'access',result:result,len:len });})}
   else if(q.user=='supplier'&& q.psw=='786')
    {var sql2="SELECT * FROM customer where action='unchecked'";
        con.query(sql2, function (err,result) {
            if(err){throw err;
                res.end('error');}
            else{console.log(result);}


            var len = Object.keys(result).length;
            res.render('supply', { title:'supply',result:result,len:len });})
       }
    else{
//         const xlsx = require('xlsx');
// // const xlsx = XLSX.readFile('Ridham.xlsx');
// // const sheet_name_list = workbook.SheetNames;
// // console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]));
// // Parse a buffer
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/Ridham.xlsx`));
// // Parse a file
// const workSheetsFromFile = xlsx.parse(`${__dirname}/Ridham.xlsx`);
        console.log('index');
 res.render('index', { title: 'index' });
    }
     
});


module.exports = router;

