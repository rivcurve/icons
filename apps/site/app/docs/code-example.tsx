import { CodeBlock } from "@/components/arc/code-block/code-block";

export function CodeExample({
  label,
  source,
  language = label.split(".").at(-1),
  maxLines,
}: {
  label: string;
  source: string;
  language?: string;
  maxLines?: number;
}) {
  return <CodeBlock code={source} filename={label} language={language} maxLines={maxLines} />;
}
