const path = require('path')

const dir = process.cwd()

const resolveDirPath = (dirPath) => {
  return path.resolve(dir, dirPath)
}

module.exports = resolveDirPath
