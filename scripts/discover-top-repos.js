#!/usr/bin/env node

const USERNAME = 'tonykipkemboi'
const TOP_N = 10 // Number of top repos to show

async function getTopRepos() {
  console.log(`Fetching all repositories for ${USERNAME}...\n`)

  try {
    // Fetch all repos for the user
    let allRepos = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const url = `https://api.github.com/users/${USERNAME}/repos?per_page=100&page=${page}&sort=updated`
      const response = await fetch(url)
      const repos = await response.json()

      if (repos.length === 0) {
        hasMore = false
      } else {
        allRepos = allRepos.concat(repos)
        page++
      }
    }

    // Sort by star count
    allRepos.sort((a, b) => b.stargazers_count - a.stargazers_count)

    // Get top N repos
    const topRepos = allRepos.slice(0, TOP_N)

    console.log(`Top ${TOP_N} repositories by star count:\n`)
    console.log('Rank | Stars | Repository Name')
    console.log('-----|-------|----------------')

    topRepos.forEach((repo, index) => {
      const rank = (index + 1).toString().padStart(4)
      const stars = repo.stargazers_count.toString().padStart(5)
      console.log(`${rank} | ${stars} | ${repo.name}`)
    })

    console.log('\n='.repeat(50))
    console.log('\nCurrently tracked in your website:')
    console.log('- ollama_pdf_rag')
    console.log('- trip_planner_agent')
    console.log('- crewai-streamlit-demo')
    console.log('- research-paper-to-podcast')

    console.log('\n='.repeat(50))
    console.log('\nTo add a new repo to your website:')
    console.log('1. Add it to app/components/projects.tsx')
    console.log('2. Add it to scripts/update-stars.js in the repos array')
    console.log('3. Make sure the title matches exactly\n')
  } catch (error) {
    console.error('Error fetching repositories:', error)
  }
}

getTopRepos()
