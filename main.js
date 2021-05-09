const {app, BrowserWindow,ipcMain } = require('electron');
    const url = require("url");
    const path = require("path");
    var fs = require('file-system');
    var fsextra=require("fs-extra")
    const { autoUpdater } = require('electron-updater');
    const log = require('electron-log');
    autoUpdater.logger = log;
       autoUpdater.logger.transports.file.level = 'info';
    let mainWindow
    // var source = 'C:\\Users\\Public'
    // var destination = 'folderB'
   
    function createWindow () {
      console.log(">>>__dirname",__dirname);
      console.log(">>>bae path",app.getAppPath());
      // let data=[{"name":"Mega Corp c drive.","order_count":83,"address":"Infinity Loop Drive"},{"name":"sazal","order_count":31,"address":"noida"}]
      // fs.writeFile('C:\\test.json', JSON.stringify(data) ,function(err) {
      //   console.log(">>>err",err)
      // })
  //     fs.readFile('C:\\Users\\bcs\\test.json', (err, data) => {
  //       console.log(">>>>dtatatata",data);
  //       fs.writeFile('test.txt', data, function(err) {})

  //    })
  //    fsextra.copy(source, destination, function (err) {

  //     if (err){
  //         console.log('An error occured while copying the folder.')
  //         return console.error(err)
  //     }
  //     console.log('Copy completed!')
  // });
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: `file://${__dirname}/dist/assets/img/favicon.ico`,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          //  webSecurity: false
        },
        show: false
      });
      // mainWindow.loadFile('./dist/index.html');
      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, './dist/index.html'),
          protocol: "file:",
          slashes: true
        })
      );
      // Open the DevTools.
      //  mainWindow.webContents.openDevTools()

      mainWindow.on('closed', function () {
        mainWindow = null
      });
      mainWindow.once('ready-to-show', () => {
        console.log(">>Ready")
        mainWindow.show()
        autoUpdater.checkForUpdatesAndNotify();
      });
      
    }
  
    app.on('ready', () => {
      createWindow();
      setTimeout(function(){ 
        autoUpdater.checkForUpdates();
      }, 3000);
     
    });

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    });

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
    ipcMain.on('app_version', (event) => {
      console.log(">>>>app_version main",event)
      event.sender.send('app_version', { version: app.getVersion() });
    });
            /*checking for updates*/
        autoUpdater.on("checking-for-update", () => {
          console.log(">>>>checking for update")
          //your code
        });

        /*No updates available*/
        autoUpdater.on("update-not-available", info => {
          console.log(">>>>update not availabele")
          //your code
        });
    autoUpdater.on('update-available', () => {
      console.log(">>>update availabe")
      mainWindow.webContents.send('update_available');
    });
    autoUpdater.on('update-downloaded', () => {
      console.log(">>>update downloades")
      mainWindow.webContents.send('update_downloaded');
     
    });
    autoUpdater.on("error", err => {
      log.error("AutoUpdater error");
      log.error(err);
    });
    ipcMain.on('restart_app', () => {
      autoUpdater.quitAndInstall();
    });
    