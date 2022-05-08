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
}