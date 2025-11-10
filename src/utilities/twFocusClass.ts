/**
 * Generate Tailwind CSS focus classes for accessibility
 *
 * @param hasRing - Whether to include focus ring (default: false)
 * @returns Tailwind CSS classes for focus state
 *
 * Without ring: Only removes default outline
 * With ring: Adds custom focus ring with primary color and dark mode support
 */
export default function twFocusClass(hasRing = false): string {
  if (!hasRing) {
    return 'focus:outline-none'
  }

  return 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-0'
}