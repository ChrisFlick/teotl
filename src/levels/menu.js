let playerID = localStorage.getItem("teotlPlayerID");
var peer = new Peer(playerID);

document.getElementById('playerID').value = playerID;


// Internal fuinctions

function connect() {
    let enemyID = document.getElementById('enemyID').value;

    console.log(`Storing enemyID ${enemyID}`);
    localStorage.setItem("teotlEnemyID", enemyID);

    window.location = "character_select.html";
}