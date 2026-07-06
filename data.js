/* ============================================================
   KILLING KUDU — SITE DATA
   ============================================================
   This is the ONLY file you need to edit for day-to-day updates.

   HOW TO EDIT (on GitHub):
     1. Open this file on github.com and click the pencil icon.
     2. Change the text between the quotes.
     3. Scroll down, click "Commit changes".
     4. The site updates itself in a minute or two. That's it.

   RULES OF THE ROAD:
     - Keep the quotes and commas exactly as they are.
     - Dates are always "YYYY-MM-DD" (e.g. "2026-08-15").
     - To remove an item, delete its whole { ... }, block
       including the comma after the closing brace.
     - To add an item, copy an existing { ... }, block and
       change the words.
   ============================================================ */

window.KUDU = {

  /* ---------- THE BASICS ---------------------------------- */
  band: {
    name: "Killing Kudu",
    hometown: "Eugene, Oregon",
    // One-sentence pitch, used in the booking section and page metadata.
    pitch: "A local dad band playing the covers you already love, with more enthusiasm than strictly necessary.",
  },

  /* ---------- CONTACT / SOCIALS ----------------------------
     Fill these in! Empty quotes "" just hide that button.     */
  contact: {
    bookingEmail: "",          // e.g. "killingkudu@gmail.com" — shown as the big Book Us button
    instagram: "",             // e.g. "https://instagram.com/killingkudu"
    youtube: "https://www.youtube.com/@steamboatgeoff/videos",
  },

  /* ---------- ROTATING TAGLINES (hero) --------------------- */
  taglines: [
    "Eugene's most enthusiastic cover band.",
    "Songs you know, played with feeling.",
    "We practice so you don't have to.",
    "Loud early. Home by eleven.",
    "Zero original songs. That's a promise.",
    "The ümläüts are decorative.",
    "A herd of dads at a reasonable volume.",
  ],

  /* ---------- MARQUEE SIGN LINES ---------------------------
     The scrolling letterboard strip, in loving homage to the
     Twisted River Saloon sign.                                */
  marquee: [
    "SAT · KILLING KUDU · 8 PM",
    "ALL COVERS · NO WAITING",
    "TIPS FUND NEW STRINGS",
    "DADS ON STAGE · PLEASE CLAP",
    "FREE ADMISSION TO YOUR OWN BACKYARD",
  ],

  /* ---------- SHOWS ----------------------------------------
     ONE list. The site automatically sorts it: anything dated
     today-or-later shows up under "Upcoming", everything else
     drops into the Gig Ledger. You never have to move entries.

       date:  "YYYY-MM-DD"  (required — used for sorting)
       venue: where
       city:  what town
       time:  free text, e.g. "8:00 PM" (upcoming shows only)
       note:  optional one-liner
       link:  optional URL for tickets/details ("" = no link)
       sample:true  marks an entry as a demo — it renders with
                    an "edit me" tag. Delete the flag (or the
                    entry) once you add real shows.            */
  shows: [
    {
      date: "2026-08-15",
      venue: "Twisted River Saloon",
      city: "Eugene, OR",
      time: "8:00 PM",
      note: "This is a sample entry so you can see how a show looks. Edit or delete it in data.js!",
      link: "",
      sample: true,
    },

    /* ----- past gigs (dates are best-effort; fix freely) ----- */
    { date: "2026-07-04", venue: "5th Street Public Market", city: "Eugene, OR",
      note: "Independence Day — live near the Butte to Butte finish line" },
    { date: "2025-12-14", venue: "A very festive barrel room", city: "Eugene, OR",
      note: "Holiday show. We forget which barrel room — edit data.js" },
    { date: "2025-05-01", venue: "Venue 252", city: "Eugene, OR",
      note: "Fundraiser for Eugene Emergency Physicians" },
    { date: "2025-04-05", venue: "Twisted River Saloon", city: "Eugene, OR",
      note: "Made the marquee, right under karaoke night" },
    { date: "2024-06-22", venue: "Katie & Greg's Summer Party", city: "Eugene, OR",
      note: "Backyard. Excellent snacks." },
    { date: "2023-10-01", venue: "Abbelone Vineyard", city: "Junction City, OR",
      note: "The one with the good poster" },
  ],

  /* ---------- VIDEOS ----------------------------------------
     id = the 11 characters after "watch?v=" in a YouTube URL.  */
  videos: [
    { id: "jMdbSk-Gr-w", title: "First Killing Kudu show!",
      caption: "Where it all began." },
    { id: "UYKpkIBgZVQ", title: "Live at the Twisted River Saloon",
      caption: "Spirits, food, live music — we were the live music." },
    { id: "Sv5dhYStol0", title: "Killing Küdü @ Abbelone Vineyard",
      caption: "October 1st, 2023. Wine country, meet dad rock." },
    { id: "a0D0tf00Oyo", title: "Katie & Greg's Summer Party",
      caption: "Some of our finest backyard work." },
    { id: "SGr7o67_H1c", title: "Everlong — the first take (2021)",
      caption: "From the garage-era tapes. Be kind." },
  ],

  /* ---------- GALLERY ----------------------------------------
     kind: "poster" | "live" | "art" (used for the little label)
     To add a photo: put the image in assets/img/ (plus a smaller
     copy in assets/img/thumbs/ with the same filename) and add
     a row here. w/h are the thumbnail's pixel size — optional,
     but they keep the page from jumping around while it loads.  */
  gallery: [
    { file: "poster-abbelone.jpg",     w: 400, h: 640, kind: "poster", caption: "Abbelone Vineyard — the poster that set the whole vibe" },
    { file: "live-market.jpg",         w: 640, h: 480, kind: "live",   caption: "5th Street Public Market, 4th of July" },
    { file: "poster-july4.jpg",        w: 512, h: 640, kind: "poster", caption: "Independence Day — live near the finish line" },
    { file: "marquee-twisted.jpg",     w: 591, h: 640, kind: "live",   caption: "SAT · KILLING KUDU · 8PM — we made the sign" },
    { file: "live-abbelone.jpg",       w: 640, h: 480, kind: "live",   caption: "Under the canopy at Abbelone" },
    { file: "poster-venue252.jpg",     w: 453, h: 640, kind: "poster", caption: "Venue 252 — Live Loud, Die Legend" },
    { file: "live-holiday-bass.jpg",   w: 480, h: 640, kind: "live",   caption: "Low end, high spirits" },
    { file: "live-barrels.jpg",        w: 640, h: 543, kind: "live",   caption: "Playing to a room full of barrels (they loved us)" },
    { file: "art-twisted-cartoon.jpg", w: 640, h: 427, kind: "art",    caption: "Saturday night at the saloon, as imagined by a robot" },
    { file: "live-holiday-duo.jpg",    w: 640, h: 480, kind: "live",   caption: "Holiday show, December 2025" },
    { file: "live-twisted-green.jpg",  w: 295, h: 640, kind: "live",   caption: "Green-room lighting, literally" },
    { file: "art-kudu-neon.jpg",       w: 619, h: 640, kind: "art",    caption: "Our spiritual mascot, closing down the bar" },
    { file: "live-holiday-stage.jpg",  w: 640, h: 480, kind: "live",   caption: "Full band, full festive" },
  ],

  /* ---------- THE BAND ----------------------------------------
     PLACEHOLDER ALERT: swap in the real lineup!
       name:  the human (or their stage name)
       role:  what they play
       bio:   one or two sentences, funnier is better
       stats: exactly what it looks like                          */
  members: [
    {
      name: "The Voice",
      role: "Lead vocals · Guitar",
      bio: "Sings like nobody's watching. Statistically, some people are watching.",
      stats: { "Coffee": "Yes", "Back": "Iffy", "Stage moves": "2, both good" },
    },
    {
      name: "The Shredder",
      role: "Lead guitar",
      bio: "Owns more pedals than shoes. Will absolutely take that solo again if you ask.",
      stats: { "Pedals": "11", "Shoes": "4", "Regrets": "0" },
    },
    {
      name: "The Foundation",
      role: "Bass",
      bio: "Holds down the low end and, when required, the entire arrangement.",
      stats: { "Notes per song": "Enough", "Smiling": "Constantly", "Bedtime": "10:30" },
    },
    {
      name: "The Engine",
      role: "Drums",
      bio: "Keeps perfect time on stage. Loses car keys everywhere else.",
      stats: { "BPM": "Locked", "Keys": "Missing", "Fills": "Tasteful" },
    },
  ],

  /* ---------- BOOKING COPY ------------------------------------ */
  booking: {
    headline: "Böök the bänd",
    copy: "We play breweries, wineries, backyards, birthdays, fundraisers, markets, and the occasional saloon. We bring our own PA, we start on time, and we stop when you tell us to. Rates are reasonable; enthusiasm is included at no extra charge.",
    bullets: [
      "3+ hours of covers spanning five decades",
      "Our own PA, lights, and extension cords (so many extension cords)",
      "Punctual load-in — we are dads, we live for logistics",
      "Family-friendly by default, saloon-grade on request",
    ],
  },
};
