const anomalyDetector = require("./build/Release/main");
const fs = require("fs");
const path = require("path");

detectAnomalies("Regression", "./reg_flight.csv", "./anomaly_flight.csv");

function detectAnomalies(detectorType, normalFile, anomalyFile) {
	fs.copyFileSync(normalFile, "reg_file.csv");
	fs.copyFileSync(anomalyFile, "anomaly_file.csv");
	anomalyDetector.detect(detectorType, "reg_file.csv", "anomaly_file.csv", function (err,res) {
		if (err) {
			console.error(err)
		} else {
			fs.writeFileSync("anomalies.json", res , function (err) {
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

