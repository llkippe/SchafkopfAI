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

    KIEntscheidung() {
        console.log(this.calculateKIScore());
    }


    karteInHand(farbe, symbol) {
        var karteInHand = false; 
        for (let k of this.karten) if (k.istKarte(farbe, symbol)) karteInHand = true; 
        return karteInHand;
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
        
        return score/8;
    }
    anzahlVonFarbe(farbe) {
        var anzahl = 0; 
        for (let k of this.karten) {
            if (k.farbe == farbe && !k.symbol == "U" && !k.symbol == "O") anzahl++;
        }
        return anzahl;
      }
    anzahlSauspielTrumpf() {
        var anzahl = 0; 
        for (let k of this.karten) {
          if (k.symbol == "U" || k.symbol == "O" || k.farbe == "h") anzahl++;
        }
        return anzahl;
    }   
}