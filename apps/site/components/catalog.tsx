"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/components/arc/button/button";
import { SearchField } from "@/components/arc/search-field/search-field";
import { Select } from "@/components/arc/select/select";
import SegmentedControl from "@/components/arc/segmented-control/segmented-control";
import { categories, searchIcons } from "@/lib/catalog";
import { catalogHref } from "@/lib/catalog-links";

const sizes = [16, 20, 24] as const;
type Size = typeof sizes[number];
const sizeOptions = sizes.map((size) => ({ value: String(size), label: `${size} px` }));
const categoryOptions = [{ value: "all", label: "All categories" }, ...categories.map(({ id, label }) => ({ value: id, label }))];

export function Catalog() {
  const searchInput = useRef<HTMLInputElement>(null);
  const [searchReady, setSearchReady] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [size, setSize] = useState<Size>(24);

  useEffect(() => {
    function readLocation() {
      const params = new URLSearchParams(window.location.search);
      const selectedCategory = params.get("category");
      setQuery(params.get("q") ?? "");
      setCategory(categories.find(({ id }) => id === selectedCategory)?.id ?? "all");
      setSize(sizes.find((value) => String(value) === params.get("size")) ?? 24);
    }

    readLocation();
    setSearchReady(true);
    window.addEventListener("popstate", readLocation);
    return () => window.removeEventListener("popstate", readLocation);
  }, []);

  function change(nextQuery: string, nextCategory: string, nextSize: Size) {
    setQuery(nextQuery);
    setCategory(nextCategory);
    setSize(nextSize);
    const params = new URLSearchParams();
    if (nextQuery) params.set("q", nextQuery);
    if (nextCategory !== "all") params.set("category", nextCategory);
    if (nextSize !== 24) params.set("size", String(nextSize));
    window.history.replaceState(null, "", catalogHref(params));
  }

  function clearFilters() {
    change("", "all", size);
    searchInput.current?.focus();
  }

  const results = searchIcons(query, category);

  return (
    <section aria-label="Icon catalog">
      <div className="catalog-controls">
        <div className="arc-search">
          <SearchField
            ref={searchInput}
            label="Search icons"
            placeholder={searchReady ? "Search by name or keyword" : "Loading search…"}
            disabled={!searchReady}
            value={query}
            onValueChange={(value) => change(value, category, size)}
          />
        </div>
        <Select
          label="Category"
          value={category}
          options={categoryOptions}
          onValueChange={(value) => change(query, value, size)}
        />
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
        <div className="catalog-empty"><p>No icons match your filters.</p><Button type="button" variant="secondary" className="arc-action" onClick={clearFilters}>Clear filters</Button></div>
      )}
    </section>
  );
}
