const S = window.SITE;
const $ = (s, r = document) => r.querySelector(s);

/* ---------- Data ---------- */
const DESTINATIONS = [
  ["munnar", "Munnar", "Rolling tea estates, mist and cool air", "hills"],
  ["alleppey", "Alleppey", "Houseboats on the famous backwaters", "backwaters"],
  ["thekkady", "Thekkady", "Periyar lake, wildlife and spice gardens", "wildlife"],
  ["kochi", "Kochi", "Fishing nets, heritage and seafood", "culture"],
  ["kovalam", "Kovalam", "Crescent beaches and lighthouse sunsets", "beaches"],
  ["varkala", "Varkala", "Cliff-top cafes above the Arabian Sea", "beaches"],
  ["wayanad", "Wayanad", "Forests, waterfalls and caves", "hills"],
  ["vagamon", "Vagamon", "Pine forests and rolling meadows", "hills"],
  ["kumarakom", "Kumarakom", "Bird sanctuary and quiet lake resorts", "backwaters"],
  ["fort", "Bekal", "A seaside fort in northern Kerala", "culture"]
];
const PACKAGES = window.PACKAGES;
const FILTERS = ["all", "backwaters", "hills", "beaches", "wildlife", "culture", "wellness", "honeymoon", "family"];
const GALLERY = ["g_houseboat2","g_mist","g_hills","g_fortkochi","g_varkala","g_kovalam","g_paddy","g_theyyam","g_mohini","g_topstation","g_illikkal","g_marari","g_kurinji","g_palms","g_ramakkal","g_parunthu","g_kalari","g_meenmutty","g_alappuzha","g_teagarden","alleppey","munnar2","falls2","kathakali","elephant","spices","sadya","vallamkali","canoe","beach2","hill2","munnar","kochi","kumarakom"];
const EXPERIENCES = [
  ["kathakali", "Kathakali & Culture", "Classical dance-drama with vivid costumes"],
  ["ayurveda", "Ayurveda", "Authentic therapies in peaceful settings"],
  ["spices", "Spice Trails", "Cardamom, pepper and cinnamon gardens"],
  ["sadya", "Kerala Sadya", "A banana-leaf feast of 20+ dishes"],
  ["vallamkali", "Snake Boat Races", "Thrilling Onam-season regattas"],
  ["elephant", "Temple Festivals", "Pooram processions with caparisoned elephants"]
];
const REVIEWS = [
  ["Anita & Rohit", "Mumbai", "Our houseboat night was the highlight. Everything was arranged smoothly."],
  ["The Menon Family", "Bengaluru", "Great drivers, lovely hotels in Munnar and Thekkady. Kids loved it."],
  ["Sarah K.", "London", "Friendly, quick on WhatsApp and flexible with changes. Highly recommend."]
];

/* ---------- Render ---------- */
const inr = n => "₹" + n.toLocaleString("en-IN");
const waLink = msg => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`;

$("#heroSlides").innerHTML = ["hero1","hero2","hero3","kovalam","h_vembanad","h_munnar_tea","h_kochi_nets","h_varkala","h_munnar_mist","h_topstation","h_cherai","h_houseboat","h_marari","h_vagamon"].map((s,i)=>`<div class="slide ${i?"":"on"}">${imgTag(s)}</div>`).join("");

$("#destGrid").innerHTML = DESTINATIONS.map(([s,n,d],i)=>`
  <a class="dest reveal" href="destination.html?id=${s}" style="--d:${i*60}ms" aria-label="Explore ${n}">${imgTag(s)}<div class="cap"><h3>${n}</h3><p>${d}</p><span class="more">Explore &rarr;</span></div></a>`).join("");

function renderPackages(f = "all") {
  $("#pkgGrid").innerHTML = PACKAGES.filter(p => f === "all" || p.cat === f).map(p => `
  <article class="pkg">
    <div class="pimg">${imgTag(p.img)}<span class="badge">${p.days ? `${p.days}N / ${p.days+1}D` : "Day trip"}</span></div>
    <div class="pbody"><h3>${p.title}</h3><p class="route">${p.route}</p>
      <ul>${p.inc.map(x=>`<li>${x}</li>`).join("")}</ul>
      <div class="pfoot"><div><small>from</small><strong>${inr(p.price)}</strong><small> /person</small></div>
        <a class="btn btn-sm" target="_blank" rel="noopener" href="${waLink(`Hi, I am interested in the "${p.title}" package. Please share details.`)}">Enquire</a></div>
      <a class="btn btn-details" href="package.html?id=${p.id}">View Details &amp; Tour Plan &rarr;</a></div>
  </article>`).join("");
  wireImages($("#pkgGrid"));
}
$("#filters").innerHTML = FILTERS.map((f,i)=>`<button class="chip ${i?"":"on"}" data-f="${f}">${f}</button>`).join("");
$("#filters").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  document.querySelectorAll("#filters .chip").forEach(c => c.classList.toggle("on", c === b));
  renderPackages(b.dataset.f);
});
renderPackages();

$("#expGrid").innerHTML = EXPERIENCES.map(([s,t,d])=>`<div class="exp reveal">${imgTag(s)}<div class="cap"><h3>${t}</h3><p>${d}</p></div></div>`).join("");
$("#galleryGrid").innerHTML = GALLERY.map(s=>`<button class="gi" data-slug="${s}">${imgTag(s)}</button>`).join("");
$("#reviews").innerHTML = REVIEWS.map(([n,c,t])=>`<blockquote class="reveal"><p>“${t}”</p><footer>${n} · ${c}</footer></blockquote>`).join("");
wireImages();

/* ---------- Hero slider ---------- */
(function () {
  const slides = document.querySelectorAll("#heroSlides .slide"); let i = 0;
  setInterval(() => { slides[i].classList.remove("on"); i = (i + 1) % slides.length; slides[i].classList.add("on"); }, 5500);
})();

/* ---------- Lightbox ---------- */
const lb = $("#lightbox");
let lbIndex = 0;
function openLb(i) { lbIndex = (i + GALLERY.length) % GALLERY.length; const im = IMAGES[GALLERY[lbIndex]];
  const el = $("img", lb); el.src = `assets/images/${GALLERY[lbIndex]}.jpg`;
  $("#lbCap").textContent = im.alt; lb.classList.add("open"); }
$("#galleryGrid").addEventListener("click", e => { const b = e.target.closest(".gi"); if (b) openLb(GALLERY.indexOf(b.dataset.slug)); });
$("#lbNext").onclick = () => openLb(lbIndex + 1); $("#lbPrev").onclick = () => openLb(lbIndex - 1);
$("#lbClose").onclick = () => lb.classList.remove("open");
lb.addEventListener("click", e => { if (e.target === lb) lb.classList.remove("open"); });
addEventListener("keydown", e => { if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") lb.classList.remove("open"); if (e.key === "ArrowRight") openLb(lbIndex + 1); if (e.key === "ArrowLeft") openLb(lbIndex - 1); });

/* ---------- Trip planner -> WhatsApp ---------- */
$("#planner").addEventListener("submit", e => {
  e.preventDefault(); const f = new FormData(e.target);
  const msg = `Hello Lovedale Holidays, trip enquiry:\nName: ${f.get("name")}\nInterest: ${f.get("interest")}\nTravellers: ${f.get("pax")}\nTravel date: ${f.get("date") || "flexible"}\nNights: ${f.get("nights")}`;
  window.open(waLink(msg), "_blank");
});
$("#nightsOut").textContent = $("#nights").value;
$("#nights").addEventListener("input", e => $("#nightsOut").textContent = e.target.value);

/* ---------- Counters + reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return; en.target.classList.add("in");
  if (en.target.dataset.count) { const end = +en.target.dataset.count; let n = 0; const t = setInterval(() => { n += Math.ceil(end / 40); if (n >= end) { n = end; clearInterval(t); } en.target.textContent = n.toLocaleString("en-IN") + "+"; }, 30); }
  io.unobserve(en.target);
}), { threshold: .2 });
document.querySelectorAll(".reveal, [data-count]").forEach(el => io.observe(el));
