export class Player {
	/*********************
	**** Constructor *****
	*********************/

	constructor(atomic,fire, water, earth, wind) {
        this._elemental = [
            atomic,
            fire,
            water,
            earth,
            wind,
        ];

        this._maxHealth = this.calculateMaxHealth();
        this._health = this._maxHealth;
	}

	/*********************
	****** Getters *******
    *********************/
    
    get elemental() {
        return this._elemental;
    }

    get maxHealth() {
        return this.maxHealth;
    }

    get health() {
        return this._health;
    }

	/*********************
	****** Setters *******
    *********************/
    
    set health(h) {
        if (typeof h === 'number') {
            this._health = h;
        } else {
            throw new TypeError(`Invalid Input; Health must be a number.`);
        }
    }

	/*********************
	****** Methods *******
    *********************/
    
    calculateMaxHealth() {
        let health = 0;
        for (let i = 0; i < this.elemental.length; i++) {
            health += this.elemental[i].maxHealth;
        }
        return health;
    }

    // For testing purposes:

    // Main Stats
    listStrength() {
        let ele;
        for (let i = 0; i < this.elemental.length; i++) {
            ele = this.elemental[i]
        console.log(`
            ${ele.getType()} Strength : ${ele.Strength}`);
        }
    }

    listConstitution() {
        let ele;
        for (let i = 0; i < this.elemental.length; i++) {
            ele = this.elemental[i]
        console.log(`
            ${ele.getType()} Constitution : ${ele.constitution}`);
        }
    }

    listInteligence() {
        let ele;
        for (let i = 0; i < this.elemental.length; i++) {
            ele = this.elemental[i]
        console.log(`
            ${ele.getType()} Inteligence : ${ele.inteligence}`);
        }
    }

    listAgility() {
        let ele;
        for (let i = 0; i < this.elemental.length; i++) {
            ele = this.elemental[i]
        console.log(`
            ${ele.getType()} Agility : ${ele.agility}`);
        }
    }

    // Secondary Stats
    listHealth() {
        let ele;
        for (let i = 0; i < this.elemental.length; i++) {
            ele = this.elemental[i]
        console.log(`
            ${ele.getType()} Health : ${ele.health}`);
        }
    }

    listDefense() {
        let ele;
        for (let i = 0; i < this.elemental.length; i++) {
            ele = this.elemental[i]
        console.log(`
            ${ele.getType()} Defense : ${ele.defense}`);
        }
    }

    listDamageShield() {
        let ele;
        for (let i = 0; i < this.elemental.length; i++) {
            ele = this.elemental[i]
        console.log(`
            ${ele.getType()} Damage Shield : ${ele.damageShield}`);
        }
    }

    listBarrier() {
        let ele;
        for (let i = 0; i < this.elemental.length; i++) {
            ele = this.elemental[i]
        console.log(`
            ${ele.getType()} Barrier : ${ele.barrier}`);
        }
    }
}