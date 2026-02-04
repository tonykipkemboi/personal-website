const sharp = require('sharp')
const fs = require('fs').promises
const path = require('path')

const sizes = [16, 32, 48, 64, 128, 256]
const inputImage = path.join(__dirname, '../public/favicon.ico')
const outputDir = path.join(__dirname, '../public')

async function generateFavicons() {
  try {
    // Create apple-icon and android-icon
    for (const size of sizes) {
      await sharp(inputImage)
        .resize(size, size)
        .toFile(path.join(outputDir, `apple-icon-${size}x${size}.png`))

      await sharp(inputImage)
        .resize(size, size)
        .toFile(path.join(outputDir, `android-icon-${size}x${size}.png`))
    }

    // Create favicon sizes
    for (const size of [16, 32, 96]) {
      await sharp(inputImage)
        .resize(size, size)
        .toFile(path.join(outputDir, `favicon-${size}x${size}.png`))
    }

    console.log('All favicons generated successfully!')
  } catch (error) {
    console.error('Error generating favicons:', error)
  }
}

generateFavicons()
