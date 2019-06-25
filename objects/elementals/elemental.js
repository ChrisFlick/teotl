export class Elemental {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
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
    
    test() {
        console.log('test');
    }
}