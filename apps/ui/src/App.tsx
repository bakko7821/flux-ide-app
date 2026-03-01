import { IPC } from "@flux/shared";
import { useState } from "react";
import MonacoEditor from "./editor/MonacoEditor";

export default function App() {
  const [path, setPath] = useState("");
  const [value, setValue] = useState("// Open a file path and load it 🚀\n");

  const open = async () => {
    if (!path) return;
    const res = await window.flux.invoke(IPC.fs.readTextFile, { path });
    setValue(res.text);
  };

  const save = async () => {
    if (!path) return;
    await window.flux.invoke(IPC.fs.writeTextFile, { path, text: value });
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="titlebar">
        <div className="drag-area">Flux IDE</div>

        <div className="window-controls">
          <button onClick={() => window.flux?.window?.minimize()}>—</button>
          <button onClick={() => window.flux?.window?.maximizeToggle()}>
            ▢
          </button>
          <button onClick={() => window.flux?.window?.close()}>✕</button>
        </div>
      </div>
      <div
        style={{ padding: 8, display: "flex", gap: 8, alignItems: "center" }}
      >
        <input
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="C:\path\to\file.ts"
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={open} style={{ padding: "8px 12px" }}>
          Open
        </button>
        <button onClick={save} style={{ padding: "8px 12px" }}>
          Save
        </button>
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <MonacoEditor value={value} onChange={setValue} language="typescript" />
      </div>
    </div>
  );
}
