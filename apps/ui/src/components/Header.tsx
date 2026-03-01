import LogoImage from "../assets/images/icon.png";
import { WindowControls } from "./WindowControls";

export const Header = () => {
  window.theme.getSystem().then(console.log);
  window.theme.onSystemChanged(console.log);

  return (
    <header className="w-full flex flex-row items-center justify-between bg-panel">
      <section className="flex flex-row gap-2 items-center justify-center">
        <div className="p-2">
          <img src={LogoImage} alt="Logo" className="w-6 h-6" />
        </div>
        <nav className="flex flex-row items-center justify-center gap-2">
          <button className="text-fg text-xs p-1 rounded-lg">Файл</button>
          <button className="text-fg text-xs p-1 rounded-lg">Правка</button>
          <button className="text-fg text-xs p-1 rounded-lg">Выделение</button>
          <button className="text-fg text-xs p-1 rounded-lg">Вид</button>
          <button className="text-fg text-xs p-1 rounded-lg">Переход</button>
        </nav>
      </section>
      <WindowControls />
    </header>
  );
};
