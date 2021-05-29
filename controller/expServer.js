//extensions(???) used for the web app???
const express = require("express")
const fileUpload = require("express-fileupload")
const fs = require("fs");
//const form = require("form-data")
//The businessLogic of the webapp
const model = require("../model/AnomalyDetectionModel")
//the webapp itself?
const app = express()

app.use(express.urlencoded({
    extended: false
}))

app.use(fileUpload({}))

app.use(express.static("view"))
app.get('/', (req,res)=>{
    //check if should be a dot instead of /(!!!)
    res.sendFile("/src/App.js")
})

app.post("/detect", (req, res) => {
    if(req.files) {
        let anomalyDetectionMethod = get("selectDetection")
        let reg_file = req.body.root //.files.normal_file //req.files.normal_file
        let fileWithAnomalies = req.files.test_file //req.files.test_file
        model.detectAnomalies(anomalyDetectionMethod, reg_file, fileWithAnomalies)
        fs.copyFile("anomalies.json", "../view/src/anomalies.json", (err) => {
            if (err) {
                throw err
            }
        })
        //res.write("")
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
