function elementClick(button) {
    // Declare variables.
    let image;
    let source = "../../sprites/buttons/";
    let extension = ".png"

    // Revert all other buttons to their non clicked image.
    for (let i = 0; i < 5; i++) {
        let elementID = "element_" + String(i);
        if (elementID != button) {
            image = document.getElementById(elementID);
            image.src = source + elementID + extension;
        }
    }

    // Change image of button the player clicked to it's clicked variant.
    image = document.getElementById(button);
    image.src = source + button + "Clicked" + extension;

    document.getElementById("log").innerHTML = button;
}