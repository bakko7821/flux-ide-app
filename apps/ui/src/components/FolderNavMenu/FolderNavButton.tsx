import { ComponentType, SVGProps } from "react";

interface FolderNavButtonProps {
  title: string;
  hotkey: string;
  onClickFunction: () => void;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}
export const FolderNavButton = ({
  title,
  hotkey,
  onClickFunction,
  icon: Icon,
}: FolderNavButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClickFunction}
      className="group p-3 flex items-center justify-center border-l-2 border-transparent transition-colors"
    >
      <Icon
        className="w-6 h-6 text-muted group-hover:text-fg"
        aria-hidden="true"
        focusable="false"
      />
      <span
        className="
          pointer-events-none absolute left-full ml-2
          whitespace-nowrap rounded-lg
          bg-panel2 border border-border px-2 py-1
          text-xs text-fg opacity-0
          translate-x-1 transition
          group-hover:opacity-100 group-hover:translate-x-0
        "
      >
        {`${title} ${hotkey && `( ${hotkey} )`}`}
      </span>
    </button>
  );
};
