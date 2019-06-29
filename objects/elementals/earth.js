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

		this._baseStrength = 30;
		this._baseConstitution = 26;
		this._baseInteligence = 7;
		this._baseAgility = 2;

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

		this._baseStrength = 25;
		this._baseConstitution = 41;
		this._baseInteligence = 5;
		this._baseAgility = 2;

		// Has Damage Shield instead of ability "Thorns"
		this._baseDamageShield = this._baseConstitution * this.abilityMod;

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

export class EarthC3 extends Earth {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();

		this._name = "C3";

		this._baseStrength = 25;
		this._baseConstitution = 33;
		this._baseInteligence = 10;
		this._baseAgility = 9;

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

export class EarthC4 extends Earth {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();

		this._name = "C4";

		this._baseStrength = 25;
		this._baseConstitution = 33;
		this._baseInteligence = 15;
		this._baseAgility = 4;

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