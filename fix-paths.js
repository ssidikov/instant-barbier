const fs = require('fs')
const path = require('path')

const targetFile = 'src/lib/gallery-images.ts'
let fileContent = fs.readFileSync(targetFile, 'utf8')
const regex = /src:\s*'([^']+)'/g
let match
let differences = 0

while ((match = regex.exec(fileContent)) !== null) {
  const imgPath = match[1]
  const dirPath = path.join('public', path.dirname(imgPath))
  const baseName = path.basename(imgPath)

  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath)
    if (!files.includes(baseName)) {
      const correctCase = files.find((f) => f.toLowerCase() === baseName.toLowerCase())
      if (correctCase) {
        console.log(`Fixing case mismatch: ${imgPath} -> ${correctCase}`)
        const correctImgPath = imgPath.slice(0, -baseName.length) + correctCase
        fileContent = fileContent.replace(`src: '${imgPath}'`, `src: '${correctImgPath}'`)
        differences++
      } else {
        console.log(`ERROR: File totally missing for: ${imgPath}`)
      }
    }
  } else {
    console.log(`ERROR: Directory totally missing for: ${dirPath}`)
  }
}

if (differences > 0) {
  fs.writeFileSync(targetFile, fileContent)
  console.log(`Fixed ${differences} paths.`)
} else {
  console.log('All paths are correct!')
}
