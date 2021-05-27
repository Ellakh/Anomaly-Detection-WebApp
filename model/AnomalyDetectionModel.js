const anomalyDetector = require("./build/Release/main");
const fs = require("fs");

detectAnomalies("regression", "reg_flight.csv", "anomaly_flight.csv")

function detectAnomalies(detectorType, normalFileName, anomalyFileName) {
	anomalyDetector.detect(detectorType, normalFileName, anomalyFileName, function (err,res) {
		if (err) {
			console.error(err)
		} else {
			fs.writeFile("anomalies.json", res , function (err) {
			if (err) {
				throw err
			}
			fs.copyFile("anomalies.json", "../controller/anomalies.json", (err) => {
				if (err) throw err;
				console.log("anomalies.json was copied");
			});
			console.log('Saved!');
			})
	    }
	})
}
