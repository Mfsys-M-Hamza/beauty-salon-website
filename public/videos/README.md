# Video clips

No video files are included. Until you add them, each clip shows its poster image (`public/images/clips/`, `public/images/hero/`) with a slow zoom, and the site works fully.

## Specifications

| Clip type | Dimensions | Duration | Max size per file |
| --- | --- | --- | --- |
| Hero (home) | 1920x1080, plus a 1080x1920 (or 1080x1350) portrait version for mobile | 8-15 s, seamless loop | ~5 MB |
| Page intro backgrounds | 1920x1080 | 8-15 s | ~5 MB |
| Section clips | 1280x720 | 5-10 s | 3 MB |

- Formats: **WebM (VP9)** and **MP4 (H.264)**, both, so every browser is covered.
- No audio track, no text or logos burned in (so clips stay reusable).
- Slow, gentle motion. Avoid fast cuts and flashing.

Example export: `ffmpeg -i in.mov -an -vf scale=1280:-2 -c:v libvpx-vp9 -crf 34 -b:v 0 clip.webm` and `ffmpeg -i in.mov -an -vf scale=1280:-2 -c:v libx264 -crf 26 -movflags +faststart clip.mp4`.

## Where each clip goes (recommended subject)

| Clip id in `salon.clips` | Page / section | Subject |
| --- | --- | --- |
| `home-hero` | Home / hero background | Slow close-ups: hair brushing, makeup application, fresh towels |
| `home-experience` | Home / experience | A calm facial or hair treatment |
| `services-intro` | Services / heading background | Brushes, towels, products in soft light |
| `services-hair-break` | Services / after Hair Treatments | Hair styling |
| `services-makeup-break` | Services / after Party Makeup | Makeup application |
| `services-spa-break` | Services / after Facials | Skincare or spa treatment |
| `gallery-intro` | Gallery / heading background | Slow pan of stations and finished looks |
| `about-environment` | About / inside the salon | Walk-through of the salon |
| `contact-intro` | Contact / heading background | Appointment book, flowers, coffee |

Gallery video items (`salon.gallery`, `type: "video"`) take their own `video: { webm, mp4 }`.

## How to replace a clip

1. Put the files in this folder, e.g. `public/videos/hero.webm` and `public/videos/hero.mp4`.
2. In `src/config/salon.ts`, find the clip by `id` and set:
   ```ts
   video: { webm: "/videos/hero.webm", mp4: "/videos/hero.mp4" },
   mobile: { poster: /* keep */, video: { webm: "/videos/hero-mobile.webm", mp4: "/videos/hero-mobile.mp4" } },
   placeholder: false,
   ```
3. Replace its poster image (first frame is ideal) and update `alt`.
4. To hide a clip, set `enabled: false`.
