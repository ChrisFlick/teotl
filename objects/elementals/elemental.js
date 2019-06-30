import {type} from '../../src/enum.js';

export class Elemental {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
        // Main Stat buffs
        this._strengthBuff = 0;
        this._baseConstitutionBuff = 0;
        this._inteligenceBuff = 0;
        this._agilityBuff = 0;

        // Secondary stats
        this._health = 0;
        this._baseDamageShield = 0;
        this._barrier = 0;

        // Secondary stat buffs
        this._defenseBuff = 0;
        this._damageShieldBuff = 0;
	}

	/*********************
	****** Getters *******
	*********************/

    get name() { // Name of Elemental
        return this._name;
    }

    get type() { // Elementals type
        return this._type;
    }

    // stats

    get strength() { // Used in Damage calculations
        return this._baseStrength + this._strengthBuff;
    }

    get constitution() { // Used to calculate Damage and Defense
        return this._baseConstitution + this._baseConstitutionBuff;
    }

    get inteligence() { // Used to calculate Ability Modifier
        return this._baseInteligence + this._inteligenceBuff;
    }

    get agility() { // Used to calculate Speed.
        return this._baseAgility + this._agilityBuff;
    }

    // Calculated stats

    get damage() {
        return this.strength;
    }

    get speed() { // Used to see which Elemental goes first
        return this.agility;
    }

    get maxHealth() { // Maximum Health for the Elemental
        return this.constitution * 5;
    }

    get health() { // Current Health of the Elemental
        return this._health;
    }

    get defense() { // Mitigates Damage.
        return Math.round((this.constitution * 0.25) + this._defenseBuff);
    }

    get abilityMod() { // Used to modify various Elemental Abilities.
        return this.inteligence * 0.1;
    }

    get damageShield() { // Causes Damage to attacking Elemental.
        let shield = Math.round(this._baseDamageShield + this._damageShieldBuff);

        if (shield < 0) {
            return 0;
        } else {
            return shield;
        }
    }

    get barrier() { // Mitigates Damage then is removed based on damage .
        return this._barrier;
    }

	/*********************
	****** Setters *******
    *********************/

    // Main Stats
    set strength(buff) { // Sets the Elementals Strength Buff (Does not affect Base Strength)
        if (typeof buff === 'number') {
            this._strengthBuff = buff;
        } else {
            throw new TypeError(`Invalid Input; Strength must be a number`);
        } 
    }

    set constitution(buff) { // Sets the Elementals Constitution Buff (Does not affect Base Constitution)
        if (typeof buff === 'number') {
            this._constitutionBuff = buff;
        } else {
            throw new TypeError(`Invalid Input; Strength must be a number`);
        }
    }

    set inteligence(buff) { // Sets the Elementals Inteligence Buff (Does not affect Base Inteligence)
        if (typeof buff === 'number') {
            this._inteligenceBuff = buff;
        } else {
            throw new TypeError(`Invalid Input; Strength must be a number`);
        }
    }

    set agility(buff) { // Sets the Elementals agility Buff (Does not affect Base Agility)
        if (typeof buff === 'number') {
            this._agilityBuff = buff;
        } else {
            throw new TypeError(`Invalid Input; Strength must be a number`);
        }
    }

    // Secondary Stats
    set health(h) { 
        if (typeof h === 'number') {
            if (h > 0) {
                this._health = h;
            } else {
                this._health = 0;
            }
        } else {
            throw new TypeError(`Invalid Input; Health must be a number.`);
        }
     }

    set defense(buff) { // Sets the Elementals defense Buff (Does not affect Base Defense)
        if (typeof buff === 'number') {
            this._defenseBuff = buff;
        } else {
            throw new TypeError(`Invalid Input; Defense must be a number`);
        }
    }

    set damageShield(buff) { // Sets the Elementals Damage Shield Buff (Does not affect Base Damage Shield)
        this._damageShieldBuff = buff;
    }

    set barrier(buff) { // Sets Barrier Buff
        if (typeof buff === 'number') {
            this._barrier = buff;

            if (this._barrier < 0) {
                this._barrier = 0;
            }
        } else {
            throw new TypeError(`Invalid Input; Barrier must be a number`);
        }
    }

	/*********************
	****** Methods *******
    *********************/

    getType() { // Gives string of type 
        return Object.keys(type)[this.type];
    }

    attack(enemy) { // Attack enemy Elemental's health
            let initialDmg = this.calculateDmg(enemy) 
            let dmg = initialDmg - enemy.barrier; // Subtracts Enemy Elementals Barrier from Damage.

            enemy.barrier -= initialDmg; // Subtracts Damage done to Enemy Elementals Barrier.

            if (dmg < 0) { // Ensures that intended Damage does not Heal.
                dmg = 0;
            }


            if (enemy.barrier < 0) { // Ensures that Enemy's Barrier is not a negateive.
                enemy.barrier = 0;
            }

            enemy.health -= dmg; // Inflicts Damage onto the Enemy Elemental.
            this.health -= enemy.damageShield * enemy.multiplier(this); // Take damage if enemy has a Damage Shield
    }

    calculateDmg(enemy) { // Calculates damage.
        return Math.round((this.damage * this.multiplier(enemy)) - enemy.defense);
    }

    multiplier(enemy) { // Decides multiplier based on weakness
        let STRONG = 2;
        let GOOD = 1.5;
        let WEAK = 0.5;
        let TRIVIAL = 0.25

        let multiplier;
        
        switch (this.type) {
            case type.atomic:
                switch (enemy.type) {
                    case type.earth:
                        multiplier = STRONG;
                        break;
                    case type.water:
                        multiplier = WEAK;
                        break;
                    case type.fire:
                        multiplier = WEAK;
                        break;
                    case type.wind:
                        multiplier = STRONG;
                        break;
                }
                break;
            case type.earth:
                switch (enemy.type) {
                    case type.atomic:
                    multiplier = TRIVIAL;
                    break;
                    case type.water:
                        multiplier = STRONG;
                        break;
                    case type.fire:
                        multiplier = GOOD;
                        break;
                    case type.wind:
                        multiplier = WEAK;
                        break;
                }
                break;
            case type.water:
                switch (enemy.type) {
                    case type.atomic:
                    multiplier = GOOD;
                    break;
                case type.earth:
                    multiplier = TRIVIAL;
                    break;
                case type.fire:
                    multiplier = STRONG;
                    break;
                case type.wind:
                    multiplier = WEAK;
                    break;
                }
                break;
            case type.fire:
                switch (enemy.type) {
                    case type.atomic:
                        multiplier = GOOD;
                        break;
                    case type.earth:
                        multiplier = WEAK;
                        break;
                    case type.water:
                        multiplier = TRIVIAL
                        break;
                    case type.wind:
                        multiplier = STRONG;
                        break;
                }
                break;
            case type.wind:
                switch (enemy.type) {
                    case type.atomic:
                        multiplier = TRIVIAL;
                        break;
                    case type.earth:
                        multiplier = GOOD;
                        break;
                    case type.water:
                        multiplier = GOOD;
                        break;
                    case type.fire:
                        multiplier = TRIVIAL;
                        break;
                }
                break;
            default: 
                multiplier = 0;
        }

        return multiplier;
    }

    ability(player, enemy) { // Certain Elementals have extra stats or altered attacks; this ensures there are no errors with .ability() is called on them.
    }

    // For testing purposes:

    listStats() { // Lists all stats.
        console.log(`
            Name: ${this.name}
            Type: ${this.getType()}

            Max Health: ${this.maxHealth}
            Current Health: ${this.health}

            Strength: ${this.strength}
            Constitution: ${this.constitution}
            Inteligence: ${this.inteligence}
            Agility: ${this.agility}

            Damage: ${this.damage}
            Speed: ${this.speed}

            Defense: ${this.defense}
            Ability Mod: ${this.abilityMod}
        `);
    }
}