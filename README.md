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
