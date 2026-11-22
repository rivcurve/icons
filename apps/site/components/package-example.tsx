"use client";

import Link from "next/link";
import { useState } from "react";

const examples = {
  React: {
    code: "import { FolderOpenIcon } from '@rivcurve/react';\n\n<FolderOpenIcon size={20} />",
    href: "/docs/#react",
  },
  Vue: {
    code: "<script setup>\nimport { FolderOpenIcon } from '@rivcurve/vue';\n</script>\n\n<template><FolderOpenIcon :size=\"20\" /></template>",
    href: "/docs/#vue",
  },
  SVG: {
    code: '<img src="./folder-open.svg" width="20" height="20" alt="" />',
    href: "/icons/folder-open/",
  },
} as const;

export function PackageExample() {
  const [selected, choose] = useState<keyof typeof examples>("React");
  const { code, href } = examples[selected];

  return (
    <div className="package-example">
      <div className="package-options" role="group" aria-label="Example format">
        {(["React", "Vue", "SVG"] as const).map((name) => (
          <button key={name} type="button" aria-pressed={name === selected} onClick={() => choose(name)}>
            {name}
          </button>
        ))}
      </div>
      <pre aria-label={`${selected} example`}><code>{code}</code></pre>
      <Link href={href} className="text-link">
        {selected === "SVG" ? "View the icon" : `Read the ${selected} guide`} <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
