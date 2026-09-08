/**
 * GitHub Pages serves one site per repo. PR previews therefore live under
 * a subdirectory (e.g. /pr-preview/pr-12) and need a matching Next.js basePath.
 */
export function getPagesBasePath(
  env: Record<string, string | undefined> = process.env,
): string {
  const raw = env.BASE_PATH?.trim() ?? ''
  if (!raw || raw === '/') {
    return ''
  }
  return raw.endsWith('/') ? raw.slice(0, -1) : raw
}

export function withBasePath(
  path: string,
  basePath = process.env.NEXT_PUBLIC_BASE_PATH || '',
): string {
  if (!basePath || !path.startsWith('/') || path.startsWith('//')) {
    return path
  }
  if (path === basePath || path.startsWith(`${basePath}/`)) {
    return path
  }
  return `${basePath}${path}`
}
