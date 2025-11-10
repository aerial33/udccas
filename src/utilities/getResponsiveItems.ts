/**
 * Calculate responsive number of items to display based on window width
 *
 * @param windowWidth - Current window width in pixels
 * @param itemPerRow - Desired number of items per row on desktop
 * @returns Number of items to display at current viewport
 *
 * Breakpoints:
 * - itemPerRow = 1: Always 1 item (all screen sizes)
 * - < 640px: 1 item (mobile)
 * - < 768px: 2 items (large mobile / small tablet)
 * - < 1024px: itemPerRow - 1 (min 2) (tablet)
 * - < 1280px: itemPerRow - 1 (small desktop)
 * - ≥ 1280px: itemPerRow (large desktop)
 */
export function getResponsiveItems(windowWidth: number, itemPerRow: number): number {
  // Special case: if explicitly set to 1, respect it on all screen sizes
  if (itemPerRow === 1) {
    return 1
  }

  // Mobile: always 1 card for better readability
  if (windowWidth < 640) {
    return 1
  }

  // Large mobile / Small tablet: 2 cards
  if (windowWidth < 768) {
    return 2
  }

  // Tablet: reduce by 1, but minimum 2 cards
  if (windowWidth < 1024) {
    return Math.max(2, itemPerRow - 1)
  }

  // Small desktop: reduce by 1
  if (windowWidth < 1280) {
    return Math.max(2, itemPerRow - 1)
  }

  // Large desktop: full number of items
  return itemPerRow
}