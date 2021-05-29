//import App from "../view/src/App";

const anomalyDetector = require("./build/Release/main");
const fs = require("fs");

//detectAnomalies("regression", "reg_flight.csv", "anomaly_flight.csv")

function detectAnomalies(detectorType, normalFile, anomalyFile) {
	fs.writeFile("reg_file.csv", normalFile.data.toString(), function (err) {
		if (err) {
			throw err
		}
	})
	fs.writeFile("anomaly_file.csv", anomalyFile.data.toString(), function (err) {
		if (err) {
			throw err
		}
	})
	anomalyDetector.detect(detectorType, "reg_file.csv", "anomaly_file.csv", function (err,res) {
		if (err) {
			console.error(err)
		} else {
			fs.writeFile("anomalies.json", res , function (err) {
				if (err) {
					throw err
				}
			})
			fs.copyFile("anomalies.json", "../controller/anomalies.json", (err) => {
				if (err) {
					throw err
				}
			})
	    }
	})
}
module.exports.detectAnomalies = detectAnomalies
module.exports.anomalyDetector = anomalyDetector
module.exports.fs = fs