var model;
const video = document.getElementById('webcam')
const labelMap = ["b10", "e10", "h10", "s10", "b7", "e7", "h7", "s7", "b8", "e8", "h8", "s8", "b9", "e9", "h9", "s9", "bA", "eA", "hA", "sA","bK", "eK", "hK", "sK","bO", "eO", "hO", "sO","bU", "eU", "hU", "sU"]

var minThreshold = 0.70;

var pcModel = false;

var xBoxes = [];
var yBoxes = [];
var widthBoxes = [];
var heightBoxes = [];
var confidenceCards = [];
var nameCards = [];

var lastCards = [];


loadModel();


loadModel().then(function () {
    console.log("loaded Model")
});


function updateLastCards(farbe, symbol) {
    lastCards.push(new KARTE(farbe,symbol));
    if(lastCards.length > 3) lastCards.shift();
    checkForDetectedCards();
}

function checkForDetectedCards() {
    if(lastCards.length == 3) {
        allSameCard = true;
        firstSymbol = lastCards[0].symbol;
        firstFarbe = lastCards[0].farbe;
        for(var i = 1; i < lastCards.length; i++) {
            if(lastCards[i].farbe != firstFarbe || lastCards[i].symbol != firstSymbol) allSameCard = false;
        }

        if(allSameCard) {
          cardDetected(firstFarbe, firstSymbol);
          lastCards = [];
        }
    } 
}

function cardDetectedFromButton() {
  var farbe = document.getElementById("selectFarbe").value;
  var symbol = document.getElementById("selectSymbol").value;

  cardDetected(farbe, symbol);
}

function cardDetectedRandom() {
  var kartenInfos = deck.getRandomKarte();
  cardDetected(kartenInfos[0], kartenInfos[1]);
}

function cardDetected(farbe, symbol) {
  if(farbe && symbol) {
    if(currentState.stateName == "getKIKarten") spieler[KIpos].addKarteToKarten(farbe, symbol);
    else addKarteToStich(deck.getKarte(farbe, symbol), spieler[currentState.spielerAmZug]);
  }else{
    console.log("ERROR: no card input");
  }
  
}

function showPredictions() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  var color;
  ctx.lineWidth = 2;

  //ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  for(var i = 0; i < nameCards.length; i++) {

    var symbol = nameCards[i].substring(1,nameCards[i].length);
    var farbe = nameCards[i].substring(0, 1);

    

    var anzeigeName = deck.convertToFullName(farbe,symbol) + "  " + parseInt(confidenceCards[i]*100) + "%";

      if(farbe == "e") color = "#f2f22e"
      if(farbe == "b") color= "#10bd0d"
      if(farbe == "h") color = "#f20f34"
      if(farbe == "s") color = "#e0741b"

      ctx.font = "15px Arial";
      ctx.strokeStyle = color;
      ctx.fillStyle = color;

      ctx.beginPath()
      ctx.rect(xBoxes[i]*canvas.width, yBoxes[i]*canvas.height, widthBoxes[i]*canvas.width, heightBoxes[i]*canvas.height)
      ctx.stroke();

      ctx.beginPath()
      ctx.rect(xBoxes[i]*canvas.width, yBoxes[i]*canvas.height, ctx.measureText(anzeigeName).width + 8, 18)
      ctx.fill();

      ctx.textAlign = "left"
      ctx.fillStyle = "#242424";
      ctx.beginPath()
      ctx.fillText(anzeigeName, xBoxes[i]*canvas.width + 4, yBoxes[i]*canvas.height + 13);
      ctx.stroke();
    }
  window.requestAnimationFrame(showPredictions);
}
async function predict() {
  tf.engine().startScope()
  const img = tf.image.resizeBilinear(tf.browser.fromPixels(video), [640,640]).div(tf.scalar(255)).transpose([0, 1, 2]).expandDims();
  predictions = await model.executeAsync(img); 
  const boxes = await predictions[0].data();
  const scores = await predictions[1].data();
  const classes = await predictions[2].data();
  saveRectData(boxes, classes, scores);
  tf.engine().endScope()
  
  predict();
};
function saveRectData(boxes,classes,scores) {
  xBoxes = [];
  yBoxes = [];
  widthBoxes = [];
  heightBoxes = [];
  confidenceCards = [];
  nameCards = [];

  for(var i = 0; i < 10; i++) {
    if(scores[i] > minThreshold){
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
    
      updateLastCards(className.substring(0, 1) , className.substring(1,className.length));
    }  
  }
}
async function loadModel() {
    try {
      if(pcModel) model = await tf.loadGraphModel('https://raw.githubusercontent.com/llkippe/SchafkopfAI/main/fullDeckV2_web_model/model.json');
      else {
        model = await tf.loadGraphModel('https://raw.githubusercontent.com/llkippe/SchafkopfAI/main/bestYoloNCh2_web_model/model.json');
      }
    } catch(e) {
      console.log(e);
    } 
}
 
function enableCam(event) {
  ctx.textAlign = "center"
  ctx.font = "20px Arial";
  ctx.fillStyle = "#242424";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
    console.log("no webcam support")
    ctx.beginPath()
    ctx.fillText("loading model...", canvas.width/2, canvas.height/2);
    ctx.stroke();
  }else{
    if (!model) {
      ctx.beginPath()
      ctx.fillText("loading model...", canvas.width/2, canvas.height/2);
      ctx.stroke();
      while(!model){

      }
      enableCam();
    }

    ctx.beginPath()
    ctx.fillText("starting webcam...", canvas.width/2, canvas.height/2);
    ctx.stroke();
  
    //event.target.classList.add('removed');  
    
    const constraints = {
      video: true,
      audio: false
    };
  
    video.setAttribute('playsinline', '');
  
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', function() {
        video.play();   
  
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        showPredictions()
        predict()
      });
    });
  }
}
