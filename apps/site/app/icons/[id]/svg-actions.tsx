"use client";

import { useRef, useState } from "react";
import { iconSvg, type IconRecord } from "@/lib/catalog";
import { Button } from "@/components/arc/button/button";
import { Select } from "@/components/arc/select/select";

const exportSizes = [16, 20, 24].map((value) => ({ value: String(value), label: `${value} px` }));

export function SvgActions({ icon }: { icon: IconRecord }) {
  const [size, setSize] = useState(24);
  const [status, setStatus] = useState("");
  const source = useRef<HTMLTextAreaElement>(null);
  const svg = iconSvg(icon, size);

  async function copy() {
    try {
      await navigator.clipboard.writeText(svg);
      setStatus("SVG copied.");
    } catch {
      source.current?.focus();
      source.current?.select();
      setStatus("SVG selected. Copy it with your keyboard.");
    }
  }

  return (
    <section className="svg-actions" aria-label="Export SVG">
      <div className="arc-export-select">
        <Select
          label="Export size"
          value={String(size)}
          options={exportSizes}
          onValueChange={(value) => { setSize(Number(value)); setStatus(""); }}
        />
      </div>
      <textarea aria-label="SVG source" readOnly ref={source} value={svg} rows={7} spellCheck={false} />
      <div className="export-buttons">
        <Button className="arc-action" type="button" onClick={copy}>{status === "SVG copied." ? "Copied" : "Copy SVG"}</Button>
        <a className="button button-secondary" href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`} download={`${icon.name}.svg`}>Download SVG</a>
      </div>
      <p className="export-status" role="status">{status}</p>
    </section>
  );
}
