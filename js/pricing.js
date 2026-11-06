/* QUOTE PRICING - edit your rates here (all in INR). These are PLACEHOLDER prices. */
window.PRICING = {
  // Paste your Google Apps Script Web App URL here to save leads + email PDF quotes (see README).
  scriptUrl: "",
  hotel: { budget: 2500, standard: 4500, premium: 8000, luxury: 15000 },   // per room per night
  extraBedChild: 800,                                                   // per child per night
  car: { sedan: 3000, suv: 4200, tempo: 6500 },                         // per day incl. driver & fuel
  houseboat: { standard: 9000, premium: 14000, luxury: 22000 },         // per boat (2 guests) per night, meals incl.
  extras: {                                                             // per person
    kathakali:  { label: "Kathakali show (Kochi)", price: 500 },
    spice:      { label: "Spice plantation walk (Thekkady)", price: 400 },
    ayurveda:   { label: "Ayurveda massage (60 min)", price: 2500 },
    boating:    { label: "Periyar lake boating", price: 600 },
    elephant:   { label: "Elephant interaction", price: 1200 },
    cooking:    { label: "Kerala cooking class", price: 1500 }
  },
  airport: 1800,                                  // per transfer
  peak: { from: "12-20", to: "01-05", extraPct: 20 },  // MM-DD range, +% on hotels & houseboats
  marginPct: 10,
  gstPct: 5
};
