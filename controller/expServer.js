//extensions(???) used for the web app???
const express = require('express')
const fileUpload = require('express-fileupload')

//The businessLogic of the webapp
const model = require('../model/AnomalyDetectionModel')
//the webapp itself?
const app = express()

app.use(express.urlencoded({
    extended: false
}))

app.use(fileUpload())

app.use(express.static("../view"))
app.get('/', (req,res)=>{
    //check if should be a dot instead of /(!!!)
    res.sendFile("/public/index.html")
})

app.post('/detect', (req, res)=>{
    //req.body.
/*res.write('searching for ' + req.body.key+':\n')
let key = req.body.key
if(req.files){
    var file = req.files.text_file
    var result = model.findAnomaly(key, file.data.toString())
    res.write(result)
}
res.end()*/

})
app.listen(8080)
/*
app.get()
app.post()
app.t()
app.delete()
