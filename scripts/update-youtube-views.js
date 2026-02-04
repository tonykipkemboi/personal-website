#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

// YouTube video configuration
const VIDEO_ID = 'ztBJqzBU5kc'
const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`

function formatViews(views) {
  const num = parseInt(views.replace(/,/g, ''))
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M+ views`
  } else if (num >= 1000) {
    return `${Math.floor(num / 1000)}K+ views`
  }
  return `${num} views`
}

async function getVideoViews() {
  console.log(`Fetching views from ${VIDEO_URL}...`)

  let browser
  try {
    browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()

    // Navigate to the video
    await page.goto(VIDEO_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    })

    // Wait for the view count element to be visible
    // YouTube displays view count in multiple places, let's try the most reliable one
    await page.waitForSelector('ytd-watch-metadata', { timeout: 10000 })

    // Extract view count - YouTube shows it like "140,523 views"
    const viewText = await page.evaluate(() => {
      // Try multiple selectors as YouTube's DOM can vary
      const selectors = [
        'ytd-watch-metadata span.ytd-video-view-count-renderer',
        '.view-count',
        'ytd-video-view-count-renderer span',
        '#info span.view-count',
      ]

      for (const selector of selectors) {
        const element = document.querySelector(selector)
        if (element && element.textContent) {
          const text = element.textContent.trim()
          // Match patterns like "140,523 views" or "140K views"
          const match = text.match(/([\d,KM\.]+)\s*views?/i)
          if (match) {
            return match[1]
          }
        }
      }

      // Fallback: look for any element containing view count
      const metaElements = document.querySelectorAll('ytd-watch-metadata *')
      for (const el of metaElements) {
        const text = el.textContent
        if (text && text.includes('views')) {
          const match = text.match(/([\d,KM\.]+)\s*views?/i)
          if (match) {
            return match[1]
          }
        }
      }

      return null
    })

    await browser.close()

    if (!viewText) {
      console.error('Could not find view count on the page')
      return null
    }

    console.log(`Raw view count: ${viewText}`)
    return viewText
  } catch (error) {
    console.error('Error fetching video views:', error.message)
    if (browser) await browser.close()
    return null
  }
}

async function updateVideoViews() {
  console.log('Starting YouTube view count update...\n')

  const viewCount = await getVideoViews()

  if (viewCount === null) {
    console.log('❌ Skipping update due to error.')
    process.exit(1)
  }

  const formattedViews = formatViews(viewCount)
  console.log(`\nFormatted views: ${formattedViews}`)

  // Read the latest-video.tsx file
  const videoPath = path.join(__dirname, '../app/components/latest-video.tsx')
  let content = fs.readFileSync(videoPath, 'utf8')

  // Update the views value
  const viewsRegex = /(views: ["'])([^"']+)(["'])/
  const match = content.match(viewsRegex)

  if (match) {
    const oldViews = match[2]
    if (oldViews !== formattedViews) {
      content = content.replace(viewsRegex, `$1${formattedViews}$3`)
      fs.writeFileSync(videoPath, content, 'utf8')
      console.log(`✅ Updated views: ${oldViews} → ${formattedViews}`)
    } else {
      console.log(`✓ No change needed (${formattedViews})`)
    }
  } else {
    console.error('❌ Could not find views pattern in file')
    process.exit(1)
  }
}

updateVideoViews().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
