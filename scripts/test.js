import {type} from '../src/enum.js';
import {Player} from '../objects/player.js';

import { AtomicC1, AtomicC2, AtomicC3, AtomicC4 } from '../objects/elementals/atomic.js';
import { EarthC1, EarthC2, EarthC3, EarthC4 } from '../objects/elementals/earth.js';
import { WaterC1, WaterC2, WaterC3, WaterC4 } from '../objects/elementals/Water.js';
import { FireC1, FireC2, FireC3, FireC4 } from '../objects/elementals/fire.js';
import { WindC1, WindC2, WindC3, WindC4 } from '../objects/elementals/wind.js';


export function test_defense() { // Tests Defense and Armor Penetration.
    console.log(`Running test_defense(), ensureing that Defense properly mitigates damage
    with the exception of FireC2's Armor Penetration`);

    let player = new Player(
        new AtomicC2,
        new FireC3,
        new WaterC4,
        new EarthC4,
        new WindC4,
    );

    let enemy = new Player(
        new AtomicC2,
        new FireC2,
        new WaterC1,
        new EarthC2,
        new WindC4,
    ); 


    let playerEle = player.elemental[type.earth];

    let enemyWater = enemy.elemental[type.water];
    let enemyFire = enemy.elemental[type.fire];

    player.listDefense();
    
    enemyWater.attack(player.elemental[0]);
    enemyFire.attack(player.elemental[0]);

    test_ability(playerEle, player, enemy);
    player.listDefense();

    enemyWater.attack(player.elemental[0]);
    enemyFire.attack(player.elemental[0]);
}

export function test_barrier() { // Tests Barrier and Armor Penetration.
    console.log(`Running test_barrier() ensuring Barrier properly mitigates damage
    with the exception of FireC2's Armor Penetration`);

    let player = new Player(
        new AtomicC2,
        new FireC3,
        new WaterC2,
        new EarthC4,
        new WindC4,
    );

    let enemy = new Player(
        new AtomicC2,
        new FireC2,
        new WaterC1,
        new EarthC2,
        new WindC4,
    ); 


    let playerEle = player.elemental[type.water];
    let ele = player.elemental[type.wind];
    let ele2 = player.elemental[type.earth];

    player.listBarrier();

    enemy.elemental[type.fire].attack(ele);
    enemy.elemental[type.wind].attack(ele2);

    test_ability(playerEle, player, enemy);

    player.listBarrier();
    player.listHealth();
    
    enemy.elemental[type.fire].attack(ele);
    enemy.elemental[type.wind].attack(ele2);

    player.listBarrier();
    player.listHealth();
}

export function test_lifeLeech() { // Tests Life Leech ability.
    console.log(`Running test_lifeLeech() ensuring Elemental WindC2 properly heals itself`);

    let player = new Player(
        new AtomicC2,
        new FireC3,
        new WaterC2,
        new EarthC4,
        new WindC2,
    );

    let enemy = new Player(
        new AtomicC2,
        new FireC2,
        new WaterC1,
        new EarthC1,
        new WindC4,
    ); 

    let playerEle = player.elemental[type.wind];
    let enemyEle = enemy.elemental[type.earth];

    playerEle.logHealth();

    enemy.elemental[type.fire].attack(playerEle);

    playerEle.logHealth();

    playerEle.attack(enemyEle);

    playerEle.logHealth();
}

export function test_intelligence() { // Tests Intelligence's affect on other abilities such as Direct Damage.
    console.log(`Running test_intelligence() ensuring Intelligence properly increases the strength of abilities`);

    let player = new Player(
        new AtomicC2,
        new FireC1,
        new WaterC2,
        new EarthC4,
        new WindC3,
    );

    let enemy = new Player(
        new AtomicC2,
        new FireC2,
        new WaterC1,
        new EarthC1,
        new WindC4,
    ); 

    let playerEle = player.elemental[type.wind];
    let ele = player.elemental[type.fire];
    
    console.log(`Player health ${player.health}`);

    test_ability(ele, player, enemy);

    test_ability(playerEle, player, enemy);

    test_ability(ele, player, enemy);

    test_ability(playerEle, player, enemy);

    test_ability(ele, player, enemy);

    test_ability(playerEle, player, enemy);

    test_ability(ele, player, enemy);
}

export function test_damageShield() { // Tests Damage Shield by imitating an ineraction between FireC1 and EarthC2 after FireC3 buffs EarthC2.
    console.log(`Running test_damageShield(), ensureing that Damage Shield works propely`);

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
        new EarthC2,
        new WindC4,
    ); 

    let earthEle = player.elemental[type.earth];
    let fireEle = player.elemental[type.fire]
    let enemyEle = enemy.elemental[type.fire];

    player.listDamageShield();
    test_ability(fireEle, player, enemy);
    player.listDamageShield();

    enemyEle.logHealth();
    enemyEle.attack(earthEle);
    enemyEle.logHealth();


    earthEle.attack(enemyEle);
    enemyEle.logHealth();

    enemy.elemental[type.water].attack(earthEle);
}

    


/*********************
****** Internal ******
****** Functions *****
*********************/

function test_ability(elemental, player, enemy) {
    console.log(`
        Testing ${elemental.getType()} ${elemental.name} ability`);
    elemental.ability(player, enemy);
}
