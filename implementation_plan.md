# PTU CGPA Calculator — Full Redesign Implementation Plan

> **Project:** ptucgpa.online  
> **Status:** ✅ All decisions locked — Execution ready  
> **Stack:** React 19 · Vite · TailwindCSS v3 · Framer Motion · Supabase · Vercel · Resend  
> **Author:** Team DeCo  
> **Last Updated:** August 2026

---

## Table of Contents

1. [Current State Analysis](#1-current-state-analysis)
2. [All Decisions & Answers](#2-all-decisions--answers)
3. [Tech Stack & Why](#3-tech-stack--why)
4. [Hosting & Cost Breakdown](#4-hosting--cost-breakdown)
5. [Supabase Free Tier Keep-Alive Strategy](#5-supabase-free-tier-keep-alive-strategy)
6. [SEO Keyword Strategy](#6-seo-keyword-strategy)
7. [New File Structure](#7-new-file-structure)
8. [Database Schema](#8-database-schema)
9. [Auth & Session Design](#9-auth--session-design)
10. [Phase 0 — Project Foundation](#phase-0--project-foundation)
11. [Phase 1 — Calculator Component Split](#phase-1--calculator-component-split)
12. [Phase 2 — Auth Pages UI](#phase-2--auth-pages-ui)
13. [Phase 3 — Supabase Backend Wiring](#phase-3--supabase-backend-wiring)
14. [Phase 4 — Profile Page & Result Persistence](#phase-4--profile-page--result-persistence)
15. [Phase 5 — SEO Optimization](#phase-5--seo-optimization)
16. [Phase 6 — UI Redesign](#phase-6--ui-redesign)
17. [Old vs New Comparison](#17-old-vs-new-comparison)
18. [Execution Timeline](#18-execution-timeline)

---

## 1. Current State Analysis

### What Exists Right Now

```
PTU-CGPA-CALCULATOR/
├── index.html              ← SEO meta, AdSense script, OG tags
├── src/
│   ├── App.jsx             ← MONOLITH: All 10-step calculator logic (435 lines)
│   ├── InfoSection.jsx     ← Static info/FAQ/blog below calculator
│   ├── AdComponent.jsx     ← Google AdSense wrapper
│   ├── LegalPages.jsx      ← Privacy/Terms component (not routed)
│   ├── data.js             ← 2003 lines of syllabus, grading, departments
│   ├── index.css           ← Minimal global styles
│   └── App.css             ← Minimal
├── public/
│   ├── privacy.html        ← Static HTML page
│   ├── terms.html          ← Static HTML page
│   ├── sw.js               ← Minimal service worker
│   └── [favicons, ads.txt, webmanifest, thumbnail.jpg]
```

### Current App Flow (10-step wizard, single page, ephemeral)

```
Step 0  →  Hero (landing)
Step 1  →  Select College (PTU / WEC / PKIET)
Step 2  →  Select Program Level (UG / PG) [PTU only]
Step 3  →  Select Batch / PG Course
Step 4  →  Select Department / Specialization
Step 5  →  Select Admission Type (Regular / Lateral Entry)
Step 6  →  Select Calculation Mode (Specific Semester / Cumulative CGPA)
Step 7  →  Select Target Semester
Step 8  →  Enter Grades Per Subject
Step 9  →  View Result (SGPA / CGPA)
```

**Problems with current architecture:**
- No routing — everything in one file, one URL
- No user accounts — results disappear on refresh
- No persistence — students have to re-enter all grades every visit
- No navigation bar or footer navigation
- Monolithic `App.jsx` is hard to maintain
- Limited SEO — single static meta description

### Colleges & Batches in Codebase

| College ID | Full Name | Type |
|------------|-----------|------|
| `PTU` | Puducherry Technological University | Complex (UG + PG) |
| `WEC` | Women's Engineering College | Simple (UG only) |
| `PKIET` | PKIET Karaikal | Simple (UG only) |

| College | Batch | Regulation |
|---------|-------|------------|
| PTU UG | 2025-29 | NEP2024 |
| PTU UG | 2024-28 | NEP2024 |
| PTU UG | 2023-27 | R2020 |
| PTU UG | 2022-26 | R2020 |
| PTU PG | M.Tech | MTECH_R2024 |
| PTU PG | MCA, MBA, M.Sc | PG_R2020 |
| WEC / PKIET | 2022, 2023, 2024, 2025 | R2020 |

### Departments in Codebase

**PTU UG:** CSE · IT · ECE · EEE · EIE · Mechanical · Civil · Chemical · Mechatronics  
**PKIET:** CSE · ECE · IT · Petrochemical · Biomedical · Agriculture  
**WEC:** CSE · ECE · ISE · EEE · Architectural Assistantship  
**PTU M.Tech:** Data Science · Information Security · IoT · Wireless Comm · ECE General · Electrical Drives · Product Design · Energy Technology · Structural Engg · Environmental Engg · Instrumentation · Chemical Engg  
**PTU PG:** MCA (Computer Applications) · MBA · M.Sc

## Phase 4.5 — Dashboard vs Profile Restructure

### Goal
Refine the logged-in user experience by separating the "Dashboard" (where they see their saved results and calculate button) from the "Profile Details" (where they edit their name/college). Move the SEO info boxes to the calculator page, and fix brutalist styling inconsistencies.

### Proposed Changes

#### 1. Routing & Navbar Updates (`App.jsx` & `Navbar.jsx`)
- Rename `/profile` route to `/dashboard` (as the main landing page for logged-in users).
- Create a new dedicated `/profile` route just for editing user details.
- Update the Navbar so the "Profile" button links to `/profile`.

#### 2. The Dashboard (`DashboardPage.jsx`)
- Create `src/pages/DashboardPage.jsx` to replace `ProfilePage.jsx`.
- **Top:** "Welcome back, {Name}" banner.
- **Middle:** A large, brutalist "Calculate your CGPA instantly" CTA box (no scrolling required).
- **Bottom:** The `<SavedResults />` grid.
- **Removed:** The `ProfileCard` (moved to `/profile`).

#### 3. The Profile Details Page (`ProfilePage.jsx`)
- Update `ProfilePage.jsx` to ONLY show the `<ProfileCard />`.
- Redesign `<ProfileCard />` to use strict brutalist UI (thick black borders, sharp corners, solid primary colors) to match the landing page.

#### 4. The Calculator Page (`CalculatorPage.jsx`)
- Move the three info boxes ("PTU & Affiliated", "UG & PG Support", "Fast & Accurate" from the old `InfoSection`) to the bottom of the `CalculatorPage.jsx`.
- Remove the `scale-110` CSS trick on the calculator container, which is likely causing the "laggy" animation feeling.

### Open Questions / User Review Required
> [!IMPORTANT]
> **Calculator Step Routing:** You mentioned wanting every button click inside the calculator to "open in a new page". Refactoring the calculator to use URL routes for every single step (e.g., `/calculator/step-1`, `/calculator/step-2`) is a major rewrite because it requires moving all local state into a global context. 
> 
> **My recommendation:** The "laggy" feeling you experienced was likely caused by a `scale` CSS trick I added in the previous step that conflicts with Framer Motion animations. Let me remove that and fix the Dashboard UI first. If the calculator still feels laggy to you after this update, we can fully rewrite it to use routes. Do you approve this approach?

---

## 2. All Decisions & Answers

| Question | Decision |
|----------|----------|
| Backend | **Supabase** (PostgreSQL + Auth + Row-Level Security) |
| Frontend hosting | **Vercel** — free, never sleeps, global CDN |
| OTP email provider | **Resend** — free 3,000 emails/month |
| Session duration | **7 days** rolling (auto-extends on each activity) |
| Email validation | **Suggestion only** — hint text "Prefer your college/student email ID", no hard domain check |
| College email domains | Not enforced — users can use any email |
| Supabase pause problem | **GitHub Actions keep-alive cron** runs every 4 days |
| UI redesign style | Awaiting user's design template / skill files |
| Auth type | Custom OTP signup — NOT Google/social login |
| Token storage | Supabase handles this via HttpOnly cookies — secure by default |

---

## 3. Tech Stack & Why

| Layer | Technology | Reason |
|-------|-----------|--------|
| UI Framework | React 19 + Vite | Already in use, fast, modern |
| Styling | TailwindCSS v3 | Already in use |
| Animations | Framer Motion | Already in use |
| Routing | `react-router-dom` v6 | SPA routing, no page reloads |
| Backend + DB | Supabase (PostgreSQL) | Free tier, built-in auth, real-time, RLS |
| Auth | Supabase Auth | Built-in OTP, session management, bcrypt passwords |
| Email / OTP | Resend | Free 3k/month, simple API, deliverable emails |
| Hosting | Vercel | Free forever for frontend, no sleep, auto-deploys |
| Icons | Lucide React | Already in use |
| Screenshot | html2canvas | Already in use (result download) |

---

## 4. Hosting & Cost Breakdown

### Vercel (Frontend)
- **Cost:** Free forever
- **Sleep:** Never — static assets on global CDN
- **Deploy:** Auto-deploy on every `git push` to `main`
- **Custom domain:** Connect `ptucgpa.online` to Vercel (free SSL included)
- **Env vars:** Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel dashboard

### Supabase (Backend + Database)
- **Cost:** Free tier
- **Limits:** 500MB DB · 50k monthly active users · 2GB bandwidth · 50MB file storage
- **Sleep risk:** Project pauses after 7 days of zero DB activity → **Fixed by keep-alive cron** (see Section 5)
- **Upgrade path:** Supabase Pro = $25/month — removes pause risk entirely if needed later

### Resend (OTP Email)
- **Cost:** Free tier
- **Limits:** 3,000 emails/month · 100 emails/day
- **Use case:** OTP verification emails + welcome emails only
- **Sufficient for:** ~100 new signups per day max (well within college scale)

### Total Monthly Cost: ₹0

> **If project grows significantly:**  
> Supabase Pro ($25/month) → removes pause issue, 8GB DB, more users  
> Vercel Pro ($20/month) → analytics, more bandwidth (not needed at this scale)

---

## 5. Supabase Free Tier Keep-Alive Strategy

### The Problem
Supabase free tier **pauses your project after 7 consecutive days of zero database activity**. A paused project takes ~30 seconds to wake up on first request, which will make the login appear broken.

### Solution A — GitHub Actions Cron (Recommended, FREE)

Create this file in the project repository:

```
.github/
└── workflows/
    └── supabase-keepalive.yml
```

```yaml
# .github/workflows/supabase-keepalive.yml
name: Supabase Keep-Alive

on:
  schedule:
    - cron: '0 10 */4 * *'   # Every 4 days at 10:00 AM UTC
  workflow_dispatch:           # Allows manual trigger from GitHub UI

jobs:
  ping-db:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Supabase DB
        run: |
          curl -X POST "${{ secrets.SUPABASE_URL }}/rest/v1/rpc/ping" \
            -H "apikey: ${{ secrets.SUPABASE_ANON_KEY }}" \
            -H "Content-Type: application/json" \
            --fail \
            --silent \
            --show-error
          echo "✅ Supabase pinged successfully"
```

**Setup steps:**
1. In Supabase SQL editor, create the ping function:
   ```sql
   CREATE OR REPLACE FUNCTION public.ping()
   RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$ SELECT true; $$;
   ```
2. In GitHub repo → Settings → Secrets → Actions, add:
   - `SUPABASE_URL` = your Supabase project URL
   - `SUPABASE_ANON_KEY` = your Supabase anon key
3. Push the workflow file to main branch — it will run automatically every 4 days

### Solution B — cron-job.org (Backup, also FREE)

1. Go to [cron-job.org](https://cron-job.org) → create free account
2. Add a new cron job that pings `https://ptucgpa.online` every 3 days
3. Even a frontend page load that calls Supabase counts as activity

### Why Every 4 Days?
- Supabase pauses after **7 days** of inactivity
- We ping every **4 days** — giving a 3-day buffer in case GitHub Actions has a delay
- During active college periods, real user logins will keep it alive anyway

---

## 6. SEO Keyword Strategy

### Primary Target Keywords
| Keyword | Intent |
|---------|--------|
| `PTU CGPA calculator` | Direct tool search |
| `PEC CGPA calculator` | Direct tool search (PEC = common abbreviation) |
| `Puducherry Technological University CGPA calculator` | Full name search |
| `CGPA calculator for college` | Generic |
| `PTU CGPA 2024-25` | Year-specific |

### Department-Specific Keywords (from `data.js`)
- `PTU CSE CGPA calculator` · `PEC computer science CGPA`
- `PTU IT CGPA calculator` · `PEC information technology CGPA`
- `PTU ECE CGPA calculator` · `PEC electronics and communication CGPA`
- `PTU EEE CGPA calculator` · `PEC electrical and electronics CGPA`
- `PTU EIE CGPA` · `PTU electronics and instrumentation`
- `PTU Mechanical Engineering CGPA calculator`
- `PTU Civil Engineering CGPA calculator`
- `PTU Chemical Engineering CGPA`
- `PTU Mechatronics CGPA`
- `PTU M.Tech CGPA calculator`
- `PTU MCA CGPA calculator`
- `PTU MBA CGPA calculator`
- `WEC CGPA calculator` · `Women's Engineering College Puducherry CGPA`
- `PKIET CGPA calculator` · `PKIET Karaikal`

### Informational / Long-tail Keywords
- `how to calculate CGPA in PTU`
- `PTU R2020 grading system explained`
- `PTU NEP 2024 grading system`
- `SGPA to CGPA converter PTU`
- `SGPA to percentage formula PTU`
- `PTU lateral entry CGPA calculator`
- `PTU batch 2022 2023 2024 2025 CGPA`
- `how to improve CGPA in PTU`
- `PTU result calculation formula`
- `difference between R2020 and NEP 2024 PTU`
- `does W grade affect CGPA in PTU`
- `PTU affiliated college CGPA`

### Blog Article Plan (5 Articles)

| File | URL Slug | Target Keywords | Word Count |
|------|----------|----------------|------------|
| `how-to-calculate-cgpa-ptu.jsx` | `/blog/how-to-calculate-cgpa-ptu` | how to calculate CGPA in PTU, PTU CGPA formula | 700 |
| `nep-2024-vs-r2020-grading.jsx` | `/blog/nep-2024-vs-r2020-ptu-grading` | PTU NEP 2024, R2020 grading, difference | 650 |
| `sgpa-to-percentage-ptu.jsx` | `/blog/sgpa-to-percentage-ptu` | SGPA to percentage PTU, CGPA to percentage formula | 600 |
| `how-to-improve-cgpa-ptu.jsx` | `/blog/how-to-improve-cgpa-ptu` | improve CGPA PTU, boost SGPA strategies | 750 |
| `ptu-affiliated-colleges-guide.jsx` | `/blog/ptu-affiliated-wec-pkiet-guide` | WEC CGPA, PKIET CGPA, PEC affiliated colleges | 600 |

---

## 7. New File Structure

```
PTU-CGPA-CALCULATOR/
│
├── .github/
│   └── workflows/
│       └── supabase-keepalive.yml          ← KEEP-ALIVE CRON (critical)
│
├── index.html                               ← Updated: JSON-LD schema, more keywords
│
├── src/
│   ├── main.jsx                             ← Unchanged entry point
│   ├── App.jsx                              ← CHANGED: Router-only shell
│   │
│   ├── pages/                              ← NEW folder
│   │   ├── HomePage.jsx                    ← Hero + CalculatorWizard
│   │   ├── AuthPage.jsx                    ← Signup + Login + OTP verify (tabs)
│   │   ├── ProfilePage.jsx                 ← Profile card + saved results
│   │   └── BlogPage.jsx                    ← Dynamic blog article renderer
│   │
│   ├── components/
│   │   ├── Navbar.jsx                      ← NEW: Sticky top nav
│   │   ├── Footer.jsx                      ← NEW: Footer with links
│   │   │
│   │   ├── Calculator/                     ← EXTRACTED from App.jsx
│   │   │   ├── CalculatorWizard.jsx        ← Step state machine
│   │   │   ├── StepCollege.jsx             ← Step 1
│   │   │   ├── StepLevel.jsx               ← Step 2 (PTU only)
│   │   │   ├── StepBatch.jsx               ← Step 3
│   │   │   ├── StepDept.jsx                ← Step 4
│   │   │   ├── StepAdmission.jsx           ← Step 5
│   │   │   ├── StepMode.jsx                ← Step 6
│   │   │   ├── StepSemester.jsx            ← Step 7
│   │   │   ├── StepGradeInput.jsx          ← Step 8
│   │   │   └── StepResult.jsx              ← Step 9
│   │   │
│   │   ├── Auth/                           ← NEW
│   │   │   ├── SignupForm.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   └── OTPVerify.jsx
│   │   │
│   │   ├── Profile/                        ← NEW
│   │   │   ├── ProfileCard.jsx
│   │   │   └── SavedResults.jsx
│   │   │
│   │   └── UI/                             ← NEW shared UI
│   │       ├── Modal.jsx
│   │       └── AdComponent.jsx             ← MOVED from src/
│   │
│   ├── context/
│   │   └── AuthContext.jsx                 ← NEW: Global user/session state
│   │
│   ├── hooks/
│   │   ├── useAuth.js                      ← NEW: auth helper hook
│   │   └── useCalculator.js                ← NEW: calculator logic hook
│   │
│   ├── services/
│   │   ├── supabase.js                     ← NEW: Supabase client init
│   │   ├── auth.js                         ← NEW: signup/login/OTP/logout calls
│   │   └── results.js                      ← NEW: save/load semester results
│   │
│   ├── blog/
│   │   ├── articles.js                     ← NEW: article metadata list
│   │   └── content/
│   │       ├── how-to-calculate-cgpa-ptu.jsx
│   │       ├── nep-2024-vs-r2020-grading.jsx
│   │       ├── sgpa-to-percentage-ptu.jsx
│   │       ├── how-to-improve-cgpa-ptu.jsx
│   │       └── ptu-affiliated-colleges-guide.jsx
│   │
│   ├── data.js                             ← UNCHANGED (syllabus data)
│   ├── InfoSection.jsx                     ← MODIFIED: more FAQ, dept links
│   ├── LegalPages.jsx                      ← UNCHANGED
│   ├── index.css                           ← MODIFIED in Phase 6 (redesign)
│   └── App.css                             ← MODIFIED in Phase 6 (redesign)
│
├── public/
│   ├── sitemap.xml                         ← NEW
│   ├── robots.txt                          ← NEW
│   └── [all existing files unchanged]
│
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql          ← NEW: DB schema
│
├── .env.local                              ← NEW: Supabase env vars (gitignored)
├── .env.example                            ← NEW: Template for env vars
└── package.json                            ← MODIFIED: add react-router-dom, supabase
```

---

## 8. Database Schema

```sql
-- ============================================================
-- File: supabase/migrations/001_initial_schema.sql
-- Run this in Supabase SQL Editor
-- ============================================================

-- User profiles (extends Supabase's built-in auth.users table)
CREATE TABLE public.profiles (
  id            UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name          TEXT        NOT NULL,
  register_no   TEXT        UNIQUE NOT NULL,
  college       TEXT        NOT NULL CHECK (college IN ('PTU', 'WEC', 'PKIET')),
  batch         TEXT        NOT NULL CHECK (batch IN ('2022', '2023', '2024', '2025')),
  dept          TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Saved semester results (one row per user per semester)
CREATE TABLE public.saved_results (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  college         TEXT        NOT NULL,
  batch           TEXT        NOT NULL,
  regulation      TEXT        NOT NULL,
  dept            TEXT        NOT NULL,
  entry_type      TEXT        NOT NULL DEFAULT 'regular',  -- 'regular' or 'lateral'
  semester        INTEGER     NOT NULL CHECK (semester BETWEEN 1 AND 8),
  sgpa            NUMERIC(4,2) NOT NULL,
  grade_data      JSONB       NOT NULL,  -- raw grade selections for re-display
  calculated_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, college, dept, batch, semester)  -- one result per semester per user
);

-- Keep-alive ping function (used by GitHub Actions cron)
CREATE OR REPLACE FUNCTION public.ping()
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$ SELECT true; $$;

-- Auto-update updated_at on profile changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Row Level Security (users can ONLY see/edit their own data)
-- ============================================================
ALTER TABLE public.profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Own profile only"   ON public.profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Own results only"   ON public.saved_results
  FOR ALL USING (auth.uid() = user_id);
```

---

## 9. Auth & Session Design

### Signup Flow

```
User fills Sign Up form
  ↓
Frontend validates (all fields required, password match, reg number format)
  ↓
supabase.auth.signUp({ email, password, options: { data: { name, register_no, college, batch } } })
  ↓
Supabase creates unconfirmed user + sends OTP email via Resend SMTP
  ↓
Frontend navigates to OTP screen
  ↓
User enters 6-digit OTP
  ↓
supabase.auth.verifyOtp({ email, token, type: 'email' })
  ↓
Supabase confirms user → triggers DB function to insert into public.profiles
  ↓
User is now logged in → redirect to /profile
```

### Login Flow

```
User enters email + password
  ↓
supabase.auth.signInWithPassword({ email, password })
  ↓
Supabase verifies credentials → returns session (access_token + refresh_token)
  ↓
supabase-js SDK stores tokens in HttpOnly cookie automatically
  ↓
AuthContext.onAuthStateChange fires → sets user in React state
  ↓
Redirect to /profile or back to calculator
```

### Session Management

| Property | Value |
|----------|-------|
| Access token lifetime | 1 hour (Supabase default) |
| Refresh token lifetime | **7 days** (set in Supabase Auth settings) |
| Token storage | HttpOnly cookie (managed by supabase-js SDK — NOT localStorage) |
| Auto-refresh | supabase-js SDK silently renews access token before expiry |
| Logout | `supabase.auth.signOut()` → revokes session server-side |

### Security Model

| Threat | Protection |
|--------|-----------|
| XSS token theft | Tokens in HttpOnly cookies — JS cannot read them |
| CSRF | Supabase uses SameSite=Strict cookies |
| Brute force | Supabase built-in rate limiting on auth endpoints |
| Data snooping | Row Level Security — users can ONLY see their own rows |
| Password storage | bcrypt hashing handled by Supabase (cost factor 10) |
| OTP abuse | OTP expires in 10 minutes, one-time use only |
| Session hijack | Refresh token rotation — old token invalidated after each use |

### Signup Form Fields

```
┌─────────────────────────────────────────────────┐
│  Full Name               [_____________________] │
│  Register Number         [_____________________] │
│  College                 [PTU ▾ / WEC ▾ / PKIET ▾] │
│  Batch                   [2022 ▾ / 2023 ▾ / ...]  │
│  Email                   [_____________________] │
│  💡 Prefer your college/student email ID         │
│  Password                [_____________________] │
│  Confirm Password        [_____________________] │
│                          [  Create Account  ]    │
└─────────────────────────────────────────────────┘
```

### OTP Screen

```
┌─────────────────────────────────────────────────┐
│  ✉️  We sent a 6-digit code to                  │
│     your@email.com                               │
│                                                  │
│  [ 0 ] [ 0 ] [ 0 ] [ 0 ] [ 0 ] [ 0 ]           │
│                                                  │
│  Resend OTP (60s cooldown timer)                 │
│                          [    Verify    ]        │
└─────────────────────────────────────────────────┘
```

---

## Phase 0 — Project Foundation

**Goal:** Install all new packages, create folder structure, set up routing shell, wire Supabase client.  
**Estimated time:** 30–45 minutes  
**Blocker:** None — can start immediately

### Tasks

- [ ] Install new packages:
  ```bash
  npm install react-router-dom @supabase/supabase-js
  ```
- [ ] Create folder structure (all new folders from Section 7)
- [ ] Create `.env.example`:
  ```
  VITE_SUPABASE_URL=your-supabase-project-url
  VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
  ```
- [ ] Create `.env.local` with actual values (gitignored)
- [ ] Create `src/services/supabase.js`:
  ```js
  import { createClient } from '@supabase/supabase-js';
  export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  ```
- [ ] Create `src/context/AuthContext.jsx` — shell that:
  - Wraps the app
  - Listens to `supabase.auth.onAuthStateChange`
  - Provides `user`, `profile`, `isLoggedIn`, `loading` via context
- [ ] Refactor `src/App.jsx` into a Router-only shell:
  ```
  / → HomePage
  /auth → AuthPage
  /profile → ProfilePage  (protected — redirect to /auth if not logged in)
  /blog/:slug → BlogPage
  ```
- [ ] Create placeholder `pages/AuthPage.jsx`, `pages/ProfilePage.jsx`, `pages/BlogPage.jsx` (show "Coming soon" text)
- [ ] Create `pages/HomePage.jsx` that renders the existing App.jsx calculator content

### Deliverable
App works exactly as before. `/` shows calculator. Navigating to `/auth` shows placeholder. No existing functionality is broken.

---

## Phase 1 — Calculator Component Split

**Goal:** Break the 435-line monolithic `App.jsx` into clean, maintainable components.  
**Estimated time:** 1.5–2 hours  
**Blocker:** Phase 0 complete

### Tasks

- [ ] Create `src/hooks/useCalculator.js` — extract all calculator logic:
  - All state variables (step, college, level, batch, dept, mode, gradeData, result, etc.)
  - All handler functions (nextStep, handleManualBack, reset, handleCalculate, handleAddSubject, handleDeleteSubject, handleDownload)
  - Return all state + handlers as a single object
- [ ] Create `CalculatorWizard.jsx` — imports `useCalculator`, renders the step AnimatePresence
- [ ] Split each step into its own file:
  - `StepCollege.jsx` — renders COLLEGES grid (Step 1)
  - `StepLevel.jsx` — renders PTU_LEVELS grid (Step 2)
  - `StepBatch.jsx` — renders batch buttons (Step 3)
  - `StepDept.jsx` — renders department buttons (Step 4)
  - `StepAdmission.jsx` — Regular / Lateral (Step 5)
  - `StepMode.jsx` — Specific / Cumulative (Step 6)
  - `StepSemester.jsx` — semester number grid (Step 7)
  - `StepGradeInput.jsx` — subject list + grade dropdowns (Step 8)
  - `StepResult.jsx` — result card + download (Step 9)
- [ ] Move `AdComponent.jsx` to `components/UI/AdComponent.jsx`
- [ ] Create `components/Navbar.jsx`:
  - Logo on left (links to `/`)
  - If NOT logged in: "Login" button (links to `/auth`)
  - If logged in: Profile avatar icon + name (links to `/profile`) + Logout button
  - "Credits" button (keeps existing Credits modal)
  - Mobile: hamburger menu
- [ ] Create `components/Footer.jsx`:
  - Copyright "© 2025 Team DeCo"
  - Links: Privacy Policy · Terms of Use · Contact Dev
- [ ] Update `pages/HomePage.jsx` to use:
  - `<Navbar />`
  - `<CalculatorWizard />`
  - `<InfoSection />`
  - `<Footer />`
- [ ] Test: all college → batch → dept → semester paths work identically
- [ ] Test: back navigation, reset, download result all still work

### Deliverable
Identical functionality, clean component tree. Navbar visible on all pages.

---

## Phase 2 — Auth Pages UI

**Goal:** Build complete auth page UI with proper form design, validation, and OTP screen. No backend connected yet.  
**Estimated time:** 2–3 hours  
**Blocker:** Phase 1 complete

### Tasks

- [ ] Build `pages/AuthPage.jsx` with two tabs: **Sign Up** | **Log In**
- [ ] Build `components/Auth/SignupForm.jsx`:
  - Full Name (text, required)
  - Register Number (text, required)
  - College (select: PTU / WEC / PKIET)
  - Batch (select: auto-filtered when college changes — PTU shows 2022–2025, same for others)
  - Email (email type, required)
  - Helper text below: *"💡 Prefer your college/student email ID"*
  - Password (password type, show/hide toggle)
  - Confirm Password (password type, show/hide toggle)
  - Client-side validation: all required, password match, email format
  - "Create Account" button with loading spinner state
- [ ] Build `components/Auth/LoginForm.jsx`:
  - Email or Register Number (text, required)
  - Password (password type, show/hide toggle)
  - "Forgot Password?" link (placeholder for now)
  - "Login" button with loading spinner state
- [ ] Build `components/Auth/OTPVerify.jsx`:
  - Display email address that OTP was sent to
  - 6 individual digit input boxes (auto-focus next on input)
  - "Resend OTP" button with 60-second cooldown timer
  - "Verify" button
  - Back to signup link
- [ ] Tab switching animation (Framer Motion slide or fade)
- [ ] Error message display (red banner below form)
- [ ] Success state styling

### Deliverable
Beautiful auth page with working form validation. All states visible. No backend calls yet.

---

## Phase 3 — Supabase Backend Wiring

**Goal:** Connect all auth forms to real Supabase backend. Set up DB. Configure Resend OTP emails. Set up the keep-alive cron.  
**Estimated time:** 2–3 hours  
**Blocker:** Phase 2 complete + Supabase project created

### Pre-requisites (manual steps)
1. Create Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/001_initial_schema.sql` in Supabase SQL Editor
3. In Supabase → Authentication → SMTP Settings:
   - Enable custom SMTP
   - Host: `smtp.resend.com`
   - Port: `465`
   - Username: `resend`
   - Password: your Resend API key
   - Sender name: `PTU CGPA Calculator`
   - Sender email: `noreply@ptucgpa.online`
4. In Supabase → Authentication → Settings:
   - Set refresh token expiry to `604800` (7 days in seconds)
   - Enable email confirmations
5. Copy Supabase URL and Anon Key to `.env.local` and Vercel project settings
6. Create Resend account at [resend.com](https://resend.com), get API key

### Tasks

- [ ] Create `src/services/auth.js`:
  ```js
  // signUp(name, registerNo, college, batch, email, password)
  // verifyOTP(email, token)
  // logIn(email, password)
  // logOut()
  // getProfile(userId)
  // updateProfile(userId, data)
  ```
- [ ] Wire `SignupForm.jsx` → `auth.signUp()` → on success show OTPVerify screen
- [ ] Wire `OTPVerify.jsx` → `auth.verifyOTP()` → on success redirect to `/profile`
- [ ] Wire `LoginForm.jsx` → `auth.logIn()` → on success redirect to `/profile` or back to calculator
- [ ] Wire `AuthContext.jsx` → `supabase.auth.onAuthStateChange` → update user state app-wide
- [ ] Wire Navbar:
  - Login button → `/auth`
  - Logout → `supabase.auth.signOut()` → redirect to `/`
  - Profile → `/profile`
- [ ] Create protected route logic: `/profile` redirects to `/auth` if not logged in
- [ ] Set up GitHub Actions keep-alive:
  - Create `.github/workflows/supabase-keepalive.yml` (full YAML in Section 5)
  - Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` as GitHub repo secrets
- [ ] Test full signup → OTP → login → session persistence (refresh page, still logged in)
- [ ] Test logout → session cleared → redirect to `/`

### Deliverable
Full working auth. Users can create accounts, verify email, log in, stay logged in for 7 days, log out. Supabase will not pause.

---

## Phase 4 — Profile Page & Result Persistence

**Goal:** Build the profile page. Save calculation results to DB. Show saved results to returning users.  
**Estimated time:** 2–3 hours  
**Blocker:** Phase 3 complete

### Tasks

- [ ] Create `src/services/results.js`:
  ```js
  // saveResult(userId, { college, batch, regulation, dept, entryType, semester, sgpa, gradeData })
  // getResults(userId)
  // deleteResult(resultId)
  ```
- [ ] Build `pages/ProfilePage.jsx`:
  - Fetches profile from `public.profiles` on mount
  - Shows `<ProfileCard />` at top
  - Shows `<SavedResults />` below
- [ ] Build `components/Profile/ProfileCard.jsx`:
  - Displays: Name, Register Number, College, Batch, Email (read from Supabase)
  - "Edit Profile" toggle → inline form to update Name, College, Batch
  - Save button → calls `updateProfile()` → shows success toast
- [ ] Build `components/Profile/SavedResults.jsx`:
  - Fetches all saved results for logged-in user
  - Shows semester cards in a grid: "Semester X — SGPA: Y.YY — [college] [dept] [batch]"
  - Each card has a delete (trash) button
  - Empty state: "No saved results yet. Calculate your CGPA to save your first result."
  - "Calculate New Semester" CTA button → links to `/`
- [ ] Modify `StepResult.jsx` (Step 9 of calculator):
  - If user is **logged in**: show "💾 Save to Profile" button alongside Retry + Save Image
  - Clicking it calls `saveResult()` → shows success confirmation
  - If result for that semester already exists: show "Update saved result?" confirmation dialog
  - If user is **NOT logged in**: show banner "Login to save your results permanently" with Login link
- [ ] Modify `pages/HomePage.jsx`:
  - If user is logged in AND has saved results → show banner above calculator:
    > "👋 Welcome back, [Name]! You have CGPA saved for Semesters 1, 2, 3. Calculate a new one?"

### Deliverable
Full profile system. Semester results persist. Returning users see their history and can continue calculating.

---

## Phase 5 — SEO Optimization

**Goal:** Maximize search engine visibility for all target keywords.  
**Estimated time:** 2–3 hours  
**Can run:** In parallel with Phase 1 (technical SEO) or after Phase 1 (blog pages)

### 5a — Technical SEO

- [ ] Update `index.html`:
  - Expand `<meta name="keywords">` with all department and long-tail keywords from Section 6
  - Add JSON-LD `WebApplication` schema:
    ```json
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "PTU CGPA Calculator",
      "url": "https://ptucgpa.online",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web",
      "description": "Official CGPA calculator for Puducherry Technological University (PTU/PEC), WEC, and PKIET.",
      "offers": { "@type": "Offer", "price": "0" }
    }
    ```
  - Add JSON-LD `FAQPage` schema using existing FAQ content from InfoSection
  - Add `<link rel="canonical" href="https://ptucgpa.online/" />`
- [ ] Create `public/sitemap.xml`:
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://ptucgpa.online/</loc><priority>1.0</priority></url>
    <url><loc>https://ptucgpa.online/blog/how-to-calculate-cgpa-ptu</loc><priority>0.8</priority></url>
    <url><loc>https://ptucgpa.online/blog/nep-2024-vs-r2020-ptu-grading</loc><priority>0.8</priority></url>
    <url><loc>https://ptucgpa.online/blog/sgpa-to-percentage-ptu</loc><priority>0.8</priority></url>
    <url><loc>https://ptucgpa.online/blog/how-to-improve-cgpa-ptu</loc><priority>0.7</priority></url>
    <url><loc>https://ptucgpa.online/blog/ptu-affiliated-wec-pkiet-guide</loc><priority>0.7</priority></url>
  </urlset>
  ```
- [ ] Create `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://ptucgpa.online/sitemap.xml
  ```
- [ ] Update `InfoSection.jsx`:
  - Expand FAQ from 3 to 8–10 questions (cover all keyword clusters)
  - Add "Department-specific guides" section with quick-links for CSE, IT, ECE, EEE, MECH, CIVIL

### 5b — Blog Pages

- [ ] Create `src/blog/articles.js` — metadata for all 5 articles (slug, title, description, date, readTime)
- [ ] Build `pages/BlogPage.jsx` — dynamic renderer that matches slug to article component
- [ ] Write all 5 blog articles with proper `<h1>/<h2>` hierarchy, 600+ words, department examples, internal links to calculator

### 5c — Route-level SEO

- [ ] Add `react-helmet-async` for per-route `<title>` and `<meta description>` tags:
  - `/` → "PTU CGPA Calculator — Official & Accurate | ptucgpa.online"
  - `/auth` → "Login or Sign Up — PTU CGPA Calculator"
  - `/profile` → "My Profile & Saved Results — PTU CGPA Calculator"
  - `/blog/:slug` → dynamic per-article title

### Deliverable
Site is fully indexed. All department and long-tail keywords targeted. 5 blog articles live.

---

## Phase 6 — UI Redesign

**Goal:** Apply total visual redesign to all pages.  
**Status:** ⏳ Awaiting design template / skill files from user  
**Estimated time:** 4–6 hours (after template received)

### What Will Change

- [ ] `src/index.css` — new design system: color palette, typography tokens, spacing, gradients
- [ ] `src/App.css` — update global base styles
- [ ] All step components — new card and button visual design
- [ ] `Navbar.jsx` — new premium design
- [ ] `AuthPage.jsx` + auth components — premium form design
- [ ] `ProfilePage.jsx` — premium card layout
- [ ] `BlogPage.jsx` — clean readable article typography
- [ ] Hero section (`StepResult.jsx` Step 0) — complete visual overhaul

### Design Principles (to apply from template)
- Rich aesthetics — premium look on first glance
- Curated color palette (not plain blue/white)
- Google Fonts typography (Inter / Outfit / Roboto)
- Smooth gradients
- Micro-animations on hover/click
- Glassmorphism where appropriate
- Dark mode consideration

### Deliverable
The app looks completely different — premium, modern, wow-factor on first load.

---

## 17. Old vs New Comparison

| Feature | Current (Old) | New |
|---------|--------------|-----|
| Architecture | Monolithic `App.jsx` | SPA with React Router, 4 routes, component-based |
| Navigation | No navbar | Sticky Navbar — logo, login/profile, credits |
| Routing | Single `/` URL | `/`, `/auth`, `/profile`, `/blog/:slug` |
| Auth | ❌ None | ✅ Signup → OTP → Login → 7-day sessions |
| Accounts | ❌ None | ✅ Profile page with name, reg no, college, batch |
| Data persistence | ❌ Ephemeral — refresh = lost | ✅ Per-semester results saved in Supabase |
| Return user UX | ❌ Starts from scratch | ✅ Shows saved semester history |
| Security | N/A | ✅ bcrypt + HttpOnly cookies + RLS + rate limiting |
| SEO | Basic meta tags only | Sitemap + JSON-LD schema + blog articles + dept keywords |
| Blog | Static `InfoSection.jsx` | 5 dynamic blog articles at `/blog/:slug` |
| File structure | 4 source files | Organized pages/, components/, context/, services/, blog/ |
| Supabase pause | N/A | ✅ GitHub Actions keep-alive cron every 4 days |
| Colleges | PTU, WEC, PKIET | Same 3 — fully preserved |
| Batches | 2022–2025 (4 batches) | Same 4 — fully preserved |
| Grading systems | R2020, NEP2024, PG_R2020, MTECH_R2024 | Same — fully preserved |
| data.js syllabus | 2003 lines | Unchanged — all syllabus data preserved |

---

## 18. Execution Timeline

```
Phase 0  →  Project Foundation            [NO BLOCKER — Start now]
              Install react-router-dom + supabase-js
              Create folder structure
              Set up routing shell + AuthContext + Supabase client

Phase 1  →  Calculator Component Split    [After Phase 0]
              Extract steps from App.jsx
              Create Navbar + Footer
              Test all paths still work

Phase 5a →  Technical SEO                 [Can run parallel to Phase 1]
              sitemap.xml + robots.txt + JSON-LD schema

Phase 2  →  Auth Pages UI                 [After Phase 1]
              Signup / Login / OTP form UI

Phase 3  →  Supabase Backend Wiring       [After Phase 2]
              Real auth, Resend OTP email
              Keep-alive cron setup

Phase 4  →  Profile + Result Persistence  [After Phase 3]
              Save SGPA per semester
              Profile page + saved results display

Phase 5b →  Blog Articles                 [After Phase 4]
              Write 5 articles + BlogPage renderer

Phase 6  →  UI Redesign                   [Waiting on design template]
              Total visual overhaul
```

**Total estimated coding time (Phases 0–5):** 12–16 hours  
**Phase 6 (UI Redesign):** 4–6 hours after template received  

---

*Plan prepared by Antigravity for Team DeCo · PTU CGPA Calculator Redesign · August 2026*  
*All decisions finalized. Ready for execution starting Phase 0.*
