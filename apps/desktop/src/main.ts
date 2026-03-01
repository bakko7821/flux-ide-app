import { IPC } from "@flux/shared";
import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "node:path";
import { registerIpcHandlers } from "./ipc.js";

const isDev = !app.isPackaged;
const DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

declare const __dirname: string;

function attachWindowIpc(win: BrowserWindow) {
  // Важно: не через getFocusedWindow()
  ipcMain.on(IPC.window.minimize, () => {
    console.log("[main] win:minimize");
    win.minimize();
  });

  ipcMain.on(IPC.window.maxToggle, () => {
    console.log("[main] win:maxToggle");
    win.isMaximized() ? win.unmaximize() : win.maximize();
  });

  ipcMain.on(IPC.window.close, () => {
    console.log("[main] win:close");
    win.close();
  });
}

function createMainWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: "#0b0f14",
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  if (isDev && DEV_SERVER_URL) {
    void win.loadURL(DEV_SERVER_URL);
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    void win.loadFile(path.join(__dirname, "../../ui/dist/index.html"));
  }

  win.setMenu(null);
  Menu.setApplicationMenu(null);

  return win;
}

app.whenReady().then(() => {
  const win = createMainWindow();
  registerIpcHandlers();
  attachWindowIpc(win);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
