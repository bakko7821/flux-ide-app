import { useEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const TypingInput = ({ value, onChange }: Props) => {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        return;
      }

      const current = valueRef.current;

      if (e.key.length === 1) {
        onChange(current + e.key);
      }

      if (e.key === "Backspace") {
        onChange(current.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [onChange]);

  return null;
};
