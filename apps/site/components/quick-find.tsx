"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/icon";
import { icons } from "@/lib/catalog";

const starterIcons = ["search", "folder-open", "user-check", "download", "git-branch", "chart-pie"];

export function QuickFind() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState(0);
  const search = query.trim().toLowerCase().replace(/\s+/g, "-");
  const results = search
    ? icons.filter(({ name }) => name.includes(search)).sort((a, b) =>
      Number(b.name === search) - Number(a.name === search) ||
      Number(b.name.startsWith(search)) - Number(a.name.startsWith(search))).slice(0, 6).map(({ name }) => name)
    : starterIcons;

  function open() {
    if (!dialog.current?.open) dialog.current?.showModal();
    input.current?.focus();
  }

  function close() {
    dialog.current?.close();
    trigger.current?.focus();
  }

  useEffect(() => {
    function keyboard(event: globalThis.KeyboardEvent) {
      if (event.defaultPrevented || event.isComposing) return;
      const editable = event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable=true]");
      const shortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (!shortcut && (event.key !== "/" || editable || event.altKey)) return;
      event.preventDefault();
      open();
    }

    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  }, []);

  function handleInput(event: KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const move = event.key === "ArrowDown" ? 1 : -1;
      setSelection((value) => (value + move + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      dialog.current?.querySelectorAll<HTMLAnchorElement>("a[data-result]")[selection]?.click();
    }
  }

  return (
    <>
      <button className="quick-trigger" type="button" ref={trigger} onClick={open} aria-label="Quick search" aria-haspopup="dialog">
        <Icon name="search" size={17} /><span>Search</span><kbd>/</kbd>
      </button>
      <dialog className="quick-dialog" ref={dialog} aria-labelledby="quick-title" onClose={() => trigger.current?.focus()}>
        <div className="quick-head">
          <h2 id="quick-title">Find an icon</h2>
          <button className="quick-close" type="button" onClick={close}>Close <kbd>Esc</kbd></button>
        </div>
        <label className="quick-input">
          <Icon name="search" size={19} />
          <input
            ref={input} aria-label="Search icon names" placeholder="Try folder or download"
            value={query} onChange={(event) => { setQuery(event.target.value); setSelection(0); }}
            onKeyDown={handleInput}
          />
        </label>
        <p className="quick-status" role="status">{search ? (results.length ? `${results.length} quick results` : "No icons found by name.") : "Browse a few icons"}</p>
        <span className="quick-sr" aria-live="polite">{results[selection] ? `Selected: ${results[selection]}` : ""}</span>
        {results.length > 0 && <ul className="quick-results">
          {results.map((name, index) => (
            <li key={name}>
              <Link data-result="" data-current={index === selection || undefined} href={`/icons/${name}/`} onClick={close}>
                <Icon name={name} size={20} /><code>{name}</code><Icon name="arrow-right" size={16} />
              </Link>
            </li>
          ))}
        </ul>}
        <Link className="quick-all text-link" href={search ? `/icons/?q=${encodeURIComponent(query.trim())}` : "/icons/"} onClick={close}>Open icon catalog <span aria-hidden="true">→</span></Link>
      </dialog>
    </>
  );
}
