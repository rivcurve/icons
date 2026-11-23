"use client";

import Link from "next/link";
import { useState } from "react";
import SegmentedControl from "@/components/arc/segmented-control/segmented-control";

const examples = {
  React: {
    code: "import { FolderOpenIcon } from '@rivcurve/react';\n\n<FolderOpenIcon size={20} />",
    href: "/docs/#react",
  },
  Vue: {
    code: "<script setup>\nimport { FolderOpenIcon } from '@rivcurve/vue';\n</script>\n\n<template><FolderOpenIcon :size=\"20\" /></template>\n\n<!-- Planned: @rivcurve/vue is not published yet -->",
    href: "/docs/#vue",
  },
  SVG: {
    code: '<img src="./folder-open.svg" width="20" height="20" alt="" />',
    href: "/icons/folder-open/",
  },
} as const;

const formats = (["React", "Vue", "SVG"] as const).map((value) => ({ value, label: value }));

export function PackageExample() {
  const [selected, choose] = useState<keyof typeof examples>("React");
  const { code, href } = examples[selected];

  return (
    <div className="package-example">
      <SegmentedControl
        className="arc-segments"
        options={formats}
        value={selected}
        label="Example format"
        onValueChange={(value) => {
          const format = formats.find((option) => option.value === value);
          if (format) choose(format.value);
        }}
      />
      <pre aria-label={`${selected} example`}><code>{code}</code></pre>
      <Link href={href} className="text-link">
        {selected === "SVG" ? "View the icon" : `Read the ${selected} guide`} <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
