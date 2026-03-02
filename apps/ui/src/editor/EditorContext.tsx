import { DirNode, IPC } from "@flux/shared";
import React, { useMemo, useState } from "react";
import { Ctx } from "../hooks/useEditor";

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState("");
  const [folderPath, setFolderPath] = useState<string | null>(null);
  const [tree, setTree] = useState<DirNode | null>(null);

  const openFileByPath = async (filePath: string) => {
    const { text } = await window.flux.invoke(IPC.fs.readTextFile, {
      path: filePath,
    });
    setValue(text);
  };

  const openFile = async () => {
    const pick = await window.flux.invoke(IPC.fs.openFileDialog);
    if (pick.canceled) return;
    await openFileByPath(pick.path);
  };

  const openFolder = async () => {
    const pick = await window.flux.invoke(IPC.fs.openFolderDialog);
    if (pick.canceled) return;

    setFolderPath(pick.path);

    const { tree } = await window.flux.invoke(IPC.fs.readDirTree, {
      root: pick.path,
      allowedExt: [
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
      ignore: ["node_modules", ".git", "dist", "build"],
      maxDepth: 8,
      maxEntries: 5000,
    });

    setTree(tree);
  };

  const ctx = useMemo(
    () => ({
      value,
      setValue,
      folderPath,
      tree,
      openFile,
      openFolder,
      openFileByPath,
    }),
    [value, folderPath, tree, openFile],
  );

  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
}
