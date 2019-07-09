import {type, stat} from '../../src/enum.js';
import {Elemental} from './elemental.js';

export class Earth extends Elemental {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
        super();
		this._type = type.earth;
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
		this._baseIntelligence = 7;
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
		this._baseIntelligence = 5;
		this._baseAgility = 2;

		// Secondary Stats
		this.health = this.maxHealth;
		this._baseDamageShield = this._baseConstitution * this.abilityMod;	// Has Damage Shield instead of ability
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

		// Main Stats
		this._baseStrength = 25;
		this._baseConstitution = 33;
		this._baseIntelligence = 10;
		this._baseAgility = 9;

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

	ability(player, enemy) { // Thorns
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

export class EarthC4 extends Earth {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C4";		

		// Main Stats
		this._baseStrength = 25;
		this._baseConstitution = 33;
		this._baseIntelligence = 15;
		this._baseAgility = 4;

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

	ability(player, enemy) {
		let buff = Math.round((this.constitution * 0.2) * this.abilityMod);	
		
		console.log(`${this.getType()} buffing all of it's allies Defense by ${buff}.`)

		for (let i = 0; i < player.elemental.length; i++) {
			player.elemental[i].defense = buff;
			player.elemental[i].buffTime[stat.defense] = 1;
		}
	}
}