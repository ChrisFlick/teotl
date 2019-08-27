// Grabbing variables from localStorage
let playerID = localStorage.getItem("teotlPlayerID");
let enemyID = localStorage.getItem("teotlEnemyID");

var enemyPick = localStorage.getItem('enemyPick');
var playerPick = localStorage.getItem('playerPick');

// Initiating Player Objects
var player = initPlayer(player, 'teotlPlayer');
var enemy = initPlayer(enemy, 'teotlEnemy');

/** Start of debug code **/

var playerPick = type.wind;
var enemyPick = type.wind;

var player = new Player([
  new AtomicC4,
  new FireC1,
  new WaterC3,
  new EarthC2,
  new WindC2
], [1,1,1,1,1]);

var enemy = new Player([
  new AtomicC4,
  new FireC1,
  new WaterC3,
  new EarthC2,
  new WindC2
], [1,1,1,1,1]);

enemy.elemental[enemyPick].health = 1;
player.elemental[playerPick].health = 1;

localStorage.setItem("doomsday", 1);

/* End of debug code */

// Chose a random background and display it in HTML
let NUMBER_OF_BACKGROUNDS = 2; // Minus one
let bg = Math.round(Math.random() * NUMBER_OF_BACKGROUNDS); // Chose between the backgrounds randomly
document.getElementById("background").src = "../../sprites/background/" + bg + ".gif"; // Display the the randomly selected background on screen.e

// Initiating log variables
var log = ""; // Stores entire combat log.
var weaknessLog = ""; // Stores Elemental Weakness for log.
var damage = ""; // Stores Elemental Damage for log.
var shieldLog = ""; // Stores Damage Shield for log.
var extra = ""; // Stores the results of any inate abilities.

// Initiate Elementals
var playerEle;
var enemyEle;

// Initiate misc variables
var ready = false; // Used to see if player is ready to go back to pentacle.
var timeout = 0; // Used to queue up actions with setTimeout.

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
          localStorage.setItem('enemyPick', data);
        }
      });
  });

} else { // Listen for next Enemy's pick if already recieved and initiate combat.
  combat();

  peer.on('connection', function(conn) { // Store Enemy pick once recieved
    conn.on('data', function(data) {
      localStorage.setItem('enemyPick', data);
    });
  });
}

// Internal functions

function combat() { // Perform all the internal logic once the Player has the Enemy's Elemental pick
  // Store each Player's chosen elemental

  console.log("Starting combat");

  playerEle = player.elemental[playerPick];
  enemyEle = enemy.elemental[enemyPick];

  // Stores the number of attacks performed
  window.playerNumOfAttacks = 0;
  window.enemyNumOfAttacks = 0;
  
  // Reset the local storage for player and enemy picks.
  localStorage.setItem('playerPick', -1);
  localStorage.setItem('enemyPick', -1);

  // Create <div>s for healthbars
  document.getElementById("player").innerHTML = "<div id='p_maxHealth'><div id='p_health'></div></div>"
  document.getElementById("enemy").innerHTML = "<div id='e_maxHealth'><div id='e_health'></div></div>"

  // Store Healthbars
  window.playerHealth = document.getElementById("p_health");
  window.enemyHealth = document.getElementById("e_health");

  // Create <img> locations in arena.html
  document.getElementById("player").innerHTML += "<img id='playerEle' alt='playerEle' src=''></img>";
  document.getElementById("enemy").innerHTML += "<img id='enemyEle' alt='enemyEle' src=''></img>";

  // Store images into a variables
  window.playerSprite = document.getElementById("playerEle");
  window.enemySprite = document.getElementById("enemyEle");

  sprite_idle(playerSprite, playerEle.spriteLoc);
  sprite_idle(enemySprite, enemyEle.spriteLoc);

  /*** CSS ***/
  // Variables for positioning
  var Y_POSITION = 190;
  var x_playerPos = 200;
  var x_enemyPos = x_playerPos + 200; // Place the Enemy sprite 200px away from the Player sprite

  // Position Player Elemental
  playerSprite.style.position = "absolute";
  playerSprite.style.top = Y_POSITION + "px";
  playerSprite.style.left = x_playerPos + "px";
 
  // Position Enemy Elemental
  enemySprite.style.position = "absolute";
  enemySprite.style.top = Y_POSITION + "px";
  enemySprite.style.left = x_enemyPos + "px";
  enemySprite.style.transform = "scaleX(-1)"; // Flip the Enemy's Elemental so that it faces the Player's elemental

  // Variables for Healthbars
  let X_POSITION_HEALTH_PLAYER = "8px";
  let X_POSITION_HEALTH_ENEMY = "508px";

  // Stylize Player Healthbar
  style_healthbar("p_maxHealth", "p_health");
  document.getElementById("p_maxHealth").style.left = X_POSITION_HEALTH_PLAYER;
  healthbar("p_health", playerEle);

  // Stylize Enemy Healthbar
  style_healthbar("e_maxHealth", "e_health");
  document.getElementById("e_maxHealth").style.left = X_POSITION_HEALTH_ENEMY;
  healthbar("e_health", enemyEle);

  // Display and stylize VS on screen
  document.getElementById("vs").innerHTML = "VS";
  document.getElementById("vs").style.position = "absolute";

  document.getElementById("vs").style.top = "10px"
  document.getElementById("vs").style.left = "375px"

  document.getElementById("vs").style.fontSize = "50px"
  document.getElementById("vs").style.color = "white";


  log += "You have chosen: " + eleName(playerEle) + "</br>";
  log += "The Enemy has chosen " + eleName(enemyEle) + "</br>";
  log += "</br>";
  printLog();

  if (playerEle.speed > enemyEle.speed) { // Find out who is faster and calculates damage dealth.

    sprite_playerAttack(false); 

    if (checkIfDead(playerEle, enemyEle, playerNumOfAttacks) > 0 
    && playerEle.health + playerEle.heal(enemyEle) - playerEle.damageShieldDmg(enemyEle) > 1) { // If after being attacked the Enemy Elemental is still alive calculate it's counter attack.

      sprite_enemyAttack(false);

      if (checkIfDead(enemyEle, playerEle, 1) + playerEle.heal(enemyEle) - playerEle.damageShieldDmg(enemyEle) < 1) {
        sprite_playerDead();
      }

    } else if (checkIfDead(playerEle, enemyEle, playerNumOfAttacks) < 1) {
      sprite_enemyDead();
    }
  } else if (playerEle.speed === enemyEle.speed)  {
    bothAttack();
  } else {
    sprite_enemyAttack(false);
    if (checkIfDead(enemyEle, playerEle, 1) > 0 && enemyEle.health - enemyEle.damageShieldDmg(playerEle) + enemyEle.heal(playerEle) > 0) { // If after being attacked the Player Elemental is still alive calculate it's counter attack

      sprite_playerAttack(false);
    }
  }
  
  if (playerEle.doubleStrike && enemyEle.doubleStrike) { // Check to see if both Elementals have Double strike and find out who is the faster one and perform a second round of attacks.
    if (playerEle.speed > enemyEle.speed 
      && checkIfDead(enemyEle, playerEle, 1) + playerEle.heal(enemyEle) > 0 
      && checkIfDead(playerEle, enemyEle, 1) + enemyEle.heal(playerEle)> 0) { // Make sure that the Player Elemental is still alive before performing it's second attack.
      
      sprite_playerAttack(true);

      if (checkIfDead(playerEle, enemyEle, 2) > 0) { // Make sure the Enemy Elemental is still alive before performing it's second attack.
    
        sprite_enemyAttack(true);
  
        if (checkIfDead(enemyEle, playerEle, window.enemyNumOfAttacks) < 1) {
          sprite_playerDead();
        }

      } else {
        sprite_enemyDead();
      }
    } else if (playerEle.speed === enemyEle.speed) {
      if (checkIfDead(playerEle, enemyEle, 1) + enemyEle.heal(playerEle) > 0 
      && checkIfDead(enemyEle, playerEle, 1) + playerEle.heal(enemyEle)> 0) {

       bothAttack();
      }

    } else if (checkIfDead(playerEle, enemyEle, 1) + enemyEle.heal(playerEle) > 0 
    && checkIfDead(enemyEle, playerEle, 1) + playerEle.heal(enemyEle) > 0) { // Make sure the Enemy Elemental is still alive before performing it's second attack.

      sprite_enemyAttack(true);
    
      if (checkIfDead(enemyEle, playerEle, 2) > 0) { // Make sure that the Player Elemental is still alive before performing it's second attack.

      sprite_playerAttack(true);

      if (checkIfDead(playerEle, enemyEle, window.playerNumOfAttacks) < 1) {
        sprite_enemyDead();
      }

      } else {
        sprite_playerDead()
      }
    } 
  } else if (playerEle.doubleStrike 
    && checkIfDead(playerEle, enemyEle, 1) + enemyEle.heal(playerEle)> 0 
    && checkIfDead(enemyEle, playerEle, 1) + playerEle.heal(enemyEle)> 0 
    && enemyEle.health - enemyEle.damageShieldDmg(playerEle) + enemyEle.heal(playerEle)> 0
    && playerEle.health - playerEle.damageShieldDmg(enemyEle) + playerEle.heal(enemyEle) > 0
    && checkIfDead(playerEle, enemyEle, 1) - enemyEle.damageShieldDmg(playerEle) + enemyEle.heal(playerEle) > 0 
    && checkIfDead(enemyEle, playerEle, 1) - playerEle.damageShieldDmg(enemyEle) + playerEle.heal(enemyEle) > 0) { // If the Player's Elemental has Double Strike and it's still alive perform a second attack. 

    sprite_playerAttack(true);

    if (checkIfDead(playerEle, enemyEle, 2) < 1) {
      sprite_enemyDead();
    }

  } else if (
    enemyEle.doubleStrike
    && checkIfDead(playerEle, enemyEle, 1) + enemyEle.heal(playerEle)> 0 
    && checkIfDead(enemyEle, playerEle, 1) + playerEle.heal(enemyEle)> 0 
    && enemyEle.health - enemyEle.damageShieldDmg(playerEle) + enemyEle.heal(playerEle)> 0
    && playerEle.health - playerEle.damageShieldDmg(enemyEle) + playerEle.heal(enemyEle) > 0
    && checkIfDead(playerEle, enemyEle, 1) - enemyEle.damageShieldDmg(playerEle) + enemyEle.heal(playerEle) > 0 
    && checkIfDead(enemyEle, playerEle, 1) - playerEle.damageShieldDmg(enemyEle) + playerEle.heal(enemyEle) > 0) { // If the Enemy Elemental has Double Strike and it's still alive perform a second attack.

      sprite_enemyAttack(true);

      if (checkIfDead(enemyEle, playerEle, 2) < 1) {
        sprite_playerDead();
      }
}

  if (playerEle.multiplier(playerEle.eleType, enemyEle.eleType) > 1 && checkIfDead(enemyEle, playerEle, window.enemyNumOfAttacks) > 0) { // If the Player chose an Elemental with a stronger Type than the Enemy and their Elemental is still alive have their ability go off.
    
    timeout += sprite_animate(playerSprite, playerEle.spriteLoc, "victory", playerEle.victoryLength, true);
    

    setTimeout(function() {
      log += "Your " + logAbility(playerEle);
      playerEle.ability(player, enemy);
      log += "</br>";

      doomsday = parseInt(localStorage.getItem("doomsday"));
      if (doomsday < 1) {
        enemy.health = 0;
      }
    }, timeout);

  } else if (playerEle.multiplier(playerEle.eleType, enemyEle.eleType) < 1 && checkIfDead(playerEle, enemyEle, window.playerNumOfAttacks) > 0) { // If the enemy chose an Elemental that is a stronger Type and the Enemy Elemental is still alive have their ability go off instead.

    timeout += sprite_animate(enemySprite, enemyEle.spriteLoc, "victory", enemyEle.victoryLength, true);

    setTimeout(function(){
      log += "Enemy " + logAbility(enemyEle);
      enemyEle.ability(enemy, player);
      log += "</br>"

      doomsday = parseInt(localStorage.getItem("doomsday"));
      if (doomsday < 1) {
        player.health = 0;
      }
  }, timeout);

  } // If it is a tie, ie the multiplier is equal to one, neither ability goes off

  // Ensure healthbars are up to date.
  healthbar("p_health", playerEle);
  healthbar("e_health", enemyEle);

  // Check for deaths.
  setTimeout(function(){
    checkForDeaths("Your", player);
    checkForDeaths("Enemy", enemy);
    printLog();
  }, timeout);

  setTimeout(function() {
    if (player.health < 1 && enemy.health < 1) { // Check to see if the game ends in a tie.
      
        log += "The game has ended in a Tie!"
      
    } else if (enemy.health < 1) { // Check to see if the Player Wins.
      log += "You are VICTORIOUS!!!"
    } else if (player.health < 1) { // Check to see if the Player Loses
      log += "YOU LOSE!!!"
    }
    printLog();
  

    // Lower the buff timer by one for each elemental
    player.buffTimer();
    enemy.buffTimer();
  

    // Store variables
    localStorage.setItem('teotlPlayer', JSON.stringify(player));
    localStorage.setItem('teotlEnemy', JSON.stringify(enemy));

    ready = true; // The player can now return back to pentacle by pressing continue
  }, timeout);
};


function printLog() { // Prints the current log to arena.html
  document.getElementById("log").innerHTML = log;
};

function eleName(ele) { // Returns Elemental type and name (for combat log).
  return ele.getType() + " " + ele.name;
};


function logWeakness() {
  return "the attack was " + weaknessLog + "</br>"
};

function logCombat(player, attackingEle, defendingEle) { // Creates log for combat.
  log += player + " " + eleName(attackingEle) + " is attacking its opponents " + eleName(defendingEle) + " for <font color='red'>" + damage + "</font> damage;</br>";
    log += logWeakness();
    log += extra;
    log += shieldLog;
    log += "</br>"

    // Reset variables
    extra = "";
    damage = "";
    shieldLog = "";
    weaknessLog = "";
};

function logDoubleStrike(ele) { // Returns notification that the Elemental has Double Strike.
  return eleName(ele) + " is invigorated and ready to perform a second attack </br>";
};

function logAbility(ele) {
  return eleName(ele) + " Empowered by it's Victory, ";
};

function done() { // Check to see if combat is done and decide on whether to go back to pentacle or menu depending on whether or not a player has died.
  if (ready) { // If combat is done allow player to exit arena.
    if (player.health > 0 && enemy.health > 0) { // As long as neither player is dead return to pentacle.
      window.location = "pentacle.html";
    } else { // If a player is dead reset localStorage and return to main menu.
      // Reset all localStorage to -1
      localStorage.setItem("teotlPlayer", -1);
      localStorage.setItem("teotlEnemy", -1);
      localStorage.setItem("enemyPick", -1);
      localStorage.setItem("playerPick", -1);

      window.location = "menu.html" // Return to main menu
    }
    
  }
};

function checkForDeaths(prefix, player) { // // Check to see if Player Elemental is dead so that we can damage the Player and Reincarnate the Elemental

  for (let i = 0; i < player.elemental.length; i++) { // Cycle through each Elemental and check if dead.
    let ele = player.elemental[i];

    if (ele.health === 0) { // Check if Elemental is dead

      log += prefix + " " + ele.getType() + "Elemental has died! It's owner sacrifices " + ele.maxHealth + " Health to Reincarnate it.</br></br>";

      player.health -= ele.maxHealth; // Reduce the Player health by the Elementals Max Health
      ele.resetEle(); // Reset the Player's Elemental.
    }
  }
};

function sprite_animate(sprite, loc, action, length, idle) { //  Animates sprite for set period of time
  let INTERVAL = 100; // Interval between frames in miliseconds
  let dur = INTERVAL * (length +1); // Total time of animation.

  for (let i = 1; i < length; i++) {
    setTimeout(function() { sprite.src = `${loc}/${action}/${i}.png` }, (INTERVAL * i) + timeout);
  }

  if (idle) { // Return the sprite to it's idle animation if designated to do so, ie: if the Elemental is not dead.
    setTimeout(function() { sprite_idle(sprite, loc) }, dur + timeout);
  }
  
  return dur;
};

function sprite_playerAttack(doubleStrike) { // Animates the Player's Elemental attacking and the Enemy Elemental's hurt animation then logs the attack.

  window.playerNumOfAttacks++;

  timeout += sprite_animate(playerSprite, playerEle.spriteLoc, "attack", playerEle.attackLength, true);
  timeout += sprite_animate(enemySprite, enemyEle.spriteLoc, "hurt", enemyEle.hurtLength, true);

  setTimeout(function() { // Waits until after the animation to perform attack
    playerEle.attack(enemyEle);

    if (doubleStrike) {
      log += "Your " + logDoubleStrike(playerEle);
    }

    logCombat('Your', playerEle, enemyEle);
    printLog();

    healthbar("p_health", playerEle);
    healthbar("e_health", enemyEle);
  }, timeout);

  if (checkIfDead(playerEle, enemyEle, playerNumOfAttacks) + enemyEle.heal(playerEle) < 1 || checkIfDead(playerEle, enemyEle, enemyNumOfAttacks) - enemyEle.damageShieldDmg(playerEle) + enemyEle.heal(playerEle) < 1) {
    sprite_enemyDead();
  }

  if (playerEle.health - playerEle.damageShieldDmg(enemyEle) + playerEle.heal(enemyEle) < 1) { // Check to see if damage shield kills the player
    sprite_playerDead(); 
  }

  if (playerNumOfAttacks > 1 && (checkIfDead(enemyEle, playerEle, enemyNumOfAttacks) - playerEle.damageShieldDmg(enemyEle) * playerNumOfAttacks) + playerEle.heal(enemyEle) < 1) { // Check to see if damage shield kills the player
    sprite_playerDead(); 
  }


}

function sprite_enemyAttack(doubleStrike) {// Animates the Enemy's Elemental attacking and the Playar Elemental's hurt animation then logs the attack.

  window.enemyNumOfAttacks++;

  timeout += sprite_animate(enemySprite, enemyEle.spriteLoc, "attack", enemyEle.attackLength, true);
  timeout += sprite_animate(playerSprite, playerEle.spriteLoc, "hurt", playerEle.hurtLength, true);

  setTimeout(function() { 
    enemyEle.attack(playerEle);

    if (doubleStrike) {
      log += "Enemy " + logDoubleStrike(enemyEle);
    }

    logCombat("Enemy", enemyEle, playerEle);
    printLog();

    healthbar("p_health", playerEle);
    healthbar("e_health", enemyEle);
  }, timeout);

  if (checkIfDead(enemyEle, playerEle, playerNumOfAttacks) + playerEle.heal(enemyEle) < 1 || checkIfDead(enemyEle, playerEle, enemyNumOfAttacks) - playerEle.damageShieldDmg(enemyEle) + playerEle.heal(enemyEle) < 1) {
    sprite_playerDead();
  }

  if (enemyEle.health - enemyEle.damageShieldDmg(playerEle) + enemyEle.heal(playerEle) < 1) { // Check to see if the enemy has killed itself from Damage Shield damage
    sprite_enemyDead(); 
  }

  if (enemyNumOfAttacks > 1 && (checkIfDead(playerEle, enemyEle, playerNumOfAttacks) - enemyEle.damageShieldDmg(playerEle) * enemyNumOfAttacks) + enemyEle.heal(playerEle) < 1) { // Check to see if enemy has killed itself after a double attack
    sprite_enemyDead()
  }
}

function sprite_idle(sprite, loc) { // Returns sprite to idle animation
  sprite.src = loc + "/idle/idle.png";
};

function sprite_enemyDead() {
  window.timout += sprite_animate(enemySprite, enemyEle.spriteLoc, "die", enemyEle.dieLength, false);

      setTimeout(function() {
        isDead('Enemy', enemyEle);
      }, window.timeout);
}

function sprite_playerDead() {
  window.timout += sprite_animate(playerSprite, playerEle.spriteLoc, "die", playerEle.dieLength, false);

      setTimeout(function() {
        isDead('Player', playerEle);
      }, window.timeout);
}

function bothAttack() {
  window.playerNumOfAttacks++;
  window.enemyNumOfAttacks++;

  sprite_animate(playerSprite, playerEle.spriteLoc, "attack", playerEle.attackLength, true);
  timeout += sprite_animate(enemySprite, enemyEle.spriteLoc, "attack", enemyEle.attackLength, true);

  sprite_animate(playerSprite, playerEle.spriteLoc, "hurt", playerEle.hurtLength, true);
  timeout += sprite_animate(enemySprite, enemyEle.spriteLoc, "hurt", enemyEle.hurtLength, true);

    setTimeout(function() { // Waits until after the animation to perform attack
      playerEle.attack(enemyEle);
      logCombat("Your", playerEle, enemyEle); 

      enemyEle.attack(playerEle)
      logCombat("Enemy", enemyEle, playerEle);

      printLog();

      healthbar("p_health", playerEle);
      healthbar("e_health", enemyEle);
    }, timeout);
    

  if (checkIfDead(playerEle, enemyEle, window.playerNumOfAttacks)  + enemyEle.heal(playerEle) < 1 || enemyEle.health - enemyEle.damageShieldDmg(playerEle) + enemyEle.heal(playerEle) < 1) {
    sprite_enemyDead();
  }

  if (checkIfDead(enemyEle, playerEle, window.enemyNumOfAttacks) + playerEle.heal(enemyEle) < 1 || playerEle.health - playerEle.damageShieldDmg(enemyEle) + playerEle.heal(enemyEle) < 1) {
    sprite_playerDead();
  }

}

function checkIfDead(attacker, defender, num) {
  return defender.health + defender.barrier - (attacker.calculateDmg(defender) * num)
}

function style_healthbar(outer, inner) { // Stylize the healthbars
  let HEALTH_WIDTH = "300px";
  let HEALTH_HEIGHT = "30px";
  let Y_POSITION_HEALTH = "0px";

  document.getElementById(outer).style.position = "absolute";
  document.getElementById(outer).style.width = HEALTH_WIDTH;
  document.getElementById(outer).style.height = HEALTH_HEIGHT;
  document.getElementById(outer).style.backgroundColor = "lightgrey";
  document.getElementById(outer).style.top = Y_POSITION_HEALTH; 

  document.getElementById(inner).style.height = HEALTH_HEIGHT;
  document.getElementById(inner).style.backgroundColor = "red";
  document.getElementById(inner).style.textAlign = "center";
  document.getElementById(inner).style.fontSize = "25px";
}

// For debugging
function isDead(player, ele) { // Log death to console to show why Elemental can not attack.
  console.log(`${player} ${ele.getType()} ${ele.name} is dead and can not perform an attack`);
};