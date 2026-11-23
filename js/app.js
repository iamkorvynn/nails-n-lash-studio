var SERVICES=[
 {cat:"nails",name:"Gel Polish",desc:"Glossy, chip-resistant gel colour on your natural nails — clean, polished and long-wearing."},
 {cat:"nails",name:"Cat-Eye",desc:"Magnetic gel polish with a shifting, light-catching stripe that moves as your hands do."},
 {cat:"nails",name:"Chrome",desc:"Mirror-shine chrome finish over gel — from soft pearl glaze to full metallic."},
 {cat:"nails",name:"Ombré",desc:"A soft, blended gradient between shades for a seamless, airbrushed look."},
 {cat:"nails",name:"French",desc:"The timeless classic — a natural base with crisp tips, in classic white or a modern twist."},
 {cat:"nails",name:"BIAB",desc:"Builder In A Bottle — a strengthening gel overlay that helps your natural nails grow stronger."},
 {cat:"nails",name:"Gel Extensions",desc:"Length and shape built with gel — almond, square, coffin and more, finished with your choice of colour or art."},
 {cat:"nails",name:"Acrylic Extensions",desc:"Strong, sculpted acrylic extensions for extra length and durability."},
 {cat:"nails",name:"Nail Art — incl. 3D Flowers",desc:"Hand-painted and 3D nail art, including delicate 3D flowers. Share your reference on Instagram DM and we’ll plan your set."},
 {cat:"lashes",name:"Classic Lash Extensions",desc:"One extension per natural lash for a clean, natural, mascara-like effect."},
 {cat:"lashes",name:"Hybrid Lash Extensions",desc:"A mix of classic and volume lashes — texture and fullness with a soft finish."},
 {cat:"lashes",name:"Volume Lash Extensions",desc:"Multiple fine lashes per natural lash for a fuller, fluffier, more dramatic set."},
 {cat:"lashes",name:"Lash Lift + Tint",desc:"Your natural lashes lifted, curled and tinted — no extensions, just your lashes, enhanced."}
];
var grid=document.getElementById('serviceGrid');
var IG_URL="https://www.instagram.com/nails_n_lash_studio/";
function render(filter){
  grid.innerHTML="";
  SERVICES.filter(function(s){return filter==="all"||s.cat===filter;}).forEach(function(s){
    var el=document.createElement('article'); el.className='card';
    el.innerHTML='<div class="card-top"><h3></h3><span class="tag"></span></div><p></p><div class="price"><b>Price on enquiry</b><a target="_blank" rel="noopener">Enquire →</a></div>';
    el.querySelector('h3').textContent=s.name;
    el.querySelector('.tag').textContent=s.cat==="nails"?"Nails":"Lashes";
    el.querySelector('p').textContent=s.desc;
    el.querySelector('a').href=IG_URL;
    grid.appendChild(el);
  });
}
render("all");
document.querySelectorAll('.filter').forEach(function(b){b.addEventListener('click',function(){document.querySelectorAll('.filter').forEach(function(x){x.classList.remove('active')});b.classList.add('active');render(b.dataset.filter);});});

// Booking builder
var sel=document.getElementById('bkService');
SERVICES.forEach(function(s){var o=document.createElement('option');o.value=s.name;o.textContent=(s.cat==="nails"?"Nails — ":"Lashes — ")+s.name;sel.appendChild(o);});
var dateInput=document.getElementById('bkDate');
var today=new Date(); var iso=today.toISOString().slice(0,10); dateInput.min=iso; dateInput.value=iso;
var slotsEl=document.getElementById('slots'); var chosenSlot="";
["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM","9:00 PM"].forEach(function(t){
  var b=document.createElement('button'); b.type='button'; b.className='slot'; b.textContent=t;
  b.addEventListener('click',function(){document.querySelectorAll('.slot').forEach(function(x){x.classList.remove('active')});b.classList.add('active');chosenSlot=t;});
  slotsEl.appendChild(b);
});
function toast(msg){var t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},2200);}
document.getElementById('sendBooking').addEventListener('click',function(){
  var name=document.getElementById('bkName').value.trim();
  var note=document.getElementById('bkNote').value.trim();
  var d=dateInput.value ? new Date(dateInput.value+'T00:00:00').toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'}) : "";
  var lines=["Hi Nails n Lash Studio! I'd like to book an appointment.","", "Service: "+sel.value];
  if(d) lines.push("Preferred date: "+d);
  if(chosenSlot) lines.push("Preferred time: "+chosenSlot);
  if(name) lines.push("Name: "+name);
  if(note) lines.push("Note: "+note);
  lines.push("","I understand a ₹200 deposit confirms the slot, with a 15-minute grace period. Deposit payment details will be shared when I book.");
  var summary=lines.join("\n");
  if(navigator.clipboard){navigator.clipboard.writeText(summary).catch(function(){});}
  window.open(IG_URL,'_blank');
  toast("Booking details copied — paste them into your Instagram DM");
});
