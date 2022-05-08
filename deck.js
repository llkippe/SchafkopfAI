class DECK{
    constructor(){
        this.deck = []
        this.farben = ["e", "b", "h", "s"]
        this.symbole = ["A", "10", "K", "O", "U", "9", "8", "7"]   
        
        this.addAllKarten();
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
            console.log(this.deck[index]);
            this.deck.splice(index, 1);
            return copy;
        }
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




