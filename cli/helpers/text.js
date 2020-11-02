export function stringContainsToken (strings = '', token = '') {
  if (!strings || strings.length === 0 || !token) {
    return false
  }

  const keywords = token.toLowerCase().split(', ')
  const search = strings.toLowerCase().split(' ')

  return keywords.some((keyword) => search.includes(keyword))
}
