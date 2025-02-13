
var jangoFett = {
    occupation: "Bounty Hunter",
    genetics: "superb"
};

var bobaFett = {
    occupation: "Bounty Hunter",
    genetics: "superb"
};

var callMeJango = jangoFett;


console.log(bobaFett === jangoFett);


console.log(callMeJango === jangoFett);






function isEquivalent(a, b) {
    
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

  
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

   
    return true;
}


console.log(isEquivalent(bobaFett, jangoFett));