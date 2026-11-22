"use client";

import { useEffect } from "react";
import { catalogHref } from "@/lib/catalog-links";

export function CatalogRedirect() {
  useEffect(() => {
    window.location.replace(catalogHref(new URLSearchParams(window.location.search)));
  }, []);
  return null;
}
