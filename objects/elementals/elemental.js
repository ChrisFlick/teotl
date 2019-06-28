import {type} from '../../src/enum.js';

export class Elemental {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
        this._strengthBuff = 0;
        this._baseConstitutionBuff = 0;
        this._inteligenceBuff = 0;
        this._agilityBuff = 0;
        this._defenseBuff = 0;

        this._health = 0;
	}

	/*********************
	****** Getters *******
	*********************/

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    // stats

    get strength() {
        return this._baseStrength + this._strengthBuff;
    }

    get constitution() {
        return this._baseConstitution + this._baseConstitutionBuff;
    }

    get inteligence() {
        return this._baseInteligence + this._inteligenceBuff;
    }

    get agility() {
        return this._baseAgility + this._agilityBuff;
    }

    // Calculated stats

    get damage() {
        return this.strength;
    }

    get speed() {
        return this.agility;
    }

    get maxHealth() {
        return this.constitution * 5;
    }

    get health() {
        return this._health;
    }

    get defense() {
        return (this.constitution * 0.25) + this._defenseBuff;
    }

    get abilityMod() {
        return this.inteligence * 0.1;
    }

	/*********************
	****** Setters *******
    *********************/

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

    // Stats
    set strength(buff) {
        if (typeof buff === 'number') {
            this._strengthBuff = buff;
        } else {
            throw new TypeError(`Invalid Input; Strength must be a number`);
        } 
    }

    set constitution(buff) {
        if (typeof buff === 'number') {
            this._constitutionBuff = buff;
        } else {
            throw new TypeError(`Invalid Input; Strength must be a number`);
        }
    }

    set inteligence(buff) {
        if (typeof buff === 'number') {
            this._inteligenceBuff = buff;
        } else {
            throw new TypeError(`Invalid Input; Strength must be a number`);
        }
    }

    set agility(buff) {
        if (typeof buff === 'number') {
            this._agilityBuff = buff;
        } else {
            throw new TypeError(`Invalid Input; Strength must be a number`);
        }
    }

    set defense(buff) {
        if (typeof buff === 'number') {
            this._defenseBuff = buff;
        } else {
            throw new TypeError(`Invalid Input; Strength must be a number`);
        }
    }

	/*********************
	****** Methods *******
    *********************/

    listStats() { // Lists all stats (for debugging).
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

    getType() { // Gives string of type 
        return Object.keys(type)[this.type];
    }

    attack(enemy) { // Attack enemy Elemental's health
            enemy.health -= this.calculateDmg(enemy);
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
}