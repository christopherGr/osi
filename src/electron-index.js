const { app, BrowserWindow, Menu } = require('electron');
const { ipcMain } = require('electron');
const path = require('path');
const shell = require('electron').shell; 
var mainWindow;

if (require('electron-squirrel-startup')) app.quit();
if(process.env.NODE_ENV==1) require('electron-reload')(__dirname);

const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
	width: 1000,
	height: 900,
	webPreferences:{
		nodeIntegration: true,
	  contextIsolation: false,
	  enableRemoteModule: true
	}
	});

	process.env.NODE_ENV==1 ? mainWindow.loadURL("http://localhost:3000") : mainWindow.loadFile(path.join(__dirname, "../", "build", "index.html"));
	if(process.env.NODE_ENV==1) mainWindow.webContents.openDevTools();

	/////Open external links in default browser
	mainWindow.webContents.on('will-navigate', function(e, url) {
		e.preventDefault(); 
		shell.openExternal(url);	
	});	
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/////Delete default Menu
const customMenuTemplate=[];
const myMenu=Menu.buildFromTemplate(customMenuTemplate);
Menu.setApplicationMenu(myMenu);

/////Handle requests from Renderer process
ipcMain.handle('require', (e, type=null) => {
	var result;
	const os = require('os');
	switch(type){
		case 'user-info':			
			result = os.userInfo();
		break;
		default:
			result = {
				cpu: os.cpus(),
				memory: [os.totalmem(), os.freemem()],
				os: [os.type(), os.platform(), os.release()],
				network: os.networkInterfaces(),
				ontime: os.uptime()
			}	
		break;
	}	
	return result;
})

ipcMain.on("writeFile", function(){
	const fs = require("fs");
	const os = require('os');
	
	const cpu = os.cpus();
	const memory = [os.totalmem(), os.freemem()];
	const system = [os.type(), os.platform(), os.release()];
	const network = os.networkInterfaces();
	const ontime = os.uptime();
	
	const content = {cpu, memory, system, network, ontime};
	
	const { dialog } = require('electron')
	dialog.showOpenDialog(mainWindow, {
		properties: ['openDirectory']
	}).then(result => {
		if(result.canceled) return;
		const filePath = String(result.filePaths).replaceAll("\\\\", "\\");
		fs.writeFile(path.join(filePath, "os-info.txt"),  JSON.stringify(content), function(err){
			if(err) return err;
			console.log("File has been created")
		})
	}).catch(err => {
	    return console.log(err)
	})
	
	
})
