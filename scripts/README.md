# Scripts

## Update GitHub Stars

Automatically updates the star counts for GitHub repositories displayed on the projects page.

### Manual Usage

Run the script manually:

```bash
node scripts/update-stars.js
```

### Automated Updates

The star counts are automatically updated every Sunday at 00:00 UTC via GitHub Actions (`.github/workflows/update-stars.yml`).

You can also trigger the workflow manually:
1. Go to the [Actions tab](https://github.com/tonykipkemboi/personal-website/actions)
2. Select "Update GitHub Stars" workflow
3. Click "Run workflow"

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
