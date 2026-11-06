# Lovedale Holidays - lovedale.co.in

Static Kerala tourism website (HTML / CSS / JS). No build step.

## Change phone / WhatsApp / business hours
Edit **one file only**: `js/site-config.js`
Current number: **+91 90729 55363**. Header, footer, contact page, call links
and the floating WhatsApp button all read from it.

## Images
`js/images.js` lists 24 Kerala photos. Each loads from `assets/images/<name>.jpg`
first (put your own/licensed photos there), then from the remote URL, then shows
a branded placeholder. Only use photos you own or that are licensed for you.

## Run locally
    python3 -m http.server 8000     # open http://localhost:8000

## Git: create the project
    cd lovedale-holidays
    git init -b main
    git add .
    git commit -m "Initial commit: Lovedale Holidays website"
    # create an EMPTY repo named lovedale-holidays on github.com, then:
    git remote add origin https://github.com/<your-username>/lovedale-holidays.git
    git push -u origin main

## Free hosting + your lovedale.co.in domain
GoDaddy's shared hosting is paid; its "free" website builder cannot run this
custom code. Host free on GitHub Pages and point your GoDaddy domain to it:

1. GitHub repo -> Settings -> Pages -> Source: "Deploy from a branch" -> `main` / `(root)` -> Save.
2. Same page -> Custom domain: `lovedale.co.in` -> Save (this creates the `CNAME` file; one is already included).
3. GoDaddy -> My Products -> lovedale.co.in -> DNS -> add:
   - A  `@`  185.199.108.153
   - A  `@`  185.199.109.153
   - A  `@`  185.199.110.153
   - A  `@`  185.199.111.153
   - CNAME  `www`  `<your-username>.github.io`
   (delete any old A record for `@` that points to GoDaddy parking)
4. Wait 10 min - 24 h, then tick **Enforce HTTPS** in GitHub Pages settings.
(Alternatives: Netlify or Cloudflare Pages, both free, with the same DNS idea.)

Updating the site later: edit, then `git add . && git commit -m "update" && git push`.

## Change log (commit history)

| Commit | Summary | What changed on the website |
|---|---|---|
| _next_ | 20% offer + vehicle terms | Every tour package now shows a 20% OFF badge: the package price stays the same, with a higher original price shown crossed out above it, and "Minimum 2 persons". Terms & Conditions now list what the vehicle package includes and excludes, the free spice plantation ticket, and the driver and vehicle rules. |
| _next_ | Customise your trip + instant quote | New "Get a Quote" page: visitors choose a package or build their own trip (dates, travellers, hotel level, vehicle, houseboat, experiences) and see a live price estimate, then send it to us on WhatsApp. Optionally saves every quote to a Google Sheet and emails the customer a PDF quote. |
| _next_ | Traveller stories + Terms & Conditions page | Added 2 more traveller stories on the home page (5 in total). Added a new Terms & Conditions page (bookings, payments, cancellations, refunds, inclusions, hotels, vehicles, insurance, responsibility), linked from the footer on every page. |
| _next_ | New HD photos | Added 16 new HD photos. The home page slideshow now opens with backwaters, Munnar, Kovalam, Alleppey and other new photos; the gallery now starts with houseboat, destination, food and hotel photos; destination and experience cards also show the new photos. |
| _next_ | Signature Experience pages | All 6 Signature Experiences are now clickable, each with its own page: banner photo, 5 detailed paragraphs, highlights, quick facts, a photo gallery and a WhatsApp booking button. |
| _next_ | Photos stored locally | All site photos now load from the website's own `assets/images/` folder (fetched once with `download_images.sh`), and the Wikimedia fallback has been removed. |
| _next_ | More landing page photos | Added 10 more HD Kerala photos to the home page slideshow (14 in total). |
| _next_ | Hero shade + new address | Added a soft dark shade on the left side of the home page photos so the headline is easier to read. Office address updated to MG Road, Ernakulam, Kerala, India. |
| `0aeee85` | Site-wide refresh | Updated look and layout across all pages, refreshed header/footer, contact details and contact page, improved photos, and polished the tour package pages. |
| `b14557f` | Tour package improvements | Improved the tour package detail pages: better package information and how packages are shown on the site. |
| `abb92b5` | Fixed photos + new package pages | Fixed broken/missing Kerala photos on the home page, and added new tour package detail pages so visitors can view each package in full. |
| `d219790` | Website launch | First version of the Lovedale Holidays site: home page, contact page, logo, call/WhatsApp buttons, and the lovedale.co.in domain setup. |

Rows marked _next_ are not yet committed; replace with the commit ID after pushing.
For future updates, add a new row at the top, and use a clear commit message,
for example `git commit -m "Add Munnar package"`.

## Quote automation setup (Get a Quote page)

**Prices:** edit `js/pricing.js` (hotel, vehicle, houseboat, experiences, airport, peak season %, margin %, GST %). Prices there are placeholders.

**Save leads + email PDF quotes (optional, free):**
1. Create a new Google Sheet (e.g. "Lovedale Quotes").
2. Extensions -> Apps Script. Delete the sample code and paste all of `automation/quote-apps-script.gs`.
3. Set `OWNER_EMAIL` at the top to your email. Save.
4. Deploy -> New deployment -> type **Web app** -> Execute as: **Me** -> Who has access: **Anyone** -> Deploy. Approve the permissions.
5. Copy the Web app URL and paste it into `scriptUrl: ""` in `js/pricing.js`. Commit and push.
6. Test: fill the form on the Get a Quote page with your own email. A "Quotes" tab appears in the Sheet, and you and the customer get the PDF.
After editing the script later, use Deploy -> Manage deployments -> Edit -> New version (the URL stays the same).
