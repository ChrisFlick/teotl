import {type} from '../../src/enum.js';
import {Elemental} from './elemental.js';

export class Earth extends Elemental {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
        super();
        this._type = type.earth;
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

export class EarthC1 extends Earth {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C1";

		// Main Stats
		this._baseStrength = 30;
		this._baseConstitution = 26;
		this._baseInteligence = 7;
		this._baseAgility = 2;

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

export class EarthC2 extends Earth {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C2";

		// Main Stats
		this._baseStrength = 25;
		this._baseConstitution = 41;
		this._baseInteligence = 5;
		this._baseAgility = 2;

		// Secondary Stats
		this.health = this.maxHealth;
		this._baseDamageShield = this._baseConstitution * this.abilityMod;	// Has Damage Shield instead of ability "Thorns"
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

export class EarthC3 extends Earth {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C3";

		this.health = this.maxHealth;

		// Main Stats
		this._baseStrength = 25;
		this._baseConstitution = 33;
		this._baseInteligence = 10;
		this._baseAgility = 9;

		
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

	ability(player, enemy) { // Mud Sling
		// Decreases the Damage Shield of all enemy Elementals
		let deBuff = - Math.round(this.strength * this.abilityMod);
		for (let i = 0; i < enemy.elemental.length; i++) {
			enemy.elemental[i].damageShield = deBuff;
		}
	}
}

export class EarthC4 extends Earth {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C4";

		this.health = this.maxHealth;

		// Main Stats
		this._baseStrength = 25;
		this._baseConstitution = 33;
		this._baseInteligence = 15;
		this._baseAgility = 4;

		
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

	ability(player, enemy) {
		let buff = Math.round((this.constitution * 0.2) * this.abilityMod);	
		
		console.log(`${this.getType()} buffing all of it's allies Defense by ${buff}.`)

		for (let i = 0; i < player.elemental.length; i++) {
			player.elemental[i].defense = buff;
		}
	}
}