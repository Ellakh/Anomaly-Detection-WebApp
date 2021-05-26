/* Author: 208604264 Aiden Kaminsky
 * mile stone 3 */

#include <cmath>
#include <cstdlib>
#include "anomaly_detection_util.h"

float avg(const float* x, int size){
    float sum = 0;
    for (int i = 0; i < size; i++) {
        sum += x[i];
    }
    return sum / size;
}

// returns the variance of X and Y
float var(const float* x, int size){
    float sum = 0;
    float u = avg(x, size);
    for (int i = 0; i < size; i++) {
        sum += pow(x[i], 2.0);
    }
    return (sum / size) - pow(u, 2.0);
}

// returns the covariance of X and Y
float cov(const float* x, const float* y, int size){
    float* temp = new float[size];
    for (int i = 0; i < size; i++) {
        temp[i] = x[i] * y[i];
    }
    float result = 0;
    result = avg(temp, size) - avg(x, size) * avg(y, size);
    delete[] temp;
	return result;
}

// returns the Standard deviation of Xi from 1 to size
float deviation(const float* x, int size) {
    float sum = 0;
    float ave = avg(x, size);
    for (int i = 0; i < size; i++) {
        sum += pow((x[i] - ave), 2.0);
    }
    return sqrt(sum / size);
}

// returns the Pearson correlation coefficient of X and Y
float pearson(const float* x, const float* y, int size){
	return cov(x, y, size) / (deviation(x, size) * deviation(y, size));
}

// performs a linear regression and returns the line equation
// gets: a array of points , and size
Line linear_reg(Point** points, int size){
    float* x = new float[size];
    for (int i = 0; i < size; i++) {
        x[i] = points[i]->x;
    }
    float* y = new float[size];
    for (int i = 0; i < size; i++) {
        y[i] = points[i]->y;
    }
    float a = cov(x, y, size) / var(x, size);
    float b = avg(y, size) - a * avg(x, size);
    delete[] x;
    delete[] y;
	return Line(a, b);
}

// returns the deviation between point p and the line equation of the points
float dev(Point p,Point** points, int size){
    Line l = linear_reg(points, size);
	return dev(p, l);
}

// returns the deviation between point p and the line
float dev(Point p,Line l){
    return fabs(l.f(p.x) - p.y);
}
