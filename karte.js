class KARTE{
  constructor(farbe, symbol) {
      this.farbe = farbe;
      this.symbol = symbol;
      this.punkte = this.calcPunkte();
  }
  
  istTrumpf() {
    if(ingame.trumpfart != "unknown") {
      if(ingame.trumpfart == "U"){
        if(this.symbol == "U") return true;
        else return false;
      }else{
        if(this.symbol == "U" || this.symbol == "O") return true;
        if(this.farbe == ingame.trumpfart) return true;
        return false;
      }
    }
  }

  getTrumpfHoehe(sucheHoechste) {
    for(var i = 0; i < deck.trumpfReihenfolge.length; i++) if(deck.trumpfReihenfolge[i].istKarte(this.farbe, this.symbol)) return i;
    if(sucheHoechste) return 100;
    else return -100;
  }

  getFarbKartenHoehe() {
    for(var i = 0; i < deck.symbole.length; i++) if(this.symbol == deck.symbole[i]) return i; //!!! care O U sind eingereiht !!!
  }

  istKarte(farbe, symbol) {
      if(this.farbe == farbe && this.symbol == symbol) return true;
      else return false;
  }

  getKIScore() {
      if (this.farbe == "e" || this.farbe == "b" || this.farbe == "s") { 
        if (this.symbol==("7") || this.symbol==("8") || this.symbol==("9")) return 0;
        if (this.symbol==("K") || this.symbol==("10")) return 2;
        if (this.symbol==("A")) return 5;
      }
      if (this.farbe==("h")) {
        if (this.symbol==("7") || this.symbol==("8") || this.symbol==("9") || this.symbol==("K")) return 3;
        if (this.symbol==("10") || this.symbol==("A")) return 5;
      }
      if (this.symbol==("U")) {
        if (this.farbe==("s")) return 6;
        if (this.farbe==("h")) return 7;
        if (this.farbe==("b")) return 8;
        if (this.farbe==("e")) return 9;
      }
      if (this.symbol==("O")) {
        if (this.farbe==("s")) return 10;
        if (this.farbe==("h")) return 11;
        if (this.farbe==("b")) return 12;
        if (this.farbe==("e")) return 13;
      }
      return 0;
  }

  calcPunkte() {
    if(this.symbol == "A") return 11;
    if(this.symbol == "10") return 10;
    if(this.symbol == "K") return 4;
    if(this.symbol == "O") return 3;
    if(this.symbol == "U") return 2;
    if(this.symbol == "9" || this.symbol == "8" || this.symbol == "7") return 0;
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