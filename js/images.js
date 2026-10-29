/* Image library. Loading order for each image:
   1) your own file  assets/images/<slug>.jpg   (best: drop your photos here)
   2) the Wikimedia Commons photo below (free-licence, verified file names)
   3) a branded gradient placeholder if both fail */
const C = "https://commons.wikimedia.org/wiki/Special:FilePath/";
window.IMAGES = {
  hero1:    { alt: "Houseboat on the Kerala backwaters",   url: C + "Kerala_backwaters,_Houseboats,_India.jpg?width=1600" },
  hero2:    { alt: "Munnar tea plantations",               url: C + "Munnar_tea_plantation_from_the_top.jpg?width=1600" },
  hero3:    { alt: "Athirappilly waterfalls",              url: C + "Athirappilly_waterfalls.jpg?width=1600" },
  alleppey: { alt: "Vembanad lake, Alappuzha",             url: C + "VembanadAlappuzha.jpg?width=900" },
  munnar:   { alt: "Tea plantation in Munnar",             url: C + "Tea_plantation_in_Munnar.jpg?width=900" },
  thekkady: { alt: "Periyar lake, Thekkady",               url: C + "Thekkady_Lake_1.JPG?width=900" },
  kochi:    { alt: "Chinese fishing nets, Fort Kochi",     url: C + "Kochi,_Chinese_fishing_nets,_Kerala,_India.jpg?width=900" },
  kovalam:  { alt: "Kovalam lighthouse beach",             url: C + "Kovalam_lighthouse.JPG?width=1600" },
  varkala:  { alt: "Varkala cliff beach",                  url: C + "Beach_of_Varkala.jpg?width=900" },
  wayanad:  { alt: "Chembra peak, Wayanad",                url: C + "Chembra_Peak.JPG?width=900" },
  vagamon:  { alt: "Vagamon meadows",                      url: C + "Vagamon_Meadow_1.jpg?width=900" },
  kumarakom:{ alt: "Kumarakom backwaters",                 url: C + "Cheepunkal,_Kavanattinkara,_Kumarakom,_Kerala,_India_-_panoramio_(3).jpg?width=900" },
  kathakali:{ alt: "Kathakali performer",                  url: C + "Kathakali_dance_01.jpg?width=900" },
  elephant: { alt: "Thrissur Pooram elephants",            url: C + "Thrissur_Pooram_1.jpg?width=900" },
  ayurveda: { alt: "Ayurvedic head massage",               url: C + "Head_massage.jpg?width=900" },
  spices:   { alt: "Spices in an Indian market",           url: C + "Spices_in_an_Indian_market.jpg?width=900" },
  sadya:    { alt: "Kerala Onam sadya feast",              url: C + "Onam_Sadya_(20776959430).jpg?width=900" },
  vallamkali:{alt: "Nehru Trophy snake boat race",         url: C + "Nehru_Trophy_Boat_Race_Kerala.jpg?width=900" },
  munnar2:  { alt: "View of Munnar tea estates",           url: C + "View_of_tea_plantations_in_Munnar.jpg?width=900" },
  falls2:   { alt: "Athirappilly falls, Kerala",           url: C + "Athirappilly_waterfalls_Kerala,_India.jpg?width=900" },
  beach2:   { alt: "Cherai beach at sunset",               url: C + "Cherai_Beach_-_Sunset_021.JPG?width=900" },
  hill2:    { alt: "Ponmudi hills",                        url: C + "Ponmudi_hills_1.jpg?width=900" },
  fort:     { alt: "Bekal Fort",                           url: C + "Bekal_Fort,_Kerala.jpg?width=900" },
  canoe:    { alt: "Kerala backwater village scene",       url: C + "Kerala_backwater_scene.jpg?width=900" },
  g_houseboat2: { alt: "Houseboat gliding on Alappuzha backwaters", url: C + "Alappuzha_Boat_Beauty_W.jpg?width=900" },
  g_mist: { alt: "Munnar covered in mist", url: C + "Munnar_covered_in_Mist.jpg?width=900" },
  g_hills: { alt: "Rolling hills of Munnar", url: C + "Hills_of_Munnar.jpg?width=900" },
  g_fortkochi: { alt: "Fort Kochi waterfront", url: C + "Fort_Kochi.jpg?width=900" },
  g_varkala: { alt: "Varkala south cliff", url: C + "South_Cliff_Varkala_-_panoramio_-_Tuderna.jpg?width=900" },
  g_kovalam: { alt: "Kovalam beach view", url: C + "Kovalam_beach_view.JPG?width=900" },
  g_paddy: { alt: "Green paddy fields of Kerala", url: C + "A_paddy_field.JPG?width=900" },
  g_theyyam: { alt: "Theyyam ritual art", url: C + "Theyyam_of_Kerala_3.jpg?width=900" },
  g_mohini: { alt: "Mohiniyattam dancer", url: C + "Indian_classic_dance_Mohiniyattam.jpg?width=900" },
  g_topstation: { alt: "Top Station, Munnar", url: C + "Top_Station_from_the_southwest.jpg?width=900" },
  g_illikkal: { alt: "Illikkal Kallu peak", url: C + "Illikal_kallu_01.jpg?width=900" },
  g_marari: { alt: "Marari beach", url: C + "Olappura_at_Marari_beach_02.jpg?width=900" },
  g_kurinji: { alt: "Neelakurinji blooms", url: C + "Neelakurinji3.JPG?width=900" },
  g_palms: { alt: "Coconut palms of Kerala", url: C + "Kerela_Trees.jpg?width=900" },
  g_ramakkal: { alt: "Ramakkalmedu viewpoint", url: C + "Ramakkalmedu_1.jpg?width=900" },
  g_parunthu: { alt: "Parunthumpara hills", url: C + "Parunthumpara_1.JPG?width=900" },
  g_kalari: { alt: "Kalaripayattu martial art", url: C + "Kalaripayattu_warriors.jpg?width=900" },
  g_meenmutty: { alt: "Meenmutty falls, Wayanad", url: C + "Meenmutty_Falls.jpg?width=900" },
  g_alappuzha: { alt: "Alappuzha backwater life", url: C + "Alappuzha_05.jpg?width=900" },
  g_teagarden: { alt: "Tea gardens of Munnar", url: C + "Munnar,Kerala,India.jpg?width=900" },
  houseboat:{ alt: "Houseboat in Alleppey",                url: C + "Kerala_houseboat.jpg?width=900" }
};

window.imgTag = function (slug, cls = "") {
  const i = window.IMAGES[slug];
  return `<img class="${cls}" loading="lazy" alt="${i.alt}" data-slug="${slug}" data-remote="${i.url}" src="assets/images/${slug}.jpg">`;
};
window.wireImages = function (root = document) {
  root.querySelectorAll("img[data-slug]").forEach(img => {
    if (img.dataset.wired) return; img.dataset.wired = 1;
    let step = 0;
    const fail = () => {
      step++;
      if (step === 1) img.src = img.dataset.remote;
      else if (step === 2) { img.removeAttribute("src"); img.classList.add("img-fallback"); img.parentElement.classList.add("no-img"); img.parentElement.dataset.label = img.alt; }
    };
    img.addEventListener("error", fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });
};
