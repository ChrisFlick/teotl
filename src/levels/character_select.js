let playerID = localStorage.getItem("teotlPlayerID");
let enemyID = localStorage.getItem("teotlEnemyID");

var peer = new Peer(
    playerID,
    {
        host: '74.207.252.238', 
        port: 9000, 
        debug: 3,
      }
);

var conn = peer.connect(enemyID);

peer.on('connection', function(conn) { // Listen for opponents Elemental Picks
    conn.on('data', function(data){
      console.log(`Recieved Enemy Elementals:`);
      console.log(data);
      localStorage.setItem('enemyPick', data);
    });
  });

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

function continueButton() { // Upon pressing the continue button checks to see that the Player has chosen one of each Elemental type before continueing on to the next screen.
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

        conn.on('open', function() {
            conn.send(eleSelect);
            window.location = "waiting.html"; 
        });
    }
}