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

        console.log(`Listing all Elementals Strength`);
        for (let i = 0; i < this.elemental.length; i++) {
            ele = this.elemental[i]
        console.log(`
            ${ele.getType()} Strength : ${ele.Strength}`);
        }
    }

    listConstitution() {
        let ele;

        console.log(`Listing all Elementals Constitution`);
        for (let i = 0; i < this.elemental.length; i++) {
            ele = this.elemental[i]
        console.log(`
            ${ele.getType()} Constitution : ${ele.constitution}`);
        }
    }

    listintelligence() {
        let ele;

        console.log(`Listing all Elementals intelligence`);
        for (let i = 0; i < this.elemental.length; i++) {
            ele = this.elemental[i]
        console.log(`
            ${ele.getType()} intelligence : ${ele.intelligence}`);
        }
    }

    listAgility() {
        let ele;

        console.log(`Listing all Elementals Agility`);
        for (let i = 0; i < this.elemental.length; i++) {
            ele = this.elemental[i]
        console.log(`
            ${ele.getType()} Agility : ${ele.agility}`);
        }
    }

    // Secondary Stats
    listHealth() {
        let ele;

        console.log(`Listing all Elementals Health`);
        for (let i = 0; i < this.elemental.length; i++) {
            ele = this.elemental[i]
        console.log(`
            ${ele.getType()} Health : ${ele.health}`);
        }
    }

    listDefense() {
        let ele;

        console.log(`Listing all Elementals Defense`);
        for (let i = 0; i < this.elemental.length; i++) {
            ele = this.elemental[i]
        console.log(`
            ${ele.getType()} Defense : ${ele.defense}`);
        }
    }

    listDamageShield() {
        let ele;

        console.log(`Listing all Elementals Damage Shield`);
        for (let i = 0; i < this.elemental.length; i++) {
            ele = this.elemental[i]
        console.log(`
            ${ele.getType()} Damage Shield : ${ele.damageShield}`);
        }
    }

    listBarrier() {
        let ele;

        console.log(`Listing all Elementals Barrier`);
        for (let i = 0; i < this.elemental.length; i++) {
            ele = this.elemental[i]
        console.log(`
            ${ele.getType()} Barrier : ${ele.barrier}`);
        }
    }
}