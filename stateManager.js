var currentState = selectSpieler;

var selectSpieler = {
    stateName: "selectSpieler",
    nextState: function () {

        removeHtmlElementByClassName("selectSpieler")
        
        this.createSpieler();
        getKIKarten.start();
    },
    createSpieler: function() {
        var spielerNamen = [];
        spielerNamen.push(document.getElementById("first").value);
        spielerNamen.push(document.getElementById("second").value);
        spielerNamen.push(document.getElementById("third").value);
        spielerNamen.push(document.getElementById("fourth").value);

        var KIvorhanden = false;
        for(var i = 0; i < spielerNamen.length; i++) {
            if(spielerNamen[i] == "KI") {
                spieler.push(new KISPIELER(spielerNamen[i]));
                KIpos = i;
                KIvorhanden = true;
            } else spieler.push(new SPIELER(spielerNamen[i]));
            console.log("added " + spieler[i].name)
        }
        if(!KIvorhanden) alert("No KI Position! Refresh Window!");
    },
    checkNames: function(event) {
        var spielerNamen = [];
        spielerNamen.push(document.getElementById("first").value);
        spielerNamen.push(document.getElementById("second").value);
        spielerNamen.push(document.getElementById("third").value);
        spielerNamen.push(document.getElementById("fourth").value);
        
        var anzahlFilledOut = 0;
    
        for(var i = 0; i < spielerNamen.length; i++) if(spielerNamen[i] != "") anzahlFilledOut++;
    
        var indexNotFilledOut;
        if(anzahlFilledOut == 3) for(var i = 0; i < spielerNamen.length; i++) if(spielerNamen[i] == "") indexNotFilledOut = i;
    
        switch(indexNotFilledOut) {
            case 0:
                document.getElementById("first").value = "KI";
                break;
            case 1:
                document.getElementById("second").value = "KI";
                break;
            case 2:
                document.getElementById("third").value = "KI";
                break;
            case 3:
                document.getElementById("fourth").value = "KI";
                break;    
        }
    }
};

var getKIKarten = {
    stateName: "getKIKarten",
    start: function() {
        currentState = getKIKarten;
        
        addHtmlElementByClassName("ingameContainer");
        addHtmlElementByClassName("carddetection");

        if(document.getElementById("activatecameracheckbox").checked){ //checkbox true
            enableCam();
        }else{ // false --> remove canvas
            canvas.classList.add("removed");
        }
    },
    nextState: function() {
        removeHtmlElementByClassName("carddetection");
        spielwahl.start();
    }
};

var spielwahl = {
    stateName: "spielwahl",
    start: function() {
        currentState = spielwahl;

        addHtmlElementByClassName("spielwahl");

        var spielerSelect = document.getElementById("spielerSelect");
        for(var i = 0; i < spieler.length; i++) {
            spielerSelect.options.add(new Option(spieler[i].name, i));
        }
    },
    nextState: function() {
        removeHtmlElementByClassName("spielwahl");
        ingame.start();
    }
}

var ingame = {
    stateName: "ingame",
    gamemode: "unknown",  // sauspiel, wenz, farbsolo, ramsch
    trumpfart: "unknown", // e, h, b, s, U
    saufarbe: "unknown",  // e, b, s
    spielerAmZug: 0,      // 0 - 3

    spielerPos: -1,       // 0 - 3
    freundPos: {},        // int array 
    start: function() {
        currentState = ingame;

        addHtmlElementByClassName("ingame");
        addHtmlElementByClassName("carddetection")

        //set ingame variables
        this.gamemode = document.getElementById("spielartSelect").value;

        switch(this.gamemode) {
            case "sauspiel":
                this.trumpfart = "h";
                this.saufarbe = document.getElementById("spielwahlFarbeSelect").value;
                this.spielerPos = document.getElementById("spielerSelect").value; 
                break;
            case "farbsolo":
                this.trumpfart = document.getElementById("spielwahlFarbeSelect").value;
                this.spielerPos = document.getElementById("spielerSelect").value; 
                break;
            case "wenz":
                this.trumpfart = "U";
                this.spielerPos = document.getElementById("spielerSelect").value; 
                break;
            case "ramsch":
                this.trumpfart = "h";
                break;
        }

        console.log("New Game: " + this.gamemode + " von " + spieler[this.spielerPos].name + " auf " + this.saufarbe + "; Trump: " + this.trumpfart);

        deck.createTrumpfReihenfolge();
        
    },
    naechsterZug: function() {
        this.spielerAmZug++;
        if(this.spielerAmZug == 4) this.spielerAmZug = 0;
        
    },

    nextState: function() {
        
    }
}


//
// generell purpose
//

function removeHtmlElementByClassName(classname) {
    var element = document.getElementsByClassName(classname)[0];
    element.classList.add("removed");
}
function addHtmlElementByClassName(classname) {
    var element = document.getElementsByClassName(classname)[0];
    element.classList.remove("removed");
}