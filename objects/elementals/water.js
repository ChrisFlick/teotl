import {type, stat} from '../../src/enum.js';
import {Elemental} from './elemental.js';

export class Water extends Elemental {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
        super();
		this._type = type.water;
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

		console.log(`${this.getType()} Healing all allies for ${heal}`);
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
		this._baseStrength = 20;
		this._baseConstitution = 20;
		this._baseInteligence = 15;
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

	ability(player, enemy) { // Water Barrier
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

	ability(player, enemy) { // Sacred Oath
		// Heals the player.
		let heal = Math.round(this.constitution + (this.constitution * this.abilityMod));

		console.log(`${this.getType} Healing it's Player for ${heal}.`);

		player.health += heal;

		if (player.health > player.maxHealth) { // Ensure the player isn't healed past Max Health.
			player.health = player.maxHealth;
		}
	}
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

	ability(player, enemy) { // Clarity: Increases the Intelligence of all ally Elementals.
		let buff = Math.round(this.inteligence * this.abilityMod);

		console.log(`${this.getType()} buffing all ally Elementals Inteligence by: ${buff}`);
		for (let i = 0; i < player.elemental.length; i++) {
			player.elemental[i].inteligence = buff;
			player.elemental[i].buffTime[stat.inteligence] = 1;
		}
	}
}