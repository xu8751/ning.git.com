import { BrowserWindow, Menu } from 'electron'
import menuconfig from '../config/menu'
import config from '@config'
import setIpc from './ipcMain'
import upload from './checkupdate'
import DownloadUpdate from './downloadFile'
import path from 'path'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
// 这个瓜皮全局变量只能在单个js中生效，而并不是整个主进程中
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}
// 将文件地址挪到这里
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:${process.env.PORT}` : `file://${__dirname}/index.html`
const loadingURL = process.env.NODE_ENV === 'development' ? `http://localhost:${process.env.PORT}/static/loader.html` : `file://${__static}/loader.html`
var loadWindow = null
var mainWindow = null

function createMainWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    useContentSize: true,
    width: 1700,
    minWidth: 1366,
    show: false,
    frame: config.IsUseSysTitle,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      // 如果是开发模式可以使用devTools
      devTools: process.env.NODE_ENV === 'development',
      // 在macos中启用橡皮动画
      scrollBounce: process.platform === 'darwin'
    }
  })
  // 这里设置只有开发环境才注入显示开发者模式
  if (process.env.NODE_ENV === 'development') {
    menuconfig.push({
      label: '开发者设置',
      submenu: [{
        label: '切换到开发者模式',
        accelerator: 'CmdOrCtrl+I',
        role: 'toggledevtools'
      }]
    })
  }
  // 载入菜单
  const menu = Menu.buildFromTemplate(menuconfig)
  Menu.setApplicationMenu(menu)
  mainWindow.loadURL(winURL)

  setIpc.Mainfunc(mainWindow, config.IsUseSysTitle)
  upload.Update(mainWindow)
  DownloadUpdate.download(mainWindow)

  mainWindow.webContents.once('dom-ready', () => {
    mainWindow.show()
  })
  if (config.UseStartupChart) loadWindow.destroy()

  if (process.env.NODE_ENV === 'development') mainWindow.webContents.openDevTools(true)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function loadindWindow () {
  loadWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    backgroundColor: '#222',
    transparent: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: { experimentalFeatures: true }
  })

  loadWindow.loadURL(loadingURL)

  loadWindow.show()

  setTimeout(() => {
    createMainWindow()
  }, 2000)

  loadWindow.on('closed', () => {
    loadWindow = null
  })
}

function initWindow () {
  if (config.UseStartupChart) {
    return loadindWindow()
  } else {
    return createMainWindow()
  }
}
export default initWindow
