const electron = require('electron')
const path = require('path')
const remote = electron.remote
const closeBtn = document.getElementById('closeBtn')

// the other side of the ipcMain
const ipcRenderer = electron.ipcRenderer


closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow();
    window.close();
})

const updateBtn = document.getElementById('updateBtn')

updateBtn.addEventListener('click', function () {
    // send a 'update-notify-value' 
    // it will be cought by the ipcMain in  main.js 
    ipcRenderer.send('update-notify-value', document.getElementById('notifyVal').value)

  // Close this window
  var window = remote.getCurrentWindow();
  window.close();
})