# Scripts

## Update GitHub Stars

Automatically updates the star counts for GitHub repositories displayed on the projects page.

### Manual Usage

Run the script manually:

```bash
node scripts/update-stars.js
```

### How It Works

1. Fetches current star counts from the GitHub API
2. Updates the star counts in `app/components/projects.tsx`
3. Commits and pushes changes if star counts have changed
4. Only commits if there are actual changes to prevent empty commits

### Adding New Repositories

To track additional repositories, edit `scripts/update-stars.js` and add to the `repos` array:

```javascript
const repos = [
  { owner: 'tonykipkemboi', repo: 'your-repo-name', title: 'Your Project Title' },
  // ...
];
```

Make sure the `title` matches exactly what's in `app/components/projects.tsx`.

---

## Update YouTube Video Views

Automatically updates the view count for the featured YouTube video on the homepage using Playwright to scrape the data directly from YouTube (no API key needed!).

### Setup

Install Playwright and its browsers (already done if you've run `npm install`):

```bash
npm install
npx playwright install chromium
```

### Manual Usage

Run the script manually:

```bash
node scripts/update-youtube-views.js
```

### How It Works

1. Uses Playwright to load the YouTube video page in a headless browser
2. Scrapes the current view count from the page
3. Formats the view count (e.g., "140K+ views", "1.2M+ views")
4. Updates the view count in `app/components/latest-video.tsx`
5. Only updates if the view count has changed

**Note**: No API key required! The script uses web scraping instead of the YouTube API.

---

## Automated Updates

Both GitHub stars and YouTube views are automatically updated **every Sunday at 00:00 UTC** via GitHub Actions (`.github/workflows/update-stars.yml`).

You can also trigger the workflow manually:
1. Go to the [Actions tab](https://github.com/tonykipkemboi/personal-website/actions)
2. Select "Update GitHub Stats" workflow
3. Click "Run workflow"
