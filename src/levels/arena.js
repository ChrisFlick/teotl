// Grabbing variables from localStorage
let playerID = localStorage.getItem("teotlPlayerID");
let enemyID = localStorage.getItem("teotlEnemyID");

var enemyPick = localStorage.getItem('enemyPick');
var playerPick = localStorage.getItem('playerPick');


// Initiating Player Objects
var player = initPlayer(player, 'teotlPlayer');
var enemy = initPlayer(enemy, 'teotlEnemy');

var newPick = -1; // Stores the Enemy's next pick.

// Initiating log variables
var log = ""; // Stores entire combat log.
var weaknessLog = ""; // Stores Elemental Weakness for log.
var damage = ""; // Stores Elemental Damage for log.
var shieldLog = ""; // Stores Damage Shield for log.

// Initiate Elementals
var playerEle;
var enemyEle;

var ready = false; // Used to see if player is ready to go back to pentacle.

// Setting up connection with opponent
var peer = new Peer(
    playerID,
    {
        host: '74.207.252.238', 
        port: 9000, 
        debug: 0,
      }
);


if (enemyPick == -1) { // Listen for Enemy's pick if not already recieved.

  var conn = peer.connect(enemyID);
  peer.on('connection', function(conn) { // Initiate combat once enemy pick is recieved.
    conn.on('data', function(data) {
        if (enemyPick == -1) {
          enemyPick = data;
          console.log("Enemy pick recieved");
          combat(); 
        } else {
          newPick = data;
        }  
    });
  });

} else { // Listen for next Enemy's pick if already recieved and initiate combat.

  var conn = peer.connect(enemyID);
  peer.on('connection', function(conn) {
    conn.on('data', function(data) {
          newPick = data;
    });
  });

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

  log += "You have chosen: " + eleName(playerEle) + "</br>";
  log += "The Enemy has chosen " + eleName(enemyEle) + "</br>";
  log += "</br>";
  printLog();

  if (playerEle.speed > enemyEle.speed) { // Find out who is faster and calculates damage dealth.
    playerEle.attack(enemyEle);

    logCombat("Your", playerEle, enemyEle);
    printLog();
    
    if (enemyEle.health > 0) { // If after being attacked the Enemy Elemental is still alive calculate it's counter attack.
      enemyEle.attack(playerEle);

      logCombat("Enemy", enemyEle, playerEle);
      printLog();

    } else {
      isDead('Enemy', enemyEle);
    }
  } else {
    enemyEle.attack(playerEle);

    logCombat('Enemy', enemyEle, playerEle);
    printLog();
  
    if (playerEle.health > 0) { // If after being attacked the Player Elemental is still alive calculate it's counter attack
      playerEle.attack(enemyEle);

      logCombat('Your', playerEle, enemyEle);
      printLog();

    } else {
      isDead('Player', playerEle);
    }
  }
  
  if (playerEle.doubleStrike && enemyEle.doubleStrike) { // Check to see if both Elementals have Double strike and find out who is the faster one and perform a second round of attacks.
    if (playerEle.speed > enemyEle.speed && playerEle.health > 0 && enemyEle.health > 0) { // Make sure that the Player Elemental is still alive before performing it's second attack.
      playerEle.attack(enemyEle);

      log += "Your " + logDoubleStrike(playerEle);
      logCombat('Your', playerEle, enemyEle);
      printLog();
      
      if (enemyEle.health > 0) { // Make sure the Enemy Elemental is still alive before performing it's second attack.
        enemyEle.attack(playerEle);

        log += "Enemy " + logDoubleStrike(enemyEle);
        logCombat('Your', enemyEle, playerEle);
        printLog();

      } else {
        isDead('Enemy', enemyEle);
      }
    } else if (enemyEle.health > 0 && playerEle.health > 0) { // Make sure the Enemy Elemental is still alive before performing it's second attack.

      enemyEle.attack(playerEle);

      log += "Enemy " + logDoubleStrike(enemyEle);
      logCombat('Enemy ', enemyEle, playerEle);
      printLog();
    
      if (playerEle.health > 0) { // Make sure that the Player Elemental is still alive before performing it's second attack.

        playerEle.attack(enemyEle);

        log += "Your " + logDoubleStrike(playerEle);
        logCombat('Your', playerEle, enemyEle);
        printLog();

      } else {
        isDead('Player', playerEle);
      }
    }
  } else if (playerEle.doubleStrike && playerEle.health > 0 && enemyEle.health > 0) { // If the Player's Elemental has Double Strike and it's still alive perform a second attack. 

    playerEle.attack(enemyEle);

    log += "Your " + logDoubleStrike(playerEle);
    logCombat('Your', playerEle, enemyEle);
    printLog();

  } else if (enemyEle.doubleStrike && enemyEle.health > 0 && playerEle.health > 0) { // If the Enemy Elemental has Double Strike and it's still alive perform a second attack.

    enemyEle.attack(playerEle);

    log += "Enemy " + logDoubleStrike(enemyEle);
    logCombat('Enemy', enemyEle, playerEle);
    printLog();
  }
  
  /*if (playerEle.health === 0) { // Check to see if Player Elementa is dead so that we can damage the Player and Reincarnate the Elemental

    player.health -= playerEle.maxHealth; // Reduce the player health by the Elementals Max Health
    playerEle.health = playerEle.maxHealth;
  
  }*/

  if (playerEle.multiplier(playerEle.type, enemyEle.type) > 1 && playerEle.health > 0) { // If the Player chose an Elemental with a stronger Type than the Enemy and their Elemental is still alive have their ability go of

    playerEle.ability(player, enemy);

  } else if (playerEle.multiplier(playerEle.type, enemyEle.type  < 1) && enemyEle.health > 0) { // If the enemy chose an Elemental that is a stronger Type and the Enemy Elemental is still alive have their ability go off instead.

    enemyEle.ability(enemy, player);

  } // If it is a tie ie the multiplier is equal to one neither ability goes off


  // Store variables
  localStorage.setItem('teotlPlayer', JSON.stringify(player));
  localStorage.setItem('teotlEnemy', JSON.stringify(enemy));
  localStorage.setItem('enemyPick', newPick);

  ready = true;
}


function printLog() { // Prints the current log to arena.html
  document.getElementById("log").innerHTML = log;
}

function eleName(ele) { // Returns Elemental type and name (for combat log).
  return ele.getType() + " " + ele.name;
}

function logWeakness() {
  return "The attack was " + weaknessLog + "</br>"
}

function logCombat(player, attackingEle, defendingEle) { // Creates log for combat.
  log += player + " " + eleName(attackingEle) + " is attacking the Enemy " + eleName(defendingEle) + " for " + damage + " damage </br>";
    log += logWeakness();
    log += shieldLog;
    log += "</br>"

    // Reset variables
    weaknessLog = "";
    damage = "";
    shieldLog = "";
}

function logDoubleStrike(ele) { // Returns notification that the Elemental has Double Strike.
  return eleName(ele) + " is invigorated and ready to perform a second attack </br>";
}

function done() {
  if (ready) {
    window.location = "pentacle.html";
  }
}

// For debugging
function isDead(player, ele) { // Log death to console to show why Elemental can not attack.
  console.log(`${player} ${ele.getType()} ${ele.name} is dead and can not perform an attack`);
}