import {type} from '../../src/enum.js';
import {Elemental} from './elemental.js';

export class Wind extends Elemental {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
        super();
        this._type = type.wind;
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

export class WindC1 extends Wind {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C1";

		// Main Stats
		this._baseStrength = 35;
		this._baseConstitution = 20;
		this._baseInteligence = 5;
		this._baseAgility = 20;

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

export class WindC2 extends Wind {
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
}

export class WindC3 extends Wind {
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

export class WindC4 extends Wind {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
        super();
		this._name = "C4";
		
		// Main Stats
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
}