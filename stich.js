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
        currentState.spielerAmZug++;

        stich.push(karte);
        karteVonSpieler.push(spieler);

        if(stich.length == 4) resetStich();
    }else{
        console.log("WARNING: Card couldn't be found")
    }
    
}

function resetStich() {
    runde++;

    if(runde <= 8) {
        //Auswertung

        //Reset
        stich = [];
        karteVonSpieler = [];
    }else endOfGame();
}

function endOfGame() {
    //Auswertung

    //Reset Variablen
}


//
// Infos ueber Stich
//

function hoechsteKarteInStich() { //return KARTE
    if(trumpfInStich()) return hoechstenTrumpfInStich();
    else return hoechsteFarbKarteInStich();
}

function hoechstenTrumpfInStich() {
    var current = stich[0];
    for(let k of stich) if(k.getTrumpfHoehe() < current.getTrumpfHoehe()) current = k;
    return current;
}

function hoechsteFarbKarteInStich() {
    var current = stich[0];
    for(let k of stich) if(k.getFarbKartenHoehe() < current.getFarbKartenHoehe()) current = k;
    return current;
}

function trumpfInStich() {
    var trumpfInStich = false;
    for(let k of stich) if(k.istTrumpf()) trumpfInStich = true;
    return trumpfInStich;
}