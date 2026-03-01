import { useEffect } from "react";
import { Header } from "./components/Header";
import { initSystemThemeSync } from "./utils/theme";
// import CrossIcon from "../src/assets/icons/ui/CrossFilled.svg"

export default function App() {
  // const [path, setPath] = useState("");
  // const [value, setValue] = useState("// Open a file path and load it 🚀\n");

  // const open = async () => {
  //   if (!path) return;
  //   const res = await window.flux.invoke(IPC.fs.readTextFile, { path });
  //   setValue(res.text);
  // };

  // const save = async () => {
  //   if (!path) return;
  //   await window.flux.invoke(IPC.fs.writeTextFile, { path, text: value });
  // };

  useEffect(() => {
    let unsub: undefined | (() => void);
    initSystemThemeSync().then((u) => (unsub = u));
    return () => unsub?.();
  }, []);

  return (
    <div className="w-screen h-screen bg-bg">
      <Header></Header>
    </div>
    // <div className="w-screen bg-red-300 flex flex-col items-start justify-start">
    //   <div className="w-full items-center justify-between flex flex-row">
    //     <div className="">
    //       <img
    //         src="apps/ui/src/assets/images/icon.png"
    //         alt="flux"
    //         className="w-6 h-6"
    //       />
    //       <div className=""></div>
    //     </div>

    //     <div className="flex flex-row items-center justify-center gap-0">
    //       <button
    //
    //         className="px-3 py-1 flex items-center justify-center"
    //       >
    //         —
    //       </button>
    //       <button
    //
    //         className="px-3 py-1 flex items-center justify-center"
    //       >
    //         ▢
    //       </button>
    //       <button
    //
    //         className="px-3 py-1 flex items-center justify-center"
    //       >
    //         ✕
    //       </button>
    //     </div>
    //   </div>
    //   <div>
    //     <input
    //       value={path}
    //       onChange={(e) => setPath(e.target.value)}
    //       placeholder="C:\path\to\file.ts"
    //     />
    //     <button onClick={open}>Open</button>
    //     <button onClick={save}>Save</button>
    //   </div>

    //   <div>
    //     <MonacoEditor value={value} onChange={setValue} language="typescript" />
    //   </div>
    // </div>
  );
}
