# Images

Most images here are free-to-use stock photos from Unsplash (see [CREDITS.md](CREDITS.md)); `team/` and `before-after/` are generated SVG placeholders. Replace everything with real photos of the client's salon before launch. Use photos you own or are licensed to use; do not use brand logos or copyrighted material.

Replace a file by keeping its name (then switch the extension in `src/config/salon.ts` if you use JPG/WebP), or point `salon.ts` at a new path. Update `width`, `height` and `alt` to match.

| Folder | Files | Recommended size | Used for |
| --- | --- | --- | --- |
| `hero/` | `hero-poster` | 1920x1080 | Home hero poster (before / instead of video) |
| `hero/` | `hero-portrait` | 1080x1920 | Home hero poster on mobile |
| `services/` | one per category | 800x600 | Category banner on the Services page |
| `gallery/` | `gallery-01` to `-09` | 800x1000 (4:5) | Gallery grid, home strip, lightbox |
| `before-after/` | `colour-*`, `skin-*` | 1200x900 | Before/after sliders (same angle and light in both) |
| `team/` | `team-1` to `-3` | 800x1000 | Team portraits (get consent) |
| `about/` | `salon-story`, `salon-interior` | 1000x1250 / 1200x900 | About page |
| `clips/` | one per clip | 1280x720 | Poster shown before or instead of each video clip |

Tips: export at 1x-1.5x the recommended size, WebP or JPG, quality ~80, under 300 KB. Write specific alt text describing what the photo shows. Only publish before/after results you can genuinely deliver, with client consent.
