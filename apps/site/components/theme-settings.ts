export const themeStorageKey = "rivcurve-theme";

export type Theme = "system" | "light" | "dark";

export function normalizeTheme(value: string | null | undefined): Theme {
  return value === "light" || value === "dark" ? value : "system";
}

export const themeBootScript = `(() => {
  try {
    const theme = localStorage.getItem(${JSON.stringify(themeStorageKey)});
    if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme;
  } catch {}
})();`;
