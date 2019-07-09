const type = {
    /*********************************************************************
            IMPORTANT: If this is changed in ANY way make sure to
            update the following:
            multiplier method in the Elemental Class located inside elemental.js
            The Player Class located inside of player.js.
            character_select.html
    *********************************************************************/

    atomic: 0,
    fire: 1,
    water: 2,
    earth: 3,
    wind: 4,
}

const weakness = {
    strong: 2,
    good: 1.5,
    weak: 0.5,
    trivial: 0.25
}

const stat = {
    /*********************************************************************
            IMPORTANT: If this is changed in ANY way make sure to
            update the stat Array inside the the Elemental Class 
            constructor located inside elemental.js.
    *********************************************************************/

    // Main Stats
    strength: 0,
    constitution: 1,
    inteligence: 2,
    agility: 3,

    // Secondary Stats
    defense: 4,
    damageShield: 5,
}