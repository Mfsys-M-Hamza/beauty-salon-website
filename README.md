# Beauty Salon Website Template

A premium, mobile-first beauty salon website built with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS**. It is a reusable template: every client-specific detail lives in one file, [`src/config/salon.ts`](src/config/salon.ts).

Pages: Home, Services & Pricing, Gallery, About, Contact & Booking, Privacy Policy, Terms & Conditions.

## Run locally

```bash
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
```

## Build and deploy

The site is a fully static export (`output: "export"`), so it needs no server.

```bash
npm run lint
npm run build      # writes the site to ./out
npx serve out      # optional local preview of the production build
```

### GitHub Pages (included)
`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. In the GitHub repo open **Settings > Pages** and set **Source** to **GitHub Actions** (once).
2. Push to `main` (or run the workflow from the **Actions** tab).
3. The site appears at `https://<owner>.github.io/<repo>/`. The workflow sets the base path and site URL for you.

Custom domain: add the domain under **Settings > Pages**, then add repository variables **SITE_URL** (e.g. `https://www.yoursalon.com`) and leave **BASE_PATH** empty.

Note: GitHub Pages on a *private* repository needs a paid GitHub plan. Other hosts (Netlify, Cloudflare Pages, Vercel) also work: run `npm run build` and publish `out`.

## Customising for a new client

### 1. Change salon information
Edit `src/config/salon.ts`: name, initials, tagline, descriptions, owner, phone, WhatsApp, email, address, service areas, hours, hero text, FAQs, team, timeline, values, hygiene/product statements. Placeholders look like `[SALON NAME]`, `[CITY]`, `[PHONE NUMBER]`; search for `[` to find them all.

Phone has two fields: `display` (shown) and `dial` (used for `tel:`). WhatsApp has `display` and `number`.

### 2. Colours and fonts
- Colours: the `@theme` block at the top of `src/app/globals.css` (`--color-rose`, `--color-ivory`, ...). Tailwind classes such as `bg-rose` follow automatically. Keep text/background pairs at WCAG AA contrast.
- Fonts: `src/app/layout.tsx` (`Cormorant_Garamond` for headings, `Manrope` for body). Swap for any `next/font/google` font and keep the `variable` names.

### 3. Add or remove services
In `salon.ts`, edit `categories` and `services`. Each service needs an `id`, a `categoryId` matching a category, `price`, `priceType` (`"fixed"` or `"from"`), and `durationMinutes`. Set `featured: true` to show it on the home page; add a `badge` such as `"Popular"`. The booking form and filters update automatically.

### 4. Update prices
Change `price` on each service. The site is set to Pakistani rupees (`salon.currency`: `PKR`, `en-PK`, shown as "Rs 25,000"). **All shipped prices are placeholders.**

### 5. Replace images
See [`public/images/README.md`](public/images/README.md). Replace files keeping the same names, or update the path (and `width`/`height`/`alt`) in `salon.ts`. The shipped photos are Unsplash stock (see `public/images/CREDITS.md`); replace them with the salon's own. Use JPG/WebP, ideally under 300 KB each.

### 6. Change the WhatsApp number
`contact.whatsapp.number` (digits only, country code, no `+`, e.g. `923001234567`) and `contact.whatsapp.display`. The booking form, sticky button and all WhatsApp links use it.

### 7. Update social links
`social` in `salon.ts`. Entries still set to a placeholder such as `[INSTAGRAM URL]` render as inactive icons. Supported ids: `instagram`, `facebook`, `tiktok`, `youtube`. Remove an entry to hide it.

### 8. Configure the domain
Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.yoursalon.com`, no trailing slash) in `.env.local` and in your host's environment settings (on GitHub Pages: the `SITE_URL` variable). If the site lives under a sub-path, also set `NEXT_PUBLIC_BASE_PATH` (e.g. `/repo-name`). It drives canonical URLs, Open Graph, structured data, `robots.txt` and `sitemap.xml`. Then point your DNS at the host as its documentation describes.

### 9. Booking
The form validates input, then opens WhatsApp with a pre-filled message. It is a request, not a confirmed booking, and the site says so. Set `contact.appointmentUrl` to also show a "Book online" button (Fresha, Calendly, ...). Time slots: `bookingTimeSlots`. Closed days come from `hours`.

### 10. Before launch checklist
- Replace every `[...]` placeholder, sample testimonial, sample offer, staff profile and image.
- Set `showPlaceholderLabels: false` to hide "Sample" and "Placeholder" badges.
- Review Privacy Policy and Terms text with a legal adviser (`src/app/privacy-policy`, `src/app/terms-and-conditions`).
- Edit the initials in `public/icon.svg` (favicon) to match `salon.logo.initials`.
- Optionally replace the generated social card (`src/app/opengraph-image.tsx`) with a designed image.

## Animated clips and motion

Clips are configured in `salon.clips` (title, description, `page`, `section`, `video` paths, `poster`, `alt`, `enabled`, `decorative`). Components look a clip up by page and section, so you can swap, disable (`enabled: false`) or remove one without touching components.

- Until `video` is set, the **poster image** is shown with a slow zoom. Nothing breaks.
- Built-in animated makeup illustrations (a lipstick opening and closing, a powder compact and nail polish) need no video file: set `animation: "lipstick"` or `"products"` on a clip (see `home-makeup` and `services-makeup-break`).
- Decorative clips autoplay muted and looped with no controls. Meaningful clips get play/pause and mute buttons.
- Videos load lazily near the viewport and pause when off-screen.
- `prefers-reduced-motion`, data-saver and low-power devices (<= 2 CPU cores or <= 2 GB RAM) never autoplay and drop ambient animation. Scroll reveals only hide content when JavaScript and motion are available.

Video specs and exact replacement steps: [`public/videos/README.md`](public/videos/README.md). Each clip in `salon.ts` also carries a `brief` with the recommended subject, dimensions, duration, format and size.

## Project structure

```
src/config/salon.ts        all client content (edit this)
src/config/types.ts        types for the config
src/config/navigation.ts   nav links and sitemap paths
src/app/                   pages, metadata, sitemap, robots, social card, favicon
src/components/            layout, sections, gallery, booking, media, ui
src/lib/                   formatting, SEO, structured data, booking validation
public/images, public/videos
```

SEO: unique titles and descriptions per page (`salon.seo`), canonical URLs, Open Graph and Twitter metadata, `BeautySalon`, `FAQPage` and `BreadcrumbList` JSON-LD, `robots.txt` and `sitemap.xml`.
