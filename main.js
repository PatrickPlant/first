const {app, BrowserWindow, Menu, remote} = require('electron')
const windowStateKeeper = require('electron-window-state')

const shell = require('electron').shell
  
// The IPC Main process can receive asynchronous and synchronous messages sent from a Renderer process (such as our add.html window). 
// It can also send messages and reply to messages.
const ipcMain = require('electron').ipcMain

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

const userDataPath = (app || remote.app).getPath('userData')

console.log(userDataPath)

function createWindow () {
  // Create the browser window.
    // Load the previous state with fallback to defaults
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  });

  win = new BrowserWindow({'x': mainWindowState.x,
            'y': mainWindowState.y,
            'width': mainWindowState.width,
            'height': mainWindowState.height, 
            show: false})


  // Let us register listeners on the window, so we can update the state
  // automatically (the listeners will be removed when the window is closed)
  // and restore the maximized or full screen state
  mainWindowState.manage(win)

  // and load the index.html of the app.
  win.loadFile('src/index.html')

    // wait until the page content is fully loaded
  win.once('ready-to-show', () => {
      win.show()
  })

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  var menu = Menu.buildFromTemplate(require('./src/mainMenu'))

  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


// When an ipcRenderer sends a 'update-notify-value' message, will execute the function
// which in turn sends a 'targetPriceVal' message to the main windows 'win' that is bound to index.html we create at the beginning
ipcMain.on('update-notify-value', function (event, arg) {
    win.webContents.send('targetPriceVal', arg)
  })