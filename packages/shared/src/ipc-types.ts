export const IPC = {
  fs: {
    readTextFile: "fs:readTextFile",
    writeTextFile: "fs:writeTextFile",

    openFileDialog: "fs:openFileDialog",
    openFolderDialog: "fs:openFolderDialog",
    readDirTree: "fs:readDirTree",
  },
  window: {
    minimize: "win:minimize",
    maxToggle: "win:maxToggle",
    close: "win:close",
  },
} as const;

export type DirNode =
  | { type: "dir"; name: string; path: string; children: DirNode[] }
  | { type: "file"; name: string; path: string; ext: string };

export type IpcInvokeMap = {
  [IPC.fs.readDirTree]: (args: {
    root: string;
    allowedExt?: string[]; // ["ts","tsx","js",...]
    ignore?: string[]; // ["node_modules",".git",...]
    maxDepth?: number; // safety
    maxEntries?: number; // safety
  }) => Promise<{ tree: DirNode }>;
  [IPC.fs.readTextFile]: (args: { path: string }) => Promise<{ text: string }>;
  [IPC.fs.writeTextFile]: (args: {
    path: string;
    text: string;
  }) => Promise<{ ok: true }>;

  [IPC.fs.openFileDialog]: (
    args: void,
  ) => Promise<{ canceled: true } | { canceled: false; path: string }>;

  [IPC.fs.openFolderDialog]: (
    args: void,
  ) => Promise<{ canceled: true } | { canceled: false; path: string }>;
};

export type IpcSendMap = {
  [IPC.window.minimize]: void;
  [IPC.window.maxToggle]: void;
  [IPC.window.close]: void;
};
