# Google Analytics 4 - Baseline Data Collection

**Date:** December 11, 2025
**Purpose:** Extract historical baseline metrics from existing GA4 setup

Since you already have Google Analytics 4 set up with several months of data, let's extract your baseline metrics to establish a clear "before" picture prior to the Phase 1 SEO/GEO optimization launch.

---

## 🎯 Data Collection Strategy

**Date Range to Use:** Last 90 days (September 11 - December 11, 2025)

- This gives us a clean 3-month baseline
- Excludes the Phase 1 implementation (Dec 11 onwards)
- Shows seasonal trends if any

**Alternative:** Last 30 days (November 11 - December 11, 2025)

- More recent, more accurate snapshot
- Better for quick baseline

**Recommendation:** Collect both, but use 30-day for primary baseline.

---

## 📊 Step-by-Step: Google Analytics 4 Data Extraction

### 1. Access Your GA4 Dashboard

1. Go to [Google Analytics](https://analytics.google.com)
2. Select your property: **tonykipkemboi.com**
3. Set date range: **Last 30 days** (Nov 11 - Dec 11, 2025)

---

### 2. Traffic Overview (Reports → Acquisition → Traffic Acquisition)

**Metrics to Collect:**

| Metric                       | Where to Find                            | Value  |
| ---------------------------- | ---------------------------------------- | ------ |
| **Total Users**              | Reports → Reports Snapshot               | **\_** |
| **Total Sessions**           | Reports → Reports Snapshot               | **\_** |
| **Total Pageviews**          | Reports → Engagement → Pages and screens | **\_** |
| **Average Session Duration** | Reports → Engagement → Overview          | **\_** |
| **Bounce Rate**              | Reports → Engagement → Overview          | **\_** |
| **Pages per Session**        | Reports → Engagement → Overview          | **\_** |

**How to Get It:**

1. Go to **Reports** (left sidebar)
2. Click **Reports Snapshot** (top of list)
3. Note the numbers in the overview cards
4. For more detail, click **Engagement → Overview**

---

### 3. Traffic Sources (Where Visitors Come From)

**Go to:** Reports → Acquisition → Traffic Acquisition

**Metrics to Collect:**

| Source                                  | Sessions | % of Total |
| --------------------------------------- | -------- | ---------- |
| **Organic Search** (google, bing, etc.) | **\_**   | **\_**     |
| **Direct** (typed URL or bookmarks)     | **\_**   | **\_**     |
| **Referral** (links from other sites)   | **\_**   | **\_**     |
| **Social** (twitter, linkedin, etc.)    | **\_**   | **\_**     |
| **Unassigned** (unknown)                | **\_**   | **\_**     |

**Special: AI Engine Referrals (if any)**

Look specifically for these referrers:

- `perplexity.ai` → **\_** sessions
- `chat.openai.com` → **\_** sessions
- `chatgpt.com` → **\_** sessions
- `claude.ai` → **\_** sessions
- `gemini.google.com` → **\_** sessions

**How to Get It:**

1. In Traffic Acquisition, look at the "Session default channel group" table
2. Note the sessions for each channel
3. Click **+** next to a row to see detailed sources
4. Look for AI engine domains in referrals

---

### 4. Top Pages Performance

**Go to:** Reports → Engagement → Pages and screens

**Metrics to Collect:**

| Page          | Views  | Users  | Avg Time | Bounce Rate |
| ------------- | ------ | ------ | -------- | ----------- |
| **1.** **\_** | **\_** | **\_** | **\_**   | **\_**      |
| **2.** **\_** | **\_** | **\_** | **\_**   | **\_**      |
| **3.** **\_** | **\_** | **\_** | **\_**   | **\_**      |
| **4.** **\_** | **\_** | **\_** | **\_**   | **\_**      |
| **5.** **\_** | **\_** | **\_** | **\_**   | **\_**      |

**How to Get It:**

1. Go to Engagement → Pages and screens
2. Sort by Views (default)
3. Note top 5 pages

---

### 5. Blog Post Performance

**Go to:** Reports → Engagement → Pages and screens

**Filter:** URL contains `/blog/`

| Blog Post                       | Views  | Users  | Avg Time | Bounce Rate |
| ------------------------------- | ------ | ------ | -------- | ----------- |
| crewai-quickstart               | **\_** | **\_** | **\_**   | **\_**      |
| ai-agent-security               | **\_** | **\_** | **\_**   | **\_**      |
| agent-authentication-rbac       | **\_** | **\_** | **\_**   | **\_**      |
| consumers-leading-ai-revolution | **\_** | **\_** | **\_**   | **\_**      |
| saas-vs-agents                  | **\_** | **\_** | **\_**   | **\_**      |

**How to Get It:**

1. In Pages and screens report
2. Add filter: Page path contains `/blog/`
3. Note metrics for each post

---

### 6. Geographic Data

**Go to:** Reports → User → User Attributes → Demographics detail

**Top 5 Countries:**

| Country   | Users  | % of Total |
| --------- | ------ | ---------- |
| 1. **\_** | **\_** | **\_**     |
| 2. **\_** | **\_** | **\_**     |
| 3. **\_** | **\_** | **\_**     |
| 4. **\_** | **\_** | **\_**     |
| 5. **\_** | **\_** | **\_**     |

---

### 7. Device Breakdown

**Go to:** Reports → User → Tech → Tech details

**Metrics:**

| Device      | Users  | % of Total |
| ----------- | ------ | ---------- |
| **Desktop** | **\_** | **\_**     |
| **Mobile**  | **\_** | **\_**     |
| **Tablet**  | **\_** | **\_**     |

---

### 8. Export Raw Data (Recommended)

**Export for backup and detailed analysis:**

1. Go to **Reports → Reports Snapshot**
2. Click the **share** icon (top right)
3. Select **Download file**
4. Choose **PDF** (for overview) or **CSV** (for data)
5. Save as: `GA4_Baseline_Nov11-Dec11_2025.pdf`

**Also export:**

- Traffic Acquisition report → Export as CSV
- Pages and screens report → Export as CSV
- Demographics report → Export as CSV

---

## 📝 Google Search Console Data

### Setup (If Not Already Done)

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Verify your site is added: `https://tonykipkemboi.com`
3. Submit sitemap: `https://tonykipkemboi.com/sitemap.xml`

### Collect Baseline Data

**Go to:** Performance (left sidebar)

**Date Range:** Last 28 days (or 90 days for more context)

**Metrics to Collect:**

| Metric                | Value (28 days) | Value (90 days) |
| --------------------- | --------------- | --------------- |
| **Total Clicks**      | **\_**          | **\_**          |
| **Total Impressions** | **\_**          | **\_**          |
| **Average CTR**       | **\_**          | **\_**          |
| **Average Position**  | **\_**          | **\_**          |

**Top 10 Queries (Keywords):**

| Query      | Clicks | Impressions | CTR    | Position |
| ---------- | ------ | ----------- | ------ | -------- |
| 1. **\_**  | **\_** | **\_**      | **\_** | **\_**   |
| 2. **\_**  | **\_** | **\_**      | **\_** | **\_**   |
| 3. **\_**  | **\_** | **\_**      | **\_** | **\_**   |
| 4. **\_**  | **\_** | **\_**      | **\_** | **\_**   |
| 5. **\_**  | **\_** | **\_**      | **\_** | **\_**   |
| 6. **\_**  | **\_** | **\_**      | **\_** | **\_**   |
| 7. **\_**  | **\_** | **\_**      | **\_** | **\_**   |
| 8. **\_**  | **\_** | **\_**      | **\_** | **\_**   |
| 9. **\_**  | **\_** | **\_**      | **\_** | **\_**   |
| 10. **\_** | **\_** | **\_**      | **\_** | **\_**   |

**Keywords in Top 10:** Count how many queries have "Position" < 10 → **\_**

**Keywords in Top 20:** Count how many queries have "Position" < 20 → **\_**

**How to Get It:**

1. Go to Performance
2. Click **+ NEW** → Filter → Query
3. Export data: Click export icon → Download CSV
4. Save as: `GSC_Queries_Baseline_Dec11_2025.csv`

---

## 🔍 Domain Authority Check (Free Tools)

### Option 1: Ahrefs Free Website Authority Checker

1. Go to: https://ahrefs.com/website-authority-checker
2. Enter: `tonykipkemboi.com`
3. Click "Check Authority"

**Metrics:**

| Metric                     | Value  |
| -------------------------- | ------ |
| **Domain Rating (DR)**     | **\_** |
| **Backlinks**              | **\_** |
| **Referring Domains**      | **\_** |
| **Organic Keywords**       | **\_** |
| **Organic Traffic (est.)** | **\_** |

---

### Option 2: Moz Free Account

1. Go to: https://moz.com/link-explorer
2. Enter: `tonykipkemboi.com`
3. View results (free account gives limited data)

**Metrics:**

| Metric                    | Value  |
| ------------------------- | ------ |
| **Domain Authority (DA)** | **\_** |
| **Page Authority (PA)**   | **\_** |
| **Linking Domains**       | **\_** |
| **Inbound Links**         | **\_** |

---

## 🤖 AI Engine Citation Test (GEO Baseline)

Test your site in AI engines to see if you're currently being cited.

### Perplexity AI Test

1. Go to: https://perplexity.ai
2. Ask: **"How to build AI agents"**
3. Look for citations from `tonykipkemboi.com`

**Result:** ☐ Cited | ☐ Not Cited
**If cited, position:** 1st / 2nd / 3rd / Other

### ChatGPT Test

1. Go to: https://chat.openai.com
2. Use GPT-4 with web browsing enabled
3. Ask: **"How to build AI agents"**
4. Look for citations

**Result:** ☐ Cited | ☐ Not Cited
**If cited, position:** **\_**

### Google AI Overview Test

1. Go to: https://google.com
2. Search: **"build AI agents tutorial"**
3. Look for AI Overview box at top

**Result:** ☐ AI Overview Shown | ☐ Not Shown
**If shown, are you cited?** ☐ Yes | ☐ No

### Additional Queries to Test

Test 5-10 queries related to your content:

- "AI agent security"
- "RBAC for AI agents"
- "CrewAI tutorial"
- "AI agent authentication"
- "SaaS vs AI agents"

**Total Citations Found:** **\_**

---

## 📋 Baseline Summary Template

Copy this completed template to `docs/BASELINE_DATA.md`:

```markdown
# Baseline Metrics - tonykipkemboi.com

**Collected:** December 11, 2025
**Period:** November 11 - December 11, 2025 (30 days)
**Next Review:** January 11, 2026

---

## Traffic Overview (GA4 - Last 30 Days)

- **Total Users:** **\_**
- **Total Sessions:** **\_**
- **Total Pageviews:** **\_**
- **Average Session Duration:** **\_**
- **Bounce Rate:** **\_**
- **Pages per Session:** **\_**

---

## Traffic Sources (GA4)

| Source         | Sessions | % of Total |
| -------------- | -------- | ---------- |
| Organic Search | **\_**   | **\_**     |
| Direct         | **\_**   | **\_**     |
| Referral       | **\_**   | **\_**     |
| Social         | **\_**   | **\_**     |

**AI Engine Referrals:** **\_** (if any)

---

## Top 5 Pages (GA4)

1. **\_** (**\_** views)
2. **\_** (**\_** views)
3. **\_** (**\_** views)
4. **\_** (**\_** views)
5. **\_** (**\_** views)

---

## Blog Posts Performance (GA4)

| Post                            | Views  | Users  | Avg Time |
| ------------------------------- | ------ | ------ | -------- |
| crewai-quickstart               | **\_** | **\_** | **\_**   |
| ai-agent-security               | **\_** | **\_** | **\_**   |
| agent-authentication-rbac       | **\_** | **\_** | **\_**   |
| consumers-leading-ai-revolution | **\_** | **\_** | **\_**   |
| saas-vs-agents                  | **\_** | **\_** | **\_**   |

---

## Google Search Console (Last 28 Days)

- **Total Clicks:** **\_**
- **Total Impressions:** **\_**
- **Average CTR:** **\_**
- **Average Position:** **\_**
- **Keywords in Top 10:** **\_**
- **Keywords in Top 20:** **\_**

**Top 5 Keywords:**

1. **\_** (Position: **\_**)
2. **\_** (Position: **\_**)
3. **\_** (Position: **\_**)
4. **\_** (Position: **\_**)
5. **\_** (Position: **\_**)

---

## Domain Authority

- **Domain Rating (Ahrefs):** **\_**
- **Domain Authority (Moz):** **\_**
- **Total Backlinks:** **\_**
- **Referring Domains:** **\_**
- **Organic Keywords (est.):** **\_**
- **Organic Traffic (est.):** **\_**

---

## GEO (AI Engine) Performance

- **Perplexity Citations:** **\_** (0 expected)
- **ChatGPT Citations:** **\_** (0 expected)
- **Google AI Overview:** **\_** (0 expected)
- **Total AI Citations:** **\_**
- **AI Referral Traffic:** **\_** sessions

---

## Geographic Distribution (Top 5)

1. **\_** (**\_** users, **\_**%)
2. **\_** (**\_** users, **\_**%)
3. **\_** (**\_** users, **\_**%)
4. **\_** (**\_** users, **\_**%)
5. **\_** (**\_** users, **\_**%)

---

## Device Breakdown

- **Desktop:** **\_** (**\_**%)
- **Mobile:** **\_** (**\_**%)
- **Tablet:** **\_** (**\_**%)

---

## Content Inventory

- **Total Blog Posts:** 5
- **Total Categories:** 3
- **Total Tags:** 18
- **Total Projects:** 12
- **Average Words per Post:** **\_** (calculate from MDX)

---

## Observations

### What's Working

- ***
- ***

### What's Not Working

- ***
- ***

### Quick Wins Identified

- ***
- ***

---

## Next Steps

1. Monitor metrics weekly
2. Compare to this baseline monthly
3. Target improvements:
   - +50% organic traffic in 6 months
   - 20+ AI engine citations in 6 months
   - 15 keywords in top 10 by 6 months
4. Begin Phase 2 GEO optimization

---

**Files Exported:**

- [ ] GA4_Baseline_Nov11-Dec11_2025.pdf
- [ ] GA4_Traffic_Acquisition.csv
- [ ] GA4_Pages_Performance.csv
- [ ] GSC_Queries_Baseline_Dec11_2025.csv
```

---

## 🎯 Action Items (Do This Today)

1. **Log into Google Analytics 4** → Set date range to last 30 days
2. **Collect all metrics** from sections 2-8 above
3. **Export CSV/PDF files** for backup
4. **Check Google Search Console** → Get clicks, impressions, keywords
5. **Test domain authority** → Use Ahrefs and/or Moz free tools
6. **Test AI engines** → Perplexity, ChatGPT, Google (expect 0 citations)
7. **Fill out baseline template** → Create `docs/BASELINE_DATA.md`
8. **Save exported files** → Create folder: `analytics-exports/baseline-dec-2025/`

**Time required:** 30-45 minutes

---

## 📈 What to Look For

### Good Signs

- Consistent organic traffic month-over-month
- Low bounce rate (< 70%)
- Good average session duration (> 1 minute)
- Multiple keywords ranking in positions 11-30 (easy to improve)

### Areas for Improvement

- High bounce rate on blog posts → Need better content/UX
- Zero organic search traffic → SEO not working yet (normal for new sites)
- No keywords in top 30 → Content not matching search intent
- No AI engine citations → Perfect opportunity for GEO strategy

---

## 💡 Tips

1. **Screenshot everything** as you go (backup for later comparison)
2. **Export CSV files** from GA4 and GSC (more detailed than screenshots)
3. **Note any anomalies** (traffic spikes, unusual referrers)
4. **Check if robots.txt is blocking** any important pages (it shouldn't be)
5. **Verify GA4 is tracking** all pages (check Realtime report)

---

## 🔄 Monthly Review Process

After collecting baseline, repeat this every month:

1. **First Monday of Month:** Collect metrics
2. **Compare to baseline:** Calculate % change
3. **Update SEO_PLAYBOOK.md:** Fill in "Current" column
4. **Identify trends:** What's improving? What's declining?
5. **Adjust strategy:** Double down on what's working

---

**Questions? See:** [BASELINE_METRICS_GUIDE.md](./BASELINE_METRICS_GUIDE.md) for more details.

**Next:** After collecting baseline, move to Phase 2 GEO optimization.
