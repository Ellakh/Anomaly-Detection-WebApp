{
  "targets": [
    {
      "target_name": "main",
      "sources": [ "./src/AnomalyDetector.h", "./src/anomaly_detection_util.h", "./src/anomaly_detection_util.cpp",
                              "./src/HybridAnomalyDetector.cpp", "./src/HybridAnomalyDetector.h",
                              "./src/minCircle.cpp", "./src/minCircle.h", "./src/SimpleAnomalyDetector.cpp",
                              "./src/SimpleAnomalyDetector.h", "./src/timeseries.cpp", "./src/timeseries.h", "./src/main.h", "./src/main.cpp" ],
            "include_dirs" : ["<!(node -e \"require('nan')\")"],
            "cflags!": [ "-fno-exceptions" ],
            "cflags": ["-Wall", "-std=c++11"],
      "cflags_cc!": [ "-fno-exceptions" ],
      "conditions": [
        ["OS=='mac'", {
          "xcode_settings": {
            "GCC_ENABLE_CPP_EXCEPTIONS": "YES"
          }
        }]
      ]
    }
  ]
}
