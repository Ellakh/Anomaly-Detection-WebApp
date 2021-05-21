class Point{
    constructor(x,y) {
        this.x = x
        this.y = y
    }
}

class Line{
    constructor(a,b) {
        this.a = a
        this.b = b
    }
    f(x){
        return this.a*x + this.b
    }
}

function avg(x){
    let sum = 0;
    for(let i = 0; i < x.length; i++ ){
        sum += x[i]; //don't forget to add the base
    }
    return sum / x.length
}

// returns the variance of X and Y
function variance(x) {
    let sum = 0;
    for (let i = 0; i < x.length; ++i) {
        sum += x[i] * x[i]
    }
    return (sum / x.length) - (avg(x) * avg(x));
}

// returns the covariance of X and Y
function cov(x, y) {
    var size = x.length
    var xy = []
    for (var i = 0; i < size; ++i) {
        xy.push(x[i] * y[i])
    }
    return avg(xy) - avg(x) * avg(y);
}

// returns the Pearson correlation coefficient of X and Y
function pearson(x, y) {
    return cov(x, y) / (Math.sqrt(variance(x)) * Math.sqrt(variance(y)));
}

// performs a linear regression and returns the line equation
function linear_reg(points) {
    var size = points.length
    let x = []
    let y = []
    for (var i = 0; i < size; ++i) {
        x.push(points[i].x);
        y.push(points[i].y);
    }
    const a = cov(x, y) / variance(x);
    const b = avg(y) - a * avg(x);
    return new Line(a, b);
}


// returns the deviation between point p and the line equation of the points
function dev(p, points) {
    return dev2(p, linear_reg(points));
}

// returns the deviation between point p and the line
function dev2(p, l) {
    return Math.abs(l.f(p.x) - p.y);
}

