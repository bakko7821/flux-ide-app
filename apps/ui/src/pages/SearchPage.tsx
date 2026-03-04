// import SearchIcon from "../assets/icons/ui/SearchSolid.svg?react";
export default function SearchPage() {
  return (
    <div className="w-72 min-w-72 max-w-72 h-full flex flex-col">
      <div className="flex flex-col">
        <p className="uppercase text-base text-muted pl-2 p-1">Поиск</p>

        <div className="flex flex-row gap-1 items-center justify-start pl-2 truncate p-1">
          <input
            className="text-sm rounded-lg w-full text-muted p-1 border-border border-2"
            title={""}
            placeholder="Введите ваше значение"
          />
        </div>
      </div>

      <div className="p-1 px-2 flex gap-2"></div>
    </div>
  );
}
