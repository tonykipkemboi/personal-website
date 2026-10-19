const { statSync } = require('node:fs')
const { isAbsolute } = require('node:path')
const { globSync: tinyGlobSync } = require('tinyglobby')

// Adapter for Next's single fast-glob API: globSync(root, { onlyDirectories: true }).
// Keep literal directory roots literal and preserve absolute/relative path output.
function globSync(pattern, options) {
  if (typeof pattern !== 'string' || options?.onlyDirectories !== true) {
    throw new TypeError('Unsupported Next ESLint root-directory glob call')
  }
  try {
    if (statSync(pattern).isDirectory()) return [pattern]
  } catch (error) {
    if (!['ENOENT', 'ENOTDIR'].includes(error.code)) throw error
  }
  return tinyGlobSync(pattern, {
    onlyDirectories: true,
    expandDirectories: false,
    absolute: isAbsolute(pattern),
  }).map((directory) => directory.replace(/\/$/, ''))
}

module.exports = { globSync }
