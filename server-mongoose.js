const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

var mongoose = require('mongoose')

var url = "mongodb+srv://root:1234@cluster0.nfmqp.mongodb.net/todolist"

mongoose.connect(url, {useUnifiedTopology:true, useNewUrlParser:true, useFindAndModify:true, useCreateIndex: true})

const EmployeeSchema =  new mongoose.Schema({
    name: String,
    address: String
})

const EmployeeModel = mongoose.model('employee',EmployeeSchema)

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'ejs')

app.get('/', function(req, res){
    var result = EmployeeModel.find({}, function (err, docs) {
        if(err) throw err;
        res.render('index', {record: docs})
    })
       
         
})

app.post('/insert', function(req, res){

    var {name, address} = req.body

    const newEmployeeModel = new EmployeeModel({
        name: name, 
        address: address
    })
    newEmployeeModel.save()
    res.redirect('/')
})

app.post('/delete', function(req, res){

    var {pId} = req.body

    EmployeeModel.findOneAndRemove({name: pId}, function(err, docs){
        if(err) throw err;
        res.redirect('/')
    })
    
})



app.listen(port, function(){
    console.log('Server is up and running on '+ port)
})