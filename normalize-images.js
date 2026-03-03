const fs = require('fs')
const path = require('path')

const galleryDir = path.join('public', 'images', 'gallery')
const targetFile = 'src/lib/gallery-images.ts'
let fileContent = fs.readFileSync(targetFile, 'utf8')

function cleanFilename(name) {
  // Replace " (1)" with "-1", remove spaces, make lowercase extension
  return name
    .replace(/\s*\(/g, '-')
    .replace(/\)/g, '')
    .replace(/\s+/g, '-')
    .replace(/\.[A-Za-z]+$/, (match) => match.toLowerCase())
}

let differences = 0

function processDirectory(dir) {
  const items = fs.readdirSync(dir)
  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      processDirectory(fullPath)
    } else if (stat.isFile()) {
      const cleanName = cleanFilename(item)
      if (cleanName !== item) {
        const newFullPath = path.join(dir, cleanName)
        fs.renameSync(fullPath, newFullPath)

        // Also replace in the TS file
        const oldRelPath = fullPath.replace(/\\\\/g, '/').replace('public', '')
        const newRelPath = newFullPath.replace(/\\\\/g, '/').replace('public', '')

        // Escape regex string for oldRelPath
        const oldRelPathSafe = oldRelPath.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')
        const re = new RegExp(`src:\\s*'${oldRelPathSafe}'`, 'g')

        // For debugging
        // console.log(`Renaming: ${oldRelPath} -> ${newRelPath}`);

        fileContent = fileContent.replace(`src: '${oldRelPath}'`, `src: '${newRelPath}'`)
        differences++
      } else {
        // Even if the filename on disk didn't change (already clean),
        // make sure the TS file references it as clean name (e.g. extension fix)
      }
    }
  }
}

// Ensure all occurrences with spaces and parentheses in the TS file are replaced
// regardless if file renaming happened above, to cover the whole file cleanly.
fileContent = fileContent.replace(/src:\s*'(\/images\/gallery\/[^']+)'/g, (match, p1) => {
  const parts = p1.split('/')
  const filename = parts.pop()
  const clean = cleanFilename(filename)
  parts.push(clean)
  return `src: '${parts.join('/')}'`
})

processDirectory(galleryDir)

fs.writeFileSync(targetFile, fileContent)
console.log(`Renamed and updated ${differences} files for cleaner naming.`)
