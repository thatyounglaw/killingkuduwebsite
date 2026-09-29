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

---

## 🌐 The domain: killingkudu.com

The site lives at **https://killingkudu.com**. The `CNAME` file in this
repo tells GitHub Pages which domain is ours; the DNS records at the domain
registrar (Whois.com) point the domain at GitHub. Both halves are needed.

**DNS records** (set these in the registrar's DNS manager for `killingkudu.com`):

| Type    | Host / Name | Value                      |
| ------- | ----------- | -------------------------- |
| `A`     | `@`         | `185.199.108.153`          |
| `A`     | `@`         | `185.199.109.153`          |
| `A`     | `@`         | `185.199.110.153`          |
| `A`     | `@`         | `185.199.111.153`          |
| `AAAA`  | `@`         | `2606:50c0:8000::153`      |
| `AAAA`  | `@`         | `2606:50c0:8001::153`      |
| `AAAA`  | `@`         | `2606:50c0:8002::153`      |
| `AAAA`  | `@`         | `2606:50c0:8003::153`      |
| `CNAME` | `www`       | `thatyounglaw.github.io`   |

Delete any other `A`, `AAAA`, or `www` records the registrar added by
default (parking pages, "coming soon", domain forwarding).

**Then, on GitHub:** **Settings → Pages → Custom domain** should read
`killingkudu.com` (the `CNAME` file fills it in). Once the DNS check turns
green, tick **Enforce HTTPS**. The certificate can take up to an hour
to appear after DNS starts working.

**If the domain ever changes:** update `CNAME`, plus the `https://killingkudu.com`
links near the top of `index.html` (they're what Facebook/iMessage use for the
link preview card).

---

## 📬 Band email: booking@ and hello@killingkudu.com

Nobody has to check a new inbox. Each address just **forwards** to the
personal email of whoever should see it, using
[ImprovMX](https://improvmx.com) (free, nothing to install).

| Address                   | Who writes to it                                         | Forward it to |
| ------------------------- | -------------------------------------------------------- | ------------- |
| `booking@killingkudu.com` | venues, parties, weddings (the **Book Us** button)       | whoever handles gigs |
| `hello@killingkudu.com`   | fans: herd sign-ups, song requests, anything else        | the whole band |

The website already points at both (`contact:` in `data.js`).

### One-time setup (~15 minutes, plus a wait)

1. **Make the ImprovMX account.** At [improvmx.com](https://improvmx.com),
   click **Get Started Free** and enter `killingkudu.com` and your own email.
   It starts you with a catch-all (`*`), so *anything*@killingkudu.com comes
   to you. Leave that on, so typos like `bookings@` still arrive.
2. **Add three records at Whois.com**, in the same DNS manager as the
   website's `A` records above (whoever holds the Whois.com login does this):

   | Type  | Host / Name | Value                                  | Priority |
   | ----- | ----------- | -------------------------------------- | -------- |
   | `MX`  | `@`         | `mx1.improvmx.com`                     | `10`     |
   | `MX`  | `@`         | `mx2.improvmx.com`                     | `20`     |
   | `TXT` | `@`         | `v=spf1 include:spf.improvmx.com ~all` |          |

   If a form won't take `@`, leave the host blank. Type the TXT value without
   quote marks. Delete any *other* `MX` records, and leave the website's
   `A` / `CNAME` records alone.
3. **Wait for the green checks.** ImprovMX's dashboard turns green once
   the records are live: usually within an hour, occasionally a day.
4. **Add two aliases** in ImprovMX: `booking` → the gig person's email,
   `hello` → everyone's. Several people? Separate the addresses with commas
   (up to 5).
5. **Test it.** Use the **Test** button in ImprovMX, or send a note to
   `booking@killingkudu.com` from a *different* account than the one it
   forwards to (a work email, a spouse's). The first few may land in spam;
   mark them **Not spam**. The **Logs** tab shows whether a message arrived.

### Good to know

- **Replies come from your own address.** That's normal for a band. Having
  replies show `booking@` as the sender takes a paid plan (ImprovMX is $9/mo)
  or Google Workspace, so skip it until it matters. Skip Gmail's "Send mail as"
  trick too: ImprovMX says Google is retiring it and it tends to land in spam.
- **Need another address** (`matt@`, `press@`)? Add an alias in ImprovMX. The
  free plan covers 25 addresses and 500 emails a day.
- **Sign the band up for things with `hello@`** (Instagram, Formspree, venue
  mailing lists), so no band account hangs on one member's personal email.
- **Band email lives and dies with the domain.** Keep auto-renew on (below).

---

## 🔒 Keeping it safe

The site itself is hard to hack: it's plain files with no logins, no
database, and no server code. The ways a band site actually gets hurt are
someone getting into an **account**, the **domain** slipping away, or
**personal info** leaking out. So:

- **GitHub:** turn on two-factor login (profile picture → Settings →
  Password and authentication). Whoever controls this GitHub account
  controls the site.
- **Whois.com (the domain):** a strong, unique password plus two-factor on
  the account, and **auto-renew ON**. The domain renews every July, and
  an expired domain can be bought by anyone, and booking@ goes with it.
  Leave the transfer lock on (it already is).
- **ImprovMX (the band email):** a strong, unique password. Whoever gets
  into it can quietly reroute booking@.
- **Verify the domain with GitHub** so nobody else's GitHub Pages site can
  claim it: profile picture → Settings → Pages → **Add a domain** →
  `killingkudu.com`. GitHub shows a `TXT` record; add it at Whois.com, then
  click **Verify**.
- **Never add a wildcard `*` DNS record** pointing at GitHub. That also
  opens the door to domain takeover.
- **Everything in this repo is public**, including `originals/` and the old
  versions in the edit history. No passwords, no private phone numbers, and
  only the band addresses (booking@ / hello@), never someone's personal email.
- **Photos carry their GPS location.** Before uploading, turn it off: on an
  iPhone, tap **Options** at the top of the Share sheet and switch
  **Location** off. That matters most for anything shot at someone's house.

---

## ✏️ Everyday edits — you only ever touch `data.js`

Open **`data.js`**, click the pencil icon, edit, commit. The site updates
itself a minute later. Everything is a list of plain-English entries:

| To change…              | Edit this part of `data.js` |
| ----------------------- | --------------------------- |
| Shows (new gig, fix a date) | `shows:` — one entry per gig. Anything dated today-or-later shows under **Upcoming**; older entries drop into the **Gig Ledger** automatically. You never move them yourself. |
| Band emails / Instagram | `contact:` — booking@ and hello@ are already in. Paste the Instagram link into the empty quotes and its button appears. |
| Band member bios        | `members:` — the real lineup, with adjustable jokes. |
| The Kudufier            | `kuduWay:` — the twang/crunch machine. Each `specimen` is a song you've actually played: `treatment` is where the needle lands (−100 = max twang added, +100 = max crunch, 0 = untouched) and `note` is the lab report. Add new ones as the set evolves. |
| Kududes (the fan section) | `fans:` — the Honor Roll, testimonials, membership-card honorifics, and the two form endpoints (see below). |
| Rotating hero taglines  | `taglines:` |
| The scrolling sign      | `marquee:` |
| Videos                  | `videos:` — paste the 11-character ID from any YouTube URL (`watch?v=THIS_PART`). |
| Photo captions          | `gallery:` |

**Golden rules:** keep the quotes, keep the commas, dates are
`"YYYY-MM-DD"`. If the site ever looks broken after an edit, you
probably lost a comma — check the last thing you changed.

### Adding a show

There's a commented-out example at the top of `shows:` — copy its shape.
With nothing upcoming, the site says so politely and the hero's main button
switches to **Watch Us Live** instead of pointing at an empty list.

### If the booking email is ever blanked out

The **Book Us** section still shows the pitch, but its buttons fall back to
a YouTube link and "flag us down at a show." Put an address back in
`contact.bookingEmail` and the real button returns.

---

## 🤠 The Kududes forms (join the herd / request a song)

The fan section has two forms. A GitHub Pages site can't catch form data by
itself, so pick whichever is easier — both live in the `fans:` block of `data.js`:

- **Easiest (already on): email.** The buttons open the fan's email app with
  a pre-written message to `contact.fanEmail` (hello@). No accounts, no setup.
- **Nicer — a free form service:** make a free [Formspree](https://formspree.io)
  account (sign up with hello@), create two forms, and paste their URLs into
  `listEndpoint` (the herd list) and `requestEndpoint` (song requests).
  Submissions land in your inbox and the fan never leaves the page.

If both are blank, the forms simply stay hidden, so fans never type into
a box that goes nowhere. They appear on their own once either is filled in.

## 📷 Adding a photo to the gallery

1. Resize your photo twice — a big one (~1600px on the long side) and a
   small one (~640px). Any free tool works; even Preview on a Mac.
2. Upload the big one to `assets/img/` and the small one to
   `assets/img/thumbs/` — **same filename in both folders**.
3. Add a line to `gallery:` in `data.js`. The `w:` / `h:` numbers are the
   small image's pixel size (optional, but they stop the page from
   jumping while it loads).

Original full-resolution photos live in `originals/` — they're not used
by the site, they're just safe there. They're still public, so strip the
location first (see **Keeping it safe** above).

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
CNAME             the domain name (killingkudu.com) — GitHub Pages reads it
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
- **Make yourself a Kudude card** in the fan section — type a name, hit
  "Make it official," download the membership card. Everyone gets a stable
  member number and a randomly-assigned honorific.
- There's a message in the browser console for visitors of a certain
  disposition.
- The scrolling letterboard is an homage to a certain saloon's marquee.

---

*Built with love, volume, and a mid-life crisis. No kudus were harmed.*
