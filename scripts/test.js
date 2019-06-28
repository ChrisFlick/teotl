import {type} from '../src/enum.js';

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