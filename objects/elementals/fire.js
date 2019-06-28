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

		this._baseStrength = 45;
		this._baseConstitution = 18;
		this._baseInteligence = 5;
		this._baseAgility = 12;

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

export class FireC2 extends Fire {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();

		this._name = "C2";

		this._baseStrength = 40;
		this._baseConstitution = 18;
		this._baseInteligence = 5;
		this._baseAgility = 17;

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

export class FireC3 extends Fire {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();

		this._name = "C3";

		this._baseStrength = 32;
		this._baseConstitution = 28;
		this._baseInteligence = 10;
		this._baseAgility = 10;

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

export class FireC4 extends Fire {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();

		this._name = "C4";
		
		this._baseStrength = 32;
		this._baseConstitution = 23;
		this._baseInteligence = 15;
		this._baseAgility = 10;

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