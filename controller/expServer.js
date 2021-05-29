//extensions(???) used for the web app???
//import App from "../view/src/App";

const express = require('express')
const fileUpload = require('express-fileupload')
const fs = require('fs');
var bodyParser = require('body-parser');


const cors = require('cors');

const app = express();

//use cors to allow cross origin resource sharing
app.use(
    cors({
        origin: 'http://localhost:8080/',
        credentials: true,
    })
);


app.use(express.json());
//const detectAnomalies = require("../model/AnomalyDetectionModel.js");
//let class11= require("../model/AnomalyDetectionModel.js");
//The businessLogic of the webapp

//the webapp itself?

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const model1 = require('../model/AnomalyDetectionModel');
app.use(express.urlencoded({
    extended: false
}))

app.use(fileUpload({}))

app.use(express.static("../view/public"))
app.get('/', (req,res)=>{
    //check if should be a dot instead of /(!!!)
    res.sendFile("./index.html")
})

app.post('/detect', (req, res)=>{

    console.log("MAGNIVIM");
    let anomallyDetectionMethod = req.body.select1
    res.write("dfdf")
    if(req.files){
        var reg_flight = req.body.normal_file
        var fileWithAnomalies = req.body.test_file
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
