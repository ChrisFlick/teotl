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

		this._baseStrength = 22;
		this._baseConstitution = 35;
		this._baseInteligence = 5;
		this._baseAgility = 8;

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
		let heal = Math.round(this.constitution + (this.constitution * this.abilityMod));
		//console.log(heal);

		for (let i = 0; i < player.elemental.length; i++) {
			player.elemental[i].health += heal;

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

		this._baseStrength = 30;
		this._baseConstitution = 20;
		this._baseInteligence = 5;
		this._baseAgility = 25;

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

		this._baseStrength = 25;
		this._baseConstitution = 27;
		this._baseInteligence = 10;
		this._baseAgility = 18;

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
		let heal = Math.round(this.constitution + (this.constitution * this.abilityMod));

		player.health += heal;
	}
}