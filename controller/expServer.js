//extensions(???) used for the web app???
//import App from "../view/src/App";

const express = require('express')
const fileUpload = require('express-fileupload')
const fs = require('fs');
let bodyParser = require('body-parser');
const cors = require('cors');
let busboy = require('connect-busboy');
const app = express();

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({ uploadDir: './' });

var router = express.Router();

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

app.use(fileUpload()) //{}

app.use(busboy())

app.use(express.static("../view/public"))
app.get('/', (req,res)=>{
    //check if should be a dot instead of /(!!!)
    res.sendFile("./index.html")
})
/*
app.post('/detect', (req, res)=>{
    let anomalyDetectionMethod = req.body.select1;
    console.log("MAGNIVIM1");
    let fstream;
    req.pipe(req.busboy);
    console.log("MAGNIVIM2");
    let count = 0;
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        if (count === 0) {
            fstream = fs.createWriteStream(__dirname + "reg_file.csv");
        } else {
            fstream = fs.createWriteStream(__dirname + "test_file.csv");
        }
        console.log("MAGNIVIM3");
        file.pipe(fstream);
        console.log("MAGNIVIM4");
        fstream.on('close', function () {
            console.log("MAGNIVIM5");
            count++;
            if (count === 2) {
                let reg_flight;
                fs.readFile('reg_file.csv', 'utf8', function(err, data) {
                    console.log("MAGNIVIM6");
                    if (err) throw err;
                    reg_flight = data;
                });
                let test_file;
                fs.readFile('test_file.csv', 'utf8', function(err, data) {
                    console.log("MAGNIVIM7");
                    if (err) throw err;
                    test_file = data;
                });
                model1.detectAnomalies(anomalyDetectionMethod, reg_flight, test_file);
                console.log("MAGNIVIM8");
                fs.copyFile("anomalies.json", "../view/src/anomalies.json", (err) => {
                    console.log("MAGNIVIM9");
                    if (err) throw err;
                    console.log("anomalies.json was copied");
                });
                console.log("MAGNIVIM9");
            }
            res.redirect('back');
        });
    });
    res.end()



    console.log("MAGNIVIM");
    let anomallyDetectionMethod = req.body.select1
    console.log("MAGNIVIM1");
    //if(req.files) {
        console.log(res);
        console.log("MAGNIVIM2");
        let reg_flight = req.body.normal_file
        //var reg_flight = req.
        console.log("MAGNIVIM3");
        let fileWithAnomalies = req.body.test_file
        //var fileWithAnomalies = req.get("test_file")
        console.log("MAGNIVIM4");
        model1.detectAnomalies(anomallyDetectionMethod, reg_flight, fileWithAnomalies)
        console.log("MAGNIVIM5");
        fs.copyFile("anomalies.json", "../view/src/anomalies.json", (err) => {
            console.log("MAGNIVIM6");
            if (err) throw err;
            console.log("anomalies.json was copied");
        });
        console.log("MAGNIVIM7");
    //}
    console.log("MAGNIVIM8");
    res.end()
})
*/

app.post('/detect', multipartyMiddleware, function(req, res) {
    console.log("1");
    console.log(req.body, req.files);
    var norm = req.files[0];
    console.log(req.files[0].data.toString());
    var test = req.files[1];
    console.log(req.files[1].data.toString());
    console.log("2");
    let anomalyDetectionMethod = req.body.select1;
    model1.detectAnomalies(anomalyDetectionMethod, norm, test);
    console.log("3");
    fs.copyFile("anomalies.json", "../view/src/anomalies.json", (err) => {
        console.log("4");
        if (err) throw err;
        console.log("anomalies.json was copied");
    });
    console.log("5");
    res.status(200).send('OK');
});

//module.exports = router;

var normFile;
var anomalyFile;
var anomalyDetectionMethod;

app.post('/uploadNorm', (req, res, next) => {
    let normFile = req.files.file;
    normFile.mv('${__dirname}/${normFile.name}', function (err) {
        if (err) throw err;
    });
})

app.post('/uploadTest', (req, res, next) => {
    let testFile = req.files.file;
    testFile.mv('${__dirname}/${testFile.name}', function (err) {
        if (err) throw err;
    });
})

app.post('/algorithmSelect', (req, res, next) => {
    anomalyDetectionMethod = req.body.select1;
})

app.post('/detect', (req, res, next) => {
    model1.detectAnomalies(anomalyDetectionMethod, normFile, anomalyFile);
    fs.copyFile("anomalies.json", "../view/src/anomalies.json", (err) => {
        console.log("MAGNIVIM");
        if (err) throw err;
        console.log("anomalies.json was copied");
    });
})

app.listen(3000)
/*
app.get()
app.post()
app.t()
app.delete()
*/
