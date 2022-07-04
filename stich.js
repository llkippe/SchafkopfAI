


var stich = [];
var karteVonSpieler = [];

var runde = 1;

function addKarteToStich(karte) {
    if(karte) {

        stich.push(karte);

        if(karte.istKarte(ingame.saufarbe, "A")) spieler.istFreund = true;

        console.log("Added " + deck.convertToFullName(karte.farbe, karte.symbol) + " to Stich (" + punkteInStich() + " Punkte im Stich)");

        document.getElementById("card" + stich.length).style.backgroundImage = "url(Cards/"+ karte.farbe + karte.symbol +".png)";
        document.getElementById("card" + stich.length).style.border = "none";

        
        currentState.naechsterZug();
    }else{
        console.log("WARNING: Card couldn't be found")
    }
    
}

function resetStich() {
    console.log(" ");

    runde++;

    if(runde <= 9) {
        karteVonSpieler[hoechsteKarteInStich().position].updatePunkte(punkteInStich());
    ingame.setZugPosition(karteVonSpieler[hoechsteKarteInStich().position]);

    karteVonSpieler = [];
    var spielerAmZugFake = ingame.spielerAmZug;

    for(var i = 0; i < 4; i++) {
        karteVonSpieler.push(spieler[spielerAmZugFake]);
        console.log(spielerAmZugFake);
        document.getElementById(`info${i+1}`).innerHTML = karteVonSpieler[i].name;
        spielerAmZugFake++;
        if(spielerAmZugFake == 4) spielerAmZugFake = 0;
    }

    stich = [];
    resetHtmlStich();

    if(KIpos == ingame.spielerAmZug) spieler[KIpos].playCard();
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
    console.log("Game Ended")
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
    for(var i = 0; i < stich.length; i++) if(stich[i].getTrumpfHoehe(true) < rueckgabe.karte.getTrumpfHoehe(true)) {
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