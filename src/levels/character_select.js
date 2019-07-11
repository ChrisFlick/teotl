let playerElementals = []; // Initializing Player Elementals
let eleSelect = [];

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
            eleSelect[type] = i;

            // List Stats and description of Elemental's Abillity
            let ele = playerElementals[type]
            document.getElementById(ele.getType() + "Stats").innerHTML = ele.getStats();
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
        let player = new Player(playerElementals, eleSelect);
        console.log('Constructing Player object');
        console.log(player);
        
        localStorage.setItem("teotlPlayer", JSON.stringify(player));
        window.location = "pentacle.html";
    }
}