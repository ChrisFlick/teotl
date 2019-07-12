let player;
let pick;
initPlayer();



// Internal functions 

function elementClick(type) {
    // Declare variables.
    let image;
    let source = "../../sprites/buttons/";
    let extension = ".png"

    // Revert all other buttons to their non clicked image.
    for (let i = 0; i < 5; i++) {
        let elementID = i;
        if (i != type) {
            image = document.getElementById(elementID);
            image.src = source + "element_" + elementID + extension;
        }
    }

    // Change image of button the player clicked to it's clicked variant.
    image = document.getElementById(type);
    image.src = source + "element_" + type + "Clicked" + extension;

    let ele = player.elemental[type];
    document.getElementById("Stats").innerHTML = ele.getStats();
    document.getElementById("Desc").innerHTML = ele.description;
}

function initPlayer() {
    console.log("Loading player object:");
    initElementals()

    let teotlPlayer = JSON.parse(localStorage.getItem("teotlPlayer"));
    player = new Player([]);
    Object.assign(player, teotlPlayer);

    for (let i = 0; i < player.eleSelect.length; i++) {
        let ele = teotlPlayer._elemental[i];
        player.elemental[i] = elementals[i][player.eleSelect[i]]

        Object.assign(player.elemental[i], ele);
    }

    console.log(player);
}