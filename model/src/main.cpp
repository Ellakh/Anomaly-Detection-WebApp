#include <nan.h>
#include "main.h"
#include "AnomalyDetector.h"
#include "timeseries.h"
#include "SimpleAnomalyDetector.h"
#include "HybridAnomalyDetector.h"
#include <vector>
#include <iostream>
#include <fstream>
#include <functional>
#include <string.h>

using namespace std;

NAN_METHOD(detect) {
	v8::Isolate* isolate = info.GetIsolate();
	v8::String::Utf8Value detectorType(isolate, info[0]);
	std::string detectType(*detectorType);
	v8::String::Utf8Value normalFileName(isolate, info[1]);
	std::string normalFile(*normalFileName);
	v8::String::Utf8Value anomalyFileName(isolate, info[2]);
	std::string anomalyFile(*anomalyFileName);
    Nan::Callback* callback = new Nan::Callback(info[3].As<v8::Function>());
    Nan::AsyncQueueWorker(new AnomalyWorker(detectType, normalFile, anomalyFile, callback));
}

NAN_MODULE_INIT(init) {
    Nan::SetMethod(target, "detect", detect);
}

void AnomalyWorker::Execute() {
	TimeSeriesAnomalyDetector* detector;
	if (this->detectType == "regression") {
		detector = new SimpleAnomalyDetector();
	} else {
		detector = new HybridAnomalyDetector();
	}	
	detector->learnNormal(TimeSeries(&(this->normal[0])));
	vector<AnomalyReport> reports = detector->detect(TimeSeries(&(this->anomaly[0])));
    //std::string prevDescription = "";
	std::string anomalyJsonStr = "{\n  \"anomalies\": [";
	
    for (AnomalyReport r : reports) {
		anomalyJsonStr += "\n    {\n      \"feature\": \"";
		anomalyJsonStr += r.description;
		anomalyJsonStr += "\",\n      \"Timestemp\": \"";
		anomalyJsonStr += std::to_string(r.timeStep);
		anomalyJsonStr += "\"\n    },";
	}
    
    /*
    if (reports.size() == 1) {
        anomalyJsonStr += "\n    {\n      \"features\": \"";
		anomalyJsonStr += reports[0].description;
		anomalyJsonStr += "\",\n      \"Timestemp\": \"";
		anomalyJsonStr += std::to_string(reports[0].timeStep);
		anomalyJsonStr += "\"\n    },";
    } else {
        int count = 0;
        for (int i = 1; i < reports.size(); i++) {
            if (reports[i].description == reports[i-1].description &&
                    reports[i].timeStep - 1 == reports[i-1].timeStep) {
                count++;
            } else if (count > 0) {
                anomalyJsonStr += "\n    {\n      \"features\": \"";
                anomalyJsonStr += reports[0].description;
                anomalyJsonStr += "\",\n      \"Timestemp\": \"[";
                anomalyJsonStr += std::to_string(reports[i].timeStep - count);
                anomalyJsonStr += ",";
                anomalyJsonStr += std::to_string(reports[i].timeStep);
                anomalyJsonStr += "]\"\n    },";
                count = 0;
            }
        }
    }
    */
	if (anomalyJsonStr.back() == ',') {
		anomalyJsonStr.pop_back();
	}
	anomalyJsonStr += "\n  ]\n}\n";
	this->json = anomalyJsonStr;
}

void AnomalyWorker::HandleOKCallback() {
    Nan::HandleScope scope;
    v8::Local<v8::Value> argv[] = { Nan::Undefined(), v8::String::NewFromUtf8(v8::Isolate::GetCurrent(),
                                        this->json.c_str(), v8::NewStringType::kNormal).ToLocalChecked() };
    myCallback->Call(2, argv);
}

NODE_MODULE(main, init);
