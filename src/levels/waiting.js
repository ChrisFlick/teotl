// Grabbing variables from localStorage
let playerID = localStorage.getItem("teotlPlayerID");
let enemyID = localStorage.getItem("teotlEnemyID");
let teotlPlayer = JSON.parse(localStorage.getItem("teotlPlayer"));

// Setting up connection with opponent
var peer = new Peer(playerID, {key: 'lwjd5qra8257b9'});
var conn = peer.connect(enemyID);


peer.on('open', function() {
    
});

peer.on('connection', function(conn) {
    console.log("Recieving connection with opponent...")

    conn.send(JSON.stringify(teotlPlayer._elePicks));
    conn.on('data', function(data) {
        console.log("Recieving opponents Elementals");

        let eleSelect = JSON.parse(data);
        let enemyElementals = [];

        // Go through each of the opponents picks and pull an Elemental from the Elemental Array
        for (let i = 0; i < eleSelect.length; i++) {
            enemyElementals[i] = elementals[i][enemyPicks[i]];
        }

        let enemy = new playerID(enemyElementals, eleSelect)
        console.log("Creating opponents Player Object");
        console.log(enemy);

        // Store opponentes Player Object.
        localStorage.setItem("teotlEnemy", JSON.stringify(enemy));
    });
});