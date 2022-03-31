function setup() {
    createCanvas(500,500);
    background(255)
    capture = createCapture(VIDEO);
    capture.size(416, 416);


    videoTags = document.getElementsByTagName('video')
    console.log(videoTags)
    for( var i = 0; i < videoTags.length; i++ ){
        console.log(videoTags.item(i))
        video = videoTags.item(i)
  }
  
}
function draw() {
    
}

var videoTags
var video;
    var model;
    
    var publishable_key = "rf_twpQdZ4Evm1CMiYC8138";
    var toLoad = {
        model: "completedeckv2",
        version: 1 // <<<--- YOUR VERSION THERE
    };
    
    
    roboflow.auth({
        publishable_key: publishable_key
    }).load(toLoad).then(function(m) {
        this.model = m;
        
    });
    //Once the model has loaded, you can pass any <img>, <canvas>, or <video> element (provided its CORS permissions allow reading its pixel data ) to model.detect and receive back an array of predicted bounding boxes.
     
function afterSetup() {
    model.detect(video).then(function(predictions) {
        console.log("Predictions:", predictions);
        
    });

    afterSetup()
}


