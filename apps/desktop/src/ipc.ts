import { ipcMain } from "electron";
import { readFile, writeFile } from "node:fs/promises";
import { IPC } from "@flux/shared";

export function registerIpcHandlers() {
  ipcMain.handle(IPC.fs.readTextFile, async (_evt, args: { path: string }) => {
    const text = await readFile(args.path, "utf-8");
    return { text };
  });

  ipcMain.handle(
    IPC.fs.writeTextFile,
    async (_evt, args: { path: string; text: string }) => {
      await writeFile(args.path, args.text, "utf-8");
      return { ok: true as const };
    },
  );
}
