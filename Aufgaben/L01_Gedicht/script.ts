console.log("Skyrim belongs to the nord!")
console.log("");

namespace poem {
    let subjekt: string[] = ["Jarl Balgruuf ", "Ulfric Sturmmantel ", "Lydia "];
    let pradikat: string[] = ["regiert ", "kämpft für ", "verliert gegen "];
    let objekt: string[] = ["Skyrim ", "dich ", "die Thalmor "]
    // console.log(subjekt, pradikat, objekt);
    // console.log(subjekt[2], pradikat[1], objekt[1]);

    for (let i: number = 3; i > 0; i--) {
        let ausgabe: string = getVerse(subjekt, pradikat, objekt);
        console.log(ausgabe);
    }

    function getVerse (_subjekt: string[], _pradikat: string[], _objekt: string[]): string {
        let einsubjekt: number = Math.floor(Math.random() * _subjekt.length);
        let einpradikat: number = Math.floor(Math.random() * _pradikat.length);
        let einobjekt: number = Math.floor(Math.random() * _objekt.length);

        let vers: string = _subjekt[einsubjekt] + _pradikat[einpradikat] + _objekt[einobjekt];

        _subjekt.splice(einsubjekt, 1);
        _pradikat.splice(einpradikat, 1);
        _objekt.splice(einobjekt, 1);

        return vers;
    }
}