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
		this._baseStrength = 25;
		this._baseConstitution = 25;
		this._baseInteligence = 5;
		this._baseAgility = 30;

		// Secondary Stats
		this.health = this.maxHealth;

		this.doubleStrike = true; // In place of ability; Hit the enemy's Elemental twice, once after the opponent has gone.
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
		this._baseStrength = 20;
		this._baseConstitution = 20;
		this._baseInteligence = 5;
		this._baseAgility = 15;

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

	attack(enemy) { // Life Leech
		// In place of Ability; attacks from Elemental Heal itself.
		enemy.attack.call(this, enemy);

		let heal = (this.calculateDmg(enemy)  - enemy.defense) * (this.abilityMod + 2);

		console.log(`Healing self with Life Leech for ${heal}`);
		this.health += heal;
	}
}

export class WindC3 extends Wind {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
		super();
		this._name = "C3";

		// Main Stats
		this._baseStrength = 20;
		this._baseConstitution = 22;
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

	ability(player, enemy) { // Clarity: Increases the Intelligence of all ally Elementals.
		let buff = Math.round(this.inteligence * this.abilityMod);

		console.log(`${this.getType()} buffing all ally Elementals Inteligence by: ${buff}`);
		for (let i = 0; i < player.elemental.length; i++) {
			player.elemental[i].inteligence = buff;
		}
	}
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
	ability(player, enemy) { // Haste: Increases the agility of all allied Elementals
	}
}