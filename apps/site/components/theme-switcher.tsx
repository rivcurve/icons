"use client";

import { useSyncExternalStore } from "react";
import { normalizeTheme, themeStorageKey, type Theme } from "@/components/theme-settings";

const changeEvent = "rivcurve-theme-change";

function applyTheme(theme: Theme) {
  if (theme === "system") {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = theme;
  }
}

function subscribe(onChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key !== themeStorageKey && event.key !== null) return;
    applyTheme(normalizeTheme(event.newValue));
    onChange();
  }

  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, onChange);
  };
}

function getTheme() {
  return normalizeTheme(document.documentElement.dataset.theme);
}

function getServerTheme(): Theme {
  return "system";
}

function changeTheme(theme: Theme) {
  applyTheme(theme);
  try {
    if (theme === "system") {
      localStorage.removeItem(themeStorageKey);
    } else {
      localStorage.setItem(themeStorageKey, theme);
    }
  } catch {
    // The current page can still honor a choice when storage is unavailable.
  }
  window.dispatchEvent(new Event(changeEvent));
}

export function ThemeSwitcher() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  return (
    <select
      className="theme-switcher"
      aria-label="Color theme"
      title="Color theme"
      value={theme}
      onChange={(event) => changeTheme(normalizeTheme(event.target.value))}
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
