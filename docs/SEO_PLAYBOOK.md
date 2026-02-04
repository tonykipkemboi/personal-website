# SEO Playbook & Performance Tracker

**Last Updated:** December 11, 2025
**Owner:** Tony Kipkemboi
**Status:** In Progress

---

## Table of Contents

1. [Overview](#overview)
2. [Current State](#current-state)
3. [SEO + GEO Strategy](#seo--geo-strategy)
4. [Tags & Categories Strategy](#tags--categories-strategy)
5. [Implementation Roadmap](#implementation-roadmap)
6. [Performance Tracking](#performance-tracking)
7. [Experiments & Results](#experiments--results)
8. [Tools & Resources](#tools--resources)

---

## Overview

This playbook documents our SEO strategy, implementation progress, and performance metrics for tonykipkemboi.com. The goal is to improve organic search visibility, increase traffic, and establish topical authority in the AI agents space.

**Primary Goals:**

- Increase organic traffic by 50% in 6 months (traditional SEO)
- Get cited by AI engines 20+ times in 6 months (GEO)
- Rank in top 10 for target keywords related to AI agents
- Improve average session duration
- Build topical authority around AI agents, AI security, and enterprise AI adoption

**Note:** Focus is on AI agents in general (not specific to CrewAI), though ranking for specific frameworks like CrewAI, LangGraph, AutoGen, etc. is a welcome side effect.

**Dual Optimization Strategy:** We're optimizing for both traditional search engines (Google) AND generative AI engines (ChatGPT, Perplexity, Claude, etc.)

---

## SEO + GEO Strategy

### What is GEO?

**Generative Engine Optimization (GEO)** is the new frontier of search optimization. While traditional SEO focuses on ranking in Google search results, GEO optimizes content to be cited by AI chatbots like ChatGPT, Perplexity, Claude, and Google AI Overviews.

### Why Both Matter

- **Traditional SEO:** Still drives 60-70% of search traffic
- **GEO:** Growing rapidly - 40% of Gen Z prefer ChatGPT over Google for search
- **Future-Proofing:** AI-generated answers are the future of search

### Key Differences

| Factor        | Traditional SEO        | GEO                                    |
| ------------- | ---------------------- | -------------------------------------- |
| Goal          | Rank on page 1         | Be cited by AI chatbots                |
| Content Style | Keyword-optimized      | Natural, conversational, authoritative |
| Metrics       | Rankings, CTR, traffic | Citations, referrals from AI engines   |
| E-E-A-T       | Important              | **Critical**                           |
| Freshness     | Moderate               | **Very Important**                     |

### Target AI Engines

1. **Perplexity AI** - Research-focused, heavy citation usage
2. **ChatGPT Search** - 200M+ weekly users
3. **Google AI Overviews** - 30% of Google queries
4. **Microsoft Copilot** - Enterprise users
5. **Claude / Gemini** - Growing developer adoption

### Our GEO Approach

- Answer questions directly ("What is...", "How to...")
- Demonstrate first-hand expertise
- Include citable statistics and data
- Use clear, citation-friendly formatting
- Keep content fresh and up-to-date
- Create definitive resources

**See [GEO_STRATEGY.md](./GEO_STRATEGY.md) for complete implementation guide**

---

## Current State

### Baseline Metrics (As of Dec 11, 2025)

- **Total Blog Posts:** 5
- **Organic Traffic:** _[To be measured]_
- **Average Session Duration:** _[To be measured]_
- **Bounce Rate:** _[To be measured]_
- **Top Keywords:** _[To be identified]_
- **Domain Authority:** _[To be measured]_

### Current SEO Implementation

✅ **What's Working:**

- Clean URL structure (slug-based)
- Next.js optimization (Image optimization, code splitting)
- Mobile responsive design
- Fast page load times
- Dark mode support

❌ **What's Missing:**

- No tags or categories
- No sitemap.xml
- No structured data (JSON-LD)
- No Open Graph images per post
- No internal linking strategy
- No related posts section
- No reading time indicators
- Limited meta descriptions
- No breadcrumbs navigation

---

## Tags & Categories Strategy

### Categories (Broad Themes)

1. **Tutorials** - How-to guides and practical implementations
2. **Security** - AI security, RBAC, authentication topics
3. **Industry Insights** - Opinion pieces and market analysis
4. **Best Practices** - Tips, patterns, and recommendations

### Tags (Specific Topics)

- **Primary Tags:** CrewAI, AI Agents, AI Security, LLMs
- **Secondary Tags:** RBAC, Authentication, SaaS, Enterprise AI, Automation
- **Supporting Tags:** Prompt Injection, Access Control, Identity Management, Consumer AI, Data Privacy

### Post Classification

| Post Title                              | Category          | Primary Tags               | Secondary Tags                                      |
| --------------------------------------- | ----------------- | -------------------------- | --------------------------------------------------- |
| Get Started with AI Agents Using CrewAI | Tutorials         | CrewAI, AI Agents          | LLMs, Automation                                    |
| Securing the AI Frontier                | Security          | AI Security, Enterprise AI | Data Privacy, Prompt Injection                      |
| RBAC for AI Agents                      | Security          | RBAC, AI Agents            | Authentication, Access Control, Identity Management |
| You're Leading the AI Revolution        | Industry Insights | Consumer AI, AI Agents     | Enterprise AI                                       |
| SaaS Isn't Dying                        | Industry Insights | SaaS, AI Agents            | Automation, Enterprise AI                           |

### Target Keywords per Post

**Get Started with AI Agents Using CrewAI:**

- Primary: "build ai agents", "ai agent tutorial", "autonomous ai agents"
- Secondary: "ai agent framework", "how to build ai agents", "ai agent development"
- Framework-specific (bonus): "crewai tutorial", "crewai examples"

**Securing the AI Frontier:**

- Primary: "ai agent security", "ai security threats", "secure ai systems"
- Secondary: "prompt injection attacks", "ai vulnerabilities", "ai cybersecurity"

**RBAC for AI Agents:**

- Primary: "ai agent permissions", "ai agent authentication", "ai access control"
- Secondary: "rbac for ai", "ai identity management", "agent authorization"

**You're Leading the AI Revolution:**

- Primary: "ai adoption trends", "consumer ai vs enterprise ai", "ai revolution"
- Secondary: "ai accessibility", "consumer ai adoption", "democratization of ai"

**SaaS Isn't Dying:**

- Primary: "ai agents and saas", "future of saas", "ai automation tools"
- Secondary: "saas evolution", "api-first design", "ai replacing software"

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2) - HIGH PRIORITY

**Goal:** Establish basic SEO infrastructure

- [ ] Add tags and categories to MDX frontmatter
- [ ] Create tag filter pages (`/blog/tags/[tag]`)
- [ ] Create category filter pages (`/blog/category/[category]`)
- [ ] Add structured data (JSON-LD) for BlogPosting
- [ ] Generate sitemap.xml
- [ ] Add reading time calculation
- [ ] Create robots.txt
- [ ] Add breadcrumbs navigation

**Expected Impact:** 30-40% improvement in indexing and discoverability

### Phase 2: Discovery (Weeks 3-4) - MEDIUM PRIORITY

**Goal:** Improve content discoverability and engagement

- [ ] Create tag cloud component
- [ ] Add related posts section
- [ ] Enhance meta descriptions (unique for each post)
- [ ] Add author schema (Person)
- [ ] Improve internal linking between related posts
- [ ] Add "Last Updated" dates to posts
- [ ] Create RSS feed improvements with categories/tags

**Expected Impact:** 20-30% improvement in session duration and pages per session

### Phase 3: Enhancement (Weeks 5-8) - MEDIUM PRIORITY

**Goal:** Enhance user experience and social sharing

- [ ] Generate Open Graph images per post
- [ ] Add table of contents for long posts (>1500 words)
- [ ] Add social share buttons
- [ ] Create author bio component
- [ ] Implement FAQ schema where applicable
- [ ] Add scroll progress indicator
- [ ] Create content clusters (topic hubs)

**Expected Impact:** 15-25% improvement in social traffic and engagement

### Phase 4: Advanced (Weeks 9-12) - LOWER PRIORITY

**Goal:** Advanced optimization and growth

- [ ] Set up Google Search Console
- [ ] Set up analytics tracking (Plausible/Umami)
- [ ] A/B test post titles
- [ ] Create content refresh strategy
- [ ] Build email newsletter integration
- [ ] Add backlink monitoring
- [ ] Create downloadable resources (lead magnets)
- [ ] Implement lazy loading for images and embeds

**Expected Impact:** 10-20% improvement in conversions and returning visitors

---

## Performance Tracking

### Key Performance Indicators (KPIs)

#### Traditional SEO Metrics

| Metric                   | Baseline | Target (3 months) | Target (6 months) | Current |
| ------------------------ | -------- | ----------------- | ----------------- | ------- |
| Organic Sessions/Month   | _TBD_    | +25%              | +50%              | _TBD_   |
| Average Session Duration | _TBD_    | +30%              | +50%              | _TBD_   |
| Bounce Rate              | _TBD_    | -15%              | -25%              | _TBD_   |
| Pages per Session        | _TBD_    | +40%              | +60%              | _TBD_   |
| Keywords in Top 10       | 0        | 5                 | 15                | 0       |
| Backlinks                | _TBD_    | +20%              | +50%              | _TBD_   |
| Social Shares            | _TBD_    | +100%             | +200%             | _TBD_   |

#### GEO Metrics (NEW)

| Metric                           | Baseline | Target (3 months) | Target (6 months) | Current |
| -------------------------------- | -------- | ----------------- | ----------------- | ------- |
| Total AI Engine Citations        | 0        | 5                 | 20                | 0       |
| Perplexity AI Citations          | 0        | 2                 | 8                 | 0       |
| ChatGPT Citations                | 0        | 2                 | 7                 | 0       |
| Google AI Overview Appearances   | 0        | 3                 | 10                | 0       |
| AI Engine Referral Traffic/Month | 0        | 100               | 500               | 0       |
| Branded Queries (tonykipkemboi)  | _TBD_    | 50                | 200               | _TBD_   |

### Monthly Tracking Template

**Month:** **\_\_\_**
**Date Range:** **\_\_\_**

#### Traffic Metrics

- Total Sessions: **\_\_\_**
- Organic Sessions: **\_\_\_**
- Direct Traffic: **\_\_\_**
- Referral Traffic: **\_\_\_**
- Social Traffic: **\_\_\_**

#### Engagement Metrics

- Average Session Duration: **\_\_\_**
- Bounce Rate: **\_\_\_**
- Pages per Session: **\_\_\_**
- New vs Returning: **\_\_\_**

#### Top Performing Posts

1. ***
2. ***
3. ***

#### Top Keywords

1. ***
2. ***
3. ***

#### Actions Taken This Month

- ***
- ***
- ***

#### Insights & Learnings

- ***
- ***
- ***

#### Next Month's Focus

- ***
- ***
- ***

---

## Experiments & Results

### Experiment Log

#### Experiment #1: [Title]

**Date Started:** **\_\_\_**
**Hypothesis:** **\_\_\_**
**Implementation:** **\_\_\_**
**Results:** **\_\_\_**
**Learnings:** **\_\_\_**
**Status:** ⏳ In Progress | ✅ Success | ❌ Failed | 🔄 Iterating

---

#### Experiment Template (Copy for new experiments)

**Experiment #X: [Title]**
**Date Started:** **\_\_\_**
**Hypothesis:** **\_\_\_**
**Implementation:** **\_\_\_**
**Results:** **\_\_\_**
**Learnings:** **\_\_\_**
**Status:** ⏳ In Progress | ✅ Success | ❌ Failed | 🔄 Iterating

---

## Tools & Resources

### Analytics & Tracking

- **Google Search Console** - Track rankings, clicks, impressions
- **Plausible/Umami** - Privacy-friendly analytics
- **Vercel Analytics** - Core Web Vitals and performance

### SEO Tools

- **Ahrefs** - Keyword research, backlink analysis
- **SEMrush** - Competitor analysis, keyword tracking
- **Screaming Frog** - Technical SEO audits
- **Google Lighthouse** - Performance and SEO audits

### Content Optimization

- **Hemingway Editor** - Readability improvements
- **Grammarly** - Grammar and clarity
- **AnswerThePublic** - Question research
- **AlsoAsked** - Related questions

### Schema Markup

- **Schema.org** - Structured data documentation
- **Google Rich Results Test** - Validate markup
- **JSON-LD Generator** - Create structured data

### Image Optimization

- **TinyPNG** - Image compression
- **Canva** - Open Graph image creation
- **Figma** - Design templates

---

## Quick Reference

### SEO Checklist for New Blog Posts

Before publishing:

- [ ] Add title (50-60 characters)
- [ ] Add meta description (150-160 characters)
- [ ] Assign category
- [ ] Add 3-5 relevant tags
- [ ] Add target keywords
- [ ] Create Open Graph image
- [ ] Add alt text to all images
- [ ] Check heading hierarchy (H1 → H2 → H3)
- [ ] Add internal links to 2-3 related posts
- [ ] Add external authoritative links
- [ ] Proofread and check readability
- [ ] Test on mobile
- [ ] Verify structured data

After publishing:

- [ ] Submit URL to Google Search Console
- [ ] Share on social media
- [ ] Add to email newsletter
- [ ] Monitor analytics for first week
- [ ] Respond to comments/engagement

---

## Notes & Ideas

### Content Ideas from Keyword Research

_[Add keyword research findings and content opportunities]_

### Backlink Opportunities

_[Track outreach and link building efforts]_

### Competitor Analysis

_[Document what competitors are doing well]_

### Technical Debt

_[Track SEO-related technical issues to fix]_

---

## Changelog

### December 11, 2025 (Evening Update)

- **Added GEO Strategy** - Created comprehensive Generative Engine Optimization guide
- Defined dual SEO + GEO optimization approach
- Added GEO metrics tracking (AI engine citations, referrals)
- Created [GEO_STRATEGY.md](./GEO_STRATEGY.md) with implementation roadmap
- Updated KPIs to include AI engine performance

### December 11, 2025 (Initial)

- Created initial SEO playbook
- Defined categories and tags strategy
- Established baseline metrics framework
- Created 4-phase implementation roadmap
- **Completed Phase 1** - All tasks implemented successfully

---

## Contact & Support

For questions or suggestions about this playbook:

- **Owner:** Tony Kipkemboi
- **Email:** [your-email]
- **Twitter:** [@tonykipkemboi](https://twitter.com/tonykipkemboi)

---

_This is a living document. Update regularly with new experiments, results, and learnings._
