/** Pure helpers shared by the immersive scene controller and its focused tests. */
export function nearestChapter(centres: number[], viewportCentre: number): number {
  if (!centres.length) return -1;
  return centres.reduce((best, centre, index) => Math.abs(centre - viewportCentre) < Math.abs(centres[best] - viewportCentre) ? index : best, 0);
}
export function scrollFraction(scrollY: number, documentHeight: number, viewportHeight: number): number {
  const range = documentHeight - viewportHeight;
  return range <= 0 ? 0 : Math.max(0, Math.min(1, scrollY / range));
}
