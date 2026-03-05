import { memo } from "react";

type Props = {
  text: string;
  input: string;
  cursorIndex: number;
};

export const TextRenderer = memo(function TextRenderer({ text, input }: Props) {
  const typed = text.slice(0, input.length);
  const rest = text.slice(input.length);

  const typedChars = typed.split("");

  return (
    <p className="font-mono text-lg leading-relaxed select-none whitespace-pre-wrap">
      {/* напечатанная часть */}
      {typedChars.map((char, i) => {
        const correct = input[i] === char;

        return (
          <span
            key={i}
            className={`inline-block ${correct ? "text-accent" : "text-error"}`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}

      {/* текущий символ + caret */}
      {rest.length > 0 && (
        <span className="relative inline-block">
          {/* caret */}
          <span className="caret absolute left-0 top-[15%] h-[70%] w-0.5 bg-white animate-pulse pointer-events-none" />

          {/* символ */}
          <span className="text-muted">
            {rest[0] === " " ? "\u00A0" : rest[0]}
          </span>
        </span>
      )}

      {/* оставшийся текст */}
      <span className="text-muted">{rest.slice(1)}</span>
    </p>
  );
});
