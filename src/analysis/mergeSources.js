export function mergeSources(...sources) {
  return sources.flat().filter(Boolean);
}
