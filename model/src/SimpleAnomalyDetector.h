/* Author: 208604264 Aiden Kaminsky
 * mile stone 3 */

#ifndef SIMPLEANOMALYDETECTOR_H_
#define SIMPLEANOMALYDETECTOR_H_

#include <vector>
#include <algorithm>
#include <string.h>
#include <math.h>
#include "anomaly_detection_util.h"
#include "AnomalyDetector.h"
#include "minCircle.h"

struct correlatedFeatures{
	string feature1, feature2;  // names of the correlated features
	float corrlation; // the result from the pearson - not sure why we keep it
	Line lin_reg; // the line the 2 features make

	//my add on - so the struct will hold more info
	//the miniCircle made from the 2 features
	Circle mini_Circle;
	// the biggest deviation - will use to compere if there is an error
	float threshold;
	// the location of the correlated features in timeSeries
	float index_feature_1, index_feature_2; // 1 < 2
};

class SimpleAnomalyDetector:public TimeSeriesAnomalyDetector{
protected:
	vector<correlatedFeatures> cf;
	float threshold;
public:
	SimpleAnomalyDetector();
	virtual ~SimpleAnomalyDetector();

	virtual void learnNormal(const TimeSeries& ts);
	virtual vector<AnomalyReport> detect(const TimeSeries& ts);

	vector<correlatedFeatures> getNormalModel(){
		return cf;
	}

	void setNormalModel(vector<correlatedFeatures> correlatedF_list){
		cf = correlatedF_list;
	}

	//contain all the correlatedFeatures
	vector<correlatedFeatures> correlatedF_list; 
};

#endif /* SIMPLEANOMALYDETECTOR_H_ */
