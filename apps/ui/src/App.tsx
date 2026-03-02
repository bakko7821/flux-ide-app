import { useEffect, useState } from "react";
import { FolderBar } from "./components/FolderBar";
import { TitleBar } from "./components/TitleBar/TitleBar";
import MonacoEditor from "./editor/MonacoEditor";
import { initSystemThemeSync } from "./utils/theme";

export default function App() {
  const [value, setValue] = useState("// Open a file path and load it 🚀\n");

  useEffect(() => {
    let unsub: undefined | (() => void);
    initSystemThemeSync().then((u) => (unsub = u));
    return () => unsub?.();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();

      const isTypingControl =
        tag === "input" ||
        tag === "textarea" ||
        (target?.isContentEditable ?? false);

      if (isTypingControl) return;

      e.preventDefault();
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, []);

  return (
    <div className="w-screen h-screen bg-bg flex flex-col">
      <TitleBar></TitleBar>
      <main className="w-full flex-1 min-h-0 flex flex-row">
        <FolderBar />
        <div className="w-full h-full flex flex-col">
          <div className="w-full bg-panel p-3"></div>
          <MonacoEditor
            value={value}
            onChange={setValue}
            language="typescript"
          />
        </div>
      </main>
    </div>
  );
}
