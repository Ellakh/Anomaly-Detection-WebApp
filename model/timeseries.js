class Timeseries {
    constructor(CSVPath) {
        var fs = require("fs")
        var text = fs.readFileSync(CSVPath).toString('utf-8')
        var textByLine = text.split("\n")
        var firstLine = textByLine[0].split(",")
        this.dict = {}
        for (let i = 0; i < firstLine.length; i++) {
            this.dict[firstLine[i]] = []
        }
        for (let i = 1; i < textByLine.length; i++) {
            var currentLine = textByLine[i].split(",")
            for (let j = 0; j < currentLine.length; j++) {
                this.dict[firstLine[j]].push(parseFloat(currentLine[j]))
            }
        }
    }

    printDict(){
        console.log(Object.keys(this.dict))
    }
}

const ts = new Timeseries("model/anomalyTrain.csv");
ts.printDict()

