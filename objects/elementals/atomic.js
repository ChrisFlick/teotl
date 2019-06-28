import {type} from '../../src/enum.js';
import { Elemental } from './elemental.js';

export class Atomic extends Elemental {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._type = type.atomic;	
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

		this._baseStrength = 33;
		this._baseConstitution = 22;
		this._baseInteligence = 38;
		this._baseAgility = 11;	

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

	ability(player, enemy) { // Radiation (Damage)
		let deBuff = Math.round((this.strength * 0.1) * this.abilityMod);
		for (let i = 0; i < enemy.elemental.length; i++) {
			enemy.elemental[i].strength = -deBuff;
		}
	}
}

export class AtomicC2 extends Atomic {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C2";

		this._baseStrength = 28;
		this._baseConstitution = 22;
		this._baseInteligence = 24;
		this._baseAgility = 11;

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

		this._baseStrength = 23;
		this._baseConstitution = 27;
		this._baseInteligence = 14;
		this._baseAgility = 21;

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

	ability(player, enemy) { // Radiation (Agility)
		let deBuff = Math.round((this.strength * 0.1) * this.abilityMod);
		for (let i = 0; i < enemy.elemental.length; i++) {
			enemy.elemental[i].agility = -deBuff;
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

		this._baseStrength = 23;
		this._baseConstitution = 32;
		this._baseInteligence = 14;
		this._baseAgility = 16;

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
		let deBuff = Math.round((this.strength * 0.1) * this.abilityMod);
		for (let i = 0; i < enemy.elemental.length; i++) {
			enemy.elemental[i].defense = -deBuff;
		}
	}
}