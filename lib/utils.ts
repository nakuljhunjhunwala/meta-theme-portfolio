import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get image source with fallback
 * @param src - Primary image source
 * @param fallback - Fallback image path (default: /project_placeholder.jpg)
 * @returns Image source or fallback
 */
export function getImageSrc(src: string | undefined | null, fallback: string = '/project_placeholder.jpg'): string {
  return src || fallback
}

/**
 * Handle image error by setting fallback
 * @param e - Image error event
 * @param fallback - Fallback image path (default: /project_placeholder.jpg)
 */
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement>, fallback: string = '/project_placeholder.jpg') {
  const target = e.target as HTMLImageElement
  const fallbackUrl = `${window.location.origin}${fallback}`
  if (target.src !== fallbackUrl) {
    target.src = fallback
  }
}

/**
 * Get avatar image source with fallback
 * @param src - Primary avatar source
 * @returns Avatar source or placeholder
 */
export function getAvatarSrc(src: string | undefined | null): string {
  return getImageSrc(src, '/placeholder.svg')
}

/**
 * Get project image source with fallback
 * @param src - Primary project image source
 * @returns Project image source or placeholder
 */
export function getProjectImageSrc(src: string | undefined | null): string {
  return getImageSrc(src, '/project_placeholder.jpg')
}
