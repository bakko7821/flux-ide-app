import SettingsIcon from "../../assets/icons/ui/Settings.svg?react";
import UserIcon from "../../assets/icons/ui/User.svg?react";
import { NavButton } from "./NavButton";

const navButtonsArray = [
  { id: 0, title: "123", isActive: true },
  { id: 1, title: "123", isActive: false },
  { id: 2, title: "123", isActive: false },
  { id: 3, title: "123", isActive: false },
  { id: 4, title: "123", isActive: false },
];

export const NavMenu = () => {
  return (
    <nav className="h-full bg-panel2 border-r-2 border-border flex flex-col items-center justify-between">
      <div className="">
        {navButtonsArray.map((navButton) => (
          <NavButton
            key={navButton.id}
            title={navButton.title}
            isActive={navButton.isActive}
          />
        ))}
      </div>
      <div className="">
        <button className="group p-3 flex items-center justify-center border-l-2 border-transparent transition-colors">
          <UserIcon className="w-8 h-8 text-muted group-hover:text-fg" />
        </button>
        <button className="group p-3 flex items-center justify-center border-l-2 border-transparent transition-colors">
          <SettingsIcon className="w-8 h-8 text-muted group-hover:text-fg" />
        </button>
      </div>
    </nav>
  );
};
