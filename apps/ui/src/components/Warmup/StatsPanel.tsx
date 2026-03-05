import { memo, useEffect, useState } from "react";

type Props = {
  text: string;
  input: string;
  startedAt: number | null;
  onReset: () => void;
};

export const StatsPanel = memo(function StatsPanel({
  text,
  input,
  startedAt,
  onReset,
}: Props) {
  console.time("Stats reneder");
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    if (input.length >= text.length) clearInterval(interval);

    return () => clearInterval(interval);
  }, [input.length, text.length]);

  const correctChars = input.split("").filter((c, i) => c === text[i]).length;

  const accuracy =
    input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;

  const minutes = startedAt ? (now - startedAt) / 60000 : 0;

  const wpm = minutes > 0 ? Math.round(correctChars / 5 / minutes) : 0;

  console.timeEnd("Stats reneder");
  return (
    <div className="flex items-center gap-6 font-mono">
      <span>WPM: {wpm}</span>
      <span>Accuracy: {accuracy}%</span>

      <button onClick={onReset} className="px-3 py-1 border rounded">
        Reset
      </button>
    </div>
  );
});
