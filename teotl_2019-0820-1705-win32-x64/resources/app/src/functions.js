function initPlayer(player, storage) { // Creates player Object based on stringified object stored in local memory.
    console.log(`Loading ${storage}:`);
    initElementals()

    // Grabs stringified object and then assign it to a new Player object.
    let teotlPlayer = JSON.parse(localStorage.getItem(storage)); 
    player = new Player([])
    Object.assign(player, teotlPlayer);

    for (let i = 0; i < player.eleSelect.length; i++) { // Assigns the stored Elemental objects to the player object.
        let ele = teotlPlayer._elemental[i];
        player.elemental[i] = elementals[i][player.eleSelect[i]]

        Object.assign(player.elemental[i], ele);
    }

    console.log(player);

    return player;
}

function healthbar(id, obj) { // Calculates health of (obj) as a bar and displays it to Element ID (id)

    let healthP =  document.getElementById(id); // Get element ID
    healthP.innerHTML = obj.health + "/" + obj.maxHealth; // Display the players health as string.
    healthP.style.width = 100 * (obj.health / obj.maxHealth) + "%" ; // Fill bar depending on what percent of health the player has out of 100%.
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }