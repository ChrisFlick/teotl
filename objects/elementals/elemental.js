class Elemental {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
        this._baseStrength = 5;
        this._baseConstitution = 5;
        this._baseInteligence = 5;
        this._baseAgility = 5;
	}

	/*********************
	****** Getters *******
	*********************/

    get baseStrength() {
        return this._baseStrength;
    }

    get baseConstitution() {
        return this._baseConstitution;
    }

    get baseInteligence() {
        return this.baseInteligence;
    }

    get baseAgility() {
        return this._baseAgility;
    }

	/*********************
	****** Setters *******
    *********************/
    
    get baseStrength(stat) {
        this._baseStrength = stat;
    }

    get baseConstitution(stat) {
        this._baseConstitution = stat;
    }

    get baseInteligence(stat) {
        this.baseInteligence = stat;
    }

    get baseAgilitystat() {
        this._baseAgility = stat;
    }

	/*********************
	****** Methods *******
	*********************/
}