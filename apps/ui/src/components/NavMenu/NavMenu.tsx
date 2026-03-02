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
    <nav className="h-full bg-panel2 border-r-2 border-border flex flex-col">
      {navButtonsArray.map((navButton) => (
        <NavButton
          key={navButton.id}
          title={navButton.title}
          isActive={navButton.isActive}
        />
      ))}
    </nav>
  );
};
