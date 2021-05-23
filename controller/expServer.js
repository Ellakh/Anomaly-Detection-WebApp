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
    let anomallyDetectionMethod = req.body.key
    if(req.files){
        var reg_flight = req.files.normal_file
        var fileWithAnomalies = req.files.test_file
        model.detectAnomalies(anomallyDetectionMethod, reg_flight, fileWithAnomalies)
    }
    res.end()
})
app.listen(8080)
/*
app.get()
app.post()
app.t()
app.delete()
*/
