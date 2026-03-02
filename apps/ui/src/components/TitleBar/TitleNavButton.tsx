interface TitleNavButtonProps {
  title: string;
}

export const TitleNavButton = ({ title }: TitleNavButtonProps) => {
  return (
    <button className=" flex item justify-center py-1 group">
      <span className="capitalize text-xs font-medium text-fg rounded-lg group-hover:bg-panel2 p-1 px-2">
        {title}
      </span>
    </button>
  );
};
