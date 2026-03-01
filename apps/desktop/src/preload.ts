import type { IpcInvokeMap } from "@flux/shared";
import { IPC } from "@flux/shared";
import { contextBridge, ipcRenderer } from "electron";

type InvokeKey = keyof IpcInvokeMap;

const api = {
  invoke: async <K extends InvokeKey>(
    channel: K,
    args: Parameters<IpcInvokeMap[K]>[0],
  ): Promise<ReturnType<IpcInvokeMap[K]>> => {
    return ipcRenderer.invoke(channel as string, args);
  },

  window: {
    minimize: () => {
      console.log("minimize click -> send");
      ipcRenderer.send(IPC.window.minimize);
    },
    maximizeToggle: () => {
      console.log("maxToggle click -> send");
      ipcRenderer.send(IPC.window.maxToggle);
    },
    close: () => {
      console.log("close click -> send");
      ipcRenderer.send(IPC.window.close);
    },
  },
};

contextBridge.exposeInMainWorld("flux", api);
export type FluxApi = typeof api;
