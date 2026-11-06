/* Quote builder: live price + WhatsApp + optional Google Sheet / PDF email */
(function(){
  const P = window.PRICING, S = window.SITE, f = document.getElementById("qForm"), sum = document.getElementById("qSum");
  const inr = n => "₹" + Math.round(n).toLocaleString("en-IN");
  const sel = document.getElementById("qPkg");
  (window.PACKAGES||[]).forEach(p => sel.insertAdjacentHTML("beforeend", `<option value="${p.id}">${p.title}${p.days?` (${p.days}N)`:""}</option>`));
  document.getElementById("qExtras").innerHTML = Object.entries(P.extras).map(([k,x]) =>
    `<label class="chk"><input type="checkbox" name="x_${k}"> ${x.label} <small>${inr(x.price)}/person</small></label>`).join("");
  const id = new URLSearchParams(location.search).get("package");
  if (id && [...sel.options].some(o=>o.value===id)) sel.value = id;
  sel.addEventListener("change", () => { const p = (window.PACKAGES||[]).find(x=>x.id===sel.value); if (p && p.days) f.nights.value = p.days; calc(); });
  const tmr = new Date(Date.now()+864e5*14); f.date.min = new Date().toISOString().slice(0,10); if(!f.date.value) f.date.value = tmr.toISOString().slice(0,10);

  function isPeak(dateStr, nights){
    if(!dateStr) return false; const s=new Date(dateStr);
    for(let i=0;i<nights;i++){ const d=new Date(s.getTime()+i*864e5), md=String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
      const {from,to}=P.peak; if(from<=to ? (md>=from&&md<=to) : (md>=from||md<=to)) return true; }
    return false;
  }
  function calc(){
    const v = k => f[k].type==="checkbox" ? f[k].checked : f[k].value;
    const n=Math.max(1,+v("nights")||1), a=Math.max(1,+v("adults")||1), c=Math.max(0,+v("children")||0), pax=a+c;
    const hb=Math.min(+v("hbNights")||0,n), hotelN=n-hb, rooms=Math.ceil(a/2), boats=Math.ceil(a/2);
    const peak=isPeak(v("date"),n), pk=peak?1+P.peak.extraPct/100:1;
    const lines=[];
    if(hotelN) lines.push([`Hotel (${v("hotel")}) - ${rooms} room(s) x ${hotelN} night(s)`, P.hotel[v("hotel")]*rooms*hotelN*pk + P.extraBedChild*c*hotelN]);
    if(hb) lines.push([`Houseboat (${v("hbType")}) - ${boats} boat(s) x ${hb} night(s)`, P.houseboat[v("hbType")]*boats*hb*pk]);
    lines.push([`Vehicle (${v("car")}) with driver - ${n+1} day(s)`, P.car[v("car")]*(n+1)]);
    if(v("airport")) lines.push(["Airport pickup & drop", P.airport*2]);
    Object.entries(P.extras).forEach(([k,x])=>{ if(f["x_"+k].checked) lines.push([`${x.label} x ${pax}`, x.price*pax]); });
    const sub=lines.reduce((s,l)=>s+l[1],0), margin=sub*P.marginPct/100, gst=(sub+margin)*P.gstPct/100, total=sub+margin+gst;
    const pkg=(window.PACKAGES||[]).find(x=>x.id===v("pkg"));
    const q={ name:v("name"), phone:v("phone"), email:v("email"), notes:v("notes"), package:pkg?pkg.title:"Custom trip", date:v("date"), nights:n, adults:a, children:c,
      hotel:v("hotel"), car:v("car"), houseboat:hb?`${hb} night(s), ${v("hbType")}`:"None", peak,
      items:lines.map(([t,p])=>({t,p:Math.round(p*(1+P.marginPct/100))})), gst:Math.round(gst), total:Math.round(total), perPerson:Math.round(total/pax) };
    window.__quote=q;
    sum.innerHTML=`<h3>Your estimate</h3><p class="qpkg">${q.package} &middot; ${n}N / ${n+1}D &middot; ${a} adult(s)${c?`, ${c} child(ren)`:""}</p>
      <ul class="qlines">${q.items.map(i=>`<li><span>${i.t}</span><b>${inr(i.p)}</b></li>`).join("")}<li><span>GST (${P.gstPct}%)</span><b>${inr(q.gst)}</b></li></ul>
      ${peak?`<p class="qnote">Includes peak-season rates (+${P.peak.extraPct}%).</p>`:""}
      <div class="qtotal"><span>Estimated total</span><strong>${inr(q.total)}</strong><small>${inr(q.perPerson)} per person</small></div>
      <button class="btn" id="qSend" type="button">Get my quote on WhatsApp</button>
      <p class="qnote" id="qMsg">This is an estimate. Final price depends on hotel availability and is confirmed by our team.</p>`;
    document.getElementById("qSend").onclick=send;
  }
  function send(){
    if(!f.reportValidity()) return;
    calc(); const q=window.__quote;
    const msg=`Hi Lovedale Holidays, please confirm this quote:\n\n${q.package}\nStart: ${q.date} | ${q.nights}N/${q.nights+1}D\nTravellers: ${q.adults} adult(s), ${q.children} child(ren)\nHotel: ${q.hotel} | Vehicle: ${q.car} | Houseboat: ${q.houseboat}\n\n`+
      q.items.map(i=>`- ${i.t}: ${inr(i.p)}`).join("\n")+`\nGST: ${inr(q.gst)}\n\nESTIMATED TOTAL: ${inr(q.total)} (${inr(q.perPerson)}/person)\n\nName: ${q.name}\nPhone: ${q.phone}${q.email?`\nEmail: ${q.email}`:""}${q.notes?`\nNotes: ${q.notes}`:""}`;
    if(P.scriptUrl){
      fetch(P.scriptUrl,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:JSON.stringify(q)}).catch(()=>{});
      if(q.email) document.getElementById("qMsg").textContent="Thank you! A PDF quote is on its way to "+q.email+".";
    }
    window.open(`https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`,"_blank","noopener");
  }
  f.addEventListener("input",calc); f.addEventListener("change",calc); calc();
})();
