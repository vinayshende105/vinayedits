# vinayedits.com — Vinay's Store

Portfolio + services website for Vinay Shende, freelance video editor.
Theme: Indian corner-shop cartoon world (inspired by andrewsbodega.com).

## Folders
| Folder | What's inside |
|---|---|
| `site/` | **The website** — upload this folder to hosting. |
| `site/content.js` | **All text & data**: videos, prices, clients, contact, receipt. Edit this to update the site. |
| `site/index.html`, `styles.css`, `main.js` | Page structure, design, scroll animation. |
| `site/assets/` | Optimised images used by the site (WebP). |
| `design-assets/` | Original full-size AI artwork (PNG) + `ASSET-LIST.md` with all prompts. |

## Preview on this Mac
```bash
python3 -m http.server 4321 --directory site
```
Then open http://localhost:4321 — use Cmd+Shift+R to see the newest version.

## Scroll story
Sky → store rises → shutter rolls up → walk in through the door →
Shorts (3 pairs of phones) → Long-form (2 pairs of TVs) → Podcasts →
About (framed photo + receipt) → Rate list (chalkboard + price tags) →
Clients (visiting cards on cork board) → Contact (counter) → Footer (night street).

## Still to do
- ~~Email address~~ — done: hello@vinayedits.com (Google Workspace)
- Real client testimonials (only real words from clients) → `site/content.js` → `reviews`
- Talking-head videos (aisle is hidden until there are some)
- Connect the vinayedits.com domain and publish
