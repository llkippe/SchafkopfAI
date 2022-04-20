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

    convertToFullName(zeichen, farbe) {
        var name;
      
        if(farbe == "e") name = "Eichel"
        if(farbe == "b") name = "Blatt"
        if(farbe == "h") name = "Herz"
        if(farbe == "s") name = "Schellen"
        name += " ";
        if(zeichen == 'A') name+= "Ass"
        if(zeichen == '10') name+= "Zehn"
        if(zeichen == 'K') name+= "König"
        if(zeichen == 'O') name+= "Ober"
        if(zeichen == 'U') name+= "Unter"
        if(zeichen == '9') name+= "Neun"
        if(zeichen == '8') name+= "Acht"
        if(zeichen == '7') name+= "Sieben"
        return name;
      }
      
}




