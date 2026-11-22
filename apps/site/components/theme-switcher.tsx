"use client";

import { useId, useSyncExternalStore } from "react";
import { normalizeTheme, themeStorageKey, type Theme } from "@/components/theme-settings";
import styles from "./theme-switcher.module.css";

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

const choices = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const satisfies readonly { value: Theme; label: string }[];

function ThemeIcon({ theme }: { theme: Theme }) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      width={17}
      height={17}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {theme === "light" && <>
        <circle cx="12" cy="12" r="3.8" />
        <path d="M12 2.5v2.4m0 14.2v2.4M2.5 12h2.4m14.2 0h2.4M5.3 5.3 7 7m10 10 1.7 1.7m0-13.4L17 7M7 17l-1.7 1.7" />
      </>}
      {theme === "dark" && <path d="M20.2 15.1A8.3 8.3 0 0 1 8.9 3.8 8.35 8.35 0 1 0 20.2 15.1Z" />}
      {theme === "system" && <>
        <rect x="3" y="4.5" width="18" height="12.2" rx="2.1" />
        <path d="M12 16.7v3m-3.4 0h6.8" />
      </>}
    </svg>
  );
}

export function ThemeSwitcher() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const groupName = useId();

  return (
    <fieldset className={styles.switcher} aria-label="Color theme">
      {choices.map(({ value, label }) => (
        <label className={styles.option} key={value} data-value={value}>
          <input
            className={styles.radio}
            type="radio"
            name={groupName}
            value={value}
            checked={theme === value}
            aria-label={label}
            onChange={(event) => {
              if (event.currentTarget.checked) changeTheme(value);
            }}
          />
          <span className={styles.face}><ThemeIcon theme={value} /></span>
          <span className={styles.tooltip} aria-hidden="true">{label}</span>
        </label>
      ))}
    </fieldset>
  );
}
