/* =========================================================
   Kapital Tax — екран с парола преди показване на сайта
   Забележка: това е защита само в браузъра (за преглед/демо),
   не е истинска сигурност — кодът се вижда в изходния код.
   ========================================================= */
(function () {
  var PIN = "0910";
  var KEY = "kt-unlocked";
  var unlocked = false;
  try { unlocked = sessionStorage.getItem(KEY) === "1"; } catch (e) {}
  if (unlocked) return;

  var root = document.documentElement;
  root.classList.add("locked");
  var st = document.createElement("style");
  st.textContent =
    "html.locked body>*:not(.gate){visibility:hidden!important}" +
    "html.locked body{overflow:hidden}" +
    ".gate{position:fixed;inset:0;z-index:2000;display:grid;place-items:center;padding:20px;background:#fff;overflow:hidden;font-family:Manrope,system-ui,sans-serif;transition:opacity .6s cubic-bezier(.2,.8,.2,1),visibility .6s}" +
    ".gate.out{opacity:0;visibility:hidden}" +
    ".gate::before,.gate::after{content:'';position:absolute;border-radius:50%;filter:blur(70px);opacity:.5;pointer-events:none}" +
    ".gate::before{width:520px;height:520px;background:#c4b5fd;top:-180px;right:-140px;animation:gf 14s ease-in-out infinite}" +
    ".gate::after{width:420px;height:420px;background:#f0abfc;bottom:-160px;left:-140px;opacity:.35;animation:gf 18s ease-in-out infinite reverse}" +
    "@keyframes gf{50%{transform:translate(-50px,40px) scale(1.08)}}" +
    ".gate-box{position:relative;z-index:1;width:min(420px,100%);background:rgba(255,255,255,.85);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:28px;padding:44px 32px 36px;text-align:center;box-shadow:0 40px 90px -30px rgba(76,29,149,.45),0 0 0 1px #ebe6f7;animation:gin .8s cubic-bezier(.2,.8,.2,1) both}" +
    "@keyframes gin{from{opacity:0;transform:translateY(30px) scale(.97)}}" +
    ".gate-logo{width:64px;height:64px;margin:0 auto 20px;border-radius:20px;display:grid;place-items:center;color:#fff;font-weight:800;font-size:1.6rem;background:linear-gradient(135deg,#7c3aed,#a855f7 55%,#d946ef);box-shadow:0 14px 30px -10px rgba(124,58,237,.7)}" +
    ".gate h1{margin:0 0 6px;font-size:1.5rem;color:#160b2e;letter-spacing:-.02em}" +
    ".gate p{margin:0 0 26px;color:#6f6787;font-size:.98rem}" +
    ".gate-pins{display:flex;justify-content:center;gap:12px}" +
    ".gate-pins input{width:58px;height:66px;border-radius:16px;border:1.5px solid #ebe6f7;background:#f6f3ff;text-align:center;font:800 1.6rem Manrope,system-ui,sans-serif;color:#160b2e;outline:none;transition:border-color .25s,box-shadow .25s,background .25s,transform .25s;-webkit-text-security:disc}" +
    ".gate-pins input:focus{border-color:#7c3aed;background:#fff;box-shadow:0 0 0 5px rgba(124,58,237,.12);transform:translateY(-2px)}" +
    ".gate.err .gate-pins input{border-color:#e11d48;background:#fff1f3}" +
    ".gate.err .gate-pins{animation:gshake .4s}" +
    "@keyframes gshake{25%{transform:translateX(-10px)}75%{transform:translateX(10px)}}" +
    ".gate-msg{min-height:22px;margin-top:14px;font-size:.88rem;font-weight:600;color:#e11d48}" +
    ".gate.ok .gate-pins input{border-color:#22c55e;background:#f0fdf4}";
  document.head.appendChild(st);

  function build() {
    var g = document.createElement("div");
    g.className = "gate";
    g.setAttribute("role", "dialog");
    g.setAttribute("aria-modal", "true");
    g.setAttribute("aria-labelledby", "gate-title");
    g.innerHTML =
      '<form class="gate-box" autocomplete="off">' +
      '<div class="gate-logo">K</div>' +
      '<h1 id="gate-title">Kapital Tax</h1>' +
      "<p>Сайтът е в процес на разработка.<br>Въведете код за достъп.</p>" +
      '<div class="gate-pins">' +
      [0, 1, 2, 3].map(function (i) {
        return '<input inputmode="numeric" pattern="[0-9]*" aria-label="Цифра ' + (i + 1) + '">';
      }).join("") +
      "</div>" +
      '<div class="gate-msg" aria-live="polite"></div>' +
      "</form>";
    document.body.appendChild(g);

    var ins = [].slice.call(g.querySelectorAll("input"));
    var msg = g.querySelector(".gate-msg");
    ins[0].focus();

    function check() {
      var v = ins.map(function (i) { return i.value; }).join("");
      if (v.length < 4) return;
      if (v === PIN) {
        g.classList.add("ok");
        try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
        setTimeout(function () {
          root.classList.remove("locked");
          g.classList.add("out");
          setTimeout(function () { g.remove(); }, 700);
        }, 250);
      } else {
        g.classList.remove("err"); void g.offsetWidth; g.classList.add("err");
        msg.textContent = "Грешен код. Опитайте отново.";
        setTimeout(function () { ins.forEach(function (i) { i.value = ""; }); ins[0].focus(); }, 400);
      }
    }

    ins.forEach(function (inp, i) {
      inp.addEventListener("input", function () {
        g.classList.remove("err");
        msg.textContent = "";
        var d = inp.value.replace(/\D/g, "");
        if (d.length > 1) { // поставен код
          d.split("").slice(0, 4 - i).forEach(function (c, k) { ins[i + k].value = c; });
          ins[Math.min(i + d.length, 3)].focus();
        } else {
          inp.value = d;
          if (d && i < 3) ins[i + 1].focus();
        }
        check();
      });
      inp.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && !inp.value && i > 0) { ins[i - 1].value = ""; ins[i - 1].focus(); e.preventDefault(); }
        if (e.key === "ArrowLeft" && i > 0) ins[i - 1].focus();
        if (e.key === "ArrowRight" && i < 3) ins[i + 1].focus();
      });
      inp.addEventListener("paste", function (e) {
        var t = (e.clipboardData || window.clipboardData).getData("text").replace(/\D/g, "").slice(0, 4);
        if (!t) return;
        e.preventDefault();
        t.split("").forEach(function (c, k) { if (ins[k]) ins[k].value = c; });
        ins[Math.min(t.length, 3)].focus();
        check();
      });
    });
    g.querySelector("form").addEventListener("submit", function (e) { e.preventDefault(); check(); });
  }

  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();
