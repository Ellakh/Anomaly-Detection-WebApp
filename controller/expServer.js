//extensions(???) used for the web app???
//import App from "../view/src/App";

const express = require('express')
const fileUpload = require('express-fileupload')
const fs = require('fs');
var bodyParser = require('body-parser');
//const detectAnomalies = require("../model/AnomalyDetectionModel.js");
//let class11= require("../model/AnomalyDetectionModel.js");
//The businessLogic of the webapp
const model1 = require('../model/AnomalyDetectionModel');
//the webapp itself?
const app = express()

app.use(express.urlencoded({
    extended: false
}))
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload({}))

app.use(express.static("../view/public"))
app.get('/', (req,res)=>{
    //check if should be a dot instead of /(!!!)
    res.sendFile("./index.html")
})

app.post('/detect', (req, res)=>{

    let anomallyDetectionMethod = req.files.select1
    if(req.files){
        var reg_flight = req.files.normal_file
        var fileWithAnomalies = req.files.test_file
        model1.detectAnomalies(anomallyDetectionMethod, reg_flight, fileWithAnomalies)
        fs.copyFile("anomalies.json", "../view/src/anomalies.json", (err) => {
            if (err) throw err;
            console.log("anomalies.json was copied");
        });
    }
    //res.write("dfdf")
    res.end()
})
app.listen(3000)
/*
app.get()
app.post()
app.t()
app.delete()
*/
