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
const model1 = require('./AnomalyDetectionModel');
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

    // //
    // //console.log(req);
    let anomallyDetectionMethod = req.body.selection12
    // //console.log((req.files).myFile1)
    //
    //
    let reg_flight = (req.files).myFile1.data

    fs.writeFileSync("../model/reg_flight.csv",reg_flight.toString());
    let fileWithAnomalies = (req.files).myFile2.data

    fs.writeFileSync("../model/anomaly_flight.csv", fileWithAnomalies.toString());
    const reqFlightAbsolutePath = path.resolve("../model/reg_flight.csv")
    const anomalyFlightAbsolutePath = path.resolve("../model/anomaly_flight.csv")
    console.log(reqFlightAbsolutePath)   // fs.writeFile("../model/reg_flight.csv", reg_flight.toString("utf8"), function (err) {
    console.log(anomalyFlightAbsolutePath)
    //     if (err) {
    //         throw err
    //     }
    // })
    console.log("0000000");

    //
    //
    //
    //
    // console.log("111111111");
    // let fileWithAnomalies = (req.files).myFile2.data
    // fs.writeFile("../model/anomaly_flight.csv", fileWithAnomalies.toString("utf8"), function (err) {
    //     if (err) {
    //         throw err
    //     }
    // })
    // console.log("2222222");
    model1.detectAnomalies("Regression",reqFlightAbsolutePath, anomalyFlightAbsolutePath);
    // //console.log(fileWithAnomalies)
    //
    //
    //
    //
    // model1.detectAnomalies(anomallyDetectionMethod, reg_flight, fileWithAnomalies)
    //
    //  fs.copyFile("anomalies.json", "../view/src/anomalies.json", (err) => {
    //      if (err) throw err;
    // });
    console.log("3333333");


    //res.write("dfdf")
    //res.end()

})
app.listen(3000)
/*
app.get()
app.post()
app.t()
app.delete()
*/