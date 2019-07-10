let playerElementals = []; // Initializing Player Elementals

let elementals = [
    [
        new AtomicC1,
        new AtomicC2,
        new AtomicC3,
        new AtomicC4,
    ],

    [
        new FireC1,
        new FireC2,
        new FireC3,
        new FireC4,
    ],
      
    [
        new WaterC1,
        new WaterC2,
        new WaterC3,
        new WaterC4,
    ],
      
    [
        new EarthC1,
        new EarthC2,
        new EarthC3,
        new EarthC4,
    ],
      
    [
        new WindC1,
        new WindC2,
        new WindC3,
        new WindC4,
    ],    
];


// Internal Functions

function select(prefix, button, num, type) {
    let source = "../../sprites/portraits/"

    // Declare variable.
    let image;
    let elementID;
    let extension = ".png"

    for (let i = 0; i < num; i++) {
        elementID = prefix + String(i);
        image = document.getElementById(elementID);

        if (elementID != button) { // Revert back to non clicked variant
            image.src = source + elementID + extension; 
        } else { // Change image to it's clicked variant
            image.src = source + elementID + "Clicked" + extension;
            playerElementals[type] = elementals[type][i];

            let ele = playerElementals[type]
            document.getElementById(ele.getType() + "Stats").innerHTML = 
                ele.name + "<br>" +
                "Strength: " + ele.strength + "<br>" +
                "Constitution: " + ele.constitution + "<br>" +
                "Intelligence: " + ele.intelligence + "<br>" +
                "Agility: " + ele.agility + "<br>";

            document.getElementById(ele.getType() + "Desc").innerHTML = ele.description;
        }
    }
    console.log("Selected Elementals:")
    console.log(playerElementals);
};

function continueButton() {
    let ready = true;

    for (let i = 0; i < 5; i++) {
        if (playerElementals[i] == undefined) {
            ready = false;
        }
    }

    if (ready) {
        player = new Player(playerElementals);
        console.log('Constructing Player object');
        console.log(player);

        win.loadUrl("pentacle.html");
    }
}