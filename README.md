# batonrougejazz.com — Standley & Tupper

Single-file static site for GitHub Pages, replacing the Bandzoogle site.

## Files
- `index.html` — the entire site (HTML + CSS + schema markup in one file)
- `CNAME` — contains `www.batonrougejazz.com` so GitHub Pages serves the custom domain
- `robots.txt` — allows all crawlers, points to the sitemap
- `sitemap.xml` — single-URL sitemap

## Deploy (same as nighthogbr / cover6band)
1. Create a new public repo (e.g., `batonrougejazz`).
2. Upload all four files via the GitHub web editor (Add file → Upload files).
3. Settings → Pages → Source: Deploy from a branch → `main` / root.
4. Settings → Pages → Custom domain: `www.batonrougejazz.com` → Save → check "Enforce HTTPS" once available.

## DNS (move away from Bandzoogle)
At your domain registrar:
- **CNAME record:** `www` → `YOURUSERNAME.github.io`
- **A records (apex, batonrougejazz.com):**
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153

Delete/replace the existing Bandzoogle DNS records. Propagation can take a few hours. Keep the Bandzoogle site live until DNS flips, then cancel.

## Before launch — two placeholders to fix
1. **Booking form:** in `index.html`, replace `YOUR_FORM_ID` in the Formspree action URL with a real form ID (same process as thinksday.org), or delete the form and rely on the mailto link.
2. **Booking email:** the site uses `booking@batonrougejazz.com` — confirm this address exists/forwards, or swap for your preferred contact email.

## After launch
- Submit `https://www.batonrougejazz.com/sitemap.xml` in Google Search Console (add the new property first).
- Add an `images/og-image.jpg` (1200×630) to the repo for social sharing previews — the meta tags already point to it.
- Update the gigs section as dates are added (gig entries are plain HTML blocks; copy/paste the existing one).
