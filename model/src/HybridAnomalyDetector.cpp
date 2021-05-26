/* Author: 208604264 Aiden Kaminsky
 * mile stone 3 */
#include "HybridAnomalyDetector.h"

//constructor of HybridAnomalyDetector
HybridAnomalyDetector::HybridAnomalyDetector() {
	// TODO Auto-generated constructor stub
	correlation_threshold = (float) 0.9;
}

//destroer of HybridAnomalyDetector
HybridAnomalyDetector::~HybridAnomalyDetector() {
	// TODO Auto-generated destructor stub
}

vector<AnomalyReport> HybridAnomalyDetector::detect(const TimeSeries& ts){
	// ts built: features_list -> Feature:name, values
	// correlatedF_list built: correlatedFeatures -> string feature1, feature2; float corrlation; Line lin_reg; Circle miniCircle;
	                                                 // float biggest_dev_threshold; float index_feature_1, index_feature_2;

	//we need to process the ts we got by going over correlatedFeatures selecting the correlated Features of the new ts
	// make a point from the values and checking with biggest_dev_threshold if it's OK - if not add to the report list

	//the list we return
	vector<AnomalyReport> report_list;

	//for easy use
	// vector<correlatedFeatures> correlatedF_list = getNormalModel();
	vector<correlatedFeatures> &correlatedF_list(cf);

	//going over every correlatedFeature to check all the posoble checks, because every correlatedFeature is a check
	for(int index_correlatedF_list = 0; index_correlatedF_list < correlatedF_list.size(); index_correlatedF_list++){
		correlatedFeatures current_cf = correlatedF_list[index_correlatedF_list];

		for(int index_line = 0; index_line < ts.features_list[0].values.size(); index_line++){
			bool report_flag = false;
			//make a point
			Point p = Point(ts.get_value_line_column(index_line, ts.get_index_of_fname(current_cf.feature1)), 
							 ts.get_value_line_column(index_line, current_cf.index_feature_2));

			//checking what to use to detect: SimpleAnomalyDetector OR miniCircle
			if(current_cf.corrlation >= correlation_threshold){
				//useing the SimpleAnomalyDetector
				//checking if there is an error
				if(dev(p, current_cf.lin_reg) > current_cf.threshold){
					report_flag = true; //need to report
				}
			}
			else if(0.5 < current_cf.corrlation && current_cf.corrlation < correlation_threshold){
				//useing miniCircle
				//checking if there is an error
				if(!is_inside(current_cf.mini_Circle, p)){
					report_flag = true; //need to report
				}
			}

			//if we need to report
			if(report_flag){
				//make report
				AnomalyReport report( current_cf.feature1+"-"+current_cf.feature2, index_line + 1);
				//add to list
				report_list.push_back(report);
			}
		}
	}// end of for(int index_correlatedF_list = 0;................
	return report_list;
}