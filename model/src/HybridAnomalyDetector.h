/* Author: 208604264 Aiden Kaminsky
 * mile stone 3 */

#ifndef HYBRIDANOMALYDETECTOR_H_
#define HYBRIDANOMALYDETECTOR_H_

#include "SimpleAnomalyDetector.h"
#include "minCircle.h"

class HybridAnomalyDetector:virtual public SimpleAnomalyDetector {
protected:
	float correlation_threshold;
public:
	HybridAnomalyDetector();
	virtual ~HybridAnomalyDetector();

	//----I added----
	virtual vector<AnomalyReport> detect(const TimeSeries& ts);

	// correlation_threshold : handlers
	float get_correlation_threshold(){
		return correlation_threshold;
	}
	void set_correlation_threshold(float newCT){
		correlation_threshold = newCT;
	}
};

#endif /* HYBRIDANOMALYDETECTOR_H_ */
