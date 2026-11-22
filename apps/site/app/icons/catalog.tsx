"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/components/arc/button/button";
import { SearchField } from "@/components/arc/search-field/search-field";
import SegmentedControl from "@/components/arc/segmented-control/segmented-control";
import { categories, icons } from "@/lib/catalog";

const sizes = [16, 20, 24] as const;
type Size = typeof sizes[number];
const sizeOptions = sizes.map((size) => ({ value: String(size), label: `${size} px` }));

const aliases: Record<string, string> = {
  home: "house start", "map-pin": "location marker", search: "find magnifying glass",
  users: "group people", wallet: "money payment", banknote: "cash bill money",
  download: "save export", upload: "send import", database: "storage data sql",
  "file-text": "document text", image: "photo picture", archive: "box storage",
  "git-branch": "version control branch", bug: "debug error",
};

export function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [size, setSize] = useState<Size>(24);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? "");
    const selectedCategory = params.get("category") ?? "all";
    if (categories.some(({ id }) => id === selectedCategory)) setCategory(selectedCategory);
    const selectedSize = sizes.find((value) => String(value) === params.get("size"));
    if (selectedSize) setSize(selectedSize);
  }, []);

  function change(nextQuery: string, nextCategory: string, nextSize: Size) {
    setQuery(nextQuery);
    setCategory(nextCategory);
    setSize(nextSize);
    const params = new URLSearchParams();
    if (nextQuery) params.set("q", nextQuery);
    if (nextCategory !== "all") params.set("category", nextCategory);
    if (nextSize !== 24) params.set("size", String(nextSize));
    window.history.replaceState(null, "", `/icons/${params.size ? `?${params}` : ""}`);
  }

  const search = query.trim().toLowerCase();
  const terms = search.split(/\s+/).filter(Boolean);
  const results = icons.filter(({ name, category: group }) =>
    (category === "all" || category === group) &&
    terms.every((term) => `${name} ${aliases[name] ?? ""}`.includes(term))
  );
  const rank = (name: string) => name === search ? 0 : name.startsWith(search) ? 1 : 2;
  if (search) results.sort((first, second) => rank(first.name) - rank(second.name));

  return (
    <section aria-label="Icon catalog">
      <div className="catalog-controls">
        <div className="arc-search">
          <SearchField
            label="Search icons"
            placeholder="Search by name or keyword"
            value={query}
            onValueChange={(value) => change(value, category, size)}
          />
        </div>
        <label className="catalog-select">
          <span>Category</span>
          <select value={category} onChange={(event) => change(query, event.target.value, size)}>
            <option value="all">All</option>
            {categories.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
          </select>
        </label>
        <SegmentedControl
          className="arc-segments"
          label="Icon size"
          options={sizeOptions}
          value={String(size)}
          onValueChange={(value) => {
            const selected = sizes.find((option) => String(option) === value);
            if (selected !== undefined) change(query, category, selected);
          }}
        />
      </div>
      <p className="result-count" role="status">{results.length} {results.length === 1 ? "icon" : "icons"}</p>
      {results.length ? (
        <ul className="catalog-grid">
          {results.map(({ name }) => (
            <li key={name}><Link href={`/icons/${name}/`}><Icon name={name} size={size} /><span>{name}</span></Link></li>
          ))}
        </ul>
      ) : (
        <div className="catalog-empty"><p>No icons match your filters.</p><Button type="button" variant="secondary" className="arc-action" onClick={() => change("", "all", size)}>Clear filters</Button></div>
      )}
    </section>
  );
}
