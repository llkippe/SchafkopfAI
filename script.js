tf.setBackend('webgl');
tf.ready().then(() => {
  load_model();

});

const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Check if webcam access is supported.
function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
}
  
// If webcam supported, add event listener to button for when user
// wants to activate it to call enableCam function which we will 
// define in the next step.
if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
} else {
    console.warn('getUserMedia() is not supported by your browser');
}
  
function enableCam(event) {
    // Only continue if the COCO-SSD has finished loading.
    if (!model) {
        return;
    }
    
    // Hide the button once clicked.
    event.target.classList.add('removed');  
    
    // getUsermedia parameters to force video but not audio.
    const constraints = {
        video: true
    };
  
    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        video.srcObject = stream;
        video.addEventListener('loadeddata', predictWebcam);
    });
}


// Store the resulting model in the global scope of our app.
var model = undefined;


async function load_model() {
  try {
    model = await tf.loadGraphModel('https://raw.githubusercontent.com/llkippe/SchafkopfAI/main/fullDeckV2_web_model/model.json'); //repo where model is saved
} catch(e) {
   console.log(e);
}
    

}
// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment 
// to get everything needed to run.
// Note: cocoSsd is an external object loaded from our index.html
// script tag import so ignore any warning in Glitch.
load_model().then(function () {
  // Show demo section now model is ready to use.
  demosSection.classList.remove('invisible');
});

var predictionsReal;

function predictWebcam() {
  // Now let's start classifying a frame in the stream.
  //console.log(predictionsReal);

  const tfimg = tf.browser.fromPixels(video)
  const resized = tf.image.resizeBilinear(tfimg, [416,416]).div(tf.scalar(255))
  const casted = tf.cast(resized, dtype = 'float32');
  const expandedimg = casted.transpose([0,1,2]).expandDims();





  model.executeAsync(expandedimg).then(async function (predictions) {
    
    const boxes = await predictions[0].data();
    const scores = await predictions[1].data();
    const classes = await predictions[2].data();
    const numOfObjects = await predictions[3].data();
    
    //console.log(boxes)
    //console.log(scores)
    //console.log(classes)
    //console.log(numOfObjects)
    


    drawRect(boxes, classes, scores, 0.3, 624, 416);

    tf.dispose(tfimg)
    tf.dispose(resized)
    tf.dispose(casted)
    tf.dispose(expandedimg)
 
   
    
    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(predictWebcam);
  });
}


const labelMap = ["b10", "e10", "h10", "s10", "b7", "e7", "h7", "s7", "b8", "e8", "h8", "s8", "b9", "e9", "h9", "s9", "bA", "eA", "hA", "sA","bK", "eK", "hK", "sK","bO", "eO", "hO", "sO","bU", "eU", "hU", "sU"]

function drawRect(boxes,classes,scores,threshold,imgWidth,imgHeight) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("result").innerHTML = '' 

  for(let i = 0; i < 10; i++) {
    if(scores[i] > 0.3){
      const [xMin,yMin,xMax,yMax] = boxes;
      classIndex = classes[i]

      ctx.strokeStyle = 'red'
      ctx.lineWidth = 3
  

      console.log(labelMap[classIndex]) 

      neu = document.getElementById("result").innerHTML
      neu += ", " + labelMap[classIndex]
      document.getElementById("result").innerHTML = neu
      ctx.beginPath()
      ctx.rect(xMin*imgWidth, yMin*imgHeight, (xMax-xMin)*imgWidth/1.5, (yMax-yMin)*imgHeight/1)
      ctx.fillText(classIndex, xMin, yMin);
      ctx.stroke();
    
    }  
  }
}

