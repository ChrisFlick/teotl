const { app, BrowserWindow } = require('electron');
var { win } = require(`./variables.js`);

//const { type, weakness, stat} = require('./enum.js');

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1100,
    height: 1100,
    webPreferences: {
      nodeIntegration: true
    }
  })
  //win.removeMenu();
  win.loadFile('src/levels/character_select.html');
}


app.on('ready', createWindow);