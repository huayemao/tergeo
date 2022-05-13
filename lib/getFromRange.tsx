export const getFromRange = (mapping, current) => {
  const entries = Object.entries(mapping)
  for (let i = 0; i < entries.length; i++) {
    const [k, v] = entries[i]
    if (
      current >= parseInt(k, 10) &&
      (!entries[i + 1] || current < parseInt(entries[i + 1][0], 10))
    ) {
      return v
    }
  }
  return entries[0][1]
}
