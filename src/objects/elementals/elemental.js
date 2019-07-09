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
            0, // intelligence
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
        this._baseDamageShield = 0;

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

    get shieldType() { // Elemental type of damage shield
        return this._shieldType;
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
        return this._baseStrength + this._buff[stat.strength];
    }

    get constitution() { // Used to calculate Damage and Defense
        return this._baseConstitution + this._buff[stat.constitution];
    }

    get intelligence() { // Used to calculate Ability Modifier
        return this._baseIntelligence + this._buff[stat.intelligence];
    }

    get agility() { // Used to calculate Speed.
        return this._baseAgility + this._buff[stat.agility];
    }

    // Calculated stats

    get damage() {
        return this.strength;
    }

    get speed() { // Used to see which Elemental goes first.
        return this.agility;
    }

    get maxHealth() { // Maximum Health for the Elemental
        return this.constitution * 5;
    }

    get health() { // Current Health of the Elemental
        return this._health;
    }

    get defense() { // Mitigates Damage.
        return Math.round((this.constitution * 0.25) + this._buff[stat.defense]);
    }

    get abilityMod() { // Used to modify various Elemental Abilities.
        return this.intelligence * 0.1;
    }

    get damageShield() { // Causes Damage to attacking Elemental.
        let shield = Math.round(this._baseDamageShield + this._buff[stat.damageShield]);

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

    set shieldType(type) {
        if (type === type.atomic || type === type.fire || type === type.water || type === type.earth || type === type.wind) {
            this._shieldType = type;
        } else {
            throw new TypeError(`Invalid Input; Type must match type.x in enum.js`);
        }
    }

    // Arrays
    set buff(stat) {
        this._buff = stat;
    }

    set buffTime(t) {
        this._buffTime = t;
    }

    // Main Stats
    set strength(buff) { // Sets the Elementals Strength Buff (Does not affect Base Strength)
        if (typeof buff === 'number') {
            this._buff[stat.strength] = buff;
        } else {
            throw new TypeError(`Invalid Input; Strength must be a number`);
        } 
    }

    set constitution(buff) { // Sets the Elementals Constitution Buff (Does not affect Base Constitution)
        if (typeof buff === 'number') {
            this._buff[stat.constitution] = buff;
        } else {
            throw new TypeError(`Invalid Input; Strength must be a number`);
        }
    }

    set intelligence(buff) { // Sets the Elementals intelligence Buff (Does not affect Base intelligence)
        if (typeof buff === 'number') {
            this._buff[stat.intelligence] = buff;
        } else {
            throw new TypeError(`Invalid Input; Strength must be a number`);
        }
    }

    set agility(buff) { // Sets the Elementals agility Buff (Does not affect Base Agility)
        if (typeof buff === 'number') {
            this._buff[stat.agility] = buff;
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
            this._buff[stat.defense] = buff;
        } else {
            throw new TypeError(`Invalid Input; Defense must be a number`);
        }
    }

    set damageShield(buff) { // Sets the Elementals Damage Shield Buff (Does not affect Base Damage Shield)
        this._buff[stat.damageShield] = buff;
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
                let enemyType = enemy.type;
                if (enemy.buff[stat.damageShield] > 0) {
                    enemyType = enemy.shieldType;
                }

                dmg = Math.round(enemy.damageShield * enemy.multiplier(enemyType, this.type));
                console.log(`Taking ${dmg} Damage from Damage Shield`);
                this.health -= dmg; // Take damage if enemy has a Damage Shield
            }     
    }

    calculateDmg(enemy) { // Calculates damage.
        let dmg = Math.round((this.damage * this.multiplier(this.type, enemy.type)) - enemy.defense);

        if (dmg < 0) {
            dmg = 0;
        }

        return dmg;
    }

    multiplier(playerType, enemyType) { // Decides multiplier based on weakness
        let multiplier = 1;
        let weak;
        
        switch (playerType) {
            case type.atomic:
                switch (enemyType) {
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
                switch (enemyType) {
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
                switch (enemyType) {
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
                switch (enemyType) {
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
                switch (enemyType) {
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
                multiplier = 1;
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
            intelligence: ${this.intelligence}
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