cmake_minimum_required(VERSION 3.17)
project(eden_s_project)

set(CMAKE_CXX_STANDARD 14)

include_directories(.)

add_executable(eden_s_project
        anomaly_detection_util.cpp
        anomaly_detection_util.h
        AnomalyDetector.h
        CLI.cpp
        CLI.h
        commands.h
        HybridAnomalyDetector.cpp
        HybridAnomalyDetector.h
        MainTrain.cpp
        minCircle.cpp
        minCircle.h
        Server.cpp
        Server.h
        SimpleAnomalyDetector.cpp
        SimpleAnomalyDetector.h
        timeseries.cpp
        timeseries.h)
