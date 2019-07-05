import {type, stat} from '../../src/enum.js';
import {Elemental} from './elemental.js';

export class Wind extends Elemental {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
        super();
		this._type = type.wind;
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
		this._baseConstitution = 20;
		this._baseInteligence = 12;
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

	ability(player, enemy) { // Vortex
		// Increases the Damage Shield of every friendly elemental.
		let buff = Math.round((this.strength * 0.7) * this.abilityMod);
		console.log(`Buffing ally Damage Shield by ${buff}`);
		for (let i = 0; i < player.elemental.length; i++) {
			player.elemental[i].damageShield = buff;
			player.elemental[i]._shieldType = this.type;
			player.elemental[i].buffTime[stat.damageShield] = 1;
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
	ability(player, enemy) { // Haste
		let buff = Math.round((this.agility * 0.1) * this.abilityMod);
		for (let i = 0; i < player.elemental.length; i++) {
			player.elemental[i].strength = buff;
			player.elemental[i].buffTime[stat.agility] = 1;
		}
	}
}