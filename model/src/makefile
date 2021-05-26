CPPFLAGS = -g -O0

all : main

main : main.o SimpleAnomalyDetector.o HybridAnomalyDetector.o minCircle.o timeseries.o anomaly_detection_util.o
	g++ -pthread -o main main.o SimpleAnomalyDetector.o HybridAnomalyDetector.o minCircle.o timeseries.o anomaly_detection_util.o

main.o : main.cpp main.h ./node_modules/nan/nan.h

SimpleAnomalyDetector.o : SimpleAnomalyDetector.cpp SimpleAnomalyDetector.h

HybridAnomalyDetector.o : HybridAnomalyDetector.cpp HybridAnomalyDetector.h

minCircle.o : minCircle.cpp

timeseries.o : timeseries.cpp timeseries.h

anomaly_detection_util.o : anomaly_detection_util.cpp anomaly_detection_util.h

clean:
	rm -f main.o SimpleAnomalyDetector.o HybridAnomalyDetector.o minCircle.o timeseries.o anomaly_detection_util.o
