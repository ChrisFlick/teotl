// Requiring path to so we can use relative routes to our HTML files
var path = require("path");


module.exports = function (app) {

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/levels/logo.html"))
    })

    app.get("/arena", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/levels/arena.html"))
    })

    app.get("/character_select", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/levels/character_select.html"))
    })

    app.get("/menu", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/levels/menu.html"))
    })

    app.get("/pentacle", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/levels/pentacle.html"))
    })

    app.get("/wait", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/levels/waiting.html"))
    })
}