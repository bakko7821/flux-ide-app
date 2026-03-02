import type { DirNode } from "@flux/shared";
import { useState } from "react";
import { useEditor } from "../hooks/useEditor";

function TreeNode({
  node,
  onOpenFile,
}: {
  node: DirNode;
  onOpenFile: (p: string) => void;
}) {
  const [open, setOpen] = useState(true);

  if (node.type === "file") {
    return (
      <button
        className="w-full text-left px-2 py-1 rounded hover:bg-white/5 text-sm"
        onClick={() => onOpenFile(node.path)}
        title={node.path}
      >
        {node.name}
      </button>
    );
  }

  return (
    <div className="pl-2">
      <button
        className="w-full text-left px-2 py-1 rounded hover:bg-white/5 text-sm font-medium"
        onClick={() => setOpen((v) => !v)}
        title={node.path}
      >
        {open ? "📂" : "📁"} {node.name}
      </button>

      {open && (
        <div className="pl-3 border-l border-white/10">
          {node.children.map((c) => (
            <TreeNode key={c.path} node={c} onOpenFile={onOpenFile} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FolderPage() {
  const { folderPath, tree, openFolder, openFile, openFileByPath } =
    useEditor();

  return (
    <div className="w-72 min-w-72 max-w-72 border-r border-white/10 h-full flex flex-col">
      <div className="p-2">
        <p className="uppercase text-base text-muted pl-5">Проводник</p>
        <div
          className="text-xs text-muted mt-1 truncate"
          title={folderPath ?? ""}
        >
          {folderPath ?? "Папка не выбрана"}
        </div>
      </div>

      {!folderPath || !tree ? (
        <div className="p-2 flex gap-2">
          <button
            className="px-3 py-1 rounded-md border border-white/10 hover:bg-white/5"
            onClick={openFolder}
          >
            Открыть папку
          </button>
          <button
            className="px-3 py-1 rounded-md border border-white/10 hover:bg-white/5"
            onClick={openFile}
          >
            Открыть файл
          </button>
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-auto p-2">
          <TreeNode node={tree} onOpenFile={openFileByPath} />
        </div>
      )}
    </div>
  );
}
