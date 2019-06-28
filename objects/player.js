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

	/*********************
	****** Methods *******
    *********************/
    
    calculateMaxHealth() {
        let health = 0;
        for (let i = 0; i < this.elemental.length; i++) {
            health += this.elemental[i];
        }
        return health;
    }
}