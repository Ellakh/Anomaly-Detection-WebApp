/* Author: 208604264 Aiden Kaminsky
 * mile stone 3 */

#ifndef MINCIRCLE_H_
#define MINCIRCLE_H_

#include <iostream>
#include <cmath>
#include <vector>
#include <random>
#include <algorithm>
#include <assert.h> 
#include "anomaly_detection_util.h"

using namespace std;

// ------------ DO NOT CHANGE -----------
/*//it's in "anomaly_detection_util.h" //changes for ex4
class Point{
public:
	float x,y;
	Point(float x,float y):x(x),y(y){}
};*/

class Circle{
public:
	Point center;
	float radius;
	Circle():center(Point(0, 0)),radius(0){}
    Circle(Point c,float r):center(c),radius(r){}
};
// --------------------------------------

// implement
Circle findMinCircle(Point** points,size_t size);

//return the distance between two points 
float dist(const Point& a, const Point& b);

// check if this point is inside or on the eage of the circle 
bool is_inside(const Circle& c, const Point& p);

// return a circle made by the three given points 
Circle circle_from_3_points(const Point& a, const Point& b, const Point& c);

//return a circle made by 2 given points 
Circle circle_from_2_points(const Point& a, const Point& b);

// return the min circle that can be made from min_circle_p
Circle base_case_min_circle(vector<Point>& min_circle_p);

// return the min circle using Welzl's algorithm 
// gets: points- the points we want inside the min circle 
//       min_circle_p- the points we found that are on the eage of the min circle
//       size_points is the number of points in points that we have yet to check
Circle find_min_circle_welzl(vector<Point>& points, vector<Point> min_circle_p, int size_points);


/* code from ex3 -> moved to minCircle.cpp

// implement
Circle findMinCircle(Point** points,size_t size){
	vector<Point> v_points;
	for(int i=0;i<size;i++){
		v_points.push_back(*points[i]);
	}

    std::random_device dev;
    std::mt19937 rng(dev());
    //std::mt19937 rng(888); // for debugging
    std::shuffle(v_points.begin(), v_points.end(), rng);

	vector<Point> min_circle_p;

	//becuase the function is below, we need to declar it here, so the computer knows what we are calling
	Circle find_min_circle_welzl(vector<Point>& points, vector<Point> min_circle_p, int size);
	//finding the nim circle
	return find_min_circle_welzl(v_points, vector<Point>(), size);
}

// you may add helper functions here --------------------------------------------------

//return the distance between two points 
float dist(const Point& a, const Point& b){ 
    return sqrt(pow(a.x - b.x, 2) + pow(a.y - b.y, 2)); 
} 
  
// check if this point is inside or on the eage of the circle 
bool is_inside(const Circle& c, const Point& p){ 
	if(dist(c.center, p) <= c.radius){
		return true;
	}
    return false; 
} 

// return a circle made by the three given points 
Circle circle_from_3_points(const Point& a, const Point& b, const Point& c){ 
	double ba_x = b.x - a.x; 
    double ba_y = b.y - a.y; 
    double ca_x = c.x - a.x;
	double ca_y = c.y - a.y;

	double temp_b = ba_x * ba_x + ba_y * ba_y;
    double temp_c = ca_x * ca_x + ca_y * ca_y; 
    double temp_bc = ba_x * ca_y - ba_y * ca_x;

	float x = (ca_y * temp_b - ba_y * temp_c) / (2 * temp_bc);
	float y = (ba_x * temp_c - ca_x * temp_b) / (2 * temp_bc);
	Point center = Point(x, y);
  
    center.x += a.x; 
    center.y += a.y; 
    return Circle(center, dist(center, a)); 
} 
  
//return a circle made by 2 given points 
Circle circle_from_2_points(const Point& a, const Point& b){ 
    Point center = Point( (a.x + b.x) / 2, (a.y + b.y) / 2 ); 
    return Circle(center, dist(a, center)); 
} 
  
// return the min circle that can be made from min_circle_p
Circle base_case_min_circle(vector<Point>& min_circle_p) { 
    assert(min_circle_p.size() <= 3); 
    if (min_circle_p.empty()) { 
        return { { 0, 0 }, 0 }; 
    } 
    else if (min_circle_p.size() == 1) { 
        return { min_circle_p[0], 0 }; 
    } 
    else if (min_circle_p.size() == 2) { 
        return circle_from_2_points(min_circle_p[0], min_circle_p[1]); 
    } 
  
    //check if min circle can be made by only 2 points 
    for (int p_1 = 0; p_1 < 3; p_1++) {
		//we dont need to check all the points before p_1, because we all ready did
        for (int p_2 = p_1 + 1; p_2 < 3; p_2++) { 
            Circle c_2point = circle_from_2_points(min_circle_p[p_1], min_circle_p[p_2]);
			//making sure the c_2point has all the points, if yes c_2point is min Circle
			bool is_valid_circle = true;
			for (int i = 0; i < min_circle_p.size(); i++){
				if (!is_inside(c_2point, min_circle_p[i])){
					is_valid_circle = false;
				}
			}
            if (is_valid_circle){
				return c_2point; 
			}
        } 
    } 
    return circle_from_3_points(min_circle_p[0], min_circle_p[1], min_circle_p[2]); 
} 
  
// return the min circle using Welzl's algorithm 
// gets: points- the points we want inside the min circle 
//       min_circle_p- the points we found that are on the eage of the min circle
//       size_points is the number of points in points that we have yet to check
Circle find_min_circle_welzl(vector<Point>& points, vector<Point> min_circle_p, int size_points){ 
    // Base case when we checked all points or min_circle_p.size = 3 
    if (size_points == 0 || min_circle_p.size() == 3) { 
        return base_case_min_circle(min_circle_p); 
    } 
  
    // Pick a random point from points
	// we chose a random point to help we the speed (opteimly O(n)), becouse if points is in a cortin order the time can be O(n^4)
    int idx = rand() % size_points; 
    Point random_p = points[idx];
  
    // Put the random_p at the end of points, so we dont have to deal with deleting it(the random_p)
    swap(points[idx], points[size_points - 1]); 
  
    // Get the min_circle circle d from the set of points P - {p} 
    Circle check_circle = find_min_circle_welzl(points, min_circle_p, size_points - 1); 
  
    // If random_p is in check_circle, return check_circle
    if (is_inside(check_circle, random_p)) { 
        return check_circle; 
    } 
  
    // Otherwise, must be on the boundary of the min_circle 
    min_circle_p.push_back(random_p);
  
    // Return the min_circle for points(now without random_p) and min_circle_p(now with random_p)
    return find_min_circle_welzl(points, min_circle_p, size_points - 1); 
} 
*/

#endif /* MINCIRCLE_H_ */
