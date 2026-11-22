"use client";

import { useId, useSyncExternalStore } from "react";
import { Icon } from "@/components/icon";
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
  { value: "light", label: "Light", icon: "sun" },
  { value: "dark", label: "Dark", icon: "moon" },
  { value: "system", label: "System", icon: "monitor" },
] as const satisfies readonly { value: Theme; label: string; icon: string }[];

export function ThemeSwitcher() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const groupName = useId();

  return (
    <fieldset className={styles.switcher} aria-label="Color theme">
      {choices.map(({ value, label, icon }) => (
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
          <span className={styles.face}><Icon name={icon} size={17} className={styles.icon} /></span>
          <span className={styles.tooltip} aria-hidden="true">{label}</span>
        </label>
      ))}
    </fieldset>
  );
}
