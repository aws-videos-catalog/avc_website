/**
 * Fisher–Yates Shuffle
 * https://bost.ocks.org/mike/shuffle/
 * @param length {Number}
 * @returns {*[]}
 */
export function arrayOfShuffledRandoms (length = 2) {
  const arrayOfRandoms = [...Array(length).keys()]

  const array = [...arrayOfRandoms]
  let currentIndex = array.length
  let temporaryValue = null
  let randomIndex = null

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
