var video;
var model;

var predictions;

var publishable_key = "rf_twpQdZ4Evm1CMiYC8138";
var toLoad = {
        model: "completedeckv2",
        version: 1 // <<<--- YOUR VERSION THERE
};





function setup() {
    createCanvas(500,500);
    background(255)
    rectMode(CENTER)
    capture = createCapture(VIDEO);
    capture.size(416, 416);
    capture.hide();
    video = document.getElementsByTagName('video').item(0)
    
}
function draw() {

    image(capture,0,0,416,416);
    if(predictions) {
        predictions.forEach(function(prediction) {

            var x = prediction.bbox.x;
            var y = prediction.bbox.y;

            var width = prediction.bbox.width;
            var height = prediction.bbox.height;

            var zeichen = prediction.class.substring(0,prediction.class.length-1)
            var farbe = prediction.class.substring(prediction.class.length-1)

            console.log(x,y)

            noFill();
            strokeWeight(3);

            var color;
            if(farbe == "e") color = "#f2f22e"
            if(farbe == "b") color= "#10bd0d"
            if(farbe == "h") color = "#f20f34"
            if(farbe == "s") color = "#e0741b"

            stroke(color);
            rect(x,y,width,height)
            fill(0)
            text(zeichen + "  " + prediction.confidence)
        });
    }
}



function renderPredictions(prediction) {
    this.predictions = prediction;
}
const detectFrame = function() {
    if(!model) return requestAnimationFrame(detectFrame);

    model.detect(video).then(function(predictions) {
        requestAnimationFrame(detectFrame);
        renderPredictions(predictions);

    }).catch(function(e) {
        console.log("CAUGHT", e);
        requestAnimationFrame(detectFrame);
    });
};

const loadModelPromise = new Promise(function(resolve, reject) {
    roboflow.auth({
        publishable_key: publishable_key
    }).load(toLoad).then(function(m) {
        model = m;
        resolve();
    });
});

Promise.all([
    loadModelPromise
]).then(function() {
    detectFrame();
});

