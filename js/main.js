/* ============================================================
   KILLING KUDU — site engine
   You should not need to edit this file for day-to-day updates.
   Everything editable lives in data.js.
   ============================================================ */
(function () {
  "use strict";
  const D = window.KUDU;
  const $ = (sel) => document.querySelector(sel);

  /* ---------- tiny helpers ---------- */
  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function parseDate(str) { // "YYYY-MM-DD" -> local Date
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  /* ============================================================
     HERO: rotating taglines
     ============================================================ */
  (function taglines() {
    const node = $("#tagline");
    const lines = D.taglines || [];
    if (!node || lines.length < 2) return;
    let i = 0;
    setInterval(() => {
      node.classList.add("is-fading");
      setTimeout(() => {
        i = (i + 1) % lines.length;
        node.textContent = lines[i];
        node.classList.remove("is-fading");
      }, 420);
    }, 4200);
  })();

  /* ============================================================
     MARQUEE: duplicate the line list so the loop is seamless
     ============================================================ */
  (function marquee() {
    const track = $("#marqueeTrack");
    if (!track) return;
    const lines = (D.marquee || []).map((l) => `<span>${esc(l)}</span>`).join("");
    track.innerHTML = lines + lines; // twice, for the -50% loop
  })();

  /* ============================================================
     SHOWS: one list in, upcoming + ledger out
     ============================================================ */
  (function shows() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const all = (D.shows || []).slice().filter((s) => s && s.date);
    const upcoming = all.filter((s) => parseDate(s.date) >= today)
                        .sort((a, b) => parseDate(a.date) - parseDate(b.date));
    const past = all.filter((s) => parseDate(s.date) < today)
                    .sort((a, b) => parseDate(b.date) - parseDate(a.date));

    // -- upcoming cards
    const up = $("#upcomingShows");
    if (upcoming.length === 0) {
      up.appendChild(el("div", "shows__empty",
        `Nothing on the calendar right now. The dads are resting.<br>
         Change that: <a href="#book">book us for something</a>.`));
    } else {
      upcoming.forEach((s) => {
        const dt = parseDate(s.date);
        const card = el("article", "show-card");
        card.innerHTML = `
          ${s.sample ? `<span class="show-card__sample">sample &mdash; edit data.js</span>` : ""}
          <div class="show-card__date">
            <span class="show-card__dow">${DOW[dt.getDay()]}</span>
            <span class="show-card__day">${dt.getDate()}</span>
            <span class="show-card__mon">${MONTHS[dt.getMonth()]} ${dt.getFullYear()}</span>
          </div>
          <div>
            <h3 class="show-card__venue">${esc(s.venue)}</h3>
            <span class="show-card__city">${esc(s.city || "")}</span>
            ${s.note ? `<p class="show-card__note">${esc(s.note)}</p>` : ""}
          </div>
          <div class="show-card__right">
            ${s.time ? `<span class="show-card__time">${esc(s.time)}</span>` : ""}
            ${s.link ? `<a class="show-card__link" href="${esc(s.link)}" target="_blank" rel="noopener">Details &#8599;</a>` : ""}
          </div>`;
        up.appendChild(card);
      });
    }

    // -- gig ledger
    const list = $("#pastShows");
    past.forEach((s) => {
      const dt = parseDate(s.date);
      const li = el("li");
      li.innerHTML = `
        <span class="ledger__date">${MONTHS[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}</span>
        <span class="ledger__venue">${esc(s.venue)}</span>
        <span class="ledger__city">${esc(s.city || "")}</span>
        ${s.note ? `<span class="ledger__note">${esc(s.note)}</span>` : ""}`;
      list.appendChild(li);
    });
    $("#ledgerCount").textContent =
      `${past.length} gigs played (that we can prove) — dates approximate, memories vary`;
  })();

  /* ============================================================
     THE KUDUFIER — feed it a song, watch the needle
     ============================================================ */
  (function kudufier() {
    const K = D.kuduWay;
    if (!K || !K.specimens || !K.specimens.length) {
      const s = $("#method");
      if (s) s.remove();
      return;
    }
    $("#methodIntro").textContent = K.intro || "";
    $("#kudufierPlaque").textContent = K.plaque || "";

    const songEl = $("#kudufierSong"), artistEl = $("#kudufierArtist"),
          noteEl = $("#kudufierNote"), needle = $("#kudufierNeedle"),
          panel = document.querySelector(".kudufier");

    // shuffled order so every visit starts somewhere new,
    // then loops without immediate repeats
    const order = K.specimens.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    let pos = -1;

    function run() {
      pos = (pos + 1) % order.length;
      const sp = K.specimens[order[pos]];
      panel.classList.add("is-swapping");
      needle.style.transform = "rotate(0deg)"; // reset swing
      setTimeout(() => {
        songEl.textContent = sp.song;
        artistEl.textContent = sp.artist;
        noteEl.textContent = sp.note;
        panel.classList.remove("is-swapping");
        // treatment -100..100 -> needle -70deg..70deg
        const deg = Math.max(-100, Math.min(100, sp.treatment || 0)) * 0.7;
        requestAnimationFrame(() => { needle.style.transform = `rotate(${deg}deg)`; });
      }, 320);
    }

    $("#kudufierBtn").addEventListener("click", run);

    // fire the first specimen when the machine scrolls into view
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) { run(); io.disconnect(); }
      }, { threshold: 0.4 });
      io.observe(panel);
    } else {
      run();
    }
  })();

  /* ============================================================
     VIDEOS: click-to-load YouTube (fast page, no trackers on load)
     ============================================================ */
  (function videos() {
    const grid = $("#videoGrid");
    (D.videos || []).forEach((v) => {
      const card = el("article", "video-card");
      const frame = el("button", "video-card__frame");
      frame.setAttribute("aria-label", `Play video: ${v.title}`);
      frame.style.backgroundImage =
        `url("https://i.ytimg.com/vi/${encodeURIComponent(v.id)}/hqdefault.jpg")`;
      frame.appendChild(el("span", "video-card__play", "&#9654;"));
      frame.addEventListener("click", () => {
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.id)}?autoplay=1`;
        iframe.title = v.title;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        frame.replaceChildren(iframe);
      }, { once: true });
      card.appendChild(frame);
      card.appendChild(el("h3", "video-card__title", esc(v.title)));
      if (v.caption) card.appendChild(el("p", "video-card__cap", esc(v.caption)));
      grid.appendChild(card);
    });
    const yt = $("#youtubeLink");
    if (D.contact && D.contact.youtube) yt.href = D.contact.youtube;
    else yt.parentElement.remove();
  })();

  /* ============================================================
     GALLERY + LIGHTBOX
     ============================================================ */
  (function gallery() {
    const wrap = $("#gallery");
    const items = D.gallery || [];
    items.forEach((g, i) => {
      const b = el("button", "gallery__item");
      b.setAttribute("aria-label", `View photo: ${g.caption || g.file}`);
      const size = g.w && g.h ? `width="${g.w}" height="${g.h}"` : "";
      b.innerHTML = `
        <span class="gallery__kind">${esc(g.kind || "photo")}</span>
        <img src="assets/img/thumbs/${esc(g.file)}" alt="${esc(g.caption || "Killing Kudu photo")}" decoding="async" ${size}>
        <span class="gallery__cap">${esc(g.caption || "")}</span>`;
      b.addEventListener("click", () => openLightbox(i));
      wrap.appendChild(b);
    });

    const lb = $("#lightbox"), img = $("#lbImg"), cap = $("#lbCap");
    let cur = 0;
    function openLightbox(i) { cur = i; render(); lb.hidden = false; document.body.style.overflow = "hidden"; $("#lbClose").focus(); }
    function close() { lb.hidden = true; document.body.style.overflow = ""; }
    function render() {
      const g = items[cur];
      img.src = `assets/img/${g.file}`;
      img.alt = g.caption || "Killing Kudu photo";
      cap.textContent = g.caption || "";
    }
    function step(n) { cur = (cur + n + items.length) % items.length; render(); }
    $("#lbClose").addEventListener("click", close);
    $("#lbPrev").addEventListener("click", () => step(-1));
    $("#lbNext").addEventListener("click", () => step(1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  })();

  /* ============================================================
     THE BAND
     ============================================================ */
  (function band() {
    const grid = $("#bandGrid");
    (D.members || []).forEach((m) => {
      const stats = Object.entries(m.stats || {})
        .map(([k, v]) => `<span class="member__stat">${esc(k)}: <b>${esc(v)}</b></span>`)
        .join("");
      const card = el("article", "member", `
        <div class="member__badge">${esc((m.name || "?").replace(/^The\s+/i, "").charAt(0).toUpperCase())}</div>
        <h3 class="member__name">${esc(m.name)}</h3>
        <p class="member__role">${esc(m.role || "")}</p>
        <p class="member__bio">${esc(m.bio || "")}</p>
        <div class="member__stats">${stats}</div>`);
      grid.appendChild(card);
    });
  })();

  /* ============================================================
     BOOKING
     ============================================================ */
  (function booking() {
    const b = D.booking || {};
    if (b.headline) $("#bookHeadline").textContent = b.headline;
    $("#bookCopy").textContent = b.copy || "";
    const ul = $("#bookBullets");
    (b.bullets || []).forEach((t) => ul.appendChild(el("li", null, esc(t))));

    const ctas = $("#bookCtas");
    const c = D.contact || {};
    if (c.bookingEmail) {
      const a = el("a", "btn btn--ticket", "Email the band");
      a.href = `mailto:${c.bookingEmail}?subject=${encodeURIComponent("Booking inquiry — Killing Kudu")}`;
      ctas.appendChild(a);
    }
    if (c.instagram) {
      const a = el("a", "btn btn--ghost", "Instagram");
      a.href = c.instagram; a.target = "_blank"; a.rel = "noopener";
      ctas.appendChild(a);
    }
    if (!c.bookingEmail && !c.instagram) {
      ctas.appendChild(el("p", "book__hint",
        "Booking buttons appear here once you add an email or Instagram link in data.js. For now: flag us down at a show."));
    }
  })();

  /* ============================================================
     KUDUDES — the fan section
     ============================================================ */
  (function kududes() {
    const F = D.fans;
    if (!F) { const s = $("#kududes"); if (s) s.remove(); return; }
    $("#kududesIntro").textContent = F.intro || "";

    /* ---- tiny stable string hash (so a name always maps the same) ---- */
    function hash(str, seed) {
      let h = seed >>> 0;
      for (let i = 0; i < str.length; i++) { h = ((h << 5) + h + str.charCodeAt(i)) >>> 0; }
      return h;
    }

    /* ---------- 1. MEMBERSHIP CARD ---------------------------- */
    (function card() {
      const canvas = $("#cardCanvas");
      if (!canvas || !canvas.getContext) return;
      const ctx = canvas.getContext("2d");
      const W = 1000, H = 630, S = 2;         // draw in 1000x630, output 2x
      const PAPER = "#f2e7cf", INK = "#2b1b12", RUST = "#a63d2a",
            TEAL = "#3d7068", MAROON = "#5f2317";

      // the kudu head, as an SVG stamp (cuts filled with paper so they read as holes)
      const kuduSVG =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240">' +
        '<g fill="' + INK + '">' +
        '<path d="M118,106 C136,92 156,86 168,92 C162,106 144,120 122,126 C117,120 115,111 118,106 Z"/>' +
        '<path d="M82,106 C64,92 44,86 32,92 C38,106 56,120 78,126 C83,120 85,111 82,106 Z"/>' +
        '<path d="M100,86 C84,86 76,97 76,112 C76,132 84,152 89,170 C93,186 94,200 100,206 C106,200 107,186 111,170 C116,152 124,132 124,112 C124,97 116,86 100,86 Z"/>' +
        '</g>' +
        '<g fill="none" stroke="' + INK + '" stroke-linecap="round">' +
        '<path stroke-width="9" d="M109,92 C126,83 133,70 124,57"/>' +
        '<path stroke-width="6.5" d="M124,57 C115,45 118,33 130,25"/>' +
        '<path stroke-width="4" d="M130,25 C140,18 144,9 140,2"/>' +
        '<path stroke-width="9" d="M91,92 C74,83 67,70 76,57"/>' +
        '<path stroke-width="6.5" d="M76,57 C85,45 82,33 70,25"/>' +
        '<path stroke-width="4" d="M70,25 C60,18 56,9 60,2"/>' +
        '</g>' +
        '<g fill="' + PAPER + '">' +
        '<path d="M100,134 L88,121 L92,116 L100,125 L108,116 L112,121 Z"/>' +
        '<circle cx="87" cy="123" r="3.1"/><circle cx="113" cy="123" r="3.1"/>' +
        '<path d="M94,196 C96,201 104,201 106,196 C104,193 96,193 94,196 Z"/>' +
        '</g></svg>';

      let assets = null;
      function ensure() {
        if (assets) return assets;
        const crest = new Image();
        const crestP = new Promise((res) => { crest.onload = () => res(crest); crest.onerror = () => res(null); });
        crest.src = "data:image/svg+xml;utf8," + encodeURIComponent(kuduSVG);
        const fontsP = document.fonts && document.fonts.load
          ? Promise.all([
              document.fonts.load('64px "Alfa Slab One"'),
              document.fonts.load('20px "Oswald"'),
              document.fonts.load('italic 24px "Lora"'),
              document.fonts.load('20px "Rye"'),
            ]).catch(() => {})
          : Promise.resolve();
        assets = Promise.all([crestP, fontsP]).then(([c]) => ({ crest: c }));
        return assets;
      }

      function fitFont(text, family, startPx, maxWidth, minPx) {
        let px = startPx;
        do {
          ctx.font = px + 'px "' + family + '"';
          if (ctx.measureText(text).width <= maxWidth) break;
          px -= 2;
        } while (px > minPx);
        return px;
      }

      let currentUrl = null;
      async function draw(rawName) {
        const { crest } = await ensure();
        const name = (rawName || "").trim() || "Future Kudude";
        const NAME = name.toUpperCase();
        const num = String((hash(name.toLowerCase(), 5381) % 8900) + 100).padStart(4, "0");
        const honor = (F.honorifics && F.honorifics.length)
          ? F.honorifics[hash(name.toLowerCase(), 7) % F.honorifics.length] : "";
        const year = new Date().getFullYear();

        canvas.width = W * S; canvas.height = H * S;
        ctx.setTransform(S, 0, 0, S, 0, 0);
        ctx.textBaseline = "alphabetic";

        // background + borders
        ctx.fillStyle = PAPER; ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.strokeRect(20, 20, W - 40, H - 40);
        ctx.lineWidth = 2; ctx.strokeRect(32, 32, W - 64, H - 64);

        ctx.textAlign = "center";

        // eyebrow
        ctx.fillStyle = RUST; ctx.letterSpacing = "8px";
        ctx.font = '20px "Oswald"';
        ctx.fillText("★  OFFICIAL KUDUDE  ★", W / 2, 74);
        ctx.fillStyle = TEAL; ctx.letterSpacing = "4px"; ctx.font = '14px "Oswald"';
        ctx.fillText("KILLING KUDU · FAN IN GOOD STANDING", W / 2, 98);
        ctx.letterSpacing = "0px";

        // crest
        if (crest) { const cw = 92, ch = cw * 240 / 200; ctx.drawImage(crest, W / 2 - cw / 2, 112, cw, ch); }

        // name
        ctx.fillStyle = INK;
        const npx = fitFont(NAME, "Alfa Slab One", 74, W - 200, 30);
        ctx.font = npx + 'px "Alfa Slab One"';
        ctx.fillText(NAME, W / 2, 340);

        // honorific
        ctx.fillStyle = MAROON; ctx.font = 'italic 24px "Lora"';
        ctx.fillText(honor, W / 2, 384);

        // divider
        ctx.strokeStyle = "rgba(43,27,18,.35)"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(150, 418); ctx.lineTo(W - 150, 418); ctx.stroke();

        // member no. (left) + since (right)
        ctx.fillStyle = TEAL; ctx.letterSpacing = "3px"; ctx.font = '13px "Oswald"';
        ctx.textAlign = "left";  ctx.fillText("MEMBER", 160, 468);
        ctx.textAlign = "right"; ctx.fillText("IN THE HERD SINCE", W - 160, 468);
        ctx.letterSpacing = "0px"; ctx.fillStyle = RUST; ctx.font = '40px "Alfa Slab One"';
        ctx.textAlign = "left";  ctx.fillText("No. " + num, 160, 512);
        ctx.textAlign = "right"; ctx.fillText(String(year), W - 160, 512);

        // footer
        ctx.fillStyle = INK; ctx.textAlign = "center";
        ctx.letterSpacing = "2px"; ctx.font = '13px "Oswald"';
        ctx.fillText("EUGENE, OREGON  ·  DUES: APPLAUSE  ·  BENEFITS: NONE", W / 2, 575);
        ctx.letterSpacing = "0px";

        // wire up the download
        const dl = $("#cardDownload");
        canvas.toBlob((blob) => {
          if (!blob) return;
          if (currentUrl) URL.revokeObjectURL(currentUrl);
          currentUrl = URL.createObjectURL(blob);
          dl.href = currentUrl;
          dl.download = "kudude-card-" + (name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "member") + ".png";
        }, "image/png");
        return dl;
      }

      draw("");   // initial demo card
      $("#cardForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const dl = await draw($("#cardName").value);
        if (dl) { dl.hidden = false; toast("Welcome to the herd 🦌"); }
      });
    })();

    /* ---------- 7. HONOR ROLL --------------------------------- */
    (function honor() {
      const list = $("#honorList");
      (F.honorRoll || []).forEach((h) => {
        const li = el("li", null,
          `<span class="honor__name">${esc(h.name)}</span>` +
          (h.note ? `<span class="honor__note">${esc(h.note)}</span>` : ""));
        list.appendChild(li);
      });
    })();

    /* ---------- 9. TESTIMONIALS ------------------------------- */
    (function says() {
      const items = F.testimonials || [];
      const wrap = document.querySelector(".says");
      if (!items.length) { if (wrap) wrap.remove(); return; }
      const q = $("#sayQuote"), who = $("#sayWho"), dots = $("#sayDots");
      let i = 0, timer = null;

      items.forEach((_, idx) => {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Quote " + (idx + 1));
        b.addEventListener("click", () => { show(idx); reset(); });
        dots.appendChild(b);
      });

      function show(n) {
        i = (n + items.length) % items.length;
        wrap.classList.add("is-fading");
        setTimeout(() => {
          q.textContent = items[i].quote;
          who.textContent = items[i].who ? "— " + items[i].who : "";
          [...dots.children].forEach((d, idx) =>
            d.setAttribute("aria-current", idx === i ? "true" : "false"));
          wrap.classList.remove("is-fading");
        }, 340);
      }
      function reset() { clearInterval(timer); timer = setInterval(() => show(i + 1), 6000); }
      show(0); reset();
    })();

    /* ---------- 4 + 5. THE TWO FORMS -------------------------- */
    function wireForm(opts) {
      const form = $(opts.form), msg = $(opts.msg);
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = $(opts.field).value.trim();
        if (!value) return;
        const endpoint = (D.fans[opts.endpointKey] || "").trim();
        const email = D.contact && D.contact.bookingEmail;

        function say(text, cls) { msg.textContent = text; msg.className = "fanform__msg " + (cls || ""); }

        if (endpoint) {
          say("Sending…", "");
          fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(opts.payload(value)),
          }).then((r) => {
            if (r.ok) { say(opts.ok, "is-good"); form.reset(); }
            else { say("Hmm, that didn't go through. Try again, or catch us at a show.", "is-bad"); }
          }).catch(() => say("Couldn't reach the server. Try again later.", "is-bad"));
        } else if (email) {
          const m = opts.mail(value, email);
          window.location.href = m;
          say("Opening your email app… hit send and you're in.", "is-good");
          form.reset();
        } else {
          say(opts.soon, "");
        }
      });
    }

    wireForm({
      form: "#joinForm", msg: "#joinMsg", field: "#joinEmail", endpointKey: "listEndpoint",
      payload: (v) => ({ email: v, list: "Kududes" }),
      mail: (v, to) => "mailto:" + to + "?subject=" + encodeURIComponent("Add me to the Kududes list") +
        "&body=" + encodeURIComponent("Sign me up for the herd. My email: " + v),
      ok: "You're in the herd. We'll holler when we're playing.",
      soon: "The sign-up list is warming up — for now, follow along on Instagram or flag us down at a show.",
    });

    wireForm({
      form: "#requestForm", msg: "#requestMsg", field: "#requestSong", endpointKey: "requestEndpoint",
      payload: (v) => ({ request: v, from: "Kududes site" }),
      mail: (v, to) => "mailto:" + to + "?subject=" + encodeURIComponent("Kudu cover request") +
        "&body=" + encodeURIComponent("The Kududes would like you to consider: " + v),
      ok: "Filed with the Kudufier. No promises, but no song is safe.",
      soon: "The request box is almost open — for now, shout it at us between songs. We're listening.",
    });
  })();

  /* ---------- footer year ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ============================================================
     FUN, PART 1 — the stampede
     Click the hero kudu five times. You've earned it.
     ============================================================ */
  (function stampede() {
    const kudu = $("#heroKudu");
    const pen = $("#stampede");
    let clicks = 0, timer = null;
    kudu.addEventListener("click", () => {
      clicks++;
      clearTimeout(timer);
      timer = setTimeout(() => { clicks = 0; }, 2200);
      if (clicks === 3) toast("Careful now…");
      if (clicks >= 5) { clicks = 0; release(); }
    });
    function release() {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        toast("A stampede was implied. 🦌"); return;
      }
      toast("STAMPEDE!");
      const herd = 9;
      for (let i = 0; i < herd; i++) {
        const k = el("div", "stampede__kudu",
          `<svg viewBox="0 0 140 90" aria-hidden="true"><use href="#kudu-run"/></svg>`);
        const scale = 0.5 + Math.random() * 0.9;
        k.style.bottom = `${4 + Math.random() * 22}vh`;
        k.style.width = `${120 * scale}px`;
        k.style.height = `${78 * scale}px`;
        k.style.opacity = String(0.55 + scale * 0.3);
        k.style.animationDuration = `${(2.8 - scale) + Math.random()}s`;
        k.style.animationDelay = `${Math.random() * 1.4}s`;
        k.style.zIndex = String(scale > 1 ? 66 : 64);
        pen.appendChild(k);
        k.addEventListener("animationend", () => k.remove());
      }
    }
  })();

  /* ============================================================
     FUN, PART 2 — Küdü Mode
     Type "kudu" anywhere (or press the ü in the footer) and the
     site gets the metal umlauts it always deserved.
     ============================================================ */
  (function kuduMode() {
    let on = false;
    const originals = new Map();
    function toggle() {
      on = !on;
      document.querySelectorAll("[data-umlaut]").forEach((n) => {
        if (on) {
          if (!originals.has(n)) originals.set(n, n.innerHTML);
          n.innerHTML = n.innerHTML.replace(/u/g, "&uuml;").replace(/U/g, "&Uuml;");
        } else if (originals.has(n)) {
          n.innerHTML = originals.get(n);
        }
      });
      toast(on ? "Ümläüts ëngägëd. Röck ön." : "Umlauts stowed safely.");
    }
    $("#umlautBtn").addEventListener("click", toggle);
    let buffer = "";
    document.addEventListener("keydown", (e) => {
      if (e.target.matches("input, textarea") || e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-4);
      if (buffer === "kudu") { buffer = ""; toggle(); }
    });
  })();

  /* ---------- toast ---------- */
  let toastTimer = null;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-showing");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-showing"), 2600);
  }

  /* ---------- for the curious ---------- */
  console.log(
    "%c\n   \\ /        \\ /\n    }|         |{\n    }|         |{\n     \\\\  ___  //\n      \\\\/o o\\//\n       | \\_/ |     KILLING KUDU\n        \\ = /      Eugene, Oregon\n         |||       all covers · no shame · some twang\n         |||\n",
    "font-family: monospace; color: #a63d2a;"
  );
  console.log("Psst — type “kudu” anywhere on the page. Or click the kudu five times. We had fun making this.");
})();
