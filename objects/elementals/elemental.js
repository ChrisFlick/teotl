import { type, weakness, stat } from '../../src/enum.js';

export class Elemental {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
        
        this._buff = [
            // Main Stats
            0, // Strength
            0, // Constitution
            0, // Inteligence
            0, // Agility

            // Secondary Stats
            0, // Defense
            0, // Damage Shield
        ];

        this._buffTime = []
        for (let i = 0; i < this._buff.length; i++) { // Initiates the timer for every buff at 0.
            this._buffTime.push(0);
        }

        // Secondary stats
        this._health = 0;
        this._barrier = 0;

        this.doubleStrike = false;
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

    
    // Arrays
    get buff() {
        return this._buff;
    }

    get buffTime() {
        return this._buffTime;
    }

    // stats
    get strength() { // Used in Damage calculations
        return this._baseStrength + this._buff[stat.str];
    }

    get constitution() { // Used to calculate Damage and Defense
        return this._baseConstitution + this._buff[stat.con];
    }

    get inteligence() { // Used to calculate Ability Modifier
        return this._baseInteligence + this._buff[stat.int];
    }

    get agility() { // Used to calculate Speed.
        return this._baseAgility + this._buff[stat.agil];
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
        return Math.round((this.constitution * 0.25) + this._buff[stat.def]);
    }

    get abilityMod() { // Used to modify various Elemental Abilities.
        return this.inteligence * 0.1;
    }

    get damageShield() { // Causes Damage to attacking Elemental.
        let shield = Math.round(this._baseDamageShield + this._buff[stat.dmgShield]);

        if (shield > 0) {
            return shield;
        } else {
            return 0;
        }
    }

    get barrier() { // Mitigates Damage then is removed based on damage .
        return this._barrier;
    }

	/*********************
	****** Setters *******
    *********************/

    // Arrays
    set buff(stat) {
        this.buff = stat;
    }

    set buffTime(t) {
        this.buffTime = t;
    }

    // Main Stats
    set strength(buff) { // Sets the Elementals Strength Buff (Does not affect Base Strength)
        if (typeof buff === 'number') {
            this._buff[stat.str] = buff;
        } else {
            throw new TypeError(`Invalid Input; Strength must be a number`);
        } 
    }

    set constitution(buff) { // Sets the Elementals Constitution Buff (Does not affect Base Constitution)
        if (typeof buff === 'number') {
            this._buff[stat.con] = buff;
        } else {
            throw new TypeError(`Invalid Input; Strength must be a number`);
        }
    }

    set inteligence(buff) { // Sets the Elementals Inteligence Buff (Does not affect Base Inteligence)
        if (typeof buff === 'number') {
            this._buff[stat.int] = buff;
        } else {
            throw new TypeError(`Invalid Input; Strength must be a number`);
        }
    }

    set agility(buff) { // Sets the Elementals agility Buff (Does not affect Base Agility)
        if (typeof buff === 'number') {
            this._buff[stat.agil] = buff;
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
            this._buff[stat.def] = buff;
        } else {
            throw new TypeError(`Invalid Input; Defense must be a number`);
        }
    }

    set damageShield(buff) { // Sets the Elementals Damage Shield Buff (Does not affect Base Damage Shield)
        this._buff[stat.dmgShield] = buff;
    }

    set barrier(buff) { // Sets Barrier Buff
        if (typeof buff === 'number') {
            this._barrier = buff;

            if (this.barrier < 0) {
                this.barrier = 0;
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

            console.log(`Attacking ${enemy.getType()} for ${dmg} Damage.`);
            enemy.health -= dmg; // Inflicts Damage onto the Enemy Elemental.


            if (enemy.damageShield > 0) {
                dmg = Math.round(enemy.damageShield * enemy.multiplier(this));
                console.log(`Taking ${dmg} Damage from Damage Shield`);
                this.health -= dmg; // Take damage if enemy has a Damage Shield
            }     
    }

    calculateDmg(enemy) { // Calculates damage.
        let dmg = Math.round((this.damage * this.multiplier(enemy)) - enemy.defense);

        if (dmg < 0) {
            dmg = 0;
        }

        return dmg;
    }

    multiplier(enemy) { // Decides multiplier based on weakness
        let multiplier;
        let weak;
        
        switch (this.type) {
            case type.atomic:
                switch (enemy.type) {
                    case type.earth:
                        multiplier = weakness.strong;
                        weak = 'Strong';
                        break;
                    case type.water:
                        multiplier = weakness.weak;
                        weak = 'Weak';
                        break;
                    case type.fire:
                        multiplier = weakness.weak;
                        weak = 'Weak';
                        break;
                    case type.wind:
                        multiplier = weakness.strong;
                        weak = 'Strong';
                        break;
                }
                break;
            case type.earth:
                switch (enemy.type) {
                    case type.atomic:
                        multiplier = weakness.trivial;
                        weak = 'Trivial';
                        break;
                    case type.water:
                        multiplier = weakness.strong;
                        weak = 'Strong';
                        break;
                    case type.fire:
                        multiplier = weakness.good;
                        break;
                    case type.wind:
                        multiplier = weakness.weak;
                        weak = 'Weak';
                        break;
                }
                break;
            case type.water:
                switch (enemy.type) {
                    case type.atomic:
                    multiplier = weakness.good;
                    weak = 'Good';
                    break;
                case type.earth:
                    multiplier = weakness.trivial;
                    weak = 'Trivial';
                    break;
                case type.fire:
                    multiplier = weakness.strong;
                    weak = 'Strong';
                    break;
                case type.wind:
                    multiplier = weakness.weak;
                    weak = 'Weak';
                    break;
                }
                break;
            case type.fire:
                switch (enemy.type) {
                    case type.atomic:
                        multiplier = weakness.good;
                        weak = 'Good';
                        break;
                    case type.earth:
                        multiplier = weakness.weak;
                        weak = 'Weak';
                        break;
                    case type.water:
                        multiplier = weakness.trivial
                        weak = 'Trivial';
                        break;
                    case type.wind:
                        multiplier = weakness.strong;
                        weak = 'Strong';
                        break;
                }
                break;
            case type.wind:
                switch (enemy.type) {
                    case type.atomic:
                        multiplier = weakness.trivial;
                        weak = 'Trivial';
                        break;
                    case type.earth:
                        multiplier = weakness.good;
                        weak = 'Good';
                        break;
                    case type.water:
                        multiplier = weakness.good;
                        weak = 'Good';
                        break;
                    case type.fire:
                        multiplier = weakness.trivial;
                        weak = 'Trivial';
                        break;
                }
                break;
            default: 
                multiplier = 0;
        }

        if (weak != null) {
            console.log(`${this.getType()}'s attack is ${weak}`);
        }

        return multiplier;
    }

    resetBuffs() { // Checks the timer of each buff and resets them to 0 if their timer is up.
        for (let i = 0; i < this.buff.length; i++) {
            if (this.buffTime[i] > 0) {
                buffTime[i] --;
            } else {
                buff[i] = 0;
            }
        }

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

    logHealth() {
        console.log(`${this.getType()} ${this.name} Health: ${this.health}`);
    }


}