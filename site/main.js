(() => {
  const S = window.SITE;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (t = "") => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Contact links ---------- */
  const c = S.contact;
  const wa = msg => c.whatsapp ? `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(msg)}` : "#contact";
  const ext = url => url.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
  document.querySelectorAll("[data-wa]").forEach(a => {
    a.href = wa(a.dataset.wa);
    if (c.whatsapp) { a.target = "_blank"; a.rel = "noopener"; }
  });

  const icons = {
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>'
  };
  const waUrl = wa("Hi Vinay! I'd like to hire you for an edit.");
  const igUrl = c.instagram ? "https://instagram.com/" + c.instagram : "#contact";
  $("#contactBtns").innerHTML = [
    `<a class="plate plate-green" href="${waUrl}"${ext(waUrl)}>${icons.wa} WhatsApp</a>`,
    c.email ? `<a class="plate plate-cream" href="mailto:${esc(c.email)}">${icons.mail} ${esc(c.email)}</a>` : "",
    `<a class="plate plate-red" href="${esc(igUrl)}"${ext(igUrl)}>${icons.ig} ${c.instagram ? "@" + esc(c.instagram) : "Instagram"}</a>`
  ].join("");

  /* ---------- Video helpers ---------- */
  const aisleOf = id => S.aisles.find(a => a.id === id) || { shape: "wide" };
  // Wide videos use the sharp 16:9 thumbnail; shorts use hqdefault (cropped to the vertical frame)
  const thumbOf = v => v.thumb || (v.youtube
    ? `https://i.ytimg.com/vi/${v.youtube}/${aisleOf(v.aisle).shape === "wide" ? "maxresdefault" : "hqdefault"}.jpg` : "");
  // If a high-res thumbnail is missing, fall back to the standard one
  document.addEventListener("error", e => {
    const img = e.target;
    if (img.tagName === "IMG" && img.src.includes("maxresdefault")) img.src = img.src.replace("maxresdefault", "hqdefault");
  }, true);

  const player = $("#player"), frame = $("#playerFrame");
  function play(v) {
    if (v.link) { window.open(v.link, "_blank", "noopener"); return; }
    player.classList.toggle("tall", aisleOf(v.aisle).shape === "tall");
    frame.innerHTML = v.youtube
      ? `<iframe src="https://www.youtube-nocookie.com/embed/${esc(v.youtube)}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="${esc(v.title)}"></iframe>`
      : v.vimeo
      ? `<iframe src="https://player.vimeo.com/video/${esc(v.vimeo)}?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="${esc(v.title)}"></iframe>`
      : `<video src="${esc(v.file)}" controls autoplay playsinline></video>`;
    if (shelf.open) shelf.close();
    player.showModal();
  }
  player.addEventListener("close", () => { frame.innerHTML = ""; });

  const shelf = $("#shelf");
  function openShelf(aisleId) {
    const a = aisleOf(aisleId);
    const vids = S.videos.filter(v => v.aisle === aisleId);
    $("#shelfTitle").textContent = a.label;
    const g = $("#shelfGrid");
    g.className = "shelf-grid" + (a.shape === "tall" ? " tall" : "");
    g.innerHTML = vids.map(v => `<button class="shelf-item" data-v="${S.videos.indexOf(v)}">${thumbOf(v) ? `<img src="${esc(thumbOf(v))}" alt="" loading="lazy">` : `<div class="shelf-link">${v.link ? "Watch on X ↗" : "▶"}</div>`}<span>${esc(v.title)}</span></button>`).join("");
    shelf.showModal();
  }
  document.querySelectorAll("dialog").forEach(d => {
    d.querySelector(".player-close").addEventListener("click", () => d.close());
    d.addEventListener("click", e => { if (e.target === d) d.close(); });
  });

  /* ---------- Panels (one per aisle) ---------- */
  const screenHTML = (v, label) => {
    if (!v) return `<div class="screen empty"><div><b>Coming soon</b><i>${esc(label)}</i></div></div>`;
    if (v.link) return `<div class="screen link"><div><b>𝕏</b><i>${esc(v.client || v.title)}</i><span class="watch">Watch on X ↗</span></div></div>`;
    const t = thumbOf(v);
    // --thumb feeds a blurred backdrop so 16:9 thumbnails sit neatly inside the wide TV screens
    return `<div class="screen"${t ? ` style="--thumb:url('${esc(t)}')"` : ""}>${t ? `<img class="thumb" src="${esc(t)}" alt="" loading="lazy">` : v.file ? `<video src="${esc(v.file)}#t=0.5" muted playsinline preload="metadata"></video>` : ""}
      <img class="play" src="assets/ui/play.webp" alt="">${v.views ? `<span class="views">${esc(v.views)} views</span>` : ""}</div>`;
  };

  // Each aisle shows its videos 2 at a time ("sets"); scrolling slides to the next pair.
  const PER_SET = 2, MAX_SETS = 4;
  const deviceHTML = (v, a) => {
    const tall = a.shape === "tall";
    return `<button class="device ${tall ? "phone" : "tv"}" ${v ? `data-v="${S.videos.indexOf(v)}" aria-label="Play ${esc(v.title)}"` : 'tabindex="-1" aria-label="Coming soon"'}>
        ${screenHTML(v, a.label)}
        <img src="assets/${tall ? "phone" : "tv"}.webp" alt="">
      </button>`;
  };
  const panelHTML = (a, i) => {
    const vids = S.videos.filter(v => v.aisle === a.id);
    const groups = [];
    for (let k = 0; k < Math.max(vids.length, 1) && groups.length < MAX_SETS; k += PER_SET) groups.push(vids.slice(k, k + PER_SET));
    if (!vids.length) groups[0] = [undefined, undefined];
    const more = vids.length > PER_SET * MAX_SETS ? `<button class="plate plate-cream chip-plate" data-shelf="${a.id}">See all ${vids.length} →</button>` : "";
    const sets = groups.map((g, k) => `
      <div class="set ${a.shape}" data-set="${k}">
        <div class="devices">${g.map(v => deviceHTML(v, a)).join("")}</div>
        ${groups.length > 1 ? `<span class="set-count">${k + 1} / ${groups.length}</span>` : ""}
      </div>`).join("");
    return `
      <div class="panel-inner">
        <div class="cat-board"><img src="assets/board.webp" alt=""><span><span><small>AISLE ${i + 1}</small>${esc(a.label).replace(/-/g, "&#8209;")}</span></span></div>
        <div class="sets">${sets}</div>
        <div class="panel-foot"><span class="plate plate-cream chip-plate">${vids.length ? "Tap a screen to play" : "Fresh stock arriving soon"}</span>${more}</div>
      </div>`;
  };

  const panelsEl = $("#panels");
  panelsEl.innerHTML = S.aisles.map((a, i) =>
    `<div class="panel" data-i="${i}" role="group" aria-label="${esc(a.label)}">${panelHTML(a, i)}</div>`).join("");
  panelsEl.addEventListener("click", e => {
    const d = e.target.closest("[data-v]");
    if (d) return play(S.videos[d.dataset.v]);
    const s = e.target.closest("[data-shelf]");
    if (s) openShelf(s.dataset.shelf);
  });
  $("#shelfGrid").addEventListener("click", e => {
    const d = e.target.closest("[data-v]");
    if (d) play(S.videos[d.dataset.v]);
  });

  /* ---------- Rate list ---------- */
  $("#chalk").innerHTML = `<h3>RATE LIST</h3>` + S.services.map(s =>
    `<p><span>${esc(s.name)}${s.extra ? ` <em>${esc(s.extra)}</em>` : ""}</span><i></i><b>${s.price ? esc(s.price) + (s.short ? esc(s.short) : "") : "Ask"}</b></p>`).join("");
  $("#rateDetails").innerHTML = S.services.map((s, i) => `
    <article class="price-tag reveal" style="--tilt:${[-2, 1.5, -1][i % 3]}deg">
      <div class="pt-card">
        <img class="pt-bg" src="assets/ui/price-tag.webp" alt="" aria-hidden="true" loading="lazy">
        <div class="pt-inner">
          <h3>${esc(s.name)}${s.extra ? `<span class="pt-extra">${esc(s.extra)}</span>` : ""}</h3>
          <p class="pt-price">${s.price ? `<small>from</small> ${esc(s.price)} <small>${esc(s.unit)}</small>` : "Ask for a quote"}</p>
          <p class="pt-items">${s.items.map(esc).join(" · ")}</p>
        </div>
      </div>
      <a class="plate plate-red" href="${wa(`Hi Vinay! I'm interested in ${s.name}${s.extra ? " " + s.extra : ""} editing.`)}"${c.whatsapp ? ' target="_blank" rel="noopener"' : ""}>Order now</a>
    </article>`).join("");

  /* ---------- Receipt ---------- */
  $("#receiptBox").innerHTML = `
    <div class="receipt-head"><strong>VINAY'S STORE</strong>Est. 2024 · Open 24/7<br>Bill no. 0001</div>
    ${S.receipt.map(r => `<div class="receipt-row"><span class="w">${esc(r.when)}</span><span>${esc(r.what)}</span><span class="p">${esc(r.price)}</span></div>`).join("")}
    <div class="receipt-sub"><p><span>PAID FOR WITH EDITS:</span></p>
      ${S.bought.map(b => `<p><span>✓ ${esc(b)}</span><span>DONE</span></p>`).join("")}</div>
    <div class="receipt-total"><span>TOTAL</span><span>SELF-MADE</span></div>
    <p class="receipt-foot">Dhanyavaad! Visit again.</p>
    <div class="barcode" aria-hidden="true"></div>`;

  /* ---------- Reviews ---------- */
  const initials = n => n.replace(/^Dr\.?\s+/i, "").split(/\s+/).map(w => w[0]).slice(0, 2).join("");
  $("#clientList").innerHTML = (S.clients || []).map((cl, i) => `
    <a class="client" href="${esc(cl.url)}" target="_blank" rel="noopener" style="--tilt:${[-3, 2, -1.5, 2.5, -2][i % 5]}deg">
      <img class="vc-bg" src="assets/ui/visiting-card.webp" alt="" aria-hidden="true" loading="lazy">
      <span class="vc-inner">
        <span class="ring">${cl.photo ? `<img class="ring-photo" src="${esc(cl.photo)}" alt="">` : `<span class="ring-photo ring-initials">${esc(initials(cl.name))}</span>`}<img class="ring-frame" src="assets/ui/photo-ring.webp" alt=""></span>
        <strong>${esc(cl.name)}</strong>
        <small><b>${esc(cl.platform)} ↗</b>${cl.handle ? esc(cl.handle) : ""}</small>
        ${cl.work ? `<span class="client-work">${esc(cl.work)}</span>` : ""}
        ${cl.stat ? `<span class="client-stat">${esc(cl.stat)}</span>` : ""}
      </span>
    </a>`).join("");
  $("#reviewList").innerHTML = (S.reviews || []).map(r => `
    <article class="review">
      <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
      <blockquote>“${esc(r.text)}”</blockquote>
      <footer><span class="avatar">${r.photo ? `<img src="${esc(r.photo)}" alt="">` : esc(initials(r.name))}</span>
        <div><strong>${esc(r.name)}</strong><small>${esc(r.role || "")}</small></div></footer>
    </article>`).join("");
  $("#year").textContent = new Date().getFullYear();

  /* =========================================================
     THE SHOP SCROLL STORY
     ========================================================= */
  if (!window.gsap) { $("#inside").style.clipPath = "none"; return; }
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const stage = $("#stage"), store = $("#store"), door = $("#door"), inside = $("#inside");
  const panels = [...document.querySelectorAll(".panel")];

  // Door geometry (fractions of the store image)
  const DOOR = { l: .4081, r: .5985, t: .3848, b: .7682 };
  const zoom = () => {
    const W = store.offsetWidth, H = store.offsetHeight;
    const vw = stage.clientWidth, vh = stage.clientHeight;
    const dw = (DOOR.r - DOOR.l) * W, dh = (DOOR.b - DOOR.t) * H;
    const cx = store.offsetLeft + ((DOOR.l + DOOR.r) / 2) * W;
    const cy = store.offsetTop + ((DOOR.t + DOOR.b) / 2) * H;
    return { s: Math.max(vw / dw, vh / dh) * 1.15, x: vw / 2 - cx, y: vh / 2 - cy };
  };

  // Show the inside only through the door opening
  const clipToDoor = () => {
    const r = door.getBoundingClientRect(), s = stage.getBoundingClientRect();
    const t = r.top - s.top, l = r.left - s.left, b = s.bottom - r.bottom, rt = s.right - r.right;
    inside.style.clipPath = (t <= 0 && l <= 0 && b <= 0 && rt <= 0)
      ? "none"
      : `inset(${Math.max(t, 0)}px ${Math.max(rt, 0)}px ${Math.max(b, 0)}px ${Math.max(l, 0)}px)`;
  };

  gsap.set(panels, { autoAlpha: 0 });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: stage, start: "top top",
      end: () => "+=" + innerHeight * tl.duration() * .7,
      pin: true, scrub: .6, invalidateOnRefresh: true, anticipatePin: 1,
      onRefresh: clipToDoor
    },
    onUpdate: clipToDoor
  });

  // 1. The store rises up, the sky drifts away
  tl.fromTo(store, { y: () => innerHeight * .75 }, { y: 0, duration: 1.6, ease: "power1.out" }, 0)
    .fromTo("#pole", { y: () => innerHeight * .6 }, { y: 0, duration: 1.6, ease: "power1.out" }, 0)
    .fromTo(".ground", { yPercent: 100 }, { yPercent: 0, duration: .8 }, .4)
    .to("#intro", { y: () => -innerHeight * .45, autoAlpha: 0, duration: 1 }, 0)
    .to(".c1", { y: () => -innerHeight * .35, duration: 2 }, 0)
    .to(".c2", { y: () => -innerHeight * .25, duration: 2 }, 0)
    .to(".c3", { y: () => -innerHeight * .5, duration: 2 }, 0)
    .to(".c4", { y: () => -innerHeight * .4, duration: 2 }, 0)

  // 2. Pause on the shop front, then the shutter rolls up
    .to("#shutter", { yPercent: -100, duration: .9, ease: "power2.in" }, 2.1)

  // 3. Walk in through the door
    .to(store, { scale: () => zoom().s, x: () => zoom().x, y: () => zoom().y, duration: 1.4, ease: "power2.in" }, 3.1)
    .to("#pole", { autoAlpha: 0, duration: .5 }, 3.1)
    .fromTo(".inside-bg", { scale: 1.35 }, { scale: 1, duration: 1.4, ease: "power2.out" }, 3.1)
    .set("#street", { autoAlpha: 0 }, 4.5)

  // 4. Aisles. Each aisle's videos come in pairs: on scroll the screens slide out
  //    to the left and the next pair slides in from the right. When the aisle
  //    changes, its board swings up and away and the next board drops in.
  const OUT = () => -innerWidth * 1.1, IN = () => innerWidth * 1.1;
  const steps = [];
  panels.forEach(p => p.querySelectorAll(".set").forEach(s => steps.push({ p, s, board: p.querySelector(".cat-board"), foot: p.querySelector(".panel-foot") })));

  // First aisle drops in
  const first = steps[0];
  tl.to(first.p, { autoAlpha: 1, duration: .01 }, 4.2)
    .fromTo(first.board, { yPercent: -130, rotation: 14 }, { yPercent: 0, rotation: 0, duration: .7, ease: "back.out(1.6)" }, 4.2)
    .fromTo(first.s, { x: IN }, { x: 0, duration: .8, ease: "power2.out" }, 4.3)
    .fromTo(first.foot, { autoAlpha: 0 }, { autoAlpha: 1, duration: .3 }, 4.8);

  let t = 5.6;
  steps.forEach((cur, k) => {
    const next = steps[k + 1];
    if (!next) return;
    // current pair slides away to the left
    tl.fromTo(cur.s, { x: 0 }, { x: OUT, duration: 1, ease: "power2.in", immediateRender: false }, t);
    if (next.p === cur.p) {
      // same aisle: next pair slides in from the right
      tl.fromTo(next.s, { x: IN }, { x: 0, duration: 1, ease: "power2.out" }, t + .45);
      t += 1.9;
    } else {
      // new aisle: board swings up and out, next board drops in
      tl.fromTo(cur.board, { yPercent: 0, rotation: 0 }, { yPercent: -140, rotation: -16, duration: .8, ease: "power2.in", immediateRender: false }, t + .1)
        .fromTo(cur.foot, { autoAlpha: 1 }, { autoAlpha: 0, duration: .3, immediateRender: false }, t)
        .set(next.p, { autoAlpha: 1 }, t + .5)
        .fromTo(next.board, { yPercent: -140, rotation: 16 }, { yPercent: 0, rotation: 0, duration: .9, ease: "back.out(1.6)" }, t + .7)
        .fromTo(next.s, { x: IN }, { x: 0, duration: 1, ease: "power2.out" }, t + .75)
        .fromTo(next.foot, { autoAlpha: 0 }, { autoAlpha: 1, duration: .3 }, t + 1.4)
        .set(cur.p, { autoAlpha: 0 }, t + 1.1);
      t += 2.3;
    }
  });
  tl.to({}, { duration: .5 }, t); // small hold on the last screen

  // Little swinging things
  if (!reduce) {
    document.querySelectorAll(".swing").forEach((el, i) =>
      gsap.fromTo(el, { rotation: -4 }, { rotation: 4, duration: 1.4 + i * .2, repeat: -1, yoyo: true, ease: "sine.inOut" }));
    gsap.to(".cloud", { x: "+=40", duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: .8 });
  }

  /* ---------- Reveal on scroll for the rest of the page ---------- */
  document.querySelectorAll(".reveal").forEach(el =>
    gsap.from(el, { y: 50, autoAlpha: 0, duration: .8, ease: "power3.out", clearProps: "transform", scrollTrigger: { trigger: el, start: "top 88%" } }));
  gsap.from(".client", { y: 40, autoAlpha: 0, duration: .6, stagger: .08, ease: "back.out(1.6)", clearProps: "transform", scrollTrigger: { trigger: "#clientList", start: "top 90%" } });
  if (S.reviews && S.reviews.length) gsap.from(".review", { y: 50, autoAlpha: 0, duration: .7, stagger: .1, ease: "back.out(1.4)", scrollTrigger: { trigger: "#reviewList", start: "top 88%" } });

  addEventListener("load", () => ScrollTrigger.refresh());
})();
