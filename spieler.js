/*
    - nach runde 8 soll enden (muss es 8 oder 9 sien in stich) 
    - gucken, dass im stich nie 5 sind, zB KI ist neue Erste und dann wird einfach gespielt

*/

class SPIELER{
    constructor(name) {
        this.name = name;
        this.punkte = 0;
        this.istFreund = false;
    }

    updatePunkte(addPunkte) {
        this.punkte += addPunkte;
        console.log(this.name + " hat nun " + this.punkte + " Punkte");
        //update grafik
    }
}

class KISPIELER extends SPIELER{
    constructor(name) {
        super(name)
        this.karten = [];
        this.validCards = [];
    }


    //
    // playCard
    //
    playCard() {
        console.log("!!START KARTEN SUCHE!!")

        this.validCards = [];
        for(let k of this.karten) this.validCards.push(k);

        if (stich.length == 0) {
            console.log("Erster Spieler");
            if (KIpos == ingame.spielerPos) {
                console.log("ist Spieler");
                this.spieleRandomKarte();
            } else {
                console.log("ist nicht Spieler");
                this.spieleRandomKarte();
            }
        }else{
            if(stich[0].istTrumpf()) {
                console.log("Trumpf angespielt");
                if(this.trumpfVorhanden()) {
                    console.log("Zugeben");
                    this.trumpfZugeben();

                    this.trumpfNichtFrei();
                }else{
                    console.log("Ist Frei");

                    this.trumpfFrei();
                }
            }else{
                console.log(stich[0].farbe + " angespielt");

                if(this.farbeVorhanden(stich[0].farbe)) {
                    console.log("Zugeben");
                    this.farbeZugeben();

                    this.abspatzen("Test nF");
                }else{
                    console.log("Ist Frei");

                    this.abspatzen("Test F");
                }
            }
        }

        console.log("!!ENDE KARTEN SUCHE!!")
    }

    /// Nicht Erster Spieler
    ///
        /// Trumpf
        ///
        trumpfNichtFrei(){
            this.trumpfAbspatzen("keine Gute Möglichkeit gefunden");
        }

        /*
        void spieleKarteNichtFreiTrumpf() {
    if (stapel.kartenInStapel() == 3 && stichGehoertUns()) {
      println("letzter und Stich gehoert uns");
      trumpfSchmieren();
      return;
    }
    if (!stichGehoertUns() && int(stapel.stechenderTrumpf()[3]) < int(deck.hoechsterTrumpfInDeck()[3]) && !hoehererTrumpfInErlaubtenKartenAlsStapel()) {
      println("Gegner hat hoechsten Trumpf gelegt");
      trumpfAbspatzen();
      return;
    }
    if (getFreundPos() == int(stapel.stechenderTrumpf()[2]) && int(stapel.stechenderTrumpf()[3]) < int(deck.hoechsterTrumpfInDeck()[3])) {
      println("Freund hat hoechsten Trumpf gelegt");
      trumpfSchmieren();
      return;
    }
    if (stapel.punkteInStapel() >= 10 && hoehererTrumpfInErlaubtenKartenAlsStapel()) { // und mein trumpf hoeher als akutell hoechster trumpf
      println("merh als 10 in Stapel und mein trumpf hoeher als akutell hoechster trumpf");
      if (stapel.kartenInStapel() == 3) addKarteToStapel(ersterTrumpfInErlaubtenKartenUeber(int(stapel.stechenderTrumpf()[3]))[0], ersterTrumpfInErlaubtenKartenUeber(int(stapel.stechenderTrumpf()[3]))[1], "Über 10 Punkte also stechen");
      else addKarteToStapel(hoechsterTrumpfInErlaubtenKarten()[0], hoechsterTrumpfInErlaubtenKarten()[1], "Über 10 Punkte also hoechster Trumpf");
      return;
    }
    if (stapel.kartenInStapel() == 2 && getFreundPos() == stapel.gibLetztePosition()) {
      println("KI auf vorletzen Platz und Freund auf letzter");
      if (hoehererTrumpfInErlaubtenKartenAlsStapel() && stapel.trumpfInStapel()) {
        addKarteToStapel(ersterTrumpfInErlaubtenKartenUeber(int(stapel.stechenderTrumpf()[3]))[0], ersterTrumpfInErlaubtenKartenUeber(int(stapel.stechenderTrumpf()[3]))[1], "KI ist vorletzter und Freund letzter");
      } else {
        println("KI is vorletzter und Freundn lezter aber kein hoch genuger Trumpf");
        trumpfAbspatzen();
      }
      return;
    }
    if (getFreundPos() == getSpielerPos() && getFreundPos() == stapel.gibLetztePosition() && spieler[getSpielerPos()].hatTrumpf) {
      println("Spielerfreund an letzter Stelle");
      trumpfSchmieren();
      return;
    }
    if (getFreundPos() != -1) {
      if (stapel.stapel[getFreundPos()] != null) {
        if (stapel.stapel[getFreundPos()].name.equals("o")) {
          println("Freund hat ober gelegt");
          trumpfAbspatzen();
          return;
        }
      }
    }
    println("keine gute Moeglichkeit gefunden");
    trumpfAbspatzen();
    }
        */



        trumpfFrei(){
            this.trumpfAbspatzen("trumpf frei")
        }
        
        /// Nicht Trumpf
        ///

    /// Info Spielstate
    ///
    
    gehoertUns() {
        if(karteVonSpieler[hoechsteKarteInStich().position] == this || karteVonSpieler[hoechsteKarteInStich().position].istFreund) return true;
        else return false;
    }
    

    ///
    /// spieleKarten
    ///

    trumpfAbspatzen(grund) {
        var niedrigsteKarte = new KARTE("t", "t");

        for(let k of this.validCards) {
            if(k.getTrumpfHoehe(false) > niedrigsteKarte.getTrumpfHoehe(false) && !k.istKarte("h", "A") && !k.istKarte("h", "10")) {
                niedrigsteKarte = k;
            }
        }

        if(niedrigsteKarte.symbol == "t") { // keine gefunden
            if(this.karteInValidCards("h", "A")) niedrigsteKarte = new KARTE("h", "A");
            if(this.karteInValidCards("h", "10")) niedrigsteKarte = new KARTE("h", "10");
        }

        if(niedrigsteKarte.symbol =="t") this.abspatzen(grund + "von Trumpf Abspatzen");
        else this.spieleKarte(niedrigsteKarte.farbe, niedrigsteKarte.symbol, grund + " (Trumpf Abspatzen)");
    }   
    abspatzen(grund) {
        var niedrigsteKarte = new KARTE("t", "t");

        for(let k of this.validCards) {
            if(k.getFarbKartenHoehe(false) > niedrigsteKarte.getFarbKartenHoehe(false)) {
                niedrigsteKarte = k;
            }
        }

        this.spieleKarte(niedrigsteKarte.farbe, niedrigsteKarte.symbol, grund + " (Abspatzen)");
    }

    spieleRandomKarte() {
        var index = Math.floor(Math.random() * this.validCards.length);
        this.spieleKarte(this.validCards[index].farbe, this.validCards[index].symbol, "Keine Möglichkeit gefunden: random");
    }
    spieleKarte(farbe, symbol, grund) {
        console.log(grund);
        var index = -1;
        for(var i = 0; i < this.karten.length; i++) if(this.karten[i].farbe == farbe && this.karten[i].symbol == symbol) index = i;
        addKarteToStich(this.karten[index]);
        if(index != -1) this.karten.splice(index, 1);
    }

    /// Info validCards
    ///
    trumpfVorhanden() {
        var trumpfVorhanden = false;
        for(let k of this.validCards) {
            if(k.istTrumpf()) trumpfVorhanden = true;
        }
        return trumpfVorhanden;
    }
    farbeVorhanden(farbe) {
        var farbeVorhanden = false;
        for(let k of this.validCards) {
            if(k.farbe == farbe && !k.istTrumpf()) farbeVorhanden = true;
        }
        return farbeVorhanden;
    }
    karteInValidCards(farbe, symbol) {
        var karteInValidCards = false; 
        for (let k of this.validCards) if (k.istKarte(farbe, symbol)) karteInValidCards = true; 
        return karteInValidCards;
    }

    /// Change validCards
    ///
    trumpfZugeben() {
        for(var i = this.validCards.length-1; i >= 0; i--) {
            var k = this.validCards[i];
            if(!k.istTrumpf()) this.entferneValidCard(k.farbe, k.symbol);
        }
    }
    farbeZugeben() {
        for(var i = this.validCards.length-1; i >= 0; i--) {
            var k = this.validCards[i];
            if(k.istTrumpf() || k.farbe != stich[0].farbe) this.entferneValidCard(k.farbe, k.symbol);
        }
    }
    entferneValidCard(farbe, symbol) {
        var index = -1;
        for(var i = 0; i < this.validCards.length; i++) if(this.validCards[i].farbe == farbe && this.validCards[i].symbol == symbol) index = i;
        if(index != -1) this.validCards.splice(index, 1);
        else console.log(`Karte: ${farbe} ${symbol} konnte nicht gefunden werden (bei entferneValidCard)`);
    }


    

    







    //
    //  Spielwahl
    //
    KIEntscheidung() {
        var score = this.calculateKIScore();
        console.log("KI Score bei " + score);
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
            console.log("Added " + deck.convertToFullName(karte.farbe,karte.symbol) + " to karten");

            if(this.karten.length == 8) getKIKarten.nextState();
        }else{
            console.log("WARNING: Card couldn't be found")
        }
    }
}