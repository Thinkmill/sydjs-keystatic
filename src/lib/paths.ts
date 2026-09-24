export function sitePath(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  if (!path.startsWith('/')) return path
  return `${base}${path}` || '/'
}

export function assetPath(path: string): string {
  return sitePath(path)
}
