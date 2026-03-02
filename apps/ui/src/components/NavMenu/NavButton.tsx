interface NavButtonProps {
  title: string;
  isActive: boolean;
}

export const NavButton = ({ title, isActive }: NavButtonProps) => {
  return (
    <button
      className={`${isActive ? "border-accent bg-panel" : "border-transparent bg-transparent"} group p-2 flex items-center justify-center border-l-2 hover:bg-panel transition-colors`}
      id={title}
    >
      <span className="w-10 h-10 bg-fg"></span>
    </button>
  );
};
