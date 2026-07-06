# Killing Kudu — the website 🤘🦌

The official site for **Killing Kudu**, Eugene, Oregon's most enthusiastic
cover band. Vintage gig-poster looks, zero build tools, no frameworks —
just three files of honest HTML, CSS, and JavaScript you can edit right
on GitHub.

---

## 🚀 Turn the site on (one time, ~2 minutes)

1. On GitHub, go to **Settings → Pages** (in this repository).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Pick the **main** branch, folder **/ (root)**, and click **Save**.
4. Wait a minute or two. Your site is live at:
   `https://thatyounglaw.github.io/killingkuduwebsite/`

Want `killingkudu.com` someday? Buy the domain, add it in that same
Pages settings screen, and follow GitHub's prompts. That's the whole
process.

---

## ✏️ Everyday edits — you only ever touch `data.js`

Open **`data.js`**, click the pencil icon, edit, commit. The site updates
itself a minute later. Everything is a list of plain-English entries:

| To change…              | Edit this part of `data.js` |
| ----------------------- | --------------------------- |
| Shows (new gig, fix a date) | `shows:` — one entry per gig. Anything dated today-or-later shows under **Upcoming**; older entries drop into the **Gig Ledger** automatically. You never move them yourself. |
| Booking email / Instagram | `contact:` — fill in the empty quotes and the Book Us buttons appear. |
| Band member bios        | `members:` — the real lineup, with adjustable jokes. |
| The Kudufier            | `kuduWay:` — the twang/crunch machine. Each `specimen` is a song you've actually played: `treatment` is where the needle lands (−100 = max twang added, +100 = max crunch, 0 = untouched) and `note` is the lab report. Add new ones as the set evolves. |
| Rotating hero taglines  | `taglines:` |
| The scrolling sign      | `marquee:` |
| Videos                  | `videos:` — paste the 11-character ID from any YouTube URL (`watch?v=THIS_PART`). |
| Photo captions          | `gallery:` |

**Golden rules:** keep the quotes, keep the commas, dates are
`"YYYY-MM-DD"`. If the site ever looks broken after an edit, you
probably lost a comma — check the last thing you changed.

### There's a sample show in the list

The one dated Aug 15, 2026 with the yellow "sample — edit data.js" tag.
Replace it with a real gig (or delete it) when you're ready.

---

## 📷 Adding a photo to the gallery

1. Resize your photo twice — a big one (~1600px on the long side) and a
   small one (~640px). Any free tool works; even Preview on a Mac.
2. Upload the big one to `assets/img/` and the small one to
   `assets/img/thumbs/` — **same filename in both folders**.
3. Add a line to `gallery:` in `data.js`. The `w:` / `h:` numbers are the
   small image's pixel size (optional, but they stop the page from
   jumping while it loads).

Original full-resolution photos live in `originals/` — they're not used
by the site, they're just safe there.

---

## 🗂 What's what

```
index.html        the page (section layout — rarely needs touching)
data.js           ← ALL your content. Edit this one.
css/style.css     the vintage-poster look
css/fonts.css     self-hosted font declarations
js/main.js        renders data.js onto the page
assets/img/       web-sized photos (+ thumbs/)
assets/fonts/     the four typefaces, self-hosted (fast + private)
originals/        untouched original photos
404.html          for pages that took a solo and never came back
```

No build step. No dependencies. Nothing to install, ever. To preview
locally, just open `index.html` in a browser.

---

## 🥚 Things the band should know about

- **Type `kudu`** anywhere on the page. The ümläüts were always meant
  to be there. (The little `ü` button in the footer does it too.)
- **Click the kudu** in the hero five times.
- **The Kudufier's specimens are all real** — every song it processes
  came from your own YouTube setlists. The machine only speaks truth.
- There's a message in the browser console for visitors of a certain
  disposition.
- The scrolling letterboard is an homage to a certain saloon's marquee.

---

*Built with love, volume, and a mid-life crisis. No kudus were harmed.*
