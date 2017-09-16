const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

const win = {
  main: null,
};

const createWindow = () => {
  win.main = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
  });

  win.main.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file',
    slashes: true,
  }));

  win.main.on('closed', () => {
    win.main = null;
  });
};

app.on('ready', createWindow)
