var video;
var model;
var predictions;
var publishable_key = "rf_twpQdZ4Evm1CMiYC8138";
var toLoad = {
        model: "completedeckv2",
        version: 1
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
            console.log(farbe,zeichen)

            noFill();
            strokeWeight(3);
            var color;
            if(farbe == "e") color = "#f2f22e"
            if(farbe == "b") color= "#10bd0d"
            if(farbe == "h") color = "#f20f34"
            if(farbe == "s") color = "#e0741b"

            stroke(color);
            rect(x,y,width,height)

            textSize(20);
            stroke(10);
            strokeWeight(2);
            text(convertToFullName(zeichen,farbe) + "  " + int(prediction.confidence*100), x - width/2 + 5, y - height/2 + 22)
        });
    }
}

function convertToFullName(zeichen, farbe) {
    var name;

    if(farbe == "e") name = "Eichel"
    if(farbe == "b") name = "Blatt"
    if(farbe == "h") name = "Herz"
    if(farbe == "s") name = "Schellen"
    name += " ";
    if(zeichen == 'A') name+= "Ass"
    if(zeichen == '10') name+= "Zehn"
    if(zeichen == 'K') name+= "König"
    if(zeichen == 'O') name+= "Ober"
    if(zeichen == 'U') name+= "Unter"
    if(zeichen == '9') name+= "Neun"
    if(zeichen == '8') name+= "Acht"
    if(zeichen == '7') name+= "Sieben"
    return name;
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

