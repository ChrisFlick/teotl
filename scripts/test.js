import {type} from '../src/enum.js';
import {Player} from '../objects/player.js';

import { AtomicC1, AtomicC2, AtomicC3, AtomicC4 } from '../objects/elementals/atomic.js';
import { EarthC1, EarthC2, EarthC3, EarthC4 } from '../objects/elementals/earth.js';
import { WaterC1, WaterC2, WaterC3, WaterC4 } from '../objects/elementals/Water.js';
import { FireC1, FireC2, FireC3, FireC4 } from '../objects/elementals/fire.js';
import { WindC1, WindC2, WindC3, WindC4 } from '../objects/elementals/wind.js';

/*********************
******* Atomic *******
*********************/

export function test_abilityAtomicC1(player, enemy) {
    var ele;

    for (let i = 0; i < enemy.elemental.length; i++) {
        ele = enemy.elemental[i]
    console.log(`
        ${ele.getType()} strength: ${ele.strength}`);
    }

    let test = type.atomic;
    ele = player.elemental[test];

    console.log(`Testing ${ele.getType()} ${ele.name} ability`);
    player.elemental[test].ability(player, enemy);

    for (let i = 0; i < enemy.elemental.length; i++) {
        ele = enemy.elemental[i]
    console.log(`
        ${ele.getType()} strength: ${ele.strength}`);
    }
}

export function test_abilityAtomicC2(player, enemy) {
    var ele;

    for (let i = 0; i < enemy.elemental.length; i++) {
        ele = enemy.elemental[i]
    console.log(`
        ${ele.getType()} health: ${ele.health}`);
    }

    let test = type.atomic;
    ele = player.elemental[test];

    console.log(`Testing ${ele.getType()} ${ele.name} ability`);
    player.elemental[test].ability(player, enemy);

    for (let i = 0; i < enemy.elemental.length; i++) {
        ele = enemy.elemental[i]
    console.log(`
        ${ele.getType()} health: ${ele.health}`);
    }
}

export function test_abilityAtomicC3(player, enemy) {
    var ele;

    for (let i = 0; i < enemy.elemental.length; i++) {
        ele = enemy.elemental[i]
    console.log(`
        ${ele.getType()} Agility: ${ele.agility}`);
    }

    let test = type.atomic;
    ele = player.elemental[test];

    console.log(`Testing ${ele.getType()} ${ele.name} ability`);
    player.elemental[test].ability(player, enemy);

    for (let i = 0; i < enemy.elemental.length; i++) {
        ele = enemy.elemental[i]
    console.log(`
        ${ele.getType()} Agility: ${ele.agility}`);
    }
}

export function test_abilityAtomicC4(player, enemy) {
    var ele;

    for (let i = 0; i < enemy.elemental.length; i++) {
        ele = enemy.elemental[i]
    console.log(`
        ${ele.getType()} Defense: ${ele.defense}`);
    }

    let test = type.atomic;
    ele = player.elemental[test];

    console.log(`Testing ${ele.getType()} ${ele.name} ability`);
    player.elemental[test].ability(player, enemy);

    for (let i = 0; i < enemy.elemental.length; i++) {
        ele = enemy.elemental[i]
    console.log(`
        ${ele.getType()} Defense: ${ele.defense}`);
    }
}


/*********************
******* Fire *********
*********************/

export function test_abilityFireC1(player, enemy) {
    var player = new Player(
        new AtomicC2,
        new FireC1,
        new WaterC1,
        new EarthC4,
        new WindC4,
    );

    var enemy = new Player(
        new AtomicC2,
        new FireC1,
        new WaterC1,
        new EarthC4,
        new WindC4,
    ); 

    var ele;

    console.log(`Enemy Health: ${enemy.health}`);
    let test = type.fire;
    ele = player.elemental[test];
    ele.ability(player, enemy);
    console.log(`Enemy Health: ${enemy.health}`);
}

export function test_abilityFireC3(player, enemy) {
    var ele;

    for (let i = 0; i < player.elemental.length; i++) {
        ele = player.elemental[i]
    console.log(`
        ${ele.getType()} Damage Shield: ${ele.damageShield}`);
    }

    let test = type.fire;
    ele = player.elemental[test];

    console.log(`Testing ${ele.getType()} ${ele.name} ability`);
    player.elemental[test].ability(player, enemy);

    for (let i = 0; i < player.elemental.length; i++) {
        ele = player.elemental[i]
    console.log(`
        ${ele.getType()} Damage Shield: ${ele.damageShield}`);
    }
}

/*********************
******* Water ********
*********************/

export function test_abilityWaterC1() {
    var player = new Player(
        new AtomicC2,
        new FireC3,
        new WaterC1,
        new EarthC4,
        new WindC4,
    );

var enemy = new Player(
        new AtomicC2,
        new FireC1,
        new WaterC1,
        new EarthC4,
        new WindC4,
    ); 


    var ele;

    console.log(`Starting Health:`);
    for (let i = 0; i < player.elemental.length; i++) {
        ele = player.elemental[i]
    console.log(`
        ${ele.getType()} health: ${ele.health}`);
    }
    console.log(``);

    let test = type.atomic;
    ele = enemy.elemental[test];

    console.log(`Testing ${ele.getType()} ${ele.name} ability`);
    ele.ability(enemy, player);

    for (let i = 0; i < player.elemental.length; i++) {
        ele = player.elemental[i]
    console.log(`
        ${ele.getType()} health: ${ele.health}`);
    }
    console.log(``);

    test = type.water;
    ele = player.elemental[test];

    console.log(`Testing ${ele.getType()} ${ele.name} ability`);
    ele.ability(player, enemy);

    for (let i = 0; i < player.elemental.length; i++) {
        ele = player.elemental[i]
    console.log(`
        ${ele.getType()} health: ${ele.health}`);
    }
    console.log(``);
    

}

export function test_abilityWaterC2() {
    let player = new Player(
        new AtomicC2,
        new FireC3,
        new WaterC2,
        new EarthC4,
        new WindC4,
    );

    var enemy = new Player(
        new AtomicC2,
        new FireC1,
        new WaterC1,
        new EarthC4,
        new WindC4,
    ); 

    let playerEle = player.elemental[type.water];
    let enemyEle =  enemy.elemental[type.fire];

    

    for (let i = 0; i < player.elemental.length; i++) {
        let ele = player.elemental[i]
    console.log(`
        ${ele.getType()} Barrier: ${playerEle.barrier}`);
    }
    console.log(``);

    playerEle.ability(player, enemy);

    console.log(`
        ${playerEle.getType()} 
        Barrier: ${playerEle.barrier}
        Health: ${playerEle.health}
    `);

    for (let i = 0; i < player.elemental.length; i++) {
        let ele = player.elemental[i]
    console.log(`
        ${ele.getType()} Barrier: ${ele.barrier}`);
    }
    console.log(``);

    enemyEle.attack(playerEle);

    console.log(`
        ${playerEle.getType()} 
        Barrier: ${playerEle.barrier}
        Health: ${playerEle.health}
    `);
}

export function test_abilityWaterC4() {
    let player = new Player(
        new AtomicC2,
        new FireC3,
        new WaterC4,
        new EarthC4,
        new WindC4,
    );

    let enemy = new Player(
        new AtomicC2,
        new FireC1,
        new WaterC1,
        new EarthC4,
        new WindC4,
    ); 

    let enemyEle =  enemy.elemental[type.fire];
    let playerEle = player.elemental[type.water];

    console.log(`Player health: ${player.health}`);

    console.log(`Testing ${enemyEle.getType()} ${enemyEle.name} ability`);
    enemyEle.ability(enemy, player);

    console.log(`Player health: ${player.health}`);

    console.log(`Testing ${playerEle.getType()} ${playerEle.name} ability`);
    playerEle.ability(player, enemy);
    console.log(`Player health: ${player.health}`);

    console.log(`Testing ${playerEle.getType()} ${playerEle.name} ability`);
    playerEle.ability(player, enemy);
    console.log(`Player health: ${player.health}`);
}

/*********************
****** Earth *********
*********************/

export function test_abilityEarthC2() {
    let player = new Player(
        new AtomicC2,
        new FireC3,
        new WaterC4,
        new EarthC2,
        new WindC4,
    );

    let enemy = new Player(
        new AtomicC2,
        new FireC1,
        new WaterC1,
        new EarthC4,
        new WindC4,
    ); 

    let enemyEle =  enemy.elemental[type.fire];
    let playerEle = player.elemental[type.earth];
    let ele = player.elemental[type.fire];

    console.log(`${playerEle.health}`);

    console.log(`
        ${playerEle.getType()} ${playerEle.name} Damage Shield: ${playerEle.damageShield}
    `);

    console.log(`Testing ${ele.getType()} ${ele.name} ability to see if it stacks with Earths damage shield`);
    ele.ability(player, enemy);

    console.log(`
        ${playerEle.getType()} ${playerEle.name} Damage Shield: ${playerEle.damageShield}

        ${enemyEle.getType()} ${enemyEle.name} Health: ${enemyEle.health}
    `);

    console.log(`Testing ${playerEle.getType()} ${playerEle.name} ability to ensure it damages attacker`);

    enemyEle.attack(playerEle);

    console.log(`
        ${enemyEle.getType()} ${enemyEle.name} Health: ${enemyEle.health}
    `)
}

/*export function test_abilityEarthC2() {
    let player = new Player(
        new AtomicC2,
        new FireC3,
        new WaterC4,
        new EarthC3,
        new WindC4,
    );

    let enemy = new Player(
        new AtomicC2,
        new FireC3,
        new WaterC1,
        new EarthC2,
        new WindC4,
    ); 

    let enemyEle =  enemy.elemental[type.fire];
    let playerEle = player.elemental[type.earth];
    let ele;  

    for (let i = 0; i < enemy.elemental.length; i++) {
        ele = enemy.elemental[i]
    console.log(`
        ${ele.getType()} Damage Shield : ${ele.damageShield}`);
    }
    console.log(``);

    console.log(`Testing ${playerEle.getType()} ${playerEle.name} ability`);
    playerEle.ability(player, enemy);

    for (let i = 0; i < enemy.elemental.length; i++) {
        ele = enemy.elemental[i]
    console.log(`
        ${ele.getType()} Damage Shield : ${ele.damageShield}`);
    }
    console.log(``);

    console.log(`Testing ${enemyEle.getType()} ${enemyEle.name} ability`);
    enemyEle.ability(enemy, player);

    for (let i = 0; i < enemy.elemental.length; i++) {
        ele = enemy.elemental[i]
    console.log(`
        ${ele.getType()} Damage Shield : ${ele.damageShield}`);
    }
    console.log(``);
}

export function test_abilityEarthC3() {
    let player = new Player(
        new AtomicC2,
        new FireC3,
        new WaterC4,
        new EarthC4,
        new WindC4,
    );

    let enemy = new Player(
        new AtomicC2,
        new FireC3,
        new WaterC1,
        new EarthC2,
        new WindC4,
    ); 

    let enemyEle =  enemy.elemental[type.fire];
    let playerEle = player.elemental[type.earth];
    let ele;  

    for (let i = 0; i < enemy.elemental.length; i++) {
        ele = enemy.elemental[i]
    console.log(`
        ${ele.getType()} Damage Shield : ${ele.damageShield}`);
    }
    console.log(``);

    console.log(`Testing ${playerEle.getType()} ${playerEle.name} ability`);
    playerEle.ability(player, enemy);
}*/

export function test_abilityEarthC4() {
    let player = new Player(
        new AtomicC2,
        new FireC3,
        new WaterC4,
        new EarthC4,
        new WindC4,
    );

    let enemy = new Player(
        new AtomicC2,
        new FireC3,
        new WaterC1,
        new EarthC2,
        new WindC4,
    ); 


    let playerEle = player.elemental[type.earth];
    let ele;

    player.listDefense();

    test_ability(playerEle, player, enemy);
    

    player.listDefense();
}


/*********************
****** Internal ******
****** Functions *****
*********************/

function test_ability(elemental, player, enemy) {
    console.log(`Testing ${elemental.getType()} ${elemental.name} ability`);
    elemental.ability(player, enemy);
}
