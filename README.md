# Shamwari YeRwendo website

A rebuild of shamwariyerwendo.org. It is one plain HTML page with no build step, so it works on any web host.

```
index.html            the whole site
assets/css/styles.css look and layout (colours are at the top)
assets/js/main.js     mobile menu, animations, forms
assets/img/           logo and photos
```

## Preview it
Double-click `index.html`, or run `python3 -m http.server 8080` in this folder and open http://localhost:8080.

## Contact details
Phone/WhatsApp (+263 77 280 9401), email (info@shamwariyerwendo.org) and the office address are in the Contact section of `index.html`. Search for `Tynwald` to change the address.

Still to add when ready:
1. **Opening hours.** That line was taken out until you have them.
2. **Social links.** Only WhatsApp is shown in the footer under "Connect". Add Facebook, Instagram or LinkedIn icons there once the pages exist.
3. **Form inbox (optional).** Forms open the visitor's email app, addressed to `CONTACT_EMAIL` in `assets/js/main.js`. To receive submissions directly, create a free form at formspree.io and paste its URL into `FORM_ENDPOINT`.

## Swapping photos
Put a new image in `assets/img/` with the same file name and it replaces the old one everywhere. Good spots for custom AI images:
- `peer-support.jpg`: recovery and aftercare (ideally a nurse aide walking with a young person)
- `community-elders.jpg` / `elder.jpg`: home-based care
- `spiritual.jpg`: spiritual wellness (a pastor counselling someone)
- `fitness.jpg`: corporate gym and movement

## Photo credits
`logo-full.jpg`, `counsellors-office.jpg`, `mentorship-cafe.jpg` and `community-outing.jpg` are your own images. The other photos come from Unsplash (free for commercial use, no permission needed). Photographers: Tiry Nelson Gono (youth-zimbabwe), Emmanuel Ikwuegbu (students-campus), Ninthgrid (peer-support, corporate-team, team-portrait), Iwaria (group-session), Nappy (health-checkin), SUNDAY II SUNDAY (fitness), West Kenya Union Conference Adventist Media (spiritual), Lisa Marie Theck (elder), Soweto Graphics (community-elders), #WOCinTech Chat (counselling).

## Hosting
Upload everything in this folder (keep the `assets` folder structure) to your host's public folder, for example `public_html` on cPanel. Netlify Drop, GitHub Pages or Cloudflare Pages are free alternatives.
