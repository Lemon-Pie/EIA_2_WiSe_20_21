"use strict";
console.log("Skyrim belongs to the nord!");
console.log("");
var poem;
(function (poem) {
    let subjekt = ["Jarl Balgruuf ", "Ulfric Sturmmantel ", "Lydia "];
    let pradikat = ["regiert ", "kämpft für ", "verliert gegen "];
    let objekt = ["Skyrim ", "dich ", "die Thalmor "];
    // console.log(subjekt, pradikat, objekt);
    // console.log(subjekt[2], pradikat[1], objekt[1]);
    for (let i = 3; i > 0; i--) {
        let ausgabe = getVerse(subjekt, pradikat, objekt);
        console.log(ausgabe);
    }
    function getVerse(_subjekt, _pradikat, _objekt) {
        let einsubjekt = Math.floor(Math.random() * _subjekt.length);
        let einpradikat = Math.floor(Math.random() * _pradikat.length);
        let einobjekt = Math.floor(Math.random() * _objekt.length);
        let vers = _subjekt[einsubjekt] + _pradikat[einpradikat] + _objekt[einobjekt];
        _subjekt.splice(einsubjekt, 1);
        _pradikat.splice(einpradikat, 1);
        _objekt.splice(einobjekt, 1);
        return vers;
    }
})(poem || (poem = {}));
//# sourceMappingURL=script.js.map