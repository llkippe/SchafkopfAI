class KARTE{
    constructor(farbe, symbol) {
        this.farbe = farbe;
        this.symbol = symbol;
    }

    convertToFullName() {
        var name;
      
        if(this.farbe == "e") name = "Eichel"
        if(this.farbe == "b") name = "Blatt"
        if(this.farbe == "h") name = "Herz"
        if(this.farbe == "s") name = "Schellen"
        name += " ";
        if(this.zeichen == 'A') name+= "Ass"
        if(this.zeichen == '10') name+= "Zehn"
        if(this.zeichen == 'K') name+= "König"
        if(this.zeichen == 'O') name+= "Ober"
        if(this.zeichen == 'U') name+= "Unter"
        if(this.zeichen == '9') name+= "Neun"
        if(this.zeichen == '8') name+= "Acht"
        if(this.zeichen == '7') name+= "Sieben"
        return name;
    }
}