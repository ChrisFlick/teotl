const { app, BrowserWindow } = require('electron');

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  })
  //win.removeMenu();
  win.loadFile('src/levels/character_select.html');
}


app.on('ready', createWindow);