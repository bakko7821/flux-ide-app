export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}", // всё внутри ui/src
    "../desktop/src/**/*.{ts,tsx,js,jsx}", // если у тебя в desktop есть TSX/React
    "../shared/src/**/*.{ts,tsx,js,jsx}", // если есть shared UI
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // surfaces
        bg: "rgb(var(--bg) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        panel2: "rgb(var(--panel-2) / <alpha-value>)",

        // borders
        border: "rgb(var(--border) / <alpha-value>)",

        // text
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        disabled: "rgb(var(--disabled) / <alpha-value>)",

        // status
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
        info: "rgb(var(--info) / <alpha-value>)",

        // brand
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--accent-hover) / <alpha-value>)",
        "accent-pressed": "rgb(var(--accent-pressed) / <alpha-value>)",
      },
    },
  },
};
