import { NavMenu } from "./NavMenu/NavMenu";

export const FolderBar = () => {
  return (
    <div className="bg-panel h-full min-w-85 flex flex-row">
      <NavMenu />
      <div className="w-full h-full flex flex-col"></div>
    </div>
  );
};
