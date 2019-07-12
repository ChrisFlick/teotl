let playerID = localStorage.getItem("teotlPlayerID");
var peer = new Peer(playerID, {key: 'lwjd5qra8257b9'});

document.getElementById('playerID').value = playerID;


// Internal fuinctions

function connect() {
    let enemyID = document.getElementById('enemyID').value;

    console.log(`Storing enemyID ${enemyID}`);
    localStorage.setItem("teotlPlayerID", enemyID);

    window.location = "character_select.html";
}