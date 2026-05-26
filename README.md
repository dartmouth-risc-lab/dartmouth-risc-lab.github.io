# RISc Lab Website — Maintainer Guide

<div align="center">
  <img src="src/assets/logos/RISClogo-whiteoutline.svg" alt="RISc Logo" width="40%"/>
</div>

---

# Table of Contents

- [Running Locally](#running-locally)
- [Repository Structure](#repository-structure)
- [People](#people)
- [Publications](#publications)
- [Awards](#awards)
- [Presentations](#presentations)
- [Outreach](#outreach)
- [Patents](#patents)
- [Resources](#resources)
- [Homepage News](#homepage-news)
- [Homepage Banner Carousel](#homepage-banner-carousel)
- [Funding Logos](#funding-logos)
- [Announcements](#announcements)
- [Styling Notes](#styling-notes)
- [Deployment](#deployment)

---

# Running Locally

Use Node 22.

```bash
npm install --legacy-peer-deps
npm run dev
```

Open:

```text
http://localhost:4321
```

If content schemas change:

```bash
npx astro sync
```

---

# Repository Structure

```text
src/
  assets/
  components/
  content/
  pages/
```

Main editable folders:

```text
src/content/
src/assets/
```

---

# People

Location:

```text
src/content/people/
```

Subfolders:

```text
professors/
postdoc/
phd/
masters/
undergraduates/
visitors/
```

---

# People Template

## Standard Member

```md
---
title: Jane Doe

image: "@assets/people/jane.webp"

startDate: "2025-09-01"
endDate: "2030-06-01"

pronouns: "she/her"

status: "graduated/current"

nextStop: "Assistant Professor at Example University"

social:
  website: "https://example.com"
  scholar: "https://scholar.google.com/..."
  github: "https://github.com/example"
---
```

---

# People Fields

| Field | Required | Meaning |
|---|---|---|
| `title` | Yes | Full name |
| `image` | Optional | Profile image |
| `startDate` | Yes | Used for sorting |
| `endDate` | Optional | Used for alumni/former logic |
| `pronouns` | Optional | Pronouns |
| `status` | Optional | Used for alumni classification |
| `nextStop` | Optional | Displayed for alumni |
| `social` | Optional | Website/social links |

---

# Current Members Logic

A person is considered CURRENT if:

```yaml
endDate:
```

is missing OR is in the future.

Current members are sorted chronologically by:

```yaml
startDate
```

---

# Alumni Logic

A person appears in alumni ONLY if BOTH are true:

```yaml
status: "graduated"
```

AND:

```yaml
endDate < today
```

Otherwise they remain active.

Alumni are separated into:

- Postdoc Alumni
- PhD Alumni
- Masters Alumni
- Undergraduate Alumni

All alumni lists are reverse chronological.

---

# Former Members Logic

Former members are:

- people whose `endDate` has passed
- but DO NOT have:

```yaml
status: "graduated"
```

Visitors never appear in former members.

Former members render:

- compact layout
- no images
- no nextStop display

---

# Visitors

Location:

```text
src/content/people/visitors/
```

Visitors render:

- compact layout
- no images
- reverse chronological order

Example:

```md
---
title: Bruce Wayne

startDate: "2024-01-01"
endDate: "2024-05-01"

pronouns: "he/him"

affliation: "University of Chicago"

social:
  website: "https://scholar.google.com/..."
---
```

---

# Publications

Location:

```text
src/content/publications/
```

Each publication gets its own Markdown file.

---

# Publication Template

```md
---
title: Example Paper

authors:
  - Jane Doe
  - John Smith

conference: SIGGRAPH 2026

date: "2026-07-01"

paper: "add pdf to your website and add that link"

project: "create website on risclab github"

teaser: "@assets/publications/teasers/example.webp"
---
```

---

# Publication Fields

| Field | Meaning |
|---|---|
| `title` | Paper title |
| `authors` | Ordered author list |
| `conference` | Venue |
| `date` | Used for sorting/news |
| `paper` | PDF link |
| `project` | Project page |
| `teaser` | Publication teaser image |

---

# Publication Teasers

Location:

```text
src/assets/publications/teasers/
```

Supported formats:

- `.webp`
- `.png`
- `.jpg`
- `.jpeg`

Teasers are used:

- on publication pages
- in homepage rotating banner

---

# Awards

Location:

```text
src/content/awards/awards.md
```

Example:

```yaml
awards:
  - date: "2026-05-01"
    person: "Jane Doe"
    title: "Best Paper Award"
```

Awards automatically appear in homepage News.

---

# Presentations

Location:

```text
src/content/presentations/presentations.md
```

Example:

```yaml
presentations:
  - date: "2026-01-25"
    person: "Adithya Pediredla"
    event: "Photonics West 2026"
```

Presentations automatically appear in homepage News.

---

# Outreach

Location:

```text
src/content/outreach/outreach.md
```

Example:

```yaml
outreach:
  - date: "2026-04-25"
    title: "Science Day at Dartmouth"
```

Outreach automatically appear in homepage News.

---

# Patents

Location:

```text
src/content/patents/patents.md
```

Example:

```yaml
patents:
  - date: "2026-04-10"
    title: "Example Patent"
    inventors:
      - Jane Doe
```

Patents automatically appear in homepage News.

---

# Resources

Location:

```text
src/content/resources/
```

Each resource is its own Markdown file.

Examples:

```text
risc-lab-guidelines.md
mental-health.md
suggested-reading-list.md
```

Rendered dynamically using:

```text
src/pages/resources/[slug].astro
```

---

# Homepage News

Homepage news is automatically aggregated from:

1. Manual News
2. Awards
3. Outreach
4. Presentations
5. Publications
6. Patents

Tie-breaking priority:

```text
Manual News
→ Awards
→ Outreach
→ Presentations
→ Publications
→ Patents
```

Only latest 3 entries are shown.

---

# Manual News

Location:

```text
src/content/news/news.md
```

Example:

```yaml
news:
  - date: "2026-01-01"
    title: "RISc Lab launched new project"
```

---

# Homepage Banner Carousel

Banner images rotate automatically.

Image sources:

```text
src/assets/lab-photos/
src/assets/publications/teasers/
```

Lab photos are prioritized first.

Banner behavior:

```text
src/components/base/BannerCarousel.astro
```

Rotation timing:

```js
5000 ms
```

Images are intentionally:

- darkened
- slightly blurred
- slightly desaturated

to avoid overpowering the RISc branding overlay.

---

# Lab Photos

Add lab photos here:

```text
src/assets/lab-photos/
```

Recommended:

- wide aspect ratio
- cinematic compositions
- darker images
- minimal embedded text

Supported formats:

- `.webp`
- `.png`
- `.jpg`
- `.jpeg`

These automatically participate in homepage banner rotation.

---

# Funding Logos

Location:

```text
src/assets/funding/
```

To add a new funding source:

1. Add logo to folder
2. Update:

```text
src/components/home/FundingEntry.astro
```

Maintain similar visual sizing as existing logos.

---

# Announcements

Homepage announcement banners are controlled through:

```text
src/content/announcements/
```

Displayed above the RISc logo banner.

Used for:

- REU announcements
- Open positions
- Recruiting notices
- Important updates

---

# Styling Notes

Most styling lives in:

```text
src/components/
```

Tailwind CSS is used heavily throughout the project.

Main editable layouts:

```text
CollectionLayout.astro
Card.astro
BannerCarousel.astro
Header.astro
Footer.astro
```

---

# Deployment

Deployment is automatic. After committing changes, simply push to `main`:

```bash
git push origin main
```

Check deployment status under:

```text
GitHub → Actions
```


Production URL:

```text
https://risclab-dartmouth.com
```

GitHub Pages repository:

```text
dartmouth-risc-lab.github.io
```

