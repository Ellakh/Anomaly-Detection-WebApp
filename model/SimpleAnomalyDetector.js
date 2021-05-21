let threshold = 0.9

class correlatedFeatures {
    constructor(feature1, feature2, corrlation, lin_reg, threshold, circle) {
        this.feature1 = feature1
        this.feature2 = feature2
        this.corrlation = corrlation
        this.lin_reg = lin_reg
        this.threshold = threshold
        this.circle = circle
    }
}

class SimpleAnomalyDetector {
    constructor() {
        this.crrelatedFeat = []
    }

    learnNormal(ts){
        var dict = ts.dict
        var maxCor;
        var maxJ;
        var keys = Object.keys(dict)
        // for loop for the columns
        for (var i = 0; i < keys.length; ++i) {
            maxCor = 0;
            maxJ = 0;
            // for loop to find max correlation column
            for (var j = 0; j < keys.length; ++j) {
                // we skip the check of the column with itself.
                if (i !== j) {
                    // calculating pearson score and saving new max if we have it.
                    var currPearson = pearson(dict[keys[i]], dict[keys[j]]);
                    if (currPearson > maxCor) {
                        maxCor = currPearson;
                        maxJ = j;
                    }
                }
            }
            // after we find the max we check if its higher then the threshold
            // and if the columns align properly(i is to the left of j)
            if (maxCor > threshold && i < maxJ) {
                //if so we create the new correlatedFeatures struct and save it in cf.
                var reg_line = linear_reg(dict[keys[i]], dict[keys[maxJ]]);
                var maxDevience = 0.0;
                for (var t = 0; t < Object.keys(dict)[0]; ++t) { // finding the max distance of point from the line.
                    var curr_dev = dev(new Point(dict[keys[i]][t], dict[keys[maxJ]][t]), reg_line);
                    if(curr_dev > maxDevience)
                        maxDevience = curr_dev;
                }
                this.crrelatedFeat.push(new correlatedFeatures(keys[i], keys[maxJ], maxCor, reg_line, maxDevience, new Circle(new Point(0,0),0)));
            }
        }
    }
}