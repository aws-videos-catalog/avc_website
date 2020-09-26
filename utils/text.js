export function capitalizeWords (words) {
  return words.replace(/\b\w/g, l => l.toUpperCase())
}

export function caseSnakeToTitle (snakeCaseWords) {
  const words = snakeCaseWords.toLowerCase().split('_')

  return capitalizeWords(words.join(' '))
}

export function caseTitleToSnake (titleCaseWords) {
  if (!titleCaseWords) {
    return ''
  }

  return titleCaseWords.split(' ').join('_').toLowerCase()
}
