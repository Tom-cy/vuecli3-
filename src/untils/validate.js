export function isExternal(Path) {
  return /^(https?:|mailto:|tel:)/.test(Path)
}
