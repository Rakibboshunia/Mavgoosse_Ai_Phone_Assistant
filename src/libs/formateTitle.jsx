function formatTitle(pathname) {
  return pathname
    .replace("/", "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export default formatTitle