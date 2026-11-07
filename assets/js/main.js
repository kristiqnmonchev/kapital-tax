/* =========================================================
   Kapital Tax — интерактивност и анимации
   ========================================================= */

/* --- Настройки на фирмата (сменете с реалните данни) --- */
const SITE = {
  phone: "+359 88 123 4567",
  phoneHref: "+359881234567",
  email: "office@kapitaltax.bg",
  address: "бул. „Витоша“ 100, ет. 4, София 1000",
  // Ако използвате Formspree / собствен бекенд, поставете URL тук.
  // Празно = формата отваря имейл клиента с попълненото запитване.
  formEndpoint: ""
};

/* --- Икони (Lucide-style, inline SVG) --- */
const ICONS = {
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  up: '<path d="m18 15-6-6-6 6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  calc: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M8 6h8M16 14v4M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01"/>',
  receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 17.5v-11"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  briefcase: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  quote: '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
  building: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  sparkle: '<path d="M9.94 14.06 4 20M12 2l1.9 5.8L20 10l-6.1 2.2L12 18l-1.9-5.8L4 10l6.1-2.2Z"/>',
  scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1ZM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
  bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>',
  smartphone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  bank: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l8 5H4Z"/>',
  calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  euro: '<path d="M4 10h12M4 14h9M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  instagram: '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>'
};
const icon = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ""}</svg>`;

/* --- Хедър и футър (общи за всички страници) --- */
const NAV = [
  ["index.html", "Начало"],
  ["uslugi.html", "Услуги"],
  ["ceni.html", "Цени"],
  ["za-nas.html", "За нас"],
  ["kontakti.html", "Контакти"]
];

function renderChrome() {
  const page = document.body.dataset.page;
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) {
    header.className = "header";
    header.innerHTML = `
      <div class="container">
        <a href="index.html" class="logo" aria-label="Kapital Tax — начало"><span class="logo-mark">K</span><span>Kapital <b>Tax</b></span></a>
        <nav class="nav" aria-label="Основна навигация">
          ${NAV.map(([h, t]) => `<a href="${h}"${h.startsWith(page) ? ' class="active" aria-current="page"' : ""}>${t}</a>`).join("")}
        </nav>
        <div class="header-cta">
          <a class="header-phone" href="tel:${SITE.phoneHref}">${icon("phone")}${SITE.phone}</a>
          <a href="kontakti.html" class="btn btn--primary btn--sm">Безплатна консултация</a>
          <button class="burger" aria-label="Меню" aria-expanded="false"><span></span><span></span><span></span></button>
        </div>
      </div>`;
  }
  if (footer) {
    footer.className = "footer";
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <a href="index.html" class="logo"><span class="logo-mark">K</span><span>Kapital <b>Tax</b></span></a>
            <p>Пълно счетоводно и данъчно обслужване за фирми и свободни професии. Точност, коректност и спокойствие — всеки месец.</p>
            <div class="socials">
              <a href="#" aria-label="LinkedIn">${icon("linkedin")}</a>
              <a href="#" aria-label="Facebook">${icon("facebook")}</a>
              <a href="#" aria-label="Instagram">${icon("instagram")}</a>
            </div>
          </div>
          <div>
            <h4>Навигация</h4>
            <ul>${NAV.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Услуги</h4>
            <ul>
              <li><a href="uslugi.html#schetovodstvo">Счетоводство</a></li>
              <li><a href="uslugi.html#danaci">Данъчни консултации</a></li>
              <li><a href="uslugi.html#trz">ТРЗ и Личен състав</a></li>
              <li><a href="uslugi.html#fakturirane">Онлайн фактуриране</a></li>
              <li><a href="uslugi.html#sklad">Склад и наличности</a></li>
              <li><a href="uslugi.html#registracia">Регистрация на фирма</a></li>
              <li><a href="uslugi.html#otcheti">Годишно приключване</a></li>
            </ul>
          </div>
          <div>
            <h4>Контакти</h4>
            <ul>
              <li><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></li>
              <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
              <li>${SITE.address}</li>
              <li>Пон – Пет: 9:00 – 18:00</li>
            </ul>
          </div>
        </div>
        <div class="footer-big" aria-hidden="true">KAPITAL TAX</div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Kapital Tax. Всички права запазени.</span>
          <span><a href="#">Политика за поверителност</a> · <a href="#">Бисквитки</a></span>
        </div>
      </div>`;
  }
  // Общи елементи
  document.body.insertAdjacentHTML("afterbegin", `<div class="progress"></div><div class="cursor-glow" aria-hidden="true"></div>`);
  document.body.insertAdjacentHTML("beforeend", `<button class="back-top" aria-label="Към началото">${icon("up")}</button>`);
}

/* --- Попълване на икони и контактни данни --- */
function hydrate() {
  document.querySelectorAll("[data-icon]").forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
  document.querySelectorAll("[data-site]").forEach((el) => {
    const k = el.dataset.site;
    el.textContent = SITE[k];
  });
  document.querySelectorAll("[data-site-link]").forEach((el) => {
    el.href = el.dataset.siteLink === "phone" ? `tel:${SITE.phoneHref}` : `mailto:${SITE.email}`;
  });
}

/* --- Хедър: скрол, прогрес, мобилно меню --- */
function headerFx() {
  const header = document.querySelector(".header");
  const bar = document.querySelector(".progress");
  const top = document.querySelector(".back-top");
  const onScroll = () => {
    const y = window.scrollY;
    header && header.classList.toggle("scrolled", y > 20);
    const h = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    top && top.classList.toggle("show", y > 700);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  top && top.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  const burger = document.querySelector(".burger");
  if (burger) {
    burger.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open);
    });
    document.querySelectorAll(".nav a").forEach((a) => a.addEventListener("click", () => document.body.classList.remove("menu-open")));
  }
}

/* --- Scroll reveal --- */
function revealFx() {
  const els = document.querySelectorAll(".reveal, [data-reveal-group]");
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
  // Каскадно забавяне за деца в група
  document.querySelectorAll("[data-stagger]").forEach((g) => {
    [...g.children].forEach((c, i) => { c.classList.add("reveal"); c.style.setProperty("--d", `${i * 0.1}s`); });
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal, [data-reveal-group]").forEach((e) => io.observe(e));
}

/* --- Броячи --- */
function counters() {
  const els = document.querySelectorAll("[data-count]");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, end = parseFloat(el.dataset.count), dur = 2000, t0 = performance.now();
      const dec = (el.dataset.count.split(".")[1] || "").length;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1), v = end * (1 - Math.pow(1 - p, 4));
        el.textContent = v.toLocaleString("bg-BG", { minimumFractionDigits: dec, maximumFractionDigits: dec });
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach((e) => io.observe(e));
}

/* --- Мишка: светлина по картите, бутоните, 3D наклон, cursor glow --- */
function pointerFx() {
  if (matchMedia("(hover: none)").matches) return;
  const glow = document.querySelector(".cursor-glow");
  addEventListener("pointermove", (e) => { if (glow) { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; } }, { passive: true });

  document.querySelectorAll(".card, .btn--primary").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100 + "%", y = ((e.clientY - r.top) / r.height) * 100 + "%";
      el.style.setProperty("--mx", x); el.style.setProperty("--my", y);
      el.style.setProperty("--bx", x); el.style.setProperty("--by", y);
    });
  });

  document.querySelectorAll("[data-tilt]").forEach((el) => {
    const wrap = el.parentElement;
    wrap.addEventListener("pointermove", (e) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    wrap.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });

  // Магнитни бутони
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });

  // Паралакс на блобовете
  const blobs = document.querySelectorAll(".hero-bg .blob");
  if (blobs.length) addEventListener("scroll", () => {
    const y = scrollY;
    blobs.forEach((b, i) => { b.style.translate = `0 ${y * (0.15 + i * 0.08)}px`; });
  }, { passive: true });
}

/* --- Отзиви (слайдер) --- */
function slider() {
  const wrap = document.querySelector(".testi-wrap");
  if (!wrap) return;
  const track = wrap.querySelector(".testi-track");
  const slides = track.children.length;
  const dots = document.querySelector(".dots");
  let i = 0, timer;
  dots.innerHTML = Array.from({ length: slides }, (_, k) => `<i data-k="${k}"></i>`).join("");
  const go = (n) => {
    i = (n + slides) % slides;
    track.style.transform = `translateX(-${i * 100}%)`;
    [...dots.children].forEach((d, k) => d.classList.toggle("on", k === i));
  };
  const auto = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 6500); };
  document.querySelector("[data-prev]").onclick = () => { go(i - 1); auto(); };
  document.querySelector("[data-next]").onclick = () => { go(i + 1); auto(); };
  dots.onclick = (e) => { if (e.target.dataset.k) { go(+e.target.dataset.k); auto(); } };
  // swipe
  let sx = null;
  wrap.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
  wrap.addEventListener("touchend", (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) { go(i + (dx < 0 ? 1 : -1)); auto(); }
    sx = null;
  });
  go(0); auto();
}

/* --- FAQ --- */
function faq() {
  document.querySelectorAll(".faq-q").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.parentElement, open = item.classList.contains("open");
      item.parentElement.querySelectorAll(".faq-item.open").forEach((o) => { o.classList.remove("open"); o.querySelector(".faq-q").setAttribute("aria-expanded", "false"); });
      if (!open) { item.classList.add("open"); q.setAttribute("aria-expanded", "true"); }
    });
  });
}

/* --- Табове (фактури / склад) --- */
function platformTabs() {
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const nav = root.querySelector(".ptabs-nav"), pill = nav.querySelector(".pill");
    const btns = [...nav.querySelectorAll("button")], panels = [...root.querySelectorAll(".ppanel")];
    let cur = 0, timer, seen = false;
    const show = (i) => {
      cur = i;
      btns.forEach((b, k) => { b.classList.toggle("on", k === i); b.setAttribute("aria-selected", k === i); });
      panels.forEach((p, k) => {
        p.classList.toggle("on", k === i);
        p.classList.remove("in-view");
        if (k === i && seen) requestAnimationFrame(() => requestAnimationFrame(() => p.classList.add("in-view")));
      });
      const b = btns[i];
      pill.style.width = b.offsetWidth + "px";
      pill.style.transform = `translateX(${b.offsetLeft}px)`;
    };
    const auto = () => { clearInterval(timer); if (matchMedia("(max-width: 920px), (hover: none)").matches) return; timer = setInterval(() => show((cur + 1) % btns.length), 8000); };
    btns.forEach((b, k) => b.addEventListener("click", () => { show(k); auto(); }));
    root.addEventListener("pointerenter", () => clearInterval(timer));
    root.addEventListener("pointerleave", auto);
    new IntersectionObserver((es, io) => es.forEach((e) => {
      if (e.isIntersecting) { seen = true; show(cur); auto(); io.disconnect(); }
    }), { threshold: 0.25 }).observe(root);
    requestAnimationFrame(() => show(0));
    addEventListener("resize", () => show(cur));
  });
}

/* --- Цени: месечно/годишно --- */
function pricing() {
  const t = document.querySelector(".toggle");
  if (!t) return;
  const pill = t.querySelector(".pill"), btns = t.querySelectorAll("button");
  const set = (b) => {
    btns.forEach((x) => x.classList.toggle("on", x === b));
    pill.style.width = b.offsetWidth + "px";
    pill.style.transform = `translateX(${b.offsetLeft - 6}px)`;
    const yearly = b.dataset.period === "year";
    document.querySelectorAll(".price .val").forEach((v) => {
      v.classList.add("flip");
      setTimeout(() => {
        const m = +v.dataset.month;
        v.textContent = yearly ? Math.round(m * 0.85) : m;
        v.classList.remove("flip");
      }, 200);
    });
  };
  btns.forEach((b) => b.addEventListener("click", () => set(b)));
  requestAnimationFrame(() => set(t.querySelector("button.on") || btns[0]));
  addEventListener("resize", () => set(t.querySelector("button.on")));
}

/* --- Услуги: активен таб при скрол --- */
function svcNav() {
  const nav = document.querySelector(".svc-nav");
  if (!nav) return;
  const links = [...nav.querySelectorAll("a")];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) links.forEach((l) => l.classList.toggle("on", l.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((l) => { const s = document.querySelector(l.getAttribute("href")); s && io.observe(s); });
}

/* --- Работно време: отворено/затворено сега --- */
function liveHours() {
  const el = document.querySelector("[data-live]");
  if (!el) return;
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Sofia" }));
  const d = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
  const open = d >= 1 && d <= 5 && h >= 9 && h < 18;
  el.querySelector(".live").classList.toggle("closed", !open);
  el.querySelector("[data-live-text]").textContent = open ? "В момента сме отворени" : "В момента сме затворени";
}

/* --- Контактна форма --- */
function contactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  // Предварително избрана услуга от URL (?usluga=...)
  const pre = new URLSearchParams(location.search).get("usluga");
  if (pre) { const opt = form.querySelector(`select[name="service"] option[value="${CSS.escape(pre)}"]`); if (opt) opt.selected = true; }

  const rules = {
    name: (v) => v.trim().length >= 2 || "Моля, въведете име.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Невалиден имейл адрес.",
    phone: (v) => !v.trim() || /^[+\d][\d\s\-()]{6,}$/.test(v.trim()) || "Невалиден телефонен номер.",
    service: (v) => !!v || "Изберете услуга.",
    message: (v) => v.trim().length >= 10 || "Опишете накратко запитването (мин. 10 символа)."
  };
  const check = (el) => {
    const rule = rules[el.name];
    if (!rule) return true;
    const res = rule(el.value), field = el.closest(".field");
    field.classList.toggle("error", res !== true);
    field.querySelector(".err").textContent = res === true ? "" : res;
    return res === true;
  };
  form.querySelectorAll("input, select, textarea").forEach((el) => {
    el.addEventListener("blur", () => check(el));
    el.addEventListener("input", () => el.closest(".field")?.classList.contains("error") && check(el));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.website.value) return; // honeypot срещу спам
    const ok = [...form.querySelectorAll("[name]")].map(check).every(Boolean);
    const consent = form.querySelector("[name=consent]");
    if (!consent.checked) { consent.closest(".consent").animate([{ transform: "translateX(0)" }, { transform: "translateX(-8px)" }, { transform: "translateX(8px)" }, { transform: "translateX(0)" }], { duration: 300 }); }
    if (!ok || !consent.checked) { form.querySelector(".error input, .error select, .error textarea")?.focus(); return; }

    const btn = form.querySelector("button[type=submit]");
    btn.classList.add("loading"); btn.disabled = true;
    const data = Object.fromEntries(new FormData(form));
    data.type = [...form.querySelectorAll("[name=type]:checked")].map((x) => x.value).join(", ");

    try {
      if (SITE.formEndpoint) {
        const r = await fetch(SITE.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error("send failed");
      } else {
        const body = `Име: ${data.name}\nФирма: ${data.company || "-"}\nИмейл: ${data.email}\nТелефон: ${data.phone || "-"}\nТип: ${data.type || "-"}\nУслуга: ${data.service}\n\n${data.message}`;
        location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Запитване от сайта — " + data.service)}&body=${encodeURIComponent(body)}`;
        await new Promise((r) => setTimeout(r, 700));
      }
      document.querySelector(".form-success").classList.add("show");
      form.reset();
    } catch (err) {
      alert(`Възникна грешка при изпращането. Моля, свържете се с нас на ${SITE.email} или ${SITE.phone}.`);
    } finally {
      btn.classList.remove("loading"); btn.disabled = false;
    }
  });
  document.querySelector("[data-reset-form]")?.addEventListener("click", () => document.querySelector(".form-success").classList.remove("show"));
}

/* --- Старт --- */
renderChrome();
hydrate();
headerFx();
revealFx();
counters();
pointerFx();
slider();
faq();
pricing();
platformTabs();
svcNav();
liveHours();
contactForm();
addEventListener("load", () => document.querySelector(".loader")?.classList.add("done"));
setTimeout(() => document.querySelector(".loader")?.classList.add("done"), 2500);
