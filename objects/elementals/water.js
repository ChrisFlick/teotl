import {type} from '../../src/enum.js';
import {Elemental} from './elemental.js';

export class Water extends Elemental {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
        super();
        this._type = type.water;
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

export class WaterC1 extends Water {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C1";

		// Main Stats
		this._baseStrength = 22;
		this._baseConstitution = 35;
		this._baseInteligence = 5;
		this._baseAgility = 8;

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

	ability(player, enemy) { // Heal Wounds
		// Heals every friendly Elemental.
		let heal = Math.round(this.constitution + (this.constitution * this.abilityMod));

		for (let i = 0; i < player.elemental.length; i++) {
			player.elemental[i].health += heal;

			// Ensures Elementals are not healed above their Max Health
			if (player.elemental[i].health > player.elemental[i].maxHealth) {
				player.elemental[i].health = player.elemental[i].maxHealth;
			}
		}
	}
}

export class WaterC2 extends Water {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C2";

		// Main Stats
		this._baseStrength = 30;
		this._baseConstitution = 20;
		this._baseInteligence = 5;
		this._baseAgility = 25;

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

	ability(player, enemy) { // Sacred Barrier
		// Gives each friendly Elemental a Barrier that mitigates Damage until it is exausted
		let heal = Math.round(this.constitution + (this.constitution * this.abilityMod));

		for (let i = 0; i < player.elemental.length; i++) {
			player.elemental[i].barrier = heal;
		}
	}
}

export class WaterC3 extends Water {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C3";

		// Main Stats
		this._baseStrength = 25;
		this._baseConstitution = 27;
		this._baseInteligence = 10;
		this._baseAgility = 18;	

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

export class WaterC4 extends Water {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
        super();
        this._name = "C4";

		this._baseStrength = 25;
		this._baseConstitution = 22;
		this._baseInteligence = 15;
		this._baseAgility = 18;

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

	ability(player, enemy) { // Sacred Oath
		// Heals the player.
		let heal = Math.round(this.constitution + (this.constitution * this.abilityMod));

		player.health += heal;

		if (player.health > player.maxHealth) { // Ensure the player isn't healed past Max Health.
			player.health = player.maxHealth;
		}
	}
}