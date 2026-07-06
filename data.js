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
    pitch: "A local dad band playing the songs you already love, the Kudu way: a little bit country, a little bit grunge, entirely covers.",
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
    "A little bit country. A little bit grunge. Entirely covers.",
    "Somewhere between Nashville and Seattle. Geographically: Eugene.",
    "Three songs about whiskey per set. Minimum.",
    "Country songs, played loud. Grunge songs, played twangy.",
    "We practice two or three times a quarter. It adds character.",
    "Statistically Eugene's safest band: half of us are physicians.",
    "Loud early. Home by eleven.",
    "Zero original songs. That's a promise.",
    "The ümläüts are decorative.",
  ],

  /* ---------- MARQUEE SIGN LINES ---------------------------
     The scrolling letterboard strip, in loving homage to the
     Twisted River Saloon sign.                                */
  marquee: [
    "SAT · KILLING KUDU · 8 PM",
    "HALF WHISKEY · HALF FLANNEL",
    "ALL COVERS · NO WAITING",
    "ONCE OPENED FOR BEN RUE",
    "TIPS FUND NEW STRINGS",
    "DADS ON STAGE · PLEASE CLAP",
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
      note: "Made the marquee, right under karaoke night. 18 songs; three about whiskey." },
    { date: "2024-06-22", venue: "Katie & Greg's Summer Party", city: "Eugene, OR",
      note: "Opened for Ben Rue. Stephanie Lansdon sat in. Excellent snacks." },
    { date: "2023-10-01", venue: "Abbelone Vineyard — Harvest Festival", city: "Eugene, OR",
      note: "Our first all-acoustic set. Also the one with the good poster." },
    { date: "2022-09-18", venue: "Brian's backyard", city: "Eugene, OR",
      note: "The first show. Also Brian's birthday party. Eleven songs and no turning back." },
  ],

  /* ---------- THE KUDU WAY / THE KUDUFIER --------------------
     We don't do a plain song list. Instead, the site has a
     "machine" that shows what happens to a song when this band
     gets hold of it. Every specimen below is a song we have
     actually played live (see the YouTube setlists).

       treatment: where the needle lands.
                  -100 = maximum twang added (grunge going country)
                  +100 = maximum crunch added (country going loud)
                     0 = left respectfully untouched
       note: the lab report. Dry. Affectionate.                 */
  kuduWay: {
    intro: "We don't learn songs note-for-note. We learn them the Kudu way: country gets played louder, grunge gets a little twang, and everything comes out somewhere between Nashville and Seattle — which, if you check a map, is roughly Eugene. The machine below documents the process.",
    plaque: "Engineering: Jason · Anesthesia: Brian · Delivery: Geoff · Legal: Matt",
    specimens: [
      { song: "Everlong", artist: "Foo Fighters", treatment: -65,
        note: "Arrived 100% Foo. Discharged with a slight drawl and a farmer's tan. No complications." },
      { song: "Tennessee Whiskey", artist: "Chris Stapleton", treatment: 55,
        note: "Already whiskey. We added volume. (Third whiskey song of the set — it's a pattern, not a problem.)" },
      { song: "Interstate Love Song", artist: "Stone Temple Pilots", treatment: -25,
        note: "Was secretly 30% country all along. People forget. We remember." },
      { song: "Nutshell", artist: "Alice in Chains", treatment: 0,
        note: "No treatment applied. Some songs you don't kudufy — you just try to deserve them." },
      { song: "Hashpipe", artist: "Weezer", treatment: -40,
        note: "Prescribed by the rhythm section. They are both physicians. We don't ask questions." },
      { song: "Whiskey in the Jar", artist: "Metallica", treatment: -30,
        note: "A cover of a cover of a cover. Chain of custody intact. Legal has reviewed and approved." },
      { song: "Must Be the Whiskey", artist: "Cody Jinks", treatment: 60,
        note: "See? Told you the whiskey thing was a pattern." },
      { song: "A Pirate Looks at Forty", artist: "Jimmy Buffett", treatment: 20,
        note: "The forty in question is now a rounding error." },
      { song: "Harvest Moon", artist: "Neil Young", treatment: 0,
        note: "Already perfect. We just play it and point." },
      { song: "Badfish", artist: "Sublime", treatment: -35,
        note: "Reggae, plus flannel. Feasibility: confirmed. Eugene: approves." },
      { song: "Cocaine", artist: "Eric Clapton × Paul Cauthen", treatment: 45,
        note: "Arrived pre-kudufied as 'Cocaine Country Dancing.' The machine simply nodded." },
      { song: "Black", artist: "Pearl Jam", treatment: -10,
        note: "Handled gently. Jason means every word, and the rest of us stay out of the way." },
    ],
  },

  /* ---------- VIDEOS ----------------------------------------
     id = the 11 characters after "watch?v=" in a YouTube URL.  */
  videos: [
    { id: "jMdbSk-Gr-w", title: "First Killing Kudu show!",
      caption: "September 18, 2022 — Brian's backyard, on Brian's birthday. Eleven songs. Where it all began." },
    { id: "UYKpkIBgZVQ", title: "Live at the Twisted River Saloon",
      caption: "94 minutes, 18 songs, three of them about whiskey." },
    { id: "Sv5dhYStol0", title: "Killing Küdü @ Abbelone Vineyard",
      caption: "Harvest Festival 2023 — the first all-acoustic set. Wine country, meet dad rock." },
    { id: "a0D0tf00Oyo", title: "Katie & Greg's Summer Party",
      caption: "Opening for Ben Rue, with Stephanie Lansdon sitting in on Shallow." },
    { id: "SGr7o67_H1c", title: "Everlong — the first take (2021)",
      caption: "“A couple of old guys trying to put their own spin on a Foo Fighters classic.” The garage-era tapes." },
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
    { file: "live-holiday-bass.jpg",   w: 480, h: 640, kind: "live",   caption: "Brian: professionally calm, even mid-song" },
    { file: "live-barrels.jpg",        w: 640, h: 543, kind: "live",   caption: "Playing to a room full of barrels (they loved us)" },
    { file: "art-twisted-cartoon.jpg", w: 640, h: 427, kind: "art",    caption: "Saturday night at the saloon, as imagined by a robot" },
    { file: "live-holiday-duo.jpg",    w: 640, h: 480, kind: "live",   caption: "Holiday show, December 2025" },
    { file: "live-twisted-green.jpg",  w: 295, h: 640, kind: "live",   caption: "Green-room lighting, literally" },
    { file: "art-kudu-neon.jpg",       w: 619, h: 640, kind: "art",    caption: "Our spiritual mascot, closing down the bar" },
    { file: "live-holiday-stage.jpg",  w: 640, h: 480, kind: "live",   caption: "Full band, full festive" },
  ],

  /* ---------- THE BAND ----------------------------------------
       name:  the human
       role:  what they play
       bio:   one or two sentences, funnier is better
       stats: exactly what it looks like                          */
  members: [
    {
      name: "Jason Vaughn",
      role: "Lead vocals · Guitar",
      bio: "Native Oregonian. Spends his days around heavy equipment, which explains the horsepower in the vocals. Sings Stapleton like he means it — because he does.",
      stats: { "Oregonian": "Native", "Horsepower": "Ample", "Twang": "Factory-installed" },
    },
    {
      name: "Geoff Gill",
      role: "Drums · Ringleader",
      bio: "Founder, ringleader, and owner-operator of the PA. Also an OB/GYN: he keeps the band's time, and for several of our fans, he started it — actual babies delivered for actual audience members.",
      stats: { "Babies delivered for fans": "Yes, really", "PA cables wrapped": "All of them", "Tempo": "Doctor's orders" },
    },
    {
      name: "Brian Liddy",
      role: "Bass · Vocals",
      bio: "Anesthesiologist. Professionally calm. Puts people under by day; the low end does the opposite by night. The band's first-ever show was his backyard birthday party, so technically this is all his fault.",
      stats: { "Bedside manner": "Excellent", "Panic": "Never", "First gig": "His birthday" },
    },
    {
      name: "Matt Lawless",
      role: "Lead guitar",
      bio: "General counsel at a forest products company, making him the only member who has read the venue contract. Solos are provided as-is, without warranty, express or implied.",
      stats: { "Objections": "Overruled", "Warranty": "None", "Surname": "Accurate" },
    },
  ],

  /* ---------- BOOKING COPY ------------------------------------ */
  booking: {
    headline: "Böök the bänd",
    copy: "Most of our shows happen because somebody knew somebody who'd seen us once. You could be that somebody. We play breweries, wineries, backyards, birthdays, fundraisers, markets, and the occasional saloon. We bring our own PA, we start on time, and we stop when you tell us to.",
    bullets: [
      "3+ hours of covers: half whiskey, half flannel, zero originals",
      "Our own PA, lights, and extension cords — Geoff insists on carrying it",
      "Punctual load-in. We are dads; logistics is our love language",
      "Two physicians on stage at all times — statistically Eugene's safest band",
    ],
  },
};
