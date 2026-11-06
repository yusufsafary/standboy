// STANDBOY live board: read-only chain reads (RPC race), stands visual,
// copy buttons, wallet check. No wallet connection, no transactions.
const CONFIG = {
  nft: "0x6043a590F315B9fF44aD3b3298198f89b6b4b548",
  token: "0xC2515e15586183d4E8e1D3Ec9AA4d1Bb53107eDb",
  claim: "0x2caf4b66C2AF9bd18CcA0EAc139dA71B808fcFA2",
  maxSupply: 5000,
  perClaim: 250000,
};
const RPCS = [
  "https://bsc-dataseed1.binance.org",
  "https://bsc-dataseed-public.bnbchain.org",
  "https://bsc-mainnet.public.blastapi.io",
  "https://bsc-rpc.publicnode.com",
];
const SEL = {
  totalMinted: "0xa2309ff8",
  mintOpen: "0x24bbd049",
  totalClaimed: "0xd54ad2a1",
  claimOpen: "0x4b8bcb58",
  claimsRemaining: "0x754c463f",
  seatOf: "0xb9cd92c3",
  claimedById: "0x4c80ee12",
};
function fmt(n) { return n.toLocaleString("en-US"); }
async function rpcCall(to, data) {
  const body = JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_call", params: [{ to, data }, "latest"] });
  const tries = RPCS.map((url) =>
    fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body, signal: AbortSignal.timeout(5000) })
      .then((r) => r.json())
      .then((j) => {
        if (!j.result || j.result === "0x") throw new Error("empty");
        return BigInt(j.result);
      })
  );
  return Promise.any(tries);
}
function encAddr(a) { return "0x" + a.replace(/^0x/, "").toLowerCase().padStart(64, "0"); }
function encUint(n) { return "0x" + BigInt(n).toString(16).padStart(64, "0"); }

// Count-up tween untuk angka papan.
function tween(el, to, suffix) {
  if (!el) return;
  const from = parseInt((el.dataset.v || "0"), 10);
  el.dataset.v = String(to);
  if (from === to) { el.textContent = fmt(to) + (suffix || ""); return; }
  const t0 = performance.now(), dur = 700;
  function step(t) {
    const k = Math.min(1, (t - t0) / dur);
    el.textContent = fmt(Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)))) + (suffix || "");
    if (k < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
// Stadium wave melintasi tribun.
function doWave() {
  const el = document.getElementById("stands");
  if (!el || document.hidden) return;
  el.classList.remove("waving");
  void el.offsetWidth;
  el.classList.add("waving");
  setTimeout(() => el.classList.remove("waving"), 2400);
}
setInterval(doWave, 9000);

// Stands visual: 8 terrace rows x 60 seats; filled share follows minted count.
function drawStands(minted) {
  const el = document.getElementById("stands");
  if (!el) return;
  el.innerHTML = "";
  const rows = 8, cols = 60, total = rows * cols;
  const filled = Math.round((minted / CONFIG.maxSupply) * total);
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    const row = document.createElement("div");
    row.className = "srow";
    const standCls = ["n", "e", "s", "w"][Math.floor(r / 2)];
    for (let c = 0; c < cols; c++) {
      const s = document.createElement("span");
      s.className = "seat" + (idx < filled ? " " + standCls : " dim");
      s.style.setProperty("--c", c);
      row.appendChild(s);
      idx++;
    }
    el.appendChild(row);
  }
}
drawStands(0);

async function refresh() {
  try {
    const [minted, mOpen, claimed, cOpen, cLeft] = await Promise.all([
      rpcCall(CONFIG.nft, SEL.totalMinted),
      rpcCall(CONFIG.nft, SEL.mintOpen),
      rpcCall(CONFIG.claim, SEL.totalClaimed),
      rpcCall(CONFIG.claim, SEL.claimOpen),
      rpcCall(CONFIG.claim, SEL.claimsRemaining),
    ]);
    const m = Number(minted), cl = Number(claimed);
    const prevM = window.STANDBOY ? window.STANDBOY.minted : null;
    tween(document.getElementById("b-minted"), m);
    tween(document.getElementById("b-left"), CONFIG.maxSupply - m);
    tween(document.getElementById("b-claimed"), cl);
    document.getElementById("b-next").textContent = m >= CONFIG.maxSupply ? "FULL" : "Nº " + fmt(m + 1);
    window.__SB_MINTED = m;
    if (window.SB) { window.SB.setNext(m + 1); window.SB.setStands(m); }
    if (prevM !== null && m > prevM) {
      document.querySelectorAll(".bcell").forEach((c) => c.classList.add("flash"));
      setTimeout(() => document.querySelectorAll(".bcell").forEach((c) => c.classList.remove("flash")), 900);
      doWave();
    }
    document.getElementById("mint-status").textContent = mOpen === 1n ? "Mint is open" : "Opening soon";
    tween(document.getElementById("c-claimed"), cl);
    tween(document.getElementById("c-left"), Number(cLeft));
    document.getElementById("c-status").textContent = cOpen === 1n ? "OPEN" : "SOON";
    document.getElementById("strip-text").textContent =
      (mOpen === 1n ? "MINT IS LIVE" : "STANDS FILLING SOON") + " · FREE TO TAKE · ONE PER AGENT";
    drawStands(m);
    window.STANDBOY = { minted: m, claimed: cl };
  } catch (e) {
    // Chain not live yet or RPC unreachable: leave placeholders.
  }
}
refresh();
setInterval(refresh, 30000);
setTimeout(doWave, 1200);

// Scroll reveal untuk section.
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  document.querySelectorAll(".rv").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));
}

document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const src = document.getElementById(btn.getAttribute("data-copy"));
    if (!src) return;
    try {
      await navigator.clipboard.writeText(src.textContent.trim());
      const old = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(() => (btn.textContent = old), 1600);
    } catch (e) {}
  });
});

document.getElementById("check-btn").addEventListener("click", async () => {
  const input = document.getElementById("wallet-input").value.trim();
  const res = document.getElementById("check-res");
  if (!/^0x[0-9a-fA-F]{40}$/.test(input)) { res.textContent = "Enter a full wallet address."; return; }
  res.textContent = "Checking…";
  try {
    const seat = Number(await rpcCall(CONFIG.nft, SEL.seatOf.slice(0, 10) + encAddr(input).slice(2)));
    if (seat === 0) { res.textContent = "No spot yet for this wallet."; return; }
    const claimed = await rpcCall(CONFIG.claim, SEL.claimedById.slice(0, 10) + encUint(seat).slice(2));
    res.textContent = "Spot Nº " + fmt(seat) + (claimed === 1n ? " · BOY already claimed for this spot." : " · 250,000 BOY ready to claim.");
  } catch (e) {
    res.textContent = "Could not read the chain right now. Try again in a moment.";
  }
});

/* ===== v3: notice board, maskot bicara, find-a-spot, confetti, tabel tribun ===== */
(function () {
  var S = { minted: 0 };
  function fmt(n) { return n.toLocaleString("en-US"); }

  // notice board berganti
  var notes = [
    "Mint is free. It has always been free.",
    "One spot per agent. House rule.",
    "Holding a spot pays 250,000 BOY.",
    "Claims land straight in the project wallet.",
    "Four stands. 5,000 numbered spots."
  ];
  var nt = document.getElementById("notice-text"), ni = 0;
  if (nt && !reduced) setInterval(function () {
    nt.classList.add("fade");
    setTimeout(function () { ni = (ni + 1) % notes.length; nt.textContent = notes[ni]; nt.classList.remove("fade"); }, 360);
  }, 4200);

  // maskot bicara
  var mascot = document.getElementById("mascot"), bubble = document.getElementById("bubble");
  var lines = ["Pick a spot, any spot.", "Kop End is filling up nicely.", "Every spot pays 250,000 BOY.", "See you on the stand!", "Free means free. Zero. Nothing."];
  var li = 0, bTimer = null;
  if (mascot && bubble) mascot.addEventListener("click", function () {
    li = (li + 1) % lines.length;
    bubble.textContent = (li === 1 && lastNext) ? ("Spot Nº " + lastNext + " has your name on it.") : lines[li];
    bubble.classList.add("show");
    mascot.classList.remove("hop"); void mascot.offsetWidth; mascot.classList.add("hop");
    clearTimeout(bTimer); bTimer = setTimeout(function () { bubble.classList.remove("show"); }, 2400);
  });

  var lastNext = null;
  window.SB = { setNext: function (n) { lastNext = n; } };

  // tabel tribun
  window.SB.setStands = function (minted) {
    var bounds = [1250, 2500, 3750, 5000];
    for (var i = 0; i < 4; i++) {
      var lo = i === 0 ? 0 : bounds[i - 1];
      var f = Math.max(0, Math.min(1250, minted - lo));
      var cell = document.getElementById("st-" + i), bar = document.getElementById("sf-" + i);
      if (cell) cell.textContent = fmt(f) + " / 1,250";
      if (bar) bar.style.width = (f / 1250 * 100).toFixed(1) + "%";
    }
  };

  // find me a spot
  var fb = document.getElementById("findspot"), res = document.getElementById("spot-res");
  if (fb && res) fb.addEventListener("click", function () {
    var minted = (window.__SB_MINTED || 0);
    if (minted >= 5000) { res.textContent = "Sold out. Every seat has a name now."; return; }
    fb.disabled = true;
    var t0 = Date.now();
    var iv = setInterval(function () {
      var fake = minted + 1 + Math.floor(Math.random() * (5000 - minted));
      res.textContent = "Scanning the stand… Nº " + fmt(fake);
      if (Date.now() - t0 > 750) {
        clearInterval(iv);
        var pick = minted + 1 + Math.floor(Math.random() * (5000 - minted));
        res.textContent = "Spot Nº " + fmt(pick) + " is open. It could be yours.";
        fb.disabled = false;
      }
    }, 60);
  });

  // confetti saat copy
  var COLORS = ["#35d07f", "#ffc53d", "#ff6b4a", "#4ac3ff"];
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (reduced) return;
      var r = btn.getBoundingClientRect();
      for (var i = 0; i < 14; i++) {
        var bit = document.createElement("span");
        bit.className = "confetti-bit";
        bit.style.background = COLORS[i % 4];
        bit.style.left = (r.left + r.width / 2) + "px";
        bit.style.top = (r.top + window.scrollY) + "px";
        bit.style.position = "absolute";
        document.body.appendChild(bit);
        var dx = (Math.random() - 0.5) * 190, dy = -(30 + Math.random() * 90);
        bit.animate([
          { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
          { transform: "translate(" + dx + "px," + (dy + 150) + "px) rotate(" + (Math.random() * 340 - 170) + "deg)", opacity: 0 }
        ], { duration: 750 + Math.random() * 350, easing: "cubic-bezier(.22,1,.36,1)" }).onfinish = (function (el) { return function () { el.remove(); }; })(bit);
      }
    });
  });
})();
