/* Author: 208604264 Aiden Kaminsky
 * mile stone 3 */

#include "SimpleAnomalyDetector.h"

//constructor of SimpleAnomalyDetector
SimpleAnomalyDetector::SimpleAnomalyDetector() {
	// TODO Auto-generated constructor stub
	threshold = 0.5; 	//setting a threshold, because the diffrence bitween aspects need to be a surtin hight
}

//destroer of SimpleAnomalyDetector
SimpleAnomalyDetector::~SimpleAnomalyDetector() {
	// TODO Auto-generated destructor stub
}

//the learning stage
//gets: TimeSeries - should not have any errors becoues we are before the flight
void SimpleAnomalyDetector::learnNormal(const TimeSeries& ts){
	float breathing_space = (float) 1.1;
	Point** points = new Point*[ts.features_list[0].values.size()];

	//for easy use
	vector<correlatedFeatures> correlatedF_list = getNormalModel();

	float result;
	Line tempLine;
	Circle tempCircle;
	Feature feature1("temp1");
	Feature feature2("temp2");
	//cheacking what aspect i in TimeSeries is correlated with aspect j
	for(int index_aspect = 0; index_aspect < ts.features_list.size(); index_aspect++){
		float maxCorrelation = 0;
		int indexLineMax = -1;
		//starting to check from index_aspect so we dont check the same combo 2 times
		for(int index_line = index_aspect; index_line < ts.features_list.size(); index_line++){
			//make sure we dont check if the feature is correlated to himself, becuase it is and we dont want to save that
			if(index_aspect != index_line){
				result = abs(pearson(&ts.features_list[index_aspect].values[0], &ts.features_list[index_line].values[0], ts.features_list[index_aspect].values.size()));

				if(result > threshold){
					//save the aspects to later know that they are correlated
					if(result > maxCorrelation){
						maxCorrelation = result;
						indexLineMax = index_line;
					}
				}
			}
		}//end for(int index_line = 1;...........
		if(indexLineMax != -1){
			//making points to use for the line, and puting the leftmost aspect will be the x
			if(index_aspect < indexLineMax){
				feature1 = ts.features_list[index_aspect];
				feature2 = ts.features_list[indexLineMax];
			}
			else {
				feature1 = ts.features_list[indexLineMax];
				feature2 = ts.features_list[index_aspect];
			}

			for(int i = 0; i < ts.features_list[index_aspect].values.size(); i++){
				points[i] = new Point(feature1.values[i], feature2.values[i]);
			}
			//and make a line out of the 2 of them
			tempLine = linear_reg(points, ts.features_list[index_aspect].values.size());
			//and make a miniCircle out of the 2 of them
			tempCircle = findMinCircle(points, ts.features_list[index_aspect].values.size());
			tempCircle.radius *= breathing_space;

			float save_max_dev = 0;
			//now finding the bigest deviation between a line and a point
			for(int on_this_point = 0; on_this_point < ts.features_list[index_aspect].values.size(); on_this_point++){
				float the_dev = dev(*points[on_this_point], tempLine);
				if(the_dev > save_max_dev){
					save_max_dev = the_dev;
				}
			}
			save_max_dev = save_max_dev * breathing_space; //change code according to later specification, in moodel
			struct correlatedFeatures temp = {feature1.name, feature2.name, maxCorrelation, tempLine, tempCircle, save_max_dev, (float)index_aspect, (float)indexLineMax};

			correlatedF_list.push_back(temp);
		}
	}// end of for(int index_aspect = 0;................
	setNormalModel(correlatedF_list);
	//reales memory
	for(int i = 0; i < ts.features_list[0].values.size(); i++){
		delete points[i];
	}
}

//gets a timeseries that tells about a new flight
// we need to check if the new timeseries has any error according to the correlatedF_list 
vector<AnomalyReport> SimpleAnomalyDetector::detect(const TimeSeries& ts){
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
	
	float deviation = 0;
	//going over every correlatedFeature to check all the posoble checks, because every correlatedFeature is a check
	for(int index_correlatedF_list = 0; index_correlatedF_list < correlatedF_list.size(); index_correlatedF_list++){
		correlatedFeatures current_cf = correlatedF_list[index_correlatedF_list];

		//going over every line of the new timeseries
		for(int index_line = 0; index_line < ts.features_list[0].values.size(); index_line++){
			Point p = Point(ts.get_value_line_column(index_line, ts.get_index_of_fname(current_cf.feature1)), 
			                  ts.get_value_line_column(index_line, current_cf.index_feature_2));
			
			deviation = dev(p, current_cf.lin_reg);

			//checking if there is an error
			if(deviation > current_cf.threshold){
				//make report
				AnomalyReport report( current_cf.feature1+"-"+current_cf.feature2, index_line + 1);
				//add to list
				report_list.push_back(report);
			}
		}
	}// end of for(int index_correlatedF_list = 0;................
	return report_list;
}
