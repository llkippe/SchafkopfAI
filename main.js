const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 416;
canvas.height = 416;

var deck = new DECK();

var spieler = [];

function selectedSpieler() {
    canvas.classList.remove("removed");
    
    var selectSpieler = document.getElementsByClassName("selectSpieler")[0];
    selectSpieler.classList.add("removed");

    enableCam();
}
