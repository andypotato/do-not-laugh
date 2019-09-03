'use strict'

import { app, protocol, globalShortcut, BrowserWindow } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib';

const { ipcMain } = require('electron');

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let workerWin;

// check if the "App" protocol has already been created
let createdAppProtocol = false;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true, corsEnabled: true, supportFetchAPI: true } }
])

function createWindow () {

  // create the game UI window
  win = new BrowserWindow({
    width: 1024,
    height: 790,
    fullscreen: false,
    autoHideMenuBar: false,
    kiosk: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  } else {
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    // closing the main (visible) window should quit the App
    app.quit();
  });
}

function createWorker(devPath, prodPath) {

  // create hidden worker window
  workerWin = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true }
  });

  if(process.env.WEBPACK_DEV_SERVER_URL) {
    workerWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath);
  } else {
    workerWin.loadURL(`app://./${prodPath}`)
  }

  workerWin.on('closed', () => { workerWin = null; });
}

function sendWindowMessage(targetWindow, message, payload) {

  if(typeof targetWindow === 'undefined') {
    console.log('Target window does not exist');
    return;
  }

  targetWindow.webContents.send(message, payload);
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  if(!createdAppProtocol) {
    createProtocol('app');
    createdAppProtocol = true;
  }

  // create the main application window
  createWindow();

  // create the background worker window
  createWorker('worker', 'worker.html');

  globalShortcut.register('Escape', () => {
    app.quit();
  })

  // setup message channels
  ipcMain.on('window-message-from-worker', (event, arg) => {
    sendWindowMessage(win, 'message-from-worker', arg);
  });
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
