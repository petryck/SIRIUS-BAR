const { app,BrowserWindow, Notification, ipcMain, autoUpdater, dialog } = require("electron");
const path = require("path");
const { setTimeout } = require("timers/promises");
const { modulos } = require("./query/consultas");

if(require('electron-squirrel-startup')) app.quit();
// require('update-electron-app')()

const server = 'https://sirius-bar-e4or.vercel.app/'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })


setTimeout(() => {
  autoUpdater.checkForUpdates()
}, 5000);
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)


autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Reiniciar', 'Mais Tarde'],
    title: 'Atualização Disponivel',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail:
      'Uma nova versão foi Baixada. Reinicie o Aplicativo para Instalar as Atualizações.',
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})

autoUpdater.on('error', (message) => {
  console.error('Ocorreu um erro ao atualizar o aplicativo')
  console.error(message)
})




let mainWindow;
let menu_pop;


function createWindow() {
  mainWindow = new BrowserWindow({
    height: 20,
    minHeight: 20,
    // maxHeight: 20,
    show: false,
    //transparent: true,
    // alwaysOnTop:true,
    resizable:false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  mainWindow.loadFile("ui/bar.html");

  menu_pop = new BrowserWindow({
    width: 280,
    show: false,
    skipTaskbar: true,
    frame: false,
    resizable:false,
    transparent: true,
    alwaysOnTop: true,  
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  menu_pop.loadFile("ui/menu_pop.html");



  mainWindow.once('ready-to-show', () => {
    
    mainWindow.show()
    // mainWindow.webContents.openDevTools()

})



}


ipcMain.on(`display-app-menu_open`, async function(e, args) {
    menu_pop.hide()
    menu_pop.loadFile(`ui/menu/nada.html`);
    
  menu_pop.setPosition(args.x, args.y, true)
 
  var modulo = await modulos(args.type);
  var calculo = 50
  calculo = (modulo.length*20)+calculo;



  if(modulo.length > 0){
 
  menu_pop.loadFile(`ui/menu/${args.type}.html`, {query: {"data": JSON.stringify(modulo)}});
  mainWindow.setResizable(true);
  menu_pop.setSize(290,calculo) 
  mainWindow.setResizable(false);
    
        menu_pop.show()
   
    
}


});

ipcMain.on(`display-app-menu_close`, function(e, args) {
    menu_pop.loadFile(`ui/menu/nada.html`);
    menu_pop.hide()

  });

app.on('ready', () => {
    createWindow()
    const { screen } = require('electron')
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize
  //   mainWindow.setAlwaysOnTop(true, 'screen-saver');
    // mainWindow.setVisibleOnAllWorkspaces(true);
    
    mainWindow.setPosition((width/2)-500, -10)
    
  //   mainWindow.x = -10;
    mainWindow.setSize((width/2),28)
    // mainWindow.setSize((width/2),500)
})






