/* Author: 208604264 Aiden Kaminsky
 * mile stone 3 */

#ifndef TIMESERIES_H_
#define TIMESERIES_H_

#include <vector>
#include <string>


using namespace std; //this is usually a bad practice. but I left it because you put it 

struct Feature{
	string name;
	vector<float> values;
	//float index_column; // it's place in the table column

	Feature(string the_name){
		this->name = the_name;
	}
	Feature(){}
};

class TimeSeries{
public:

	//constructor
	TimeSeries(const char* CSVfileName);

	//returns the value in row i column/Feature j
	float get_value_line_column(int i, int j) const;

	//returns the index of the name
	int get_index_of_fname(string name) const;

//private:
	//contein all the features\coloms
	vector<Feature> features_list;
	//how many lines are in the table, including the features line
	int how_many_lines;
};



#endif /* TIMESERIES_H_ */
