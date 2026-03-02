import LogoImage from "../../assets/images/icon.png";
import { WindowControls } from "../WindowControls";
import { TitleNavButton } from "./TitleNavButton";

export const TitleBar = () => {
  window.theme.getSystem().then(console.log);
  window.theme.onSystemChanged(console.log);

  const navButtonsArray = [
    { id: 0, title: "Файл" },
    { id: 1, title: "Правка" },
    { id: 2, title: "Выделение" },
    { id: 3, title: "Вид" },
    { id: 4, title: "Переход" },
    { id: 5, title: "Выполнить" },
    { id: 6, title: "Терминал" },
    { id: 7, title: "Справка" },
  ];

  return (
    <header className="titlebar-drag w-full flex flex-row items-center justify-between bg-panel border-b-2 border-border">
      <section className="titlebar-no-drag flex flex-row items-center justify-center">
        <span
          // href="https://github.com/bakko7821/flux-ide-app"
          // target="_blank"
          className="p-1 pr-3 "
        >
          <img src={LogoImage} alt="Logo" className="w-6 h-6" />
        </span>
        <nav className="flex flex-row items-center justify-center br-green-300">
          {navButtonsArray.map((navButton) => (
            <TitleNavButton key={navButton.id} title={navButton.title} />
          ))}
        </nav>
      </section>
      <WindowControls />
    </header>
  );
};
