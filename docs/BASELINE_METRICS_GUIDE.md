# Baseline Metrics Collection Guide

**Created:** December 11, 2025
**Owner:** Tony Kipkemboi
**Purpose:** Establish baseline metrics before SEO/GEO optimization to measure improvement

---

## Why Baseline Metrics Matter

Without baseline metrics, you can't measure success. This guide will help you:

1. Establish current performance (before optimization)
2. Set realistic improvement targets
3. Prove ROI of SEO/GEO efforts
4. Make data-driven decisions

**Timeline:** Collect these metrics within the next 7 days, then monthly.

---

## Quick Setup Checklist

- [ ] Set up Google Search Console (10 minutes)
- [ ] Set up analytics (Plausible or Vercel) (5 minutes)
- [ ] Collect current traffic data (10 minutes)
- [ ] Test site in AI engines (15 minutes)
- [ ] Check domain authority (5 minutes)
- [ ] Document baseline in spreadsheet (10 minutes)

**Total time:** ~1 hour

---

## 1. Google Search Console Setup

### Why?

Google Search Console (GSC) is **free** and shows:

- How many people find you on Google
- What keywords you rank for
- Click-through rates
- Technical issues
- **AI Overview appearances**

### Setup Steps:

#### Step 1: Verify Your Site

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Enter your domain: `https://tonykipkemboi.com`
4. Choose verification method: **DNS verification** (recommended)
5. Add TXT record to your DNS (Vercel/hosting provider)
6. Click "Verify"

**DNS Verification for Vercel:**

```bash
# In Vercel dashboard:
# Settings → Domains → tonykipkemboi.com → DNS Records
# Add TXT record with value from Google Search Console
```

#### Step 2: Submit Sitemap

1. In GSC, go to "Sitemaps" (left sidebar)
2. Enter sitemap URL: `https://tonykipkemboi.com/sitemap.xml`
3. Click "Submit"

#### Step 3: Wait 2-3 Days

Google needs time to crawl your site. Check back in 3 days for initial data.

---

## 2. Analytics Setup (Privacy-Friendly)

### Option A: Plausible Analytics (Recommended)

**Why Plausible?**

- Privacy-friendly (no cookies, GDPR compliant)
- Simple, clean dashboard
- Lightweight (< 1KB script)
- Shows referral sources (including AI engines!)
- **Cost:** $9/month (10K pageviews)

**Setup:**

1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain: `tonykipkemboi.com`
3. Get tracking script
4. Add to your Next.js app

**Installation:**

```bash
npm install next-plausible
```

**In `app/layout.tsx`:**

```typescript
import PlausibleProvider from 'next-plausible'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <PlausibleProvider domain="tonykipkemboi.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

### Option B: Vercel Analytics (If Already Using Vercel)

**Why Vercel Analytics?**

- Free with Vercel hosting
- Built-in Web Vitals tracking
- No setup required
- Privacy-friendly

**Setup:**

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to "Analytics" tab
4. Enable Analytics
5. Deploy

**Installation:**

```bash
npm install @vercel/analytics
```

**In `app/layout.tsx`:**

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

### Option C: Google Analytics 4 (If You Need More Data)

**Setup:**

1. Go to [Google Analytics](https://analytics.google.com)
2. Create GA4 property
3. Get Measurement ID (G-XXXXXXXXXX)
4. Install via `next/script`

**Not recommended unless you need advanced features** (Plausible is simpler).

---

## 3. Collect Current Traffic Data

### If Your Site is New (Less than 30 days old)

**Don't worry!** You likely have very little data. That's normal.

**What to do:**

1. Install analytics now (Plausible or Vercel)
2. Wait 7-14 days
3. Come back and collect baseline

### If Your Site Has Been Live

#### Check Vercel Analytics (If Deployed on Vercel)

1. Go to Vercel Dashboard → Your Project → Analytics
2. Look at past 30 days:
   - Total visitors
   - Page views
   - Top pages
   - Referral sources

#### Check Google Search Console (If Already Set Up)

1. Go to GSC → Performance
2. Set date range: Last 28 days
3. Note:
   - Total clicks
   - Total impressions
   - Average CTR
   - Average position

#### Manual Check: Server Logs (Alternative)

If you don't have analytics yet, check server logs:

```bash
# For Vercel, check deployment logs
# Or use Vercel Analytics (free, no setup needed)
```

---

## 4. Baseline Metrics Worksheet

### A. Traffic Metrics (Current State)

| Metric                      | Value  | Source           | Date Collected   |
| --------------------------- | ------ | ---------------- | ---------------- |
| **Total Monthly Visitors**  | **\_** | Plausible/Vercel | \***\*\_\_\*\*** |
| **Total Monthly Pageviews** | **\_** | Plausible/Vercel | \***\*\_\_\*\*** |
| **Organic Search Traffic**  | **\_** | GSC or Analytics | \***\*\_\_\*\*** |
| **Direct Traffic**          | **\_** | Analytics        | \***\*\_\_\*\*** |
| **Referral Traffic**        | **\_** | Analytics        | \***\*\_\_\*\*** |
| **Social Traffic**          | **\_** | Analytics        | \***\*\_\_\*\*** |

**If you have no data yet, write "0" or "N/A - New Site"**

---

### B. Engagement Metrics

| Metric                       | Value                         | Source    | Date Collected   |
| ---------------------------- | ----------------------------- | --------- | ---------------- |
| **Average Session Duration** | **\_**                        | Analytics | \***\*\_\_\*\*** |
| **Bounce Rate**              | **\_**                        | Analytics | \***\*\_\_\*\*** |
| **Pages per Session**        | **\_**                        | Analytics | \***\*\_\_\*\*** |
| **Top 3 Pages**              | 1. **\_** 2. **\_** 3. **\_** | Analytics | \***\*\_\_\*\*** |

---

### C. Search Performance (Google Search Console)

| Metric                          | Value  | Source | Date Collected   |
| ------------------------------- | ------ | ------ | ---------------- |
| **Total Clicks (28 days)**      | **\_** | GSC    | \***\*\_\_\*\*** |
| **Total Impressions (28 days)** | **\_** | GSC    | \***\*\_\_\*\*** |
| **Average CTR**                 | **\_** | GSC    | \***\*\_\_\*\*** |
| **Average Position**            | **\_** | GSC    | \***\*\_\_\*\*** |
| **Keywords in Top 10**          | **\_** | GSC    | \***\*\_\_\*\*** |
| **Keywords in Top 20**          | **\_** | GSC    | \***\*\_\_\*\*** |

**GSC takes 2-3 days to show data. If new, check back in 3 days.**

---

### D. Domain Authority & Backlinks

#### Check Domain Authority (Free Tools)

**Option 1: Ahrefs Free Tools**

1. Go to [Ahrefs Free SEO Tools](https://ahrefs.com/website-authority-checker)
2. Enter: `tonykipkemboi.com`
3. Note:
   - Domain Rating (DR)
   - Backlinks
   - Referring domains

**Option 2: Moz Free Account**

1. Go to [Moz Link Explorer](https://moz.com/link-explorer)
2. Enter: `tonykipkemboi.com`
3. Note:
   - Domain Authority (DA)
   - Page Authority (PA)
   - Linking domains

**Option 3: Ubersuggest (Free 3 searches/day)**

1. Go to [Ubersuggest](https://neilpatel.com/ubersuggest/)
2. Enter: `tonykipkemboi.com`
3. Note:
   - Domain Score
   - Backlinks
   - Monthly organic traffic estimate

| Metric                    | Value  | Source     | Date Collected   |
| ------------------------- | ------ | ---------- | ---------------- |
| **Domain Authority (DA)** | **\_** | Moz        | \***\*\_\_\*\*** |
| **Domain Rating (DR)**    | **\_** | Ahrefs     | \***\*\_\_\*\*** |
| **Total Backlinks**       | **\_** | Ahrefs/Moz | \***\*\_\_\*\*** |
| **Referring Domains**     | **\_** | Ahrefs/Moz | \***\*\_\_\*\*** |

---

### E. AI Engine Performance (GEO Baseline)

#### Test Your Site in AI Engines

**Test Queries to Try:**

1. "How to build AI agents"
2. "AI agent security best practices"
3. "What is RBAC for AI agents"
4. "AI agent authentication"
5. "Tony Kipkemboi" (branded query)

#### Perplexity AI Test

1. Go to [perplexity.ai](https://perplexity.ai)
2. Ask: "How to build AI agents"
3. Look for your site in results
4. **Are you cited?** Yes / No
5. If yes, what position? (1st, 2nd, 3rd source?)

#### ChatGPT Test

1. Go to [chat.openai.com](https://chat.openai.com)
2. Enable web browsing (GPT-4 model)
3. Ask: "How to build AI agents"
4. Look for your site in citations
5. **Are you cited?** Yes / No

#### Google AI Overview Test

1. Go to [google.com](https://google.com)
2. Search: "build AI agents tutorial"
3. Look for AI Overview box (at top of results)
4. **Does it appear?** Yes / No
5. **Is your site cited?** Yes / No

| Metric                              | Value | Date Tested      |
| ----------------------------------- | ----- | ---------------- |
| **Perplexity Citations**            | 0     | \***\*\_\_\*\*** |
| **ChatGPT Citations**               | 0     | \***\*\_\_\*\*** |
| **Google AI Overview Appearances**  | 0     | \***\*\_\_\*\*** |
| **Claude Citations** (if available) | 0     | \***\*\_\_\*\*** |
| **Total AI Engine Citations**       | 0     | \***\*\_\_\*\*** |

**Expected result for new site: 0 citations (that's normal!)**

---

### F. Social Metrics

| Metric                       | Value  | Source   | Date Collected   |
| ---------------------------- | ------ | -------- | ---------------- |
| **Twitter Followers**        | **\_** | Twitter  | \***\*\_\_\*\*** |
| **LinkedIn Connections**     | **\_** | LinkedIn | \***\*\_\_\*\*** |
| **YouTube Subscribers**      | **\_** | YouTube  | \***\*\_\_\*\*** |
| **GitHub Stars (all repos)** | **\_** | GitHub   | \***\*\_\_\*\*** |

---

### G. Content Inventory

| Metric                     | Value  |
| -------------------------- | ------ |
| **Total Blog Posts**       | 5      |
| **Total Categories**       | 3      |
| **Total Tags**             | 18     |
| **Total Projects**         | 12     |
| **Average Words per Post** | **\_** |

**Calculate average words:**

```bash
# Count words in all MDX files
wc -w app/blog/posts/*.mdx
# Divide total by 5 posts
```

---

## 5. Create Baseline Spreadsheet

### Option A: Google Sheets (Recommended)

**Template Structure:**

```
Tab 1: Monthly Traffic
- Date | Visitors | Pageviews | Organic | Direct | Referral | Social

Tab 2: Search Performance
- Date | Clicks | Impressions | CTR | Avg Position | Keywords Top 10

Tab 3: GEO Performance
- Date | Perplexity Citations | ChatGPT Citations | AI Overview | Total Citations | AI Referral Traffic

Tab 4: Rankings
- Date | Keyword | Position | Change

Tab 5: Baseline
- All baseline metrics from above
```

**Create it:**

1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet: "tonykipkemboi.com SEO Metrics"
3. Create 5 tabs (as above)
4. Fill in baseline data

---

### Option B: Use This Markdown Template

Copy this to `docs/BASELINE_DATA.md`:

```markdown
# Baseline Metrics

**Collected:** [Date]
**Next Update:** [Date + 30 days]

## Traffic

- Monthly Visitors: **\_**
- Monthly Pageviews: **\_**
- Organic Traffic: **\_**
- Bounce Rate: **\_**
- Avg Session Duration: **\_**

## Search

- Total Clicks (28d): **\_**
- Total Impressions (28d): **\_**
- Average CTR: **\_**
- Average Position: **\_**
- Keywords in Top 10: **\_**

## Domain Authority

- Domain Authority (Moz): **\_**
- Domain Rating (Ahrefs): **\_**
- Total Backlinks: **\_**
- Referring Domains: **\_**

## GEO

- Perplexity Citations: 0
- ChatGPT Citations: 0
- Google AI Overviews: 0
- AI Referral Traffic: 0

## Social

- Twitter: **\_**
- LinkedIn: **\_**
- YouTube: **\_**
- GitHub Stars: **\_**
```

---

## 6. Set Up Tracking for AI Engine Referrals

### Monitor Referral Traffic from AI Engines

In your analytics (Plausible/Vercel), look for referrals from:

- `perplexity.ai`
- `chat.openai.com`
- `chatgpt.com`
- `claude.ai`
- `gemini.google.com`
- `copilot.microsoft.com`
- `you.com`

**In Plausible:**

1. Dashboard → Referrers
2. Filter by domain
3. Track monthly

**In Google Analytics:**

1. Acquisition → Traffic Acquisition
2. Filter by "session source"
3. Look for AI engine domains

---

## 7. Weekly Monitoring Routine

### Monday: Test AI Engines

1. Test 3-5 queries in Perplexity
2. Test 3-5 queries in ChatGPT
3. Test 3-5 queries in Google (check AI Overview)
4. Record: Cited? Yes/No

**Template:**

```
Week of [Date]:
Query: "how to build ai agents"
- Perplexity: Not cited
- ChatGPT: Not cited
- Google AI: Not shown

Query: "ai agent security"
- Perplexity: Not cited
- ChatGPT: Not cited
- Google AI: Not shown
```

---

### Wednesday: Check Analytics

1. Plausible/Vercel → Check visitor count
2. Check top pages
3. Check referral sources
4. Look for AI engine traffic

---

### Friday: Update Spreadsheet

1. Add weekly totals to spreadsheet
2. Note any changes
3. Plan next week's content

---

## 8. Monthly Reporting

### First of Each Month

1. **Export data from GSC**
   - Performance report (last 28 days)
   - Save as CSV

2. **Export from Analytics**
   - Traffic overview
   - Top pages
   - Referral sources

3. **Update spreadsheet**
   - Add monthly totals
   - Calculate changes from previous month

4. **Update SEO_PLAYBOOK.md**
   - Fill in "Current" column in KPI table
   - Note progress toward targets

5. **Review & Adjust**
   - What's working?
   - What's not?
   - What to try next month?

---

## 9. Expected Baseline (New vs Established)

### If Your Site is Brand New (< 30 days)

**Expected Baseline:**

- Monthly Visitors: 0-100
- Organic Traffic: 0-10
- GSC Clicks: 0-5
- GSC Impressions: 0-50
- Keywords Top 10: 0
- AI Citations: 0
- Domain Authority: 0-10

**This is totally normal!** SEO takes 3-6 months to show results.

---

### If Your Site Has Been Live (> 6 months)

**Expected Baseline:**

- Monthly Visitors: 100-1000
- Organic Traffic: 50-500
- GSC Clicks: 20-200
- GSC Impressions: 500-5000
- Keywords Top 10: 1-10
- AI Citations: 0-2
- Domain Authority: 10-30

---

## 10. Tools Summary

### Free Tools (Use These)

✅ **Google Search Console** - Essential for search data
✅ **Vercel Analytics** - If using Vercel (free, built-in)
✅ **Ahrefs Free Tools** - Domain authority and backlinks (limited)
✅ **Moz Free Account** - Domain authority (limited)
✅ **Ubersuggest** - 3 free searches/day

### Paid Tools (Optional, But Recommended)

💰 **Plausible Analytics** - $9/month (privacy-friendly, great UX)
💰 **Ahrefs** - $99/month (comprehensive SEO tool)
💰 **SEMrush** - $119/month (alternative to Ahrefs)

### Start Free, Upgrade Later

- Use free tools for first 3 months
- Once you see growth, invest in paid tools
- Plausible is worth it ($9/month is cheap)

---

## 11. Action Plan for This Week

### Day 1 (Today):

- [ ] Set up Google Search Console (10 min)
- [ ] Submit sitemap
- [ ] Choose analytics: Plausible or Vercel

### Day 2:

- [ ] Install analytics (5-10 min)
- [ ] Deploy updated site
- [ ] Verify analytics is tracking

### Day 3:

- [ ] Test site in Perplexity AI
- [ ] Test site in ChatGPT
- [ ] Test site in Google (AI Overview)
- [ ] Document results

### Day 4:

- [ ] Check Ahrefs free tool for DA
- [ ] Check Moz for DA
- [ ] Document backlink data

### Day 5:

- [ ] Create baseline spreadsheet
- [ ] Fill in all available data
- [ ] Set calendar reminder for monthly update

### Day 6-7:

- [ ] Wait for data to accumulate
- [ ] Focus on content (GEO optimization)

---

## 12. Baseline Metrics Template (Copy & Fill)

```
BASELINE METRICS - tonykipkemboi.com
Collected: [DATE]

=== TRAFFIC ===
Monthly Visitors: _____
Monthly Pageviews: _____
Organic Traffic: _____
Direct Traffic: _____
Referral Traffic: _____
Social Traffic: _____

=== ENGAGEMENT ===
Avg Session Duration: _____
Bounce Rate: _____
Pages per Session: _____
Top Page: _____

=== SEARCH (GSC - Last 28 Days) ===
Total Clicks: _____
Total Impressions: _____
Average CTR: _____
Average Position: _____
Keywords in Top 10: _____
Keywords in Top 20: _____

=== DOMAIN AUTHORITY ===
Domain Authority (Moz): _____
Domain Rating (Ahrefs): _____
Total Backlinks: _____
Referring Domains: _____

=== GEO (AI Engine Performance) ===
Perplexity Citations: 0
ChatGPT Citations: 0
Google AI Overviews: 0
Claude Citations: 0
Total AI Citations: 0
AI Referral Traffic: 0

=== SOCIAL ===
Twitter Followers: _____
LinkedIn Connections: _____
YouTube Subscribers: _____
GitHub Stars (all repos): _____

=== CONTENT ===
Total Blog Posts: 5
Total Categories: 3
Total Tags: 18
Total Projects: 12
Avg Words per Post: _____

=== NOTES ===
- Site age: _____
- Major updates: _____
- Known issues: _____
```

---

## 13. FAQ

**Q: My site is brand new. Should I still collect baseline?**
A: Yes! Even if all numbers are zero, document it. This proves growth later.

**Q: I don't have any organic traffic yet. Is that bad?**
A: No! SEO takes 3-6 months. Your optimization work now will pay off later.

**Q: Which analytics should I use?**
A: Start with Vercel Analytics (free) or Plausible ($9/mo, better UX). Add Google Search Console (always).

**Q: How often should I check metrics?**
A: Weekly for monitoring, monthly for reporting. Don't obsess daily.

**Q: When will I see results?**
A: Traditional SEO: 3-6 months. GEO: 1-3 months (faster).

**Q: What if I'm not cited by AI engines?**
A: That's normal initially. Follow the GEO strategy, test weekly, be patient.

---

## Next Steps

1. **This Week:** Set up Google Search Console and analytics
2. **Next Week:** Collect and document baseline metrics
3. **Week 3:** Start implementing GEO optimizations
4. **Month 2:** Compare new data to baseline
5. **Month 3:** Celebrate improvements!

---

**Need Help?**

- Stuck on setup? Check tool documentation
- Need analytics help? Join the Plausible community
- Questions? Review [SEO_PLAYBOOK.md](./SEO_PLAYBOOK.md)

---

_Update this doc monthly with new metrics!_

**Last Updated:** December 11, 2025
**Next Review:** January 11, 2026
