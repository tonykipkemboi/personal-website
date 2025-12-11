#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repos = [
  { owner: 'tonykipkemboi', repo: 'ollama_pdf_rag', title: 'Ollama PDF RAG' },
  { owner: 'tonykipkemboi', repo: 'crewai-gmail-automation', title: 'CrewAI Gmail Automation' },
  { owner: 'tonykipkemboi', repo: 'resume-optimization-crew', title: 'Resume Optimization Crew' },
  { owner: 'tonykipkemboi', repo: 'trip_planner_agent', title: 'Trip Planner Agent' },
  { owner: 'tonykipkemboi', repo: 'streamlit-replicate-img-app', title: 'Streamlit Replicate Image App' },
  { owner: 'tonykipkemboi', repo: 'groq_streamlit_demo', title: 'Groq Streamlit Demo' },
  { owner: 'tonykipkemboi', repo: 'ollama_streamlit_demos', title: 'Ollama Streamlit Demos' },
  { owner: 'tonykipkemboi', repo: 'crewai-streamlit-demo', title: 'CrewAI Streamlit Demo' },
  { owner: 'tonykipkemboi', repo: 'research-paper-to-podcast', title: 'Research Paper to Podcast' },
  { owner: 'tonykipkemboi', repo: 'youtube_yapper_trapper', title: 'YouTube Yapper Trapper' },
];

async function getStarCount(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.stargazers_count;
  } catch (error) {
    console.error(`Error fetching stars for ${owner}/${repo}:`, error);
    return null;
  }
}

async function updateStarCounts() {
  console.log('Fetching star counts...\n');

  const starCounts = {};
  for (const { owner, repo, title } of repos) {
    const stars = await getStarCount(owner, repo);
    if (stars !== null) {
      starCounts[title] = stars;
      console.log(`${title}: ${stars} stars`);
    }
  }

  // Read the projects.tsx file
  const projectsPath = path.join(__dirname, '../app/components/projects.tsx');
  let content = fs.readFileSync(projectsPath, 'utf8');

  // Update each project's star count
  for (const [title, stars] of Object.entries(starCounts)) {
    // Find the project block and update its stars value
    const projectRegex = new RegExp(
      `(title: '${title}'[\\s\\S]*?stars: ')(\\d+)(')`
    );
    const match = content.match(projectRegex);

    if (match) {
      const oldStars = match[2];
      if (oldStars !== stars.toString()) {
        content = content.replace(projectRegex, `$1${stars}$3`);
        console.log(`Updated ${title}: ${oldStars} → ${stars}`);
      } else {
        console.log(`${title}: No change (${stars} stars)`);
      }
    }
  }

  // Write the updated content back
  fs.writeFileSync(projectsPath, content, 'utf8');
  console.log('\n✅ Star counts updated successfully!');
}

updateStarCounts().catch(console.error);
