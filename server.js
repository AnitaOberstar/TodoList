const express = require('express')
const app = express()
const port = 5000

var mongodb = require('mongodb')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb"

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'ejs')

/*
app.get('/', function(req, res){
    res.render('index')
})

app.get('/insert', function(req, res){

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("example");
        var myobj ={ name: 'daim', address: 'Highway 37' }
        dbo.collection("employee").insertOne(myobj, function(err, response) {
          if (err) throw err;
          
          res.redirect('/')
          db.close();
        });
      });
})
*/

app.get('/', function(req, res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("example");
        dbo.collection("employee").find({}).toArray( function(err, result) {
          if (err) throw err;
          res.render('index', {record: result})
          db.close();
        });
      });
})

app.post('/insert', function(req, res){

    var {name, address} = req.body

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("example");
        var myobj ={ name: name, address: address }
        dbo.collection("employee").insertOne(myobj, function(err, response) {
          if (err) throw err;
          
          res.redirect('/')
          db.close();
        });
      });
})

app.post('/delete', function(req, res){

    var {pId} = req.body

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("example");
        var myquery = { name: pId };
        dbo.collection("employee").findOneAndDelete(myquery, function(err, obj) {
          if (err) throw err;
          res.redirect('/')
          db.close();
        });
      });
})



app.listen(port, function(){
    console.log('Server is up and running on '+ port)
})