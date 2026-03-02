import { IPC } from "@flux/shared";
import { app, BrowserWindow, ipcMain, Menu, shell } from "electron";
import Store from "electron-store";
import path from "node:path";
import { registerIpcHandlers } from "./ipc.js";
import { registerThemeIpc } from "./ipc/theme.js";

const isDev = !app.isPackaged;
const DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

declare const __dirname: string;

// --------------------
// Window state storage
// --------------------
type WindowState = {
  bounds: { x: number; y: number; width: number; height: number };
  isMaximized: boolean;
};

const store = new Store<{ mainWindowState?: WindowState }>();

function getSavedWindowState(): WindowState | undefined {
  return store.get("mainWindowState");
}

function saveWindowState(win: BrowserWindow) {
  if (win.isDestroyed()) return;

  const prev = getSavedWindowState();

  const isMaximized = win.isMaximized();

  // Важно: если окно maximized — не перетираем bounds “размерами на весь экран”.
  // Сохраняем нормальные bounds (или предыдущие, если уже были).
  const bounds = isMaximized
    ? (prev?.bounds ?? win.getNormalBounds())
    : win.getBounds();

  store.set("mainWindowState", { bounds, isMaximized });
}

function attachWindowStatePersistence(win: BrowserWindow) {
  let t: NodeJS.Timeout | null = null;

  const scheduleSave = () => {
    if (t) clearTimeout(t);
    t = setTimeout(() => saveWindowState(win), 200);
  };

  // во время движения/ресайза — можно debounce
  win.on("resize", scheduleSave);
  win.on("move", scheduleSave);

  // ✅ при maximize/unmaximize тоже (чтобы isMaximized улетел в store)
  win.on("maximize", () => saveWindowState(win));
  win.on("unmaximize", () => saveWindowState(win));

  // ✅ КЛЮЧ: на close сохраняем НЕМЕДЛЕННО
  win.on("close", () => {
    if (t) clearTimeout(t);
    saveWindowState(win);
  });

  // ✅ и на всякий — когда приложение уходит
  app.on("before-quit", () => {
    if (t) clearTimeout(t);
    if (!win.isDestroyed()) saveWindowState(win);
  });
}

// --------------------
// Window IPC
// --------------------
function emitMaximizedChanged(win: BrowserWindow) {
  win.webContents.send("window:maximizedChanged", win.isMaximized());
}

function attachWindowIpc(win: BrowserWindow) {
  ipcMain.on(IPC.window.minimize, () => {
    console.log("[main] win:minimize");
    win.minimize();
  });

  ipcMain.on(IPC.window.maxToggle, () => {
    win.isMaximized() ? win.unmaximize() : win.maximize();
  });

  win.on("maximize", () => emitMaximizedChanged(win));
  win.on("unmaximize", () => emitMaximizedChanged(win));

  ipcMain.on(IPC.window.close, () => {
    console.log("[main] win:close");
    win.close();
  });
}

// --------------------
// External links
// --------------------
function isExternalUrl(url: string) {
  if (url.startsWith("mailto:") || url.startsWith("tel:")) return true;
  if (url.startsWith("http://") || url.startsWith("https://")) return true;
  return false;
}

function createMainWindow() {
  const saved = getSavedWindowState();
  console.log("[main] saved window state:", saved);

  const win = new BrowserWindow({
    width: saved?.bounds?.width ?? 1280,
    height: saved?.bounds?.height ?? 800,
    x: saved?.bounds?.x,
    y: saved?.bounds?.y,
    show: false, // чтобы сначала восстановить maximized и только потом показать
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  // Перехват target="_blank" / window.open()
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isExternalUrl(url)) {
      void shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "allow" };
  });

  // Перехват внешней навигации в текущем окне
  win.webContents.on("will-navigate", (event, url) => {
    if (isExternalUrl(url)) {
      event.preventDefault();
      void shell.openExternal(url);
    }
  });

  if (isDev && DEV_SERVER_URL) {
    void win.loadURL(DEV_SERVER_URL);
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    void win.loadFile(path.join(__dirname, "../../ui/dist/index.html"));
  }

  win.setMenu(null);
  Menu.setApplicationMenu(null);

  // восстановление состояния (maximized) и show
  win.once("ready-to-show", () => {
    if (saved?.isMaximized) win.maximize();
    win.show();
  });

  // сохранение размеров/позиции
  attachWindowStatePersistence(win);

  return win;
}

let win: BrowserWindow | null = null;

app.whenReady().then(() => {
  win = createMainWindow();

  ipcMain.handle("window:isMaximized", () => {
    if (!win || win.isDestroyed()) return false;
    return win.isMaximized();
  });

  registerThemeIpc(() => win);
  registerIpcHandlers();
  attachWindowIpc(win);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
