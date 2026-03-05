import { useCallback, useState } from "react";
import { generateText } from "../../utils/warmupWords";
import { StatsPanel } from "./StatsPanel";
import { TextRenderer } from "./TextRenderer";
import { TypingInput } from "./TypingInput";

export const Warmup = () => {
  console.time("Warmup render");
  const [text, setText] = useState(() => generateText(60));
  const [input, setInput] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);

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

  console.time("Warmup render");

  return (
    <div className="absolute left-0 top-0 flex items-center justify-center w-full h-full z-50 bg-bg/60">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto bg-panel p-3 rounded-2xl">
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
