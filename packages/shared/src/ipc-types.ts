export const IPC = {
  fs: {
    readTextFile: "fs:readTextFile",
    writeTextFile: "fs:writeTextFile"
  }
} as const;

export type IpcInvokeMap = {
  [IPC.fs.readTextFile]: (args: { path: string }) => { text: string };
  [IPC.fs.writeTextFile]: (args: { path: string; text: string }) => { ok: true };
};
