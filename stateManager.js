

var selectSpieler = {
    stateName: "selectSpieler",
    nextState: function () {
        var selectSpieler = document.getElementsByClassName("selectSpieler")[0];
        selectSpieler.classList.add("removed");
        
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

        var cardDetection = document.getElementsByClassName("carddetection")[0]; //section
        cardDetection.classList.remove("removed");

        if(document.getElementById("activatecameracheckbox").checked){ //checkbox true
            enableCam();
        }else{ // false --> remove canvas
            canvas.classList.add("removed");
        }
        


        
        
    },
    nextState: function() {
        var cardDetection = document.getElementsByClassName("carddetection")[0];
        cardDetection.classList.add("removed");

        spielwahl.start();
    }
};

var spielwahl = {
    stateName: "spielwahl",
    start: function() {
        var spielWahl = document.getElementsByClassName("spielwahl")[0];
        spielWahl.classList.remove("removed");

        var spielerSelect = document.getElementById("spielerSelect");

        for(var i = 0; i < spieler.length; i++) {
            if(i != KIpos) spielerSelect.options.add(new Option(spieler[i].name, i));
        }
    }
}