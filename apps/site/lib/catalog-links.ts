export const catalogAnchor = "/#catalog";

export function catalogHref(params: URLSearchParams) {
  return `/${params.size ? `?${params}` : ""}#catalog`;
}
