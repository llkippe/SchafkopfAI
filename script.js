var model;

const video = document.getElementById('webcam');
const enableWebcamButton = document.getElementById('webcamButton');
const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');
const labelMap = ["b10", "e10", "h10", "s10", "b7", "e7", "h7", "s7", "b8", "e8", "h8", "s8", "b9", "e9", "h9", "s9", "bA", "eA", "hA", "sA","bK", "eK", "hK", "sK","bO", "eO", "hO", "sO","bU", "eU", "hU", "sU"]


tf.setBackend('webgl');
tf.ready().then(() => {
  loadModel();
});

loadModel().then(function () {
    var loadingModel = document.getElementsByClassName("modelloading")[0];
    loadingModel.classList.add("removed");
    var modelloaded = document.getElementsByClassName("modelloaded")[0];
    modelloaded.classList.remove("removed");
});

if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
} else {
    console.warn('getUserMedia() is not supported by your browser');
}
  

var xBoxes = [];
var yBoxes = [];
var widthBoxes = [];
var heightBoxes = [];
var confidenceCards = [];
var nameCards = [];

function showPredictions() {

  var color;
  ctx.lineWidth = 2;

  ctx.drawImage(video, 0, 0, 416, 416);

  for(var i = 0; i < nameCards.length; i++) {
    
    var zeichen = nameCards[i].substring(1,nameCards[i].length);
    var farbe = nameCards[i].substring(0, 1);

    var anzeigeName = convertToFullName(zeichen,farbe) + "  " + parseInt(confidenceCards[i]*100) + "%";

      if(farbe == "e") color = "#f2f22e"
      if(farbe == "b") color= "#10bd0d"
      if(farbe == "h") color = "#f20f34"
      if(farbe == "s") color = "#e0741b"

      ctx.font = "15px Arial";
      ctx.strokeStyle = color;
      ctx.fillStyle = color;

      ctx.beginPath()
      ctx.rect(xBoxes[i]*416, yBoxes[i]*416, widthBoxes[i]*416, heightBoxes[i]*416)
      ctx.stroke();

      ctx.beginPath()
      ctx.rect(xBoxes[i]*416, yBoxes[i]*416, ctx.measureText(anzeigeName).width + 8, 18)
      ctx.fill();

      ctx.fillStyle = "#3b3b3b";
      ctx.beginPath()
      ctx.fillText(anzeigeName, xBoxes[i]*416 + 4, yBoxes[i]*416 + 13);
      ctx.stroke();
    }
  window.requestAnimationFrame(showPredictions);
}

function predict() {
  const tfimg = tf.browser.fromPixels(video)
  const resized = tf.image.resizeBilinear(tfimg, [416,416]).div(tf.scalar(255))
  const casted = tf.cast(resized, dtype = 'float32');
  const expandedimg = casted.transpose([0,1,2]).expandDims();

  model.executeAsync(expandedimg).then(async function (predictions) {
    const boxes = await predictions[0].data();
    const scores = await predictions[1].data();
    const classes = await predictions[2].data();

    saveRectData(boxes, classes, scores, 0.5);

    tf.dispose(tfimg)
    tf.dispose(resized)
    tf.dispose(casted)
    tf.dispose(expandedimg)

    window.requestAnimationFrame(predict);
  });
}

function saveRectData(boxes,classes,scores,threshold) {
  xBoxes = [];
  yBoxes = [];
  widthBoxes = [];
  heightBoxes = [];
  confidenceCards = [];
  nameCards = [];

  for(var i = 0; i < 10; i++) {
    if(scores[i] > 0.5){
      //const [xMin,yMin,xMax,yMax] = boxes[i];
      className = labelMap[classes[i]];

      var xMin = boxes[i*4];
      var yMin = boxes[i*4+1];
      var xMax = boxes[i*4+2];
      var yMax = boxes[i*4+3];

      xBoxes.push(xMin);
      yBoxes.push(yMin);
      widthBoxes.push(xMax-xMin);
      heightBoxes.push(yMax-yMin);

      confidenceCards.push(scores[i])
      nameCards.push(className)
    }  
  }
}

function getUserMediaSupported() {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}
async function loadModel() {
  try {
    model = await tf.loadGraphModel('https://raw.githubusercontent.com/llkippe/SchafkopfAI/main/fullDeckV2_web_model/model.json');
  } catch(e) {
    console.log(e);
  } 
}
function enableCam(event) {
  if (!model) {
      return;
  }

  event.target.classList.add('removed');  
  
  const constraints = {
      video: true,
      audio: false
  };

  video.setAttribute('playsinline', '');

  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', function() {
      video.play();

      var modelloaded = document.getElementsByClassName("modelloaded")[0];
      modelloaded.classList.add("removed");
      var webcamstarted = document.getElementsByClassName("webcamstarted")[0];
      webcamstarted.classList.remove("removed");

      
      showPredictions()
      predict()
    });
  });
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

