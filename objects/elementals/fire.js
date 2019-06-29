import {type} from '../../src/enum.js';
import {Elemental} from './elemental.js';

export class Fire extends Elemental {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
        super();
        this._type = type.fire;
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

export class FireC1 extends Fire {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C1";

		// Main Stats
		this._baseStrength = 40;
		this._baseConstitution = 15;
		this._baseInteligence = 5;
		this._baseAgility = 7;

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

	ability(player, enemy) { // Direct Damage
		let dmg = Math.round(this.strength + (this.abilityMod * this.strength));
		enemy.health -= dmg;
	}
}

export class FireC2 extends Fire {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C2";

		// Main Stats
		this._baseStrength = 40;
		this._baseConstitution = 18;
		this._baseInteligence = 5;
		this._baseAgility = 17;

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

	calculateDmg(enemy) { // Armor Penetration
		// Instead of an Ability FireC2 gets a modified calculateDmg allowing it to ignore Defense and Barriers.
        return Math.round(this.damage * this.multiplier(enemy));
    }
}

export class FireC3 extends Fire {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C3";

		// Main Stats
		this._baseStrength = 32;
		this._baseConstitution = 25;
		this._baseInteligence = 10;
		this._baseAgility = 5;

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

	ability(player, enemy) { // Shield of Flames
		// Increases the Damage Shield of every friendly elemental.
		let buff = Math.round((this.strength * 0.25) * this.abilityMod);
		for (let i = 0; i < player.elemental.length; i++) {
			player.elemental[i].damageShield = buff;
		}
	}
}

export class FireC4 extends Fire {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C4";


		// Main Stats
		this._baseStrength = 32;
		this._baseConstitution = 20;
		this._baseInteligence = 15;
		this._baseAgility = 5;

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

	ability(player, enemy) { // Sacred Flame
		// Increases the strength of each friendly Elemental by buff.
		let buff = Math.round((this.strength * 0.1) * this.abilityMod);
		for (let i = 0; i < player.elemental.length; i++) {
			player.elemental[i].strength = buff;
		}
	}
}