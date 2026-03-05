import { memo, useMemo } from "react";

type Props = {
  text: string;
  input: string;
  cursorIndex: number;
};

export const TextRenderer = memo(function TextRenderer({
  text,
  input,
  cursorIndex,
}: Props) {
  console.time("TextRenderer render");
  const chars = useMemo(() => text.split(""), [text]);

  console.timeEnd("TextRenderer render");
  return (
    <p className=" font-mono text-lg leading-relaxed select-none flex flex-wrap items-start justify-start">
      {chars.map((char, index) => {
        let color = "text-muted";

        if (index < input.length) {
          color = input[index] === char ? "text-green-500" : "text-red-500";
        }

        return (
          <span key={index} className="relative">
            {cursorIndex === index && (
              <span className="caret absolute -left-0.5 top-0 bottom-0 w-0.5 bg-white animate-pulse" />
            )}

            <span className={color}>{char === " " ? "\u00A0" : char}</span>
          </span>
        );
      })}

      {/* курсор если в конце строки */}
      {cursorIndex === text.length && (
        <span className="caret w-0.5 bg-white animate-pulse ml-px" />
      )}
    </p>
  );
});
