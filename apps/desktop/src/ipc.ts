import { IPC } from "@flux/shared";
import { dialog, ipcMain } from "electron";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type DirNode =
  | { type: "dir"; name: string; path: string; children: DirNode[] }
  | { type: "file"; name: string; path: string; ext: string };

async function buildTree(opts: {
  root: string;
  allowedExt?: string[];
  ignore?: string[];
  maxDepth: number;
  maxEntries: number;
}): Promise<DirNode> {
  const allowed = new Set(
    (opts.allowedExt ?? []).map((e) => e.toLowerCase().replace(/^\./, "")),
  );
  const ignore = new Set(
    opts.ignore ?? ["node_modules", ".git", "dist", "build", ".next"],
  );
  let entriesCount = 0;

  const walk = async (dirPath: string, depth: number): Promise<DirNode> => {
    const name = path.basename(dirPath);
    if (depth > opts.maxDepth) {
      return { type: "dir", name, path: dirPath, children: [] };
    }

    const items = await readdir(dirPath, { withFileTypes: true });
    const children: DirNode[] = [];

    for (const it of items) {
      if (++entriesCount > opts.maxEntries) break;

      const full = path.join(dirPath, it.name);

      // ignore by name (for directories and files)
      if (ignore.has(it.name)) continue;

      if (it.isDirectory()) {
        children.push(await walk(full, depth + 1));
      } else if (it.isFile()) {
        const ext = path.extname(it.name).toLowerCase().replace(/^\./, "");
        if (allowed.size === 0 || allowed.has(ext)) {
          children.push({ type: "file", name: it.name, path: full, ext });
        }
      }
    }

    // dirs first, then files; alphabetical
    children.sort((a, b) => {
      if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

    return { type: "dir", name, path: dirPath, children };
  };

  return walk(opts.root, 0);
}

export function registerIpcHandlers() {
  console.log("[main] registerIpcHandlers called");
  ipcMain.handle(
    IPC.fs.readDirTree,
    async (
      _evt,
      args: {
        root: string;
        allowedExt?: string[];
        ignore?: string[];
        maxDepth?: number;
        maxEntries?: number;
      },
    ) => {
      const tree = await buildTree({
        root: args.root,
        allowedExt: args.allowedExt ?? [
          "ts",
          "tsx",
          "js",
          "jsx",
          "json",
          "md",
          "css",
          "html",
          "txt",
        ],
        ignore: args.ignore,
        maxDepth: args.maxDepth ?? 8,
        maxEntries: args.maxEntries ?? 5000,
      });

      return { tree };
    },
  );

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

  ipcMain.handle(IPC.fs.openFileDialog, async () => {
    console.log("[main] fs:openFileDialog handler hit");
    const res = await dialog.showOpenDialog({
      properties: ["openFile"],
    });

    if (res.canceled || res.filePaths.length === 0)
      return { canceled: true as const };
    return { canceled: false as const, path: res.filePaths[0] };
  });

  ipcMain.handle(IPC.fs.openFolderDialog, async () => {
    console.log("[main] fs:openFolderDialog handler hit");
    const res = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    if (res.canceled || res.filePaths.length === 0)
      return { canceled: true as const };
    return { canceled: false as const, path: res.filePaths[0] };
  });
}
