import { useCallback, useRef, useState } from "react";
import CrossIcon from "../../assets/icons/ui/CrossFilled.svg?react";
import { generateText } from "../../utils/warmupWords";
import { StatsPanel } from "./StatsPanel";
import { TextRenderer } from "./TextRenderer";
import { TypingInput } from "./TypingInput";

interface WarmupProps {
  onClose: () => void;
}

export const Warmup = ({ onClose }: WarmupProps) => {
  const [text, setText] = useState(() => generateText(60));
  const [input, setInput] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const cursorIndex = input.length;

  const handleInput = useCallback(
    (value: string) => {
      if (!startedAt) setStartedAt(Date.now());
      setInput(value);
    },
    [startedAt],
  );

  const reset = () => {
    setText(generateText(60));
    setInput("");
    setStartedAt(null);
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="absolute left-0 top-0 flex items-center justify-center w-full h-full z-50 bg-bg/80"
    >
      <div
        ref={modalRef}
        className="flex flex-col gap-3 max-w-4xl mx-auto bg-panel p-3 rounded-2xl"
      >
        <div className="w-full flex flex-row items-center justify-between">
          <p className="text-2xl font-bold text-fg">Разогрев рук.</p>
          <button onClick={onClose} className="p-2 group transition-colors">
            <CrossIcon className=" w-6 h-6 text-fg group-hover:text-error transition-colors" />
          </button>
        </div>
        <TextRenderer text={text} input={input} cursorIndex={cursorIndex} />
        <TypingInput value={input} onChange={handleInput} />
        <StatsPanel
          text={text}
          input={input}
          startedAt={startedAt}
          onReset={reset}
        />
      </div>
    </div>
  );
};
