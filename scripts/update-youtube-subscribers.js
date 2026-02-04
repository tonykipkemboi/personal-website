#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

// YouTube channel configuration
const CHANNEL_URL = 'https://www.youtube.com/@tonykipkemboi'

function formatSubscribers(count) {
  const num = parseInt(count.replace(/[,\.]/g, ''))
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `${Math.floor(num / 1000)}K`
  }
  return `${num}`
}

async function getSubscriberCount() {
  console.log(`Fetching subscriber count from ${CHANNEL_URL}...`)

  let browser
  try {
    browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()

    // Set a realistic user agent
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
    })

    // Navigate to the channel page
    await page.goto(CHANNEL_URL, { waitUntil: 'networkidle', timeout: 45000 })

    // Give time for dynamic content to load
    await page.waitForTimeout(3000)

    // Extract subscriber count
    const subscriberText = await page.evaluate(() => {
      // Try multiple selectors as YouTube's DOM can vary
      const selectors = [
        '#subscriber-count',
        'yt-formatted-string#subscriber-count',
        '#channel-header-container #subscriber-count',
        'ytd-c4-tabbed-header-renderer #subscriber-count',
        '[id="subscriber-count"]',
        '.yt-content-metadata-view-model-wiz__metadata-text',
      ]

      for (const selector of selectors) {
        const element = document.querySelector(selector)
        if (element && element.textContent) {
          const text = element.textContent.trim()
          // Match patterns like "8.5K subscribers" or "8,500 subscribers"
          const match = text.match(/([\d,\.]+[KMB]?)\s*subscribers?/i)
          if (match) {
            return match[1]
          }
        }
      }

      // Fallback: search through all text content
      const allElements = document.querySelectorAll('*')
      for (const el of allElements) {
        if (el.children.length === 0) {
          // Only leaf nodes
          const text = el.textContent
          if (text && text.includes('subscriber')) {
            const match = text.match(/([\d,\.]+[KMB]?)\s*subscribers?/i)
            if (match) {
              return match[1]
            }
          }
        }
      }

      return null
    })

    await browser.close()

    if (!subscriberText) {
      console.error('Could not find subscriber count on the page')
      return null
    }

    console.log(`Raw subscriber count: ${subscriberText}`)
    return subscriberText
  } catch (error) {
    console.error('Error fetching subscriber count:', error.message)
    if (browser) await browser.close()
    return null
  }
}

async function updateSubscriberCount() {
  console.log('Starting YouTube subscriber count update...\n')

  const subscriberCount = await getSubscriberCount()

  if (subscriberCount === null) {
    console.log('❌ Skipping update due to error.')
    process.exit(1)
  }

  // Format the subscriber count (remove K/M suffix if present, then reformat)
  let formattedSubs
  if (
    subscriberCount.includes('K') ||
    subscriberCount.includes('M') ||
    subscriberCount.includes('B')
  ) {
    // Already formatted by YouTube (e.g., "8.5K")
    formattedSubs = subscriberCount.replace(/\s/g, '')
  } else {
    formattedSubs = formatSubscribers(subscriberCount)
  }

  console.log(`\nFormatted subscribers: ${formattedSubs}`)

  // Read the latest-video.tsx file
  const videoPath = path.join(__dirname, '../app/components/latest-video.tsx')
  let content = fs.readFileSync(videoPath, 'utf8')

  // Update the subscribers value
  const subscribersRegex = /(subscribers: ["'])([^"']+)(["'])/
  const match = content.match(subscribersRegex)

  if (match) {
    const oldSubs = match[2]
    if (oldSubs !== formattedSubs) {
      content = content.replace(subscribersRegex, `$1${formattedSubs}$3`)
      fs.writeFileSync(videoPath, content, 'utf8')
      console.log(`✅ Updated subscribers: ${oldSubs} → ${formattedSubs}`)
    } else {
      console.log(`✓ No change needed (${formattedSubs})`)
    }
  } else {
    console.error('❌ Could not find subscribers pattern in file')
    console.log(
      'Make sure latest-video.tsx has a "subscribers" field in the popularVideo object'
    )
    process.exit(1)
  }
}

updateSubscriberCount().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
