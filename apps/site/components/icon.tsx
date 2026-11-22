import { createElement } from "react";
import { findIcon, svgAttributes } from "@/lib/catalog";

export function Icon({
  name, size = 24, className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const icon = findIcon(name);
  if (!icon) return null;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      width={size}
      height={size}
      viewBox={svgAttributes.viewBox}
      fill={svgAttributes.fill}
      stroke={svgAttributes.stroke}
      strokeWidth={svgAttributes["stroke-width"]}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icon.shapes.map(({ tag, attrs }, index) => createElement(tag, { key: index, ...attrs }))}
    </svg>
  );
}
