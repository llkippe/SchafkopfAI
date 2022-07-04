class DECK{
    constructor(){
        this.deck = []
        this.farben = ["e", "b", "h", "s"]
        this.symbole = ["A", "10", "K", "O", "U", "9", "8", "7"]
        this.trumpfReihenfolge = [];
        
        this.addAllKarten();
    }   


    hoechstenTrumpfInDeck() {
        var hoechsteKarte = new KARTE("invalid", "invalid");
        for(let k of this.deck) {
            if(k.istTrumpf() && k.getTrumpfHoehe(true) < hoechsteKarte.getTrumpfHoehe(true)) hoechsteKarte = k;
        }
        return hoechsteKarte;
    }
    hoechsteFarbKarteInDeck(farbe) {
        var hoechsteKarte = new KARTE("invalid", "invalid");
        for(let k of this.deck) {
            if(k.farbe == farbe && !k.istTrumpf() && k.getFarbKartenHoehe(true) < hoechsteKarte.getFarbKartenHoehe(true)) hoechsteKarte = k;
        }
        return hoechsteKarte;
    }

    createTrumpfReihenfolge() {
        if(ingame.trumpfart == "U") {
            for(var i = 0; i < this.farben.length; i++) this.trumpfReihenfolge.push(new KARTE(this.farben[i], "U"));
        }else{
            for(var i = 0; i < this.farben.length; i++) this.trumpfReihenfolge.push(new KARTE(this.farben[i], "O"));
            for(var i = 0; i < this.farben.length; i++) this.trumpfReihenfolge.push(new KARTE(this.farben[i], "U"));

            for(var i = 0; i < this.symbole.length; i++) {
                if(this.symbole[i] != "U" && this.symbole[i] != "O") this.trumpfReihenfolge.push(new KARTE(ingame.trumpfart, this.symbole[i]));
            }
        }
    }

    addAllKarten() {
        for(var i = 0; i < this.farben.length; i++) {
            for(var j = 0; j < this.symbole.length; j++) {
                this.deck.push(new KARTE(this.farben[i], this.symbole[j]))
            }
        }
    }
    getKarte(farbe, symbol) {  // gibt karte aus deck zurueck + removed diese + error Meldung falls nicht vorhanden
        var index = -1;
        for(var i = 0; i < this.deck.length; i++) {
            if(this.deck[i].farbe == farbe && this.deck[i].symbol == symbol) index = i;
        }
        if(index != -1) { //KARTE ist vorhanden
            var copy = this.deck[index];
            this.deck.splice(index, 1);
            return copy;
        }
    }
    getRandomKarte() {
        var index = Math.floor(Math.random() * this.deck.length);
        var farbe = this.deck[index].farbe
        var symbol = this.deck[index].symbol;
        var returnArr = [farbe, symbol]; 
        return returnArr;
    }
    convertToFullName(farbe, symbol) {
        var name;
        if(farbe == "e") name = "Eichel"
        if(farbe == "b") name = "Blatt"
        if(farbe == "h") name = "Herz"
        if(farbe == "s") name = "Schellen"
        name += " ";
        if(symbol == 'A') name+= "Ass"
        if(symbol == '10') name+= "Zehn"
        if(symbol == 'K') name+= "König"
        if(symbol == 'O') name+= "Ober"
        if(symbol == 'U') name+= "Unter"
        if(symbol == '9') name+= "Neun"
        if(symbol == '8') name+= "Acht"
        if(symbol == '7') name+= "Sieben"
        return name;
    }   
    
}




