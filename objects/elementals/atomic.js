import {type, stat} from '../../src/enum.js';
import { Elemental } from './elemental.js';

export class Atomic extends Elemental {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._type = type.atomic;
		this._shieldType = this.type;
	}

	/*********************
	****** Getters *******
	*********************/

	/*********************
	****** Setters *******
	*********************/

	/*********************
	****** Methods *******
	*********************/
}

export class AtomicC1 extends Atomic {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C1";

		// Main Stats
		this._baseStrength = 33;
		this._baseConstitution = 22;
		this._baseInteligence = 38;
		this._baseAgility = 11;	

		// Secondary Stats
		this.health = this.maxHealth;
	}

	/*********************
	****** Getters *******
	*********************/

	/*********************
	****** Setters *******
	*********************/

	/*********************
	****** Methods *******
	*********************/

	
}

export class AtomicC2 extends Atomic {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C2";

		// Main Stats
		this._baseStrength = 28;
		this._baseConstitution = 22;
		this._baseInteligence = 24;
		this._baseAgility = 11;

		// Secondary Stats
		this.health = this.maxHealth;
	
	}

	/*********************
	****** Getters *******
	*********************/

	/*********************
	****** Setters *******
	*********************/

	/*********************
	****** Methods *******
	*********************/

	ability(player, enemy) { // Hydrogen Blast
		// Does dmg ammount of Damage to each enemy Elemental.
		let dmg = Math.round((this.strength * .25) * this.abilityMod);

		console.log(`Inflicting ${dmg} to all enemy Elementals`);
		for (let i = 0; i < enemy.elemental.length; i++) {
			enemy.elemental[i].health -= dmg;
		}
	}
}

export class AtomicC3 extends Atomic {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super()
		this._name = "C3";

		// Main Stats
		this._baseStrength = 23;
		this._baseConstitution = 27;
		this._baseInteligence = 14;
		this._baseAgility = 21;	

		// Secondary Stats
		this.health = this.maxHealth;
	}

	/*********************
	****** Getters *******
	*********************/

	/*********************
	****** Setters *******
	*********************/

	/*********************
	****** Methods *******
	*********************/

	ability(player, enemy) { // Radiation Shield
		// Increases the Damage Shield of every friendly elemental.
		let buff = Math.round((this.strength * 0.5) * this.abilityMod);
		console.log(`Buffing ally Damage Shield by ${buff}`);
		for (let i = 0; i < player.elemental.length; i++) {
			player.elemental[i].damageShield = buff;
			player.elemental[i]._shieldType = this.type;
			player.elemental[i].buffTime[stat.damageShield] = 1;
		}
	}
}


export class AtomicC4 extends Atomic {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super()
		this._name = "C4";

		// Main Stats
		this._baseStrength = 23;
		this._baseConstitution = 32;
		this._baseInteligence = 14;
		this._baseAgility = 16;

		// Secondary Stats
		this.health = this.maxHealth;
	}

	/*********************
	****** Getters *******
	*********************/

	/*********************
	****** Setters *******
	*********************/

	/*********************
	****** Methods *******
	*********************/

	ability(player, enemy) { // Radiation (Defense)
		// Lowers the Defense of every Enemy Elemental.
		let deBuff = Math.round((this.strength * 0.1) * this.abilityMod);

		console.log(`Debuffing all enemy Elementals Defense by ${deBuff}.`);
		for (let i = 0; i < enemy.elemental.length; i++) {
			enemy.elemental[i].defense = -deBuff;
			player.elemental[i].buffTime[stat.defense] = 1;
		}
	}
}