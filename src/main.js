const { app, BrowserWindow } = require('electron');

//const { type, weakness, stat} = require('./enum.js');

app.on('ready', createWindow);
app.on('closed', exitGame)


// Internal functions
function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1100,
    height: 1100,
    webPreferences: {
      nodeIntegration: true
    }
  })
  //win.removeMenu();
  win.loadFile('src/levels/character_select.html');
}

function exitGame() {
  window.localStorage.removeItem("teotlPlayer");
  win = null;
}