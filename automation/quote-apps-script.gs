/**
 * Lovedale Holidays - Quote automation (Google Apps Script)
 * Saves every website quote to this Google Sheet, emails the customer a PDF quote,
 * and notifies you. Setup steps: see README.md -> "Quote automation setup".
 */
const OWNER_EMAIL = "you@example.com";          // <-- where new-lead alerts go
const BUSINESS    = "Lovedale Holidays";
const PHONE       = "+91 90729 55363";
const ADDRESS     = "MG Road, Ernakulam, Kerala, India";
const LOGO_URL    = "https://lovedale.co.in/assets/logo.jpeg";

function doPost(e) {
  const q = JSON.parse(e.postData.contents);
  const sheet = getSheet_();
  const id = "LH-" + Utilities.formatDate(new Date(), "Asia/Kolkata", "yyMMdd") + "-" + (sheet.getLastRow()).toString().padStart(3, "0");
  sheet.appendRow([new Date(), id, q.name, q.phone, q.email, q.package, q.date, q.nights, q.adults, q.children,
    q.hotel, q.car, q.houseboat, q.total, q.perPerson, q.notes, "New"]);

  const pdf = HtmlService.createHtmlOutput(quoteHtml_(q, id)).getBlob().getAs("application/pdf").setName(id + ".pdf");
  if (q.email) {
    MailApp.sendEmail({ to: q.email, subject: `Your Kerala trip quote ${id} - ${BUSINESS}`,
      htmlBody: `<p>Dear ${esc_(q.name)},</p><p>Thank you for planning your Kerala trip with us. Your estimated quote is attached.</p>
                 <p>Our team will confirm availability and the final price shortly on WhatsApp/phone (${PHONE}).</p><p>Warm regards,<br>${BUSINESS}</p>`,
      attachments: [pdf], name: BUSINESS, replyTo: OWNER_EMAIL });
  }
  MailApp.sendEmail({ to: OWNER_EMAIL, subject: `New quote ${id}: ${q.name} - Rs ${q.total}`,
    htmlBody: `<p><b>${esc_(q.name)}</b> (${esc_(q.phone)}, ${esc_(q.email || "no email")})</p><p>${esc_(q.package)} | ${q.date} | ${q.nights}N | ${q.adults}A ${q.children}C</p><p>Notes: ${esc_(q.notes || "-")}</p>`,
    attachments: [pdf] });
  return ContentService.createTextOutput(JSON.stringify({ ok: true, id })).setMimeType(ContentService.MimeType.JSON);
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName("Quotes");
  if (!sh) {
    sh = ss.insertSheet("Quotes");
    sh.appendRow(["Received", "Quote ID", "Name", "Phone", "Email", "Package", "Start date", "Nights", "Adults", "Children",
      "Hotel", "Vehicle", "Houseboat", "Total (INR)", "Per person", "Notes", "Status"]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function quoteHtml_(q, id) {
  const r = n => "Rs " + Number(n).toLocaleString("en-IN");
  const rows = q.items.map(i => `<tr><td>${esc_(i.t)}</td><td style="text-align:right">${r(i.p)}</td></tr>`).join("");
  return `<div style="font-family:Arial,sans-serif;color:#222;padding:24px">
    <table width="100%"><tr><td><img src="${LOGO_URL}" height="60"></td><td style="text-align:right"><h2 style="margin:0;color:#c8102e">Trip Quote</h2>${id}<br>${Utilities.formatDate(new Date(), "Asia/Kolkata", "dd MMM yyyy")}</td></tr></table>
    <p><b>Prepared for:</b> ${esc_(q.name)} &middot; ${esc_(q.phone)}</p>
    <p><b>${esc_(q.package)}</b><br>Start: ${q.date} &middot; ${q.nights} nights / ${q.nights + 1} days &middot; ${q.adults} adult(s), ${q.children} child(ren)<br>
       Hotel: ${q.hotel} &middot; Vehicle: ${q.car} &middot; Houseboat: ${q.houseboat}</p>
    <table width="100%" cellpadding="6" style="border-collapse:collapse;border-top:2px solid #c8102e">${rows}
      <tr><td>GST</td><td style="text-align:right">${r(q.gst)}</td></tr>
      <tr style="background:#fff3c4;font-weight:bold"><td>Estimated total</td><td style="text-align:right">${r(q.total)}</td></tr>
      <tr><td>Per person</td><td style="text-align:right">${r(q.perPerson)}</td></tr></table>
    <p style="font-size:12px;color:#666">This is an estimate based on your selections. Final price is confirmed after checking hotel availability.
       A 30% advance confirms the booking. See lovedale.co.in/terms.html.</p>
    <p style="font-size:12px">${BUSINESS} &middot; ${ADDRESS} &middot; ${PHONE} &middot; lovedale.co.in</p></div>`;
}
function esc_(s) { return String(s || "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
