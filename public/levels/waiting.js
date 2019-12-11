// Grabbing variables from localStorage
let playerID = localStorage.getItem("teotlPlayerID");
let enemyID = localStorage.getItem("teotlEnemyID");
let teotlPlayer = JSON.parse(localStorage.getItem("teotlPlayer"));

// Define variables
let eleSelect; // Stores the opponents Elemental selection

// Setting up connection with opponent
var peer = new Peer(
    playerID,
    {
        // host: '74.207.252.238', 
        // port: 9000, 
        debug: 0,
      }
);

var conn = peer.connect(enemyID);

localStorage.setItem("doomsday", MINUTES_TO_MIDNIGHT);

if (localStorage.getItem('enemyPick') != -1) { // If the Player has already recieved the opponents Elemental selection grab 'enemyPick' from local storage and parse it.

  eleSelect = JSON.parse(localStorage.getItem('enemyPick'));
  localStorage.setItem('enemyPick', -1);
  createEnemy();
} else { // Listen for opponents Elemental Picks
  peer.on('connection', function(conn) { 
    conn.on('data', function(data){
      console.log(`Recieved Enemy Elementals:`);
      console.log(data);

      eleSelect = data;

      createEnemy();
    });
  });
}



// Internal functions

function createEnemy() { // Take the opponents Elemental picks and create a new Player Object

    let enemyElementals = [];

    console.log('Loading opponents Elemental selection:');
    for (let i = 0; i < 5; i++) { // Go through each of the opponents picks and pull an Elemental from the Elemental Array
        enemyElementals[i] = elementals[i][eleSelect[i]];
        console.log(enemyElementals[i]);
    }

    let enemy = new Player(enemyElementals, eleSelect)
    console.log("Creating opponents Player Object");
    console.log(enemy);

    // Store opponentes Player Object.
    localStorage.setItem("teotlEnemy", JSON.stringify(enemy));

    //Go to pentacle
    window.location = "pentacle.html";
}