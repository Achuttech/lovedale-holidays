/* Shared header, footer, floating WhatsApp button and phone/WhatsApp links.
   Everything reads window.SITE (js/site-config.js). */
(function () {
  const S = window.SITE;
  const wa = `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(S.whatsappMessage)}`;
  const page = location.pathname.split("/").pop() || "index.html";
  const link = (href, label) => `<a href="${href}" class="${page === href ? "active" : ""}">${label}</a>`;

  document.body.insertAdjacentHTML("afterbegin", `
  <header class="site-header" id="top">
    <div class="topbar"><div class="wrap">
      <span>Call or WhatsApp: ${S.hours}</span>
      <span><a href="tel:${S.phoneTel}">&#9742; ${S.phoneDisplay}</a> &nbsp;|&nbsp; <a href="tel:${S.phone2Tel}">${S.phone2Display}</a></span>
    </div></div>
    <nav class="wrap nav">
      <a class="brand" href="index.html" aria-label="${S.name}"><img src="assets/logo.jpeg" alt="${S.name} logo"></a>
      <button class="burger" aria-label="Menu" aria-expanded="false">&#9776;</button>
      <div class="links">
        ${link("index.html", "Home")}
        <a href="index.html#packages">Packages</a>
        <a href="index.html#destinations">Destinations</a>
        <a href="index.html#gallery">Gallery</a>
        ${link("contact.html", "Contact")}
        <a class="btn btn-sm" href="tel:${S.phoneTel}">Call Now</a>
      </div>
    </nav>
  </header>`);

  document.body.insertAdjacentHTML("beforeend", `
  <footer class="site-footer">
    <div class="wrap grid">
      <div><img class="flogo" src="assets/logo.jpeg" alt="${S.name}">
        <p>Handcrafted Kerala holidays - backwaters, tea hills, beaches, wildlife and culture.</p></div>
      <div><h4>Explore</h4>
        <a href="index.html#packages">Tour packages</a><a href="index.html#destinations">Destinations</a>
        <a href="index.html#gallery">Gallery</a><a href="contact.html">Contact</a><a href="terms.html">Terms &amp; Conditions</a></div>
      <div><h4>Contact</h4>
        <a href="tel:${S.phoneTel}">${S.phoneDisplay}</a>
        <a href="tel:${S.phone2Tel}">${S.phone2Display}</a>
        <a href="${wa}" target="_blank" rel="noopener">WhatsApp us</a>
        <span class="hours">&#128339; ${S.hours}</span><span>Please call or chat on WhatsApp during business hours.</span><span>${S.address}</span></div>
    </div>
    <div class="copy">&copy; <span id="yr"></span> ${S.name} &middot; ${S.domain}</div>
  </footer>
  <a class="wa-float" href="${wa}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
    <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff"><path d="M16 3C9 3 3.4 8.6 3.4 15.5c0 2.3.6 4.4 1.7 6.3L3 29l7.4-2c1.8 1 3.800 1.500 5.600 1.500 7 0 12.600-5.600 12.600-12.500S23 3 16 3zm0 22.900c-1.800 0-3.500-.5-5-1.400l-.4-.2-4.400 1.200 1.200-4.300-.3-.4a10.300 10.300 0 0 1-1.600-5.500C5.500 9.700 10.200 5.200 16 5.200s10.500 4.500 10.500 10.300S21.800 25.900 16 25.900zm5.800-7.700c-.3-.2-1.900-.9-2.200-1-.3-.1-.5-.2-.7.200s-.8 1-1 1.200-.4.200-.7.100a8.400 8.400 0 0 1-4.200-3.700c-.3-.6.300-.5.900-1.700.1-.2 0-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.100-.9.400s-1.100 1.100-1.100 2.600 1.100 3 1.300 3.200c.2.200 2.200 3.400 5.400 4.700 2 .8 2.800.9 3.800.7.600-.1 1.900-.8 2.200-1.500.3-.8.3-1.400.2-1.500s-.3-.2-.6-.4z"/></svg>
  </a>`);

  document.getElementById("yr").textContent = new Date().getFullYear();
  document.querySelectorAll("[data-phone]").forEach(a => { a.href = "tel:" + S.phoneTel; a.textContent = a.dataset.phone === "text" ? S.phoneDisplay : a.textContent; });
  document.querySelectorAll("[data-wa]").forEach(a => { a.href = wa; a.target = "_blank"; a.rel = "noopener"; });
  document.querySelectorAll("[data-hours]").forEach(el => { el.innerHTML = `&#128339; Please call or chat with us during business hours: <b>${S.hours}</b>`; });

  const burger = document.querySelector(".burger"), links = document.querySelector(".links");
  burger.addEventListener("click", () => { const o = links.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
  links.addEventListener("click", e => { if (e.target.tagName === "A") links.classList.remove("open"); });
  window.addEventListener("scroll", () => document.querySelector(".site-header").classList.toggle("scrolled", scrollY > 40));
})();
