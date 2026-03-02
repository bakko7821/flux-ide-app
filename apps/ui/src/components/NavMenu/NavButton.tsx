interface NavButtonProps {
  title: string;
  isActive: boolean;
}

export const NavButton = ({ title, isActive }: NavButtonProps) => {
  return (
    <button
      className={`${isActive ? "border-accent bg-panel" : "border-transparent bg-transparent"} group p-3 flex items-center justify-center border-l-2 hover:bg-panel transition-colors`}
      id={title}
    >
      <span className="w-8 h-8 bg-fg"></span>
    </button>
  );
};
