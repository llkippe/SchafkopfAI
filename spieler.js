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
        this.karten.push(karte);
        console.log("Added: " + deck.convertToFullName(karte.farbe,karte.symbol));
    }
    addKartenFromButton() {
        // hier adden infos bekommen von values...
        var farbeSelect = document.getElementById("selectFarbe").value;
        var symbolSelect = document.getElementById("selectSymbol").value;

        farbeSelect = farbeSelect.substring(0,1);
        farbeSelect = farbeSelect.toLowerCase();

        switch(symbolSelect) {
            case "Zehn":
                symbolSelect = "10";
                break;
            case "Neun":
                symbolSelect = "9";
                break;
            case "Acht":
                symbolSelect = "8";
                break;
            case "Sieben":
                symbolSelect = "7";
                break;
            default:
                symbolSelect = symbolSelect.substring(0,1);
                break;
        }

        addKarteToKarten(farbeSelect, symbolSelect);
    }
}