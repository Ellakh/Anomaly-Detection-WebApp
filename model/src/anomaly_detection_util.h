/* Author: 208604264 Aiden Kaminsky
 * mile stone 3 */
#ifndef ANOMALYDETECTORUTIL_H_
#define ANOMALYDETECTORUTIL_H_


float avg(const float* x, int size);

// returns the variance of X and Y
float var(const float* x, int size);

// returns the covariance of X and Y
float cov(const float* x, const float* y, int size);


// returns the Pearson correlation coefficient of X and Y
float pearson(const float* x, const float* y, int size);

class Line{
public:
	float a,b; //remove const for ex2
	Line(float a = 0, float b = 0):a(a),b(b){} //change to default to 0
	float f(float x){
		return a*x+b;
	}
};

class Point{
public:
	float x,y;
	Point(float x, float y):x(x),y(y){}
};

// performs a linear regression and returns the line equation
Line linear_reg(Point** points, int size);

// returns the deviation between point p and the line equation of the points
float dev(Point p,Point** points, int size);

// returns the deviation between point p and the line
float dev(Point p,Line l);

#endif
