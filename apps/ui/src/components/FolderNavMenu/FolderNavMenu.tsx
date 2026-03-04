import { ComponentType, SVGProps, useEffect, useRef, useState } from "react";
import ExtensionsIcon from "../../assets/icons/ui/Extensions.svg?react";
import FileIcon from "../../assets/icons/ui/File.svg?react";
import SearchIcon from "../../assets/icons/ui/SearchSolid.svg?react";
import SettingsIcon from "../../assets/icons/ui/Settings.svg?react";
import UserIcon from "../../assets/icons/ui/User.svg?react";
import { FolderNavButton } from "./FolderNavButton";
import { FolderNavLink } from "./FolderNavLink";

type NavItem = {
  id: number;
  title: string;
  hotkey: string;
  to?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  modal?: Exclude<ModalType, null>;
};

const navLinksArray: NavItem[] = [
  {
    id: 0,
    title: "Folder",
    hotkey: "Ctrl + Shift + E",
    to: "/folder",
    icon: FileIcon,
  },
  {
    id: 1,
    title: "Search",
    hotkey: "Ctrl + Shift + F",
    to: "/search",
    icon: SearchIcon,
  },
  {
    id: 2,
    title: "Extensions",
    hotkey: "Ctrl + Shift + X",
    to: "/extensions",
    icon: ExtensionsIcon,
  },
];

const navButtonsArray: NavItem[] = [
  {
    id: 0,
    title: "User",
    hotkey: "Ctrl + Shift + U",
    icon: UserIcon,
    modal: "user",
  },
  {
    id: 1,
    title: "Settings",
    hotkey: "Ctrl + Shift + S",
    icon: SettingsIcon,
    modal: "settings",
  },
];

type ModalType = "user" | "settings" | null;

function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onOutside: () => void,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el) return;

      if (e.target instanceof Node && el.contains(e.target)) return;

      onOutside();
    };

    document.addEventListener("mousedown", handler, true);
    document.addEventListener("touchstart", handler, true);

    return () => {
      document.removeEventListener("mousedown", handler, true);
      document.removeEventListener("touchstart", handler, true);
    };
  }, [ref, onOutside, enabled]);
}

export const FolderNavMenu = () => {
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const closeModal = () => setOpenModal(null);

  const toggleModal = (type: Exclude<ModalType, null>) => {
    console.log("start togleModal");
    setOpenModal((prev) => (prev === type ? null : type));
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, closeModal, openModal !== null);

  const modalPosition =
    openModal === "user"
      ? "left-full bottom-14"
      : openModal === "settings"
        ? "left-full bottom-0"
        : "";

  return (
    <nav className="relative h-full bg-panel2 border-r-2 border-border flex flex-col items-center justify-between">
      <div className="w-full">
        {navLinksArray.map((navLink) => (
          <FolderNavLink
            key={navLink.id}
            title={navLink.title}
            hotkey={navLink.hotkey}
            icon={navLink.icon}
            to={navLink.to || "/"}
          />
        ))}
      </div>

      <div className="w-full">
        {navButtonsArray.map((navButton) => (
          <FolderNavButton
            key={navButton.id}
            title={navButton.title}
            hotkey={navButton.hotkey}
            icon={navButton.icon}
            onClickFunction={() => toggleModal(navButton.modal!)}
          />
        ))}
      </div>

      {openModal !== null && (
        <div
          ref={modalRef}
          className={`absolute ${modalPosition} p-10 bg-panel2 rounded-r-xl`}
        ></div>
      )}
    </nav>
  );
};
