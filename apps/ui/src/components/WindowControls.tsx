import { useEffect, useState } from "react";
import CrossIcon from "../assets/icons/ui/CrossFilled.svg?react";
import MaximizeIcon from "../assets/icons/ui/Maximize24Regular.svg?react";
import MinimizeIcon from "../assets/icons/ui/Minus.svg?react";
import RestoreIcon from "../assets/icons/ui/WindowRestoreLine.svg?react";

export function WindowControls() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    window.flux.window.isMaximized().then(setIsMaximized);

    const unsubscribe = window.flux.window.onMaximizedChanged(setIsMaximized);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-row items-center justify-center gap-1">
      <button
        className="px-3 py-1 text-muted hover:text-fg hover:bg-panel-2 transition-colors"
        onClick={() => window.flux.window.minimize()}
        aria-label="Minimize"
      >
        <MinimizeIcon className="w-4 h-4" />
      </button>

      <button
        className="px-3 py-1 text-muted hover:text-fg hover:bg-panel-2 transition-colors"
        onClick={() => window.flux.window.maximizeToggle()}
        aria-label={isMaximized ? "Restore" : "Maximize"}
      >
        {isMaximized ? (
          <RestoreIcon className="w-4 h-4" />
        ) : (
          <MaximizeIcon className="w-4 h-4 " />
        )}
      </button>

      <button
        className="
          px-3 py-1 text-muted
          hover:text-white hover:bg-error
          transition-colors
        "
        onClick={() => window.flux.window.close()}
        aria-label="Close"
      >
        <CrossIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
