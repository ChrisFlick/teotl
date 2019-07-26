// Grabbing variables from localStorage
let playerID = localStorage.getItem("teotlPlayerID");
let enemyID = localStorage.getItem("teotlEnemyID");

var enemyPick = localStorage.getItem('enemyPick'); // Stores the opponents Elemental pick when recieved from opponents peer client.

// Initiating Player Objects
var player = initPlayer(player, 'teotlPlayer');
var enemy = initPlayer(enemy, 'teotlEnemy');

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
peer.on('connection', function() { // Listens for the opponents pick
    conn.on('data', function(data) {
        localStorage.setItem('enemyPick', data)
    });
});

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
            conn.send(pick);

            localStorage.setItem('playerPick', pick); // Storing pick so that it can be used in arena.

            window.location = 'arena.html';
        });
    }
}