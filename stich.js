/* repraesentation 4 Karten
    hinzufuegen max 4
    wenn voll stich auswerten wenn 8. runde gewinner verlierer
    count von runden
    hoechstenKarte in stich --> return KARTE boolean (turmp oder nicht)
    punkteInStich
    spielerReferenz zu jeder Karte

    freundDavor??
    spielerDavor??
*/


var stich = [];
var karteVonSpieler = [];

var runde = 1;

function addKarteToStich(karte, spieler) {
    if(karte) {
        currentState.naechsterZug();

        stich.push(karte);
        karteVonSpieler.push(spieler);

        console.log("Added " + deck.convertToFullName(karte.farbe, karte.symbol) + " to Stich (" + punkteInStich() + " Punkte im Stich)");

        document.getElementById("card" + stich.length).style.backgroundImage = "url(Cards/"+ karte.farbe + karte.symbol +".png)";
        document.getElementById("card" + stich.length).style.border = "none";
        document.getElementById("info" + stich.length).innerHTML = karteVonSpieler[karteVonSpieler.length-1].name;
        if(stich.length == 4) resetStich();
    }else{
        console.log("WARNING: Card couldn't be found")
    }
    
}

async function resetStich() {
    runde++;

    if(runde <= 8) {
        //Auswertung
        karteVonSpieler[hoechsteKarteInStich().position].updatePunkte(punkteInStich());
        //Reset
        stich = [];
        karteVonSpieler = [];

        //nur animation
        await sleep(500);
        resetHtmlStich();
    }else endOfGame();
}

function resetHtmlStich() {
    for(var i = 1; i <= 4; i++) {
        document.getElementById("card" + i).style.backgroundColor = "rgba(0, 0, 0, 0.014)";
        document.getElementById("card" + i).style.border = "#38383833 solid 1px";
        document.getElementById("card" + i).style.backgroundImage = "none";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function endOfGame() {
    //Auswertung

    //Reset Variablen
}


//
// Infos ueber Stich
//

function hoechsteKarteInStich() { //return KARTE pos istTrumpf
    if(trumpfInStich()) return hoechstenTrumpfInStich();
    else return hoechsteFarbKarteInStich();
}
function hoechstenTrumpfInStich() {
    var rueckgabe = {
        karte: stich[0],
        position: 0,
        istTrumpf: true
    }
    for(var i = 0; i < stich.length; i++) if(stich[i].getTrumpfHoehe() < rueckgabe.karte.getTrumpfHoehe()) {
        rueckgabe.karte = stich[i];
        rueckgabe.position = i;
    }
    return rueckgabe;
}
function hoechsteFarbKarteInStich() {
    var rueckgabe = {
        karte: stich[0],
        position: 0,
        istTrumpf: false
    }
    for(var i = 0; i < stich.length; i++) if(stich[i].getFarbKartenHoehe() < rueckgabe.karte.getFarbKartenHoehe()) {
        rueckgabe.karte = stich[i];
        rueckgabe.position = i;
    }
    return rueckgabe;
}
function trumpfInStich() {
    var trumpfInStich = false;
    for(let k of stich) if(k.istTrumpf()) trumpfInStich = true;
    return trumpfInStich;
}
function punkteInStich() {
    var punkte = 0;
    for(let k of stich) punkte += k.punkte;
    return punkte;
}