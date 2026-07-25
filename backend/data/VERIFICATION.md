# CareerCompass — Pathway Verification Standard

> **Principle:** CareerCompass is a *trusted career-navigation system, not an AI fortune-teller.*
> Every claim a family sees must be traceable to a real, dated source. If we can't source it,
> we don't badge it "verified" — we label it honestly or we don't show it.

This is the bar for the **first milestone: 20 verified pathways + 10 families completing the full workflow.**
It is also the basis for the public "How we verify" page (product trust = founder trust).

---

## 1. What "verified" means

A pathway is `verified` only when **every factual claim** below carries a citation with a source, a source *tier*, a URL, and an *as-of* date:

| Claim | Must cite |
|---|---|
| `salary_range` | A named salary source, region-appropriate, with date |
| `growth_outlook` | An official/industry demand source (label proxies honestly) |
| `required_skills` | An authoritative skills/occupation source |
| `qualifications` / `entry_paths` | An education/occupation source |

If a claim can't be sourced yet, its status is `draft` and the pathway is **not** shown with a verified badge.

## 2. Source tiers (shown to users — not all sources are equal)

1. **`government-official`** — BLS/O*NET (US), NCS, PLFS, NSDC/Skill India, AICTE (India). *Preferred.*
2. **`industry-report`** — NASSCOM, credible published research.
3. **`market-aggregator`** — Glassdoor / Indeed / AmbitionBox. *Acceptable for salary when official role-level data doesn't exist — always dated and labeled.*

**Honesty rules (non-negotiable):**
- Show the **as-of date** on every claim. Careers data goes stale.
- Never invent precision. Show ranges, not "you will earn ₹X."
- Label **proxies** explicitly (e.g., a US figure standing in for a missing India figure).
- No fabricated testimonials or outcomes — the 10 families' results must be real.

## 3. Schema (ADDITIVE — does not break the current app)

Keep all existing display fields. Add one `verification` block per pathway. The frontend keeps rendering
`salary_range` / `growth_outlook` as today; a later UI pass reads `verification.sources` to show inline
citations and to power a **verified-only filter**.

```jsonc
"verification": {
  "status": "verified",            // verified | draft
  "verified_at": "2026-07-25",
  "verified_by": "editorial",
  "sources": {
    "<claim_key>": {
      "claim":  "<the exact statement being backed>",
      "source": "<human-readable source name>",
      "tier":   "government-official | industry-report | market-aggregator",
      "url":    "<citation URL>",
      "as_of":  "<YYYY or YYYY-MM>",
      "note":   "<optional caveat, e.g. proxy labeling>"
    }
  }
}
```

---

## 4. Reference pathway #1 of 20 — Data Analyst (region: IN)

**Trust bug this fixes:** the current `data_analyst` entry is `region: "IN"` but lists salary in **USD ($50k–$110k)** with no source — an Indian career showing American pay. Below is the corrected, fully-cited version.

```jsonc
{
  "id": "data_analyst",
  "title": "Data Analyst",
  "category": "Data & Analytics",
  "region": "IN",
  "collar": "white",
  "description": "Transform raw data into actionable insights through analysis and visualization — helping teams from marketing to operations make better decisions. A strong entry point into the data field.",

  // corrected display fields (was USD; now INR, sourced below)
  "salary_range": { "min": 350000, "max": 1200000, "currency": "INR",
                    "note": "Entry ₹3.5–4.5L · Median ₹6.6L · Senior ₹12–25L" },
  "growth_outlook": "High",
  "required_skills": [
    { "skill": "SQL", "level": "critical" },
    { "skill": "Excel", "level": "critical" },
    { "skill": "Data Visualization (Power BI / Tableau)", "level": "critical" },
    { "skill": "Statistics", "level": "important" },
    { "skill": "Python or R", "level": "important" },
    { "skill": "Communication", "level": "important" }
  ],
  "qualifications": [
    "Bachelor's in Statistics, Math, Economics, or CS (O*NET Job Zone 4)",
    "Microsoft / Google Data Analytics certification",
    "SQL, Excel, Power BI / Tableau proficiency"
  ],
  "tags": ["data", "business", "entry-friendly", "versatile"],

  // verification layer
  "verification": {
    "status": "verified",
    "verified_at": "2026-07-25",
    "verified_by": "editorial",
    "sources": {
      "salary_range": {
        "claim": "Entry ₹3.5–4.5 LPA; median ~₹6.63 LPA (Jul 2025); senior ₹12–25 LPA",
        "source": "Glassdoor — Data Analyst Salaries, India",
        "tier": "market-aggregator",
        "url": "https://www.glassdoor.com/Salaries/india-data-analyst-salary-SRCH_IL.0,5_IN115_KO6,18.htm",
        "as_of": "2025-07"
      },
      "growth_outlook": {
        "claim": "High demand; closest official occupation (US, Data Scientists) projected +34% 2024–2034, much faster than average",
        "source": "U.S. Bureau of Labor Statistics — Occupational Outlook Handbook, Data Scientists",
        "tier": "government-official",
        "url": "https://www.bls.gov/ooh/math/data-scientists.htm",
        "as_of": "2024",
        "note": "US figure used as a directional PROXY — India publishes no role-level official projection. Replace with NASSCOM/NCS India data when a citable figure is found."
      },
      "required_skills": {
        "claim": "SQL, data visualization (Power BI/Tableau), Python/R, statistics, communication",
        "source": "O*NET OnLine — Data Scientists (SOC 15-2051.00), U.S. Dept. of Labor",
        "tier": "government-official",
        "url": "https://www.onetonline.org/link/summary/15-2051.00",
        "as_of": "2025"
      },
      "qualifications": {
        "claim": "Typically a bachelor's degree (Statistics/Math/Economics/CS); certifications common",
        "source": "O*NET Job Zone 4; BLS OOH 'How to Become One'",
        "tier": "government-official",
        "url": "https://www.bls.gov/ooh/math/data-scientists.htm",
        "as_of": "2024"
      }
    }
  }
}
```

---

## 5. Rollout (the actual milestone work)

1. **[this doc]** Standard + reference pathway #1 defined. ✅
2. Apply pathway #1 to `careers.json` (surgical, additive edit).
3. UI pass: verified badge + inline source links + **verified-only filter** (`verification.status == "verified"`).
4. Verify pathways #2–#20 against this standard (editorial research — the real bottleneck).
5. Recruit + shepherd **10 families** through the full workflow; define "completed" = *search → target pathway → skill-gap plan → saved plan.* Instrument on existing `career_progress` / `bookmarks` tables.

**Bottleneck is editorial, not engineering.** Steps 2–3 are small; step 4 is the work.
