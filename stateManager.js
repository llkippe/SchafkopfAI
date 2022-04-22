var currentState = selectSpieler;

var selectSpieler = {
    stateName: "selectSpieler",
    nextState: function () {
        currentState = getKIKarten;

        var selectSpieler = document.getElementsByClassName("selectSpieler")[0];
        selectSpieler.classList.add("removed");
        
        getKIKarten.start();
    },
    checkNames: function(event) {
        var inputArr = [];
        inputArr.push(document.getElementById("first").value);
        inputArr.push(document.getElementById("second").value);
        inputArr.push(document.getElementById("third").value);
        inputArr.push(document.getElementById("fourth").value);
        
        var anzahlFilledOut = 0;
    
        for(var i = 0; i < inputArr.length; i++) if(inputArr[i] != "") anzahlFilledOut++;
    
        var indexNotFilledOut;
        if(anzahlFilledOut == 3) for(var i = 0; i < inputArr.length; i++) if(inputArr[i] == "") indexNotFilledOut = i;
    
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
        canvas.classList.remove("removed");
        enableCam();
    }
};