// Grabbing variables from localStorage
let playerID = localStorage.getItem("teotlPlayerID");
let enemyID = localStorage.getItem("teotlEnemyID");

//var enemyPick = localStorage.getItem('enemyPick'); // Stores the opponents Elemental pick when recieved from opponents peer client.

// Initiating Player Objects
//var player = initPlayer(player, 'teotlPlayer');
//var enemy = initPlayer(enemy, 'teotlEnemy');


var player = new Player([ // For debugging
    elementals[0,0],
    elementals[1,0],
    elementals[2,0],
    elementals[3,0],
    elementals[4,0],
],[0,0,0,0,0]);

var enemy = new Player([ // For debugging
    elementals[0,1],
    elementals[1,1],
    elementals[2,1],
    elementals[3,1],
    elementals[4,1],
],[1,1,1,1,1]);

player.health = 100;
player.maxHealth = 100;

enemy.health = 100;
enemy.maxHealth = 200;

player.elemental[type.atomic].maxHealth = 100;
player.elemental[type.atomic].health = 100;

player.elemental[type.fire].maxHealth = 100;
player.elemental[type.fire].health = 100;

player.elemental[type.water].maxHealth = 100;
player.elemental[type.water].health = 100;

player.elemental[type.earth].maxHealth = 100;
player.elemental[type.earth].health = 100;

player.elemental[type.wind].maxHealth = 100;
player.elemental[type.wind].health = 100;

enemy.elemental[type.atomic].maxHealth = 100;
enemy.elemental[type.atomic].health = 50;

enemy.elemental[type.fire].maxHealth = 100;
enemy.elemental[type.fire].health = 50;

enemy.elemental[type.water].maxHealth = 100;
enemy.elemental[type.water].health = 50;

enemy.elemental[type.earth].maxHealth = 100;
enemy.elemental[type.earth].health = 50;

enemy.elemental[type.wind].maxHealth = 100;
enemy.elemental[type.wind].health = 50;

// Initiating misc variables
var pick = -1; // Stores the player's pick

// Setting up connection with opponent
var peer = new Peer(
    playerID,
    {
        host: '74.207.252.238', 
        port: 9000, 
        debug: 0,
      }
);

var conn = peer.connect(enemyID);
peer.on('connection', function(conn) { // Listens for the opponents pick
    conn.on('data', function(data) {
        console.log("Recieving Enemy pick");
        localStorage.setItem('enemyPick', data);
    });
});

// Show healthbars at top of screen.
healthbar("p_health", player);
healthbar("e_health", enemy);

// Display Health of Player Elementals 
eleHealthBar("p_atomHealth", player.elemental[type.atomic]); // Atomic Elemental.
eleHealthBar("p_fireHealth", player.elemental[type.fire]); // Atomic Elemental.
eleHealthBar("p_waterHealth", player.elemental[type.water]); // Atomic Elemental.
eleHealthBar("p_earthHealth", player.elemental[type.earth]); // Atomic Elemental.
eleHealthBar("p_windHealth", player.elemental[type.wind]); // Atomic Elemental.

// Display Health of Enemy Elementals 
eleHealthBar("e_atomHealth", enemy.elemental[type.atomic]); // Atomic Elemental.
eleHealthBar("e_fireHealth", enemy.elemental[type.fire]); // Atomic Elemental.
eleHealthBar("e_waterHealth", enemy.elemental[type.water]); // Atomic Elemental.
eleHealthBar("e_earthHealth", enemy.elemental[type.earth]); // Atomic Elemental.
eleHealthBar("e_windHealth", enemy.elemental[type.wind]); // Atomic Elemental.

// Write the Health of Player and Enemy Elementals
document.getElementById("player").innerHTML = playerStats(player, "Player");
document.getElementById("enemy").innerHTML = playerStats(enemy, "Enemy");

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

    pick = type;
    
    // Show the stats of selected Elemental on screen.
    let ele = player.elemental[type];
    document.getElementById("Stats").innerHTML = ele.getStats();
    document.getElementById("Desc").innerHTML = ele.description;
}

function select() {
    if (pick != -1) {
        var conn = peer.connect(enemyID);
        conn.on('open', function() {
            console.log('Sending pick to opponent.')
            console.log(pick);
            conn.send(pick);

            localStorage.setItem('playerPick', pick); // Storing pick so that it can be used in arena.

            window.location = 'arena.html';
        });
    }
}

function playerStats(player, type) {
    let stats;

    stats = "<b>" + type + "<b></br>";

    for (let i = 0; i < player.elemental.length; i++) {
        ele = player.elemental[i];
        stats += ele.getType() + " " + ele.name + ": " + ele.health + "/" + ele.maxHealth + "</br>";
    };

    return stats;
}

function eleHealthBar(id, obj) { 
    let healthP =  document.getElementById(id); // Get element ID
    healthP.style.height = 100 - (100 * (obj.health / obj.maxHealth)) + "%" ; // Fill bar depending on what percent of health the player has out of 100%.
}