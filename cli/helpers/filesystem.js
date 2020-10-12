import fs from "fs"

export function loadStaticJson (path) {
  try {
    const jsonFile = fs.readFileSync(path)

    const parsed = JSON.parse(jsonFile)

    return parsed
  } catch (err) {
    console.error(err)
    return null
  }
}

export function writeStaticJson (path, json) {
  fs.writeFileSync(path, JSON.stringify(json, null, 4))
}
