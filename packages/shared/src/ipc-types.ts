export const IPC = {
  fs: {
    readTextFile: "fs:readTextFile",
    writeTextFile: "fs:writeTextFile",
  },
  window: {
    minimize: "win:minimize",
    maxToggle: "win:maxToggle",
    close: "win:close",
  },
} as const;

export type IpcInvokeMap = {
  [IPC.fs.readTextFile]: (args: { path: string }) => { text: string };
  [IPC.fs.writeTextFile]: (args: { path: string; text: string }) => {
    ok: true;
  };
};

export type IpcSendMap = {
  [IPC.window.minimize]: void;
  [IPC.window.maxToggle]: void;
  [IPC.window.close]: void;
};
