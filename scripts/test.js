import {type} from '../src/enum.js';
import {Player} from '../objects/player.js';

import { AtomicC1, AtomicC2, AtomicC3, AtomicC4 } from '../objects/elementals/atomic.js';
import { EarthC1, EarthC2, EarthC3, EarthC4 } from '../objects/elementals/earth.js';
import { WaterC1, WaterC2, WaterC3, WaterC4 } from '../objects/elementals/Water.js';
import { FireC1, FireC2, FireC3, FireC4 } from '../objects/elementals/fire.js';
import { WindC1, WindC2, WindC3, WindC4 } from '../objects/elementals/wind.js';


export function test_defense() {
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


/*********************
****** Internal ******
****** Functions *****
*********************/

function test_ability(elemental, player, enemy) {
    console.log(`
        Testing ${elemental.getType()} ${elemental.name} ability`);
    elemental.ability(player, enemy);
}
