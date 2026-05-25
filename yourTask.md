# Your SEO Checklist

Everything in `index.html`, `robots.txt`, `sitemap.xml`, and `llms.txt` is already done —
this is what only you can do (no code required).

---

## 🔴 Priority 1 — Do these first, they have the highest ROI

### 1. Submit to Google Search Console
> This is the single most important action. Google won't crawl the site fast without it.

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → choose **URL prefix** → enter `https://studentcommunity.day`
3. Verify ownership (add the HTML tag they give you to `index.html` `<head>`, or use the DNS method)
4. Once verified, go to **Sitemaps** → submit `https://studentcommunity.day/sitemap.xml`
5. Repeat for `https://aws.studentcommunity.day` as a second property

### 2. Submit to Bing Webmaster Tools
> Bing powers Copilot (Microsoft's AI) — this is your AI SEO path into Microsoft's ecosystem.

1. Go to [bing.com/webmasters](https://bing.com/webmasters)
2. Add your site and verify
3. Submit the sitemap: `https://studentcommunity.day/sitemap.xml`
4. Bonus: Bing has an "Auto-import from Google Search Console" option — use it

### 3. Create the OG social sharing image
> Every share on X, LinkedIn, or WhatsApp shows a blank card without this.

- Size: **1200 × 630 px**
- Content: event name, date ("03 · OCT · 2026"), city, and your logo
- Dark background (#040f3a) to match the site brand
- Save as `public/og-image.png` — it'll be available at `https://studentcommunity.day/og-image.png`
- Tools: Canva, Figma, or just export from the site design you already have

---

## 🟡 Priority 2 — Event listings (huge for AI SEO)

AI systems like ChatGPT and Perplexity index event platforms heavily. Getting listed here is
how you appear when someone asks "what tech events are happening in Bolivia?"

### 4. List on lu.ma
> lu.ma is the most-indexed tech event platform by AI systems right now.

1. Go to [lu.ma](https://lu.ma) → create an event
2. Fill in all fields: title ("AWS Student Community Day Bolivia 2026"), date, location, description
3. Add the link back to `https://studentcommunity.day` in the event description
4. Use the same description copy from the site — keyword consistency matters

### 5. List on Eventbrite
> High domain authority — Eventbrite pages rank on Google on their own.

1. [eventbrite.com](https://eventbrite.com) → Create Event
2. Category: Technology → Conference / Summit
3. Tags: AWS, cloud computing, Bolivia, Cochabamba, student community
4. Link back to `studentcommunity.day` in the description

### 6. List on Meetup.com
> "Tech events in Cochabamba" searches often surface Meetup results.

1. Create or join the AWS User Group Bolivia on [meetup.com](https://meetup.com)
2. Post the SCD·26 event there
3. Link back to the main site

---

## 🟡 Priority 3 — Backlinks (the #1 ranking factor)

One link from a high-authority site is worth more than everything else on this list combined.

### 7. Get UPB to link to you
> `.edu` backlinks are the most powerful type in Google's algorithm.

- Ask UPB Cochabamba to list the event on their **events calendar** or **news section**
- The link should go to `https://studentcommunity.day`
- Even a tweet or Instagram post from the official UPB account helps

### 8. AWS Community / AWS LatAm
> An official AWS mention would be a top-tier backlink.

- Contact the AWS Community team or your AWS student program contact
- Ask them to list SCD Bolivia on the **AWS Community Events** page
- Ask them to share on [@AWScloud](https://twitter.com/awscloud) or the AWS LatAm social accounts
- Even a mention in the **AWS User Group newsletter** counts

### 9. Contact tech media in Bolivia / LatAm
> A news article creates a permanent backlink and drives real traffic.

- **Talent Tech LatAm**, **iupana**, local university newspapers
- Pitch: "Bolivia's largest cloud computing student event, 500 students, free, October 3"
- Give them the press contact email (`hi@scd-bolivia.dev`) and the OG image

---

## 🟢 Priority 4 — AI-specific signals

These directly influence what ChatGPT, Perplexity, and Gemini say when someone asks about tech events in Bolivia.

### 10. Wikipedia / Wikidata (if the event recurs)
> AI systems cite Wikipedia heavily. If SCD Bolivia has run before, create a stub article.

- Requires the event to have existed before (notability requirement)
- Even a Wikidata entry (no article needed) helps AI systems recognize the organization
- Create at [wikidata.org](https://wikidata.org): Organization → add `studentcommunity.day` as official website

### 11. GitHub organization
> GitHub is heavily indexed by AI training pipelines.

1. Create a GitHub org: `github.com/scd-bolivia`
2. Add `https://studentcommunity.day` as the org URL
3. Pin a public repo (e.g., the event website source) with a descriptive README that mentions the event name, date, and city
4. This creates an authoritative signal: a real org exists, with real code, linking to the real site

### 12. LinkedIn company page
> Perplexity and other AI search tools aggregate LinkedIn.

1. Create a LinkedIn Page for "AWS Student Community Bolivia"
2. Set website to `https://studentcommunity.day`
3. Post updates about the event from the page
4. Ask speakers and organizers to list it in their experience

---

## 🔵 Priority 5 — Maintenance (ongoing)

### 13. Update the sitemap after the event
- After the event, update `public/sitemap.xml` `<lastmod>` to the current date
- This signals to Google that the page was updated (post-event recap content)

### 14. Add post-event content
- A recap page or blog post ("SCD Bolivia 2026 — Recap") significantly extends the keyword footprint
- AI systems that index post-event content will include SCD Bolivia in answers about "past tech events in Bolivia" forever

### 15. Keep speaker names real when confirmed
- Once real speaker names are added to `src/data/event.ts`, rebuild and redeploy
- Speaker names from industry (especially AWS employees) are search terms people actually use

---

## Summary: quickest wins in order

| # | Action | Time | Impact |
|---|--------|------|--------|
| 1 | Google Search Console + sitemap submit | 15 min | Critical |
| 2 | Bing Webmaster Tools | 10 min | High (Copilot AI) |
| 3 | Create OG image (1200×630) | 20 min | High (social sharing) |
| 4 | lu.ma event listing | 15 min | High (AI indexing) |
| 5 | Eventbrite listing | 15 min | High (organic ranking) |
| 6 | Ask UPB to link to you | 1 email | Very high (.edu backlink) |
| 7 | GitHub org with README | 20 min | Medium (AI signal) |
| 8 | AWS LatAm mention | 1 email | Very high if you get it |
