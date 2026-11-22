"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/arc/button/button";
import styles from "./docs.module.css";

export function CodeExample({ label, source }: { label: string; source: string }) {
  const content = useRef<HTMLElement>(null);
  const statusId = useId();
  const [status, setStatus] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(source);
      setStatus("Copied to clipboard.");
    } catch {
      const target = content.current;
      const selection = window.getSelection();
      if (target && selection) {
        const range = document.createRange();
        range.selectNodeContents(target);
        target.focus();
        selection.removeAllRanges();
        selection.addRange(range);
        setStatus("Code selected. Press your keyboard shortcut to copy it.");
      } else {
        setStatus("Could not copy. Select the code to copy it manually.");
      }
    }
  }

  return (
    <figure className={styles.codeExample}>
      <figcaption>
        <span>{label}</span>
        <Button variant="ghost" size="sm" type="button" onClick={copy} aria-describedby={statusId}>
          {status === "Copied to clipboard." ? "Copied" : "Copy code"}
        </Button>
      </figcaption>
      <pre><code ref={content} tabIndex={-1}>{source}</code></pre>
      <span className={styles.srOnly} id={statusId} role="status">{status}</span>
    </figure>
  );
}
