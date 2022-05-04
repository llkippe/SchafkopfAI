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
        this.karten.push(deck.getKarte(farbe,symbol));
        console.log("Added: " + deck.convertToFullName(farbe,symbol));
    }
    addKartenFromButton() {
        // hier adden infos bekommen von values...
        //farbe = document.sel
    }
}