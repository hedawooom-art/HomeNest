const IMG = id => `https://images.unsplash.com/photo-${id}?w=800&q=70`;
const props = [
 {id:1,name:"Modern Family Villa",city:"Pune",loc:"Pune, Maharashtra",type:"Villa",lakh:125,beds:3,baths:3,area:2100,img:"1613490493576-7fde63acd811",desc:"A bright modern villa with open living spaces, a private garden and a peaceful neighbourhood."},
 {id:2,name:"Skyline Luxury Apartment",city:"Mumbai",loc:"Bandra, Mumbai",type:"Apartment",lakh:240,beds:3,baths:3,area:1650,img:"1545324418-cc1a3fa10c00",desc:"Premium sea-facing apartment with high-rise views, modern kitchen and club access."},
 {id:3,name:"Green Valley House",city:"Bangalore",loc:"Whitefield, Bangalore",type:"House",lakh:95,beds:3,baths:2,area:1800,img:"1568605114967-8130f3a36994",desc:"Spacious independent house close to tech parks, schools and shopping."},
 {id:4,name:"Lakeview Residency",city:"Hyderabad",loc:"Gachibowli, Hyderabad",type:"Apartment",lakh:78,beds:2,baths:2,area:1200,img:"1512917774080-9991f1c4c750",desc:"Comfortable apartment in a gated community with lake views and great connectivity."},
 {id:5,name:"Sunrise Garden Plot",city:"Nashik",loc:"Gangapur Road, Nashik",type:"Plot",lakh:35,beds:0,baths:0,area:2400,img:"1500382017468-9049fed747ef",desc:"Clear-title residential plot in a developing area, ideal for building your own home."},
 {id:6,name:"Cozy Urban Apartment",city:"Pune",loc:"Hinjewadi, Pune",type:"Apartment",lakh:48,beds:2,baths:2,area:950,img:"1522708323590-d24dbb6b0267",desc:"Affordable, well-planned apartment near IT hubs with great amenities."},
 {id:7,name:"Heritage Bungalow",city:"Nashik",loc:"College Road, Nashik",type:"House",lakh:150,beds:4,baths:4,area:3000,img:"1600585154340-be6161a56a0c",desc:"Elegant bungalow with a large lawn and classic design in a prime location."},
 {id:8,name:"Palm Grove Villa",city:"Bangalore",loc:"Sarjapur, Bangalore",type:"Villa",lakh:210,beds:4,baths:4,area:3200,img:"1600596542815-ffad4c1539a9",desc:"Luxury villa with a private pool, landscaped garden and smart-home features."},
 {id:9,name:"Metro Plot",city:"Hyderabad",loc:"Shamshabad, Hyderabad",type:"Plot",lakh:60,beds:0,baths:0,area:1800,img:"1560518883-ce09059eeffa",desc:"Well-located plot near the airport corridor with strong growth potential."}
];
const locs=["Pune","Mumbai","Bangalore","Hyderabad","Nashik"], types=["Apartment","Villa","House","Plot"];
const prices=[["Under ₹50 Lakh",0,50],["₹50 Lakh – ₹1 Cr",50,100],["₹1 Cr – ₹2 Cr",100,200],["Above ₹2 Cr",200,1e9]];
const $=id=>document.getElementById(id);
const fav=new Set();

function fillSelects(){
 ["h","p"].forEach(p=>{
  if(!$(p+"-loc"))return;
  locs.forEach(v=>$(p+"-loc").add(new Option(v,v)));
  types.forEach(v=>$(p+"-type").add(new Option(v,v)));
  prices.forEach((r,i)=>$(p+"-price").add(new Option(r[0],i)));
 });
}
const fmt=l=>l>=100?"₹"+(l/100).toFixed(2).replace(/\.?0+$/,"")+" Cr":"₹"+l+" Lakh";
function card(p){
 const specs=p.beds?`<span>🛏 ${p.beds} Beds</span><span>🛁 ${p.baths} Baths</span><span>📐 ${p.area.toLocaleString()} sq.ft.</span>`:`<span>📐 ${p.area.toLocaleString()} sq.ft.</span><span>Land / Plot</span>`;
 return `<div class="card"><div class="img"><img src="${IMG(p.img)}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'">
 <span class="badge">For Sale</span><button class="fav ${fav.has(p.id)?'on':''}" onclick="toggleFav(${p.id},this)" aria-label="Favorite">♥</button></div>
 <div class="info"><h3>${p.name}</h3><div class="loc">📍 ${p.loc}</div><div class="price">${fmt(p.lakh)}</div>
 <div class="specs">${specs}</div><button class="btn" onclick="openDetails(${p.id})">View Details</button></div></div>`;
}
function render(el,list){$(el).innerHTML=list.length?list.map(card).join(""):'<div class="empty">No properties match your search. Try different filters.</div>'}
function filter(pre){
 const l=$(pre+"-loc").value,t=$(pre+"-type").value,pr=$(pre+"-price").value;
 return props.filter(p=>(!l||p.city===l)&&(!t||p.type===t)&&(pr===""||(p.lakh>=prices[pr][1]&&p.lakh<prices[pr][2])));
}
function searchHome(){const r=filter("h");render("home-grid",r.slice(0,6));$("home-grid").scrollIntoView({behavior:"smooth",block:"center"})}
function searchProps(){render("prop-grid",filter("p"))}
function toggleFav(id,b){fav.has(id)?fav.delete(id):fav.add(id);b.classList.toggle("on")}

/* Modals */
function openModal(html){$("mbox").innerHTML=html;$("modal").classList.add("open")}
function closeModal(){$("modal").classList.remove("open")}
$("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
function openDetails(id){
 const p=props.find(x=>x.id===id);
 const am=["Parking","Garden","Balcony","Security","Power Backup"].map(a=>`<span>✔ ${a}</span>`).join("");
 openModal(`<button class="x" onclick="closeModal()">✕</button>
 <div class="img"><img src="${IMG(p.img)}" alt="${p.name}" onerror="this.style.display='none'"></div>
 <div class="mbody"><h2>${p.name}</h2><div class="loc">📍 ${p.loc}</div><div class="price">${fmt(p.lakh)}</div>
 <div class="specs"><span>🛏 ${p.beds} Beds</span><span>🛁 ${p.baths} Baths</span><span>📐 ${p.area.toLocaleString()} sq.ft.</span></div>
 <h3>Description</h3><p style="color:var(--mut);margin-bottom:14px">${p.desc}</p>
 <h3>Amenities</h3><div class="amen">${am}</div>
 <button class="btn" onclick="contactAgent('${p.name}')">Contact Agent</button></div>`);
}
function contactAgent(n){openModal(`<div class="mbody small"><h2>Request Sent ✅</h2><p style="margin:10px 0 18px;color:var(--mut)">Thanks for your interest in <b>${n}</b>. Our agent will contact you soon. (Demo message)</p><button class="btn" onclick="closeModal()">Close</button></div>`)}
function openLogin(){openModal(`<div class="mbody small"><h2>Login</h2><p style="color:var(--mut);margin:6px 0 16px">Demo UI only – no real authentication.</p>
 <div style="display:grid;gap:12px"><input placeholder="Email"><input type="password" placeholder="Password"><button class="btn" onclick="closeModal()">Login</button></div></div>`)}
function sendMsg(){
 if(!$("c-name").value||!$("c-email").value||!$("c-msg").value){openModal('<div class="mbody small"><h2>Oops</h2><p style="margin:10px 0 18px;color:var(--mut)">Please fill in all fields.</p><button class="btn" onclick="closeModal()">OK</button></div>');return}
 ["c-name","c-email","c-msg"].forEach(i=>$(i).value="");
 openModal('<div class="mbody small"><h2>Message Sent ✅</h2><p style="margin:10px 0 18px;color:var(--mut)">Thank you! We will get back to you soon. (Demo message)</p><button class="btn" onclick="closeModal()">Close</button></div>');
}

$("burger").onclick=()=>$("menu").classList.toggle("open");

fillSelects();
if($("home-grid"))render("home-grid",props.slice(0,6));
if($("prop-grid"))render("prop-grid",props);
