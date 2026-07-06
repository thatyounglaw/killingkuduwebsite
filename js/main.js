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
