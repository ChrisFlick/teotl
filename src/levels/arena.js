// Grabbing variables from localStorage
let playerID = localStorage.getItem("teotlPlayerID");
let enemyID = localStorage.getItem("teotlEnemyID");

var enemyPick = localStorage.getItem('enemyPick');
var playerPick = localStorage.getItem('playerPick');


// Initiating Player Objects
var player = initPlayer(player, 'teotlPlayer');
var enemy = initPlayer(enemy, 'teotlEnemy');


// Initiating misc variables
var log = "";
var playerEle;
var enemyEle;

// Setting up connection with opponent
var peer = new Peer(
    playerID,
    {
        host: '74.207.252.238', 
        port: 9000, 
        debug: 0,
      }
);


if (enemyPick == -1) {
  var conn = peer.connect(enemyID);
  peer.on('connection', function() {
    conn.on('data', function(data) {
          enemyPick = data;
          console.log("Enemy pick recieved");
          combat();
    });
  });
} else {
  combat();
}


// Internal functions

function combat() { // Perform all the internal logic once the Player has the Enemy's Elemental pick
  // Store each Player's chosen elemental

  console.log("Starting combat");

  playerEle = player.elemental[playerPick];
  enemyEle = enemy.elemental[enemyPick];

  // Reset the local storage for player and enemy picks.
  localStorage.setItem('playerPick', -1);
  localStorage.setItem('enemyPick', -1);

  var conn = peer.connect(enemyID);
  peer.on('connection', function() {
    conn.on('data', function(data) {
          localStorage.setItem('enemyPick', data);
    });
  });

  if (playerEle.speed > enemyEle.speed) { // Find out who is faster and calculates damage dealth.
    playerEle.attack(enemyEle);
    
    if (enemyEle.health > 0) { // If after being attacked the Enemy Elemental is still alive calculate it's counter attack.
      enemyEle.attack(playerEle);
    } else {
      isDead('Enemy', enemyEle);
    }
  } else {
    enemyEle.attack(playerEle);
  
    if (playerEle.health > 0) { // If after being attacked the Player Elemental is still alive calculate it's counter attack
      playerEle.attack(enemyEle);
    } else {
      isDead('Player', playerEle);
    }
  }
  
  if (playerEle.doubleStrike && enemyEle.doubleStrike) { // Check to see if both Elementals have Double strike and find out who is the faster one and perform a second round of attacks.
    if (playerEle.speed > enemyEle.speed && playerEle.health > 0 && enemyEle.health > 0) { // Make sure that the Player Elemental is still alive before performing it's second attack.
      playerEle.attack(enemyEle);
      
      if (enemyEle.health > 0) {// Make sure the Enemy Elemental is still alive before performing it's second attack.
        enemyEle.attack(playerEle);
      } else {
        isDead('Enemy', enemyEle);
      }
    } else if (enemyEle.health > 0 && playerEle.health > 0) { // Make sure the Enemy Elemental is still alive before performing it's second attack.
      enemyEle.attack(playerEle);
    
      if (playerEle.health > 0) { // Make sure that the Player Elemental is still alive before performing it's second attack.
        playerEle.attack(enemyEle);
      } else {
        isDead('Player', playerEle);
      }
    }
  } else if (playerEle.doubleStrike && playerEle.health > 0 && enemyEle.health > 0) { // If the Player's Elemental has Double Strike and it's still alive perform a second attack. 
    playerEle.attack(enemyEle);
  } else if (enemyEle.doubleStrike && enemyEle.health > 0 && playerEle.health > 0) { // If the Enemy Elemental has Double Strike and it's still alive perform a second attack.
    enemyEle.attack(playerEle);
  }
  
  if (playerEle.multiplier(playerEle.type, enemyEle.type) > 1 && playerEle.health > 0) { // If the Player chose an Elemental with a stronger Type than the Enemy and their Elemental is still alive have their ability go of
    playerEle.ability(player, enemy);
  } else if (playerEle.multiplier(playerEle.type, enemyEle.type  < 1) && enemyEle.health > 0) { // If the enemy chose an Elemental that is a stronger Type and the Enemy Elemental is still alive have their ability go off instead.
    enemyEle.ability(enemy, player);
  } // If it is a tie ie the multiplier is equal to one neither ability goes off
}

// For debugging
function isDead(player, ele) { // Log death to console to show why Elemental can not attack.
  console.log(`${player} ${ele.getType()} ${ele.name} is dead and can not perform an attack`);
}
