/**
 * Batch image compression script.
 * Compresses all JPG/JPEG/PNG images in /public/images/ that are > 500KB.
 * - JPG/JPEG → 80% quality, max 1920px wide
 * - PNG → convert to JPG at 85% quality, max 1920px wide (unless transparent)
 *
 * Usage: node scripts/compress-images.mjs
 *
 * IMPORTANT: This modifies files IN PLACE. Make sure you have a git backup.
 */

import sharp from 'sharp'
import { readdir, stat, readFile, writeFile } from 'fs/promises'
import { join, extname, basename, resolve } from 'path'

const IMAGES_DIR = resolve('public/images')
const MIN_SIZE = 500 * 1024 // 500 KB
const MAX_WIDTH = 1920
const JPEG_QUALITY = 80
const PNG_QUALITY = 85

let totalBefore = 0
let totalAfter = 0
let processed = 0
let skipped = 0

async function getAllFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await getAllFiles(fullPath)))
    } else {
      files.push(fullPath)
    }
  }
  return files
}

async function compressImage(filePath) {
  const ext = extname(filePath).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return

  const stats = await stat(filePath)
  if (stats.size < MIN_SIZE) {
    skipped++
    return
  }

  const sizeBefore = stats.size
  totalBefore += sizeBefore

  try {
    // Read file into buffer first to avoid sharp path issues on Windows
    const inputBuffer = await readFile(filePath)
    const metadata = await sharp(inputBuffer).metadata()

    // Resize if wider than MAX_WIDTH
    const needsResize = metadata.width && metadata.width > MAX_WIDTH

    let pipeline = sharp(inputBuffer)

    if (needsResize) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })
    }

    if (ext === '.png') {
      // Check if PNG has alpha channel
      if (metadata.hasAlpha) {
        // Keep as PNG but compress
        pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 })
      } else {
        // Convert opaque PNG to JPEG for massive savings
        pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        // Note: we keep the .png extension to avoid breaking references
      }
    } else {
      // JPEG
      pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    }

    const buffer = await pipeline.toBuffer()

    // Only save if we actually made it smaller
    if (buffer.length < sizeBefore) {
      await writeFile(filePath, buffer)
      totalAfter += buffer.length
      const savings = ((1 - buffer.length / sizeBefore) * 100).toFixed(1)
      console.log(
        `✓ ${basename(filePath)} — ${(sizeBefore / 1024).toFixed(0)}KB → ${(buffer.length / 1024).toFixed(0)}KB (−${savings}%)`,
      )
      processed++
    } else {
      totalAfter += sizeBefore
      skipped++
      console.log(`⊘ ${basename(filePath)} — already optimized`)
    }
  } catch (err) {
    totalAfter += sizeBefore
    skipped++
    console.error(`✗ ${basename(filePath)} — ${err.message}`)
  }
}

async function main() {
  console.log(`\n🔍 Scanning ${IMAGES_DIR} for images > ${(MIN_SIZE / 1024).toFixed(0)}KB...\n`)

  const files = await getAllFiles(IMAGES_DIR)
  const imageFiles = files.filter((f) =>
    ['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase()),
  )

  console.log(`Found ${imageFiles.length} image files\n`)

  for (const file of imageFiles) {
    await compressImage(file)
  }

  console.log(`\n═══════════════════════════════════════`)
  console.log(`Processed: ${processed} files`)
  console.log(
    `Skipped:   ${skipped} files (< ${(MIN_SIZE / 1024).toFixed(0)}KB or already optimal)`,
  )
  console.log(`Before:    ${(totalBefore / 1024 / 1024).toFixed(1)} MB`)
  console.log(`After:     ${(totalAfter / 1024 / 1024).toFixed(1)} MB`)
  console.log(
    `Saved:     ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)} MB (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`,
  )
  console.log(`═══════════════════════════════════════\n`)
}

main()
