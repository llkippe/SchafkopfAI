class SPIELER{
    constructor(name) {
        this.name = name;
    }
}

class KISPIELER extends SPIELER{
    constructor(name) {
        super(name)
        this.karten = [];
    }




    //
    //  Spielwahl
    //
    KIEntscheidung() {
        var score = this.calculateKIScore();
        console.log(score);
        if(score >= 5.5) {
            document.getElementById("answer").innerHTML = "Spielt auf " + this.gibBesteRufFarbe();

            document.getElementById("spielerSelect").value = KIpos;
            document.getElementById("spielartSelect").value = "sauspiel";
            document.getElementById("spielwahlFarbeSelect").value = this.gibBesteRufFarbe();
        }
        else {
            document.getElementById("answer").innerHTML = "Weiter";
        }
    }
    gibBesteRufFarbe() {
        var farbe = ""; 
        var anzahlEichel = this.anzahlVonFarbe("e"); 
        var anzahlBlatt = this.anzahlVonFarbe("b"); 
        var anzahlSchellen = this.anzahlVonFarbe("s"); 

        //gesperrt
        if (this.karteInHand("e", "A")) anzahlEichel = 100; 
        if (this.karteInHand("b", "A")) anzahlBlatt = 100; 
        if (this.karteInHand("s", "A")) anzahlSchellen = 100;

        if (anzahlEichel == 0) anzahlEichel = 100; 
        if (anzahlBlatt == 0) anzahlBlatt = 100; 
        if (anzahlSchellen == 0) anzahlSchellen = 100;
        // gesperrt bis

        var minAnzahl = Math.min(anzahlEichel, anzahlBlatt, anzahlSchellen);

        //select min
        if (minAnzahl == anzahlEichel) farbe = "e"; 
        if (minAnzahl == anzahlBlatt) farbe = "b"; 
        if (minAnzahl == anzahlSchellen) farbe = "s"; 
        if (minAnzahl == 100) farbe = "gesperrt";

        //solo 10
        if(anzahlEichel == 1 && this.karteInHand("e", "10")) farbe = "e";
        if(anzahlBlatt == 1 && this.karteInHand("b", "10")) farbe = "b";
        if(anzahlSchellen == 1 && this.karteInHand("s", "10")) farbe = "s";

        return farbe;
    }
    calculateKIScore() {
        var score = 0; 
        for (let k of this.karten) score += k.getKIScore();
    
        if (this.karteInHand("a", "e") && this.anzahlVonFarbe("e") == 1) score+= 5; 
        if (this.karteInHand("a", "b") && this.anzahlVonFarbe("b") == 1) score+= 5; 
        if (this.karteInHand("a", "s") && this.anzahlVonFarbe("s") == 1) score+= 5; 
    
        if (this.anzahlVonFarbe("e") == 0) score+= 5; 
        if (this.anzahlVonFarbe("b") == 0) score+= 5; 
        if (this.anzahlVonFarbe("s") == 0) score+= 5; 
    
        if (this.anzahlVonFarbe("e") >= 3) score-= 5; 
        if (this.anzahlVonFarbe("b") >= 3) score-= 5; 
        if (this.anzahlVonFarbe("s") >= 3) score-= 5; 
    
        if (KIpos == 2) score+= 3;
        if (KIpos == 3) score+= 5;
    
        if (this.anzahlSauspielTrumpf() < 4) score-= 12; 
        else {
            if(this.anzahlVonSymbol("O") >= 2) score += 5;
            if(this.karteInHand("h", "A") && this.karteInHand("h", "10")) score-=5;
        }
        
        return score/8;
    }
    anzahlSauspielTrumpf() {
        var anzahl = 0; 
        for (let k of this.karten) {
            if (k.symbol == "U" || k.symbol == "O" || k.farbe == "h") anzahl++;
        }
        return anzahl;
    }


    //
    //  generell purpose
    //
    anzahlVonFarbe(farbe) {
        var anzahl = 0; 
        for (let k of this.karten) {
            if (k.farbe == farbe && k.symbol != "U" && k.symbol != "O") anzahl++;
        }
        return anzahl;
    }
    anzahlVonSymbol(symbol) {
        var anzahl = 0; 
        for (let k of this.karten) {
            if (k.symbol == symbol) anzahl++;
        }
        return anzahl;
    }
    karteInHand(farbe, symbol) {
        var karteInHand = false; 
        for (let k of this.karten) if (k.istKarte(farbe, symbol)) karteInHand = true; 
        return karteInHand;
    }


    // 
    // GetKiKarten
    //
    addKarteToKarten(farbe, symbol) {
        var karte = deck.getKarte(farbe,symbol);
        if(karte) {
            this.karten.push(karte);
            console.log("Added: " + deck.convertToFullName(karte.farbe,karte.symbol));

            if(this.karten.length == 8) getKIKarten.nextState();
        }else alert("Karte ist nicht mehr im Deck vorhanden");
        
    }
    addKartenFromButton() {
        var farbeSelect = document.getElementById("selectFarbe").value;
        var symbolSelect = document.getElementById("selectSymbol").value;
        
        this.addKarteToKarten(farbeSelect, symbolSelect);
    }
    addRandom() {
        var karte = deck.getRandomKarte();
        this.karten.push(karte);
        console.log("Added: " + deck.convertToFullName(karte.farbe,karte.symbol));
        if(this.karten.length == 8) getKIKarten.nextState();
    }
}