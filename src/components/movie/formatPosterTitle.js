function formatPosterTitle(value = "") {
  let decodedTitle;

  try {
    decodedTitle = decodeURIComponent(value);
  } catch {
    decodedTitle = value.replace(/%[0-9a-f]{2}/gi, " ");
  }

  return decodedTitle
    .replace(/[-_]+/g, " ")
    .replace(/%/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/(^|[\s'-])([a-z])/g, (match, boundary, letter) => `${boundary}${letter.toUpperCase()}`);
}

export default formatPosterTitle;
