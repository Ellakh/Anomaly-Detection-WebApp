/* Author: 208604264 Aiden Kaminsky
 * mile stone 3 */

#include "timeseries.h"

#include<iostream>
#include <fstream> 
#include <sstream>

using namespace std;

TimeSeries::TimeSeries(const char* CSVfileName){
    // File pointer 
    fstream fin; 
  
    // Open an existing file 
    fin.open(CSVfileName, ios::in); 

    // Read the Data from the file as String Vector 
    vector<string> row; 
    string line, word, temp;
    int index_column = 0; //to know where we are in a line

    //--- will read the first line, because it is the names of -- line
    // read an entire row and 
    // store it in a string variable 'line' 
    getline(fin, line);
    // used for breaking words 
    stringstream s(line);
    while (getline(s, word, ',')) {
        features_list.push_back(Feature(word));
    } 

    //to know how_many_lines there are, and to help put the values in the features
    int index_line = 0;

    //going over the rest of the file
    //line by line
    while (fin >> temp) { 
        index_column = 0; // starting from the start of the line
        index_line++; // we moved to the next line
        row.clear();
  
        // used for breaking words 
        stringstream s(temp); 
  
        // read every column data of a row and 
        // store it in the relevent feature's values in the relevent place\line
        while (getline(s, word, ',')) { 
            // and convert the string to float
            features_list[index_column].values.push_back(std::stof(word));
            index_column++;
        } 
        how_many_lines = features_list[index_column].values.size();
    } //end of while (fin >> temp)
}

float TimeSeries::get_value_line_column(int line, int column) const{
    return features_list[column].values[line];
}

int TimeSeries::get_index_of_fname(string name) const{
    for(int i = 0; i < features_list.size(); i++){
        if(name == features_list[i].name){
            return i;
        }
    }
    return -1;
}