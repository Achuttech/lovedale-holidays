/* Image library (24 photos). Loading order for each image:
   1) your own file  assets/images/<slug>.jpg   (best: drop your photos here)
   2) the remote URL below (Wikimedia Commons - free-licence photos)
   3) a branded gradient placeholder if both fail
   Replace any URL with your own photo or a licensed one at any time. */
const C = "https://commons.wikimedia.org/wiki/Special:FilePath/";
window.IMAGES = {
  hero1:   { alt: "Houseboat on Alleppey backwaters",  url: C + "Kerala_houseboat.jpg?width=1600" },
  hero2:   { alt: "Munnar tea plantations",            url: C + "Munnar_Tea_Gardens.jpg?width=1600" },
  hero3:   { alt: "Athirappilly waterfalls",           url: C + "Athirappilly_Waterfalls.jpg?width=1600" },
  alleppey:{ alt: "Alleppey backwaters",               url: C + "Alleppey_Backwaters.jpg?width=900" },
  munnar:  { alt: "Munnar hills",                      url: C + "Munnar_tea_plantation.jpg?width=900" },
  thekkady:{ alt: "Periyar Lake, Thekkady",            url: C + "Periyar_Lake_Thekkady.jpg?width=900" },
  kochi:   { alt: "Chinese fishing nets, Fort Kochi",  url: C + "Chinese_fishing_nets,_Fort_Kochi.jpg?width=900" },
  kovalam: { alt: "Kovalam beach",                     url: C + "Kovalam_beach.jpg?width=900" },
  varkala: { alt: "Varkala cliff beach",               url: C + "Varkala_Beach.jpg?width=900" },
  wayanad: { alt: "Wayanad forests",                   url: C + "Wayanad_Chembra_Peak.jpg?width=900" },
  vagamon: { alt: "Vagamon meadows",                   url: C + "Vagamon_hills.jpg?width=900" },
  kumarakom:{alt: "Kumarakom backwaters",              url: C + "Kumarakom_backwaters.jpg?width=900" },
  kathakali:{alt: "Kathakali performer",               url: C + "Kathakali_Performance.jpg?width=900" },
  elephant:{ alt: "Kerala temple festival elephants",  url: C + "Elephants_in_Kerala.jpg?width=900" },
  ayurveda:{ alt: "Ayurveda treatment",                url: C + "Ayurvedic_massage_Kerala.jpg?width=900" },
  spices:  { alt: "Kerala spices",                     url: C + "Kerala_spices.jpg?width=900" },
  sadya:   { alt: "Kerala sadya feast",                url: C + "Onam_Sadya.jpg?width=900" },
  vallamkali:{alt:"Snake boat race",                   url: C + "Nehru_Trophy_Boat_Race.jpg?width=900" },
  munnar2: { alt: "Munnar tea estate road",            url: C + "Munnar_tea_estate.jpg?width=900" },
  falls2:  { alt: "Waterfall in Kerala",               url: C + "Athirappilly_Falls_Kerala.jpg?width=900" },
  beach2:  { alt: "Kerala beach sunset",               url: C + "Cherai_Beach.jpg?width=900" },
  hill2:   { alt: "Ponmudi hills",                     url: C + "Ponmudi_hills.jpg?width=900" },
  fort:    { alt: "Bekal Fort",                        url: C + "Bekal_Fort.jpg?width=900" },
  canoe:   { alt: "Village canoe in backwaters",       url: C + "Kerala_backwaters_canoe.jpg?width=900" }
};

/* Build <img> with the 3-step fallback */
window.imgTag = function (slug, cls = "") {
  const i = window.IMAGES[slug];
  return `<img class="${cls}" loading="lazy" alt="${i.alt}" data-slug="${slug}" data-remote="${i.url}" src="assets/images/${slug}.jpg">`;
};
window.wireImages = function (root = document) {
  root.querySelectorAll("img[data-slug]").forEach(img => {
    let step = 0;
    img.addEventListener("error", () => {
      step++;
      if (step === 1) img.src = img.dataset.remote;
      else if (step === 2) { img.removeAttribute("src"); img.classList.add("img-fallback"); img.parentElement.classList.add("no-img"); img.parentElement.dataset.label = img.alt; }
    });
  });
};
