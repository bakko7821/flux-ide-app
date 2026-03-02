import LogoImage from "../assets/images/icon.png";
import { WindowControls } from "./WindowControls";

export const TitleBar = () => {
  window.theme.getSystem().then(console.log);
  window.theme.onSystemChanged(console.log);

  return (
    <header className="titlebar-drag w-full flex flex-row items-center justify-between bg-panel border-b-2 border-border">
      <section className="titlebar-no-drag flex flex-row gap-2 items-center justify-center">
        <a
          href="https://github.com/bakko7821/flux-ide-app"
          target="_blank"
          className="p-1"
        >
          <img src={LogoImage} alt="Logo" className="w-6 h-6" />
        </a>
        <nav className="flex flex-row items-center justify-center gap-2">
          <button className="text-fg text-xs py-1 px-2 rounded-lg hover:bg-panel2 transition-colors">
            Файл
          </button>
          <button className="text-fg text-xs py-1 px-2 rounded-lg hover:bg-panel2 transition-colors">
            Правка
          </button>
          <button className="text-fg text-xs py-1 px-2 rounded-lg hover:bg-panel2 transition-colors">
            Выделение
          </button>
          <button className="text-fg text-xs py-1 px-2 rounded-lg hover:bg-panel2 transition-colors">
            Вид
          </button>
          <button className="text-fg text-xs py-1 px-2 rounded-lg hover:bg-panel2 transition-colors">
            Переход
          </button>
        </nav>
      </section>
      <WindowControls />
    </header>
  );
};
