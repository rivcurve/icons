"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import SegmentedControl from "@/components/arc/segmented-control/segmented-control";

type Example = {
  id: string;
  label: string;
  icon: string;
  action: readonly [string, string];
  column: string;
  sections: readonly (readonly [string, string])[];
  rows: readonly (readonly [string, string, string])[];
};

const examples: Example[] = [
  {
    id: "files", label: "Files", icon: "folder", action: ["upload", "Upload"], column: "Kind",
    sections: [["folder", "All files"], ["image", "Images"], ["database", "Data"], ["archive", "Archive"]],
    rows: [["folder-open", "Design", "Folder"], ["folder", "Product", "Folder"], ["image", "cover.png", "Image"], ["database", "data.db", "Database"]],
  },
  {
    id: "finance", label: "Finance", icon: "wallet", action: ["download", "Export"], column: "Amount",
    sections: [["wallet", "Overview"], ["credit-card", "Cards"], ["receipt", "Receipts"], ["chart-line", "Reports"]],
    rows: [["banknote", "Invoice", "+$480"], ["credit-card", "Workspace", "−$24"], ["receipt", "Supplies", "−$36"], ["currency-exchange", "Transfer", "+$120"]],
  },
  {
    id: "development", label: "Dev tools", icon: "terminal", action: ["external-link", "Open"], column: "State",
    sections: [["code", "Source"], ["git-branch", "Branches"], ["package", "Packages"], ["bug", "Issues"]],
    rows: [["git-branch", "main", "Active"], ["git-pull-request", "New guide", "In review"], ["git-commit", "SVG export", "Merged"], ["server", "Preview", "Ready"]],
  },
];

export function ProductPreview() {
  const [selected, select] = useState("files");
  const example = examples.find(({ id }) => id === selected) ?? examples[0];

  return (
    <figure className="demo-stage" aria-label="Sample interfaces using Refined icons">
      <svg className="stage-lines" viewBox="0 0 360 180" aria-hidden="true" fill="none">
        <path d="M-12 162h72c52 0 73-20 86-68 14-47 43-65 95-65h133M102 175h56c53 0 74-20 87-68 13-47 42-65 94-65h38" stroke="currentColor" strokeWidth="2.5" />
      </svg>
      <div className="hero-demo">
        <div className="files-demo" aria-live="polite">
          <div className="demo-header">
            <strong><Icon name={example.icon} size={21} />{example.label}</strong>
            <span><Icon name={example.action[0]} size={16} />{example.action[1]}</span>
          </div>
          <div className="demo-body">
            <ul className="demo-sidebar">
              {example.sections.map(([icon, label]) => <li key={label}><Icon name={icon} size={16} />{label}</li>)}
            </ul>
            <table>
              <thead><tr><th scope="col">Name</th><th scope="col">{example.column}</th></tr></thead>
              <tbody>
                {example.rows.map(([icon, label, value]) => (
                  <tr key={label}><td><span><Icon name={icon} size={17} />{label}</span></td><td>{value}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <SegmentedControl
          label="Interface example"
          options={examples.map(({ id, label }) => ({ value: id, label }))}
          value={selected}
          onValueChange={select}
          className="arc-segments demo-switch"
        />
      </div>
    </figure>
  );
}
