export class Elemental {
	/*********************
	**** Constructor *****
	*********************/

	constructor() {
	}

	/*********************
	****** Getters *******
	*********************/

    get strength() {
        return this._baseStrength;
    }

    get constitution() {
        return this._baseConstitution;
    }

    get inteligence() {
        return this._baseInteligence;
    }

    get agility() {
        return this._baseAgility;
    }

    get type() {
        return this._type;
    }

	/*********************
	****** Setters *******
    *********************/
    
    /*set baseStrength(stat) {
        if (typeof stat === 'number') {
            this._baseStrength = stat;
        } else {
            console.log(`Invalid input; please ensure stat is a number`);
        }
    }

    set baseConstitution(stat) {
        if (typeof stat === 'number') {
            this._baseConstitution = stat;
        } else {
            console.log(`Invalid input; please ensure stat is a number`);
        }
        
    }

    set baseInteligence(stat) {
        if (typeof stat === 'number') {
            this.baseInteligence = stat;
        } else {
            console.log(`Invalid input; please ensure stat is a number`);
        }
        
    }*/

    get baseAgilitystat() {
        if (typeof stat === 'number') {
            this._baseAgility = stat;
        } else {
            console.log(`Invalid input; please ensure stat is a number`);
        }
        
    }

	/*********************
	****** Methods *******
    *********************/
    
    test() {
        console.log('test');
    }
}