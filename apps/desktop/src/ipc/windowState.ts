import { BrowserWindow, ipcMain } from "electron";

export function registerWindowStateIpc(getWin: () => BrowserWindow | null) {
  ipcMain.handle("window:isMaximized", () => {
    const win = getWin();
    return !!win && win.isMaximized();
  });

  const send = () => {
    const win = getWin();
    if (!win || win.isDestroyed()) return;
    win.webContents.send("window:maximizedChanged", win.isMaximized());
  };

  // события окна
  const hook = (win: BrowserWindow) => {
    win.on("maximize", send);
    win.on("unmaximize", send);
    // optional: на всякий случай ещё
    win.on("enter-full-screen", send);
    win.on("leave-full-screen", send);
  };

  return { hook };
}
