//extensions(???) used for the web app???
//import App from "../view/src/App";
const path = require('path');
const express = require('express')
const fileUpload = require('express-fileupload')
const fs = require('fs');
var bodyParser = require('body-parser');
//var multer  = require('multer')
//var upload  = multer({ dest: 'uploads/' })
//const storage = multer.diskStorage({
//    destination: function(req, file, cb) {
//        cb(null, 'uploads/');
//    },

    // By default, multer removes file extensions so let's add them back
//    filename: function(req, file, cb) {
//        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//    }
//});



const cors = require('cors');

const app = express();
//require('dotenv').load();
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
app.use(bodyParser.urlencoded({ extended: false }));
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

    //console.log(req);
    console.log(req);
    let anomallyDetectionMethod = req.body[0].data.label


    let reg_flight = req.files[1]




    let fileWithAnomalies = req.files[0]


    console.log("MAGNIVIM3");

    model1.detectAnomalies(anomallyDetectionMethod, reg_flight, fileWithAnomalies)
    console.log("MAGNIVIM4");
    fs.copyFile("anomalies.json", "../view/src/anomalies.json", (err) => {
        console.log("LOMAGNIVIM");
        if (err) throw err;
        console.log("anomalies.json was copied");
    });
    console.log("MAGNIVIM5");

    //res.write("dfdf")
    res.end()
    console.log("MAGNIVIM6");
})
app.listen(3000)
/*
app.get()
app.post()
app.t()
app.delete()
*/
