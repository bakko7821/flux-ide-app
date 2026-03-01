type Theme = "dark" | "light";

function applyTheme(t: Theme) {
  document.documentElement.classList.toggle("dark", t === "dark");
}

export async function initSystemThemeSync() {
  const t = await window.theme.getSystem();
  applyTheme(t);

  // следим за изменениями системной темы
  const unsubscribe = window.theme.onSystemChanged((next) => {
    applyTheme(next);
  });

  return unsubscribe;
}
