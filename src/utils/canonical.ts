export function normalizeCanonicalPathname(pathname: string): string {
  if (pathname === "/") {
    return pathname;
  }

  const normalizedPathname = pathname.replace(/\/+$/, "");
  return normalizedPathname === "" ? "/" : `${normalizedPathname}/`;
}

export function getCanonicalUrl(pathname: string, siteUrl: URL): string {
  return new URL(normalizeCanonicalPathname(pathname), siteUrl).href;
}
