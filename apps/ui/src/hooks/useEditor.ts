import { DirNode } from "@flux/shared/ipc-types";
import { createContext, useContext } from "react";

export type EditorCtx = {
  value: string;
  setValue: (v: string) => void;

  folderPath: string | null;
  tree: DirNode | null;

  openFile: () => Promise<void>;
  openFolder: () => Promise<void>;
  openFileByPath: (filePath: string) => Promise<void>;
};

export const Ctx = createContext<EditorCtx | null>(null);

export function useEditor() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useEditor must be used within EditorProvider");
  return v;
}
