import { BrowserWindow, ipcMain, nativeTheme } from "electron";

export type Theme = "dark" | "light";
export type ThemeSource = "system" | "light" | "dark";

const getSystemTheme = (): Theme =>
  nativeTheme.shouldUseDarkColors ? "dark" : "light";

export function registerThemeIpc(getWin: () => BrowserWindow | null) {
  // ✅ 1) handler, который у тебя отсутствует
  ipcMain.handle("theme:getSystem", () => getSystemTheme());

  // ✅ 2) (опционально) единая точка для setSource
  ipcMain.handle("theme:setSource", (_e, source: ThemeSource) => {
    nativeTheme.themeSource = source;
    return getSystemTheme();
  });

  // ✅ 3) пушим изменения системной темы в renderer
  nativeTheme.on("updated", () => {
    const win = getWin();
    if (!win || win.isDestroyed()) return;
    win.webContents.send("theme:systemChanged", getSystemTheme());
  });
}
