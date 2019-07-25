// Grabbing variables from localStorage
let playerID = localStorage.getItem("teotlPlayerID");
let enemyID = localStorage.getItem("teotlEnemyID");
let teotlPlayer = JSON.parse(localStorage.getItem("teotlPlayer"));

// Setting up connection with opponent
var peer = new Peer(
    playerID,
    {
        host: '74.207.252.238', 
        port: 9000, 
        debug: 3,
      }
);

var conn = peer.connect(enemyID);


if (localStorage.getItem('enemyPick') === -1) {
    peer.on('connection', function(conn) { // Listen for opponents Elemental Picks
        conn.on('data', function(data){
          console.log(`Recieved Enemy Elementals:`);
          console.log(data);
          localStorage.setItem('enemyPick', data);
    
          createEnemy();
        });
      });
} else {
    createEnemy();
}



// Internal functions

function createEnemy() { // Take the opponents Elemental picks and create a new Player Object
    let eleSelect = localStorage.getItem("enemyPick");
    localStorage.setItem('enemyPick', -1);

    let enemyElementals = [];

    // Go through each of the opponents picks and pull an Elemental from the Elemental Array
    for (let i = 0; i < eleSelect.length; i++) {
        enemyElementals[i] = elementals[i][enemyPicks[i]];
    }

    let enemy = new player(enemyElementals, eleSelect)
    console.log("Creating opponents Player Object");
    console.log(enemy);

    // Store opponentes Player Object.
    localStorage.setItem("teotlEnemy", JSON.stringify(enemy));

    //Go to pentacle
}