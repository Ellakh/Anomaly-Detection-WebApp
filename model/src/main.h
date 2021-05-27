#include <nan.h>

class AnomalyWorker : public Nan::AsyncWorker {
    public:
    AnomalyWorker(std::string detectorType, std::string normalFile, std::string anomalyFile, Nan::Callback* callback) :
                    Nan::AsyncWorker(callback), detectType(detectorType), normal(normalFile), anomaly(anomalyFile),
                    myCallback(callback) {}

    ~AnomalyWorker() {
        delete callback;
    }

    void Execute();

    void HandleOKCallback();
	
    private:
    std::string json;
    std::string detectType;
    std::string normal;
    std::string anomaly;
    Nan::Callback* myCallback;
};
