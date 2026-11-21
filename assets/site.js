const BUSINESS={name:'Shree Salasar Granite & Tiles',whatsapp:'918504857338',phone:'+91 85048 57338',address:'Shree Salasar Marble, Pargaon Road, Shrigonda, Ahilyanagar, Maharashtra 413701',maps:'https://maps.app.goo.gl/2YoiuZcTEtmwaSreA',hours:'Daily: 7:00 AM – 7:00 PM'};
const enc=encodeURIComponent;
function messageForSubject(subject){return `Hello ${BUSINESS.name},\n\nI would like to enquire about: ${subject}.\nPlease share the available options, specifications and current availability.\n\nThank you.`}
function waUrl(subject){return `https://wa.me/${BUSINESS.whatsapp}?text=${enc(messageForSubject(subject||'your products'))}`}
document.querySelectorAll('[data-wa]').forEach(a=>{a.href=waUrl(a.dataset.wa||'your products');a.target='_blank';a.rel='noopener'});
document.querySelectorAll('[data-phone]').forEach(a=>a.href='tel:+918504857338');
document.querySelectorAll('[data-address]').forEach(el=>el.textContent=BUSINESS.address);
document.querySelectorAll('[data-map]').forEach(a=>{a.href=BUSINESS.maps;a.target='_blank';a.rel='noopener'});
document.querySelectorAll('[data-hours]').forEach(el=>el.textContent=BUSINESS.hours);
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const toggle=document.querySelector('.menu-toggle'),links=document.querySelector('.navlinks');if(toggle&&links){toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')))}

// Build a different WhatsApp message for each request type selected on the Contact page.
const requestForm=document.querySelector('#whatsapp-request-form');
if(requestForm){
 const typeField=document.querySelector('#request-type');
 const requestedType=new URLSearchParams(window.location.search).get('type');
 if(['product','appointment','availability','project','other'].includes(requestedType))typeField.value=requestedType;
 const appointmentFields=document.querySelector('#appointment-fields');
 const visitDate=document.querySelector('#visit-date');
 const visitTime=document.querySelector('#visit-time');
 const error=document.querySelector('#form-error');
 function updateAppointmentFields(){const isAppointment=typeField.value==='appointment';appointmentFields.hidden=!isAppointment;visitDate.required=isAppointment;visitTime.required=isAppointment;}
 typeField.addEventListener('change',updateAppointmentFields);updateAppointmentFields();
 requestForm.addEventListener('submit',event=>{
  event.preventDefault();error.hidden=true;
  if(!requestForm.reportValidity())return;
  const name=document.querySelector('#customer-name').value.trim();
  const details=document.querySelector('#request-details').value.trim();
  const extra=document.querySelector('#extra-message').value.trim();
  const type=typeField.value;
  const templates={
   product:`Hello ${BUSINESS.name},\n\nI am ${name}. I would like to enquire about the following product(s):\n${details}\n\nPlease share the available options, specifications and pricing.`,
   appointment:`Hello ${BUSINESS.name},\n\nI am ${name}. I would like to request a showroom appointment.\nPreferred date: ${visitDate.value}\nPreferred time: ${visitTime.value}\nVisit purpose: ${details}\n\nPlease confirm whether this time is convenient.`,
   availability:`Hello ${BUSINESS.name},\n\nI am ${name}. Could you please confirm the current availability of: ${details}\nPlease share available variants, sizes or brands if applicable.`,
   project:`Hello ${BUSINESS.name},\n\nI am ${name}. I have a bulk/project requirement and would like to discuss: ${details}\nPlease let me know what information you need to prepare an estimate or discuss supply.`,
   other:`Hello ${BUSINESS.name},\n\nI am ${name}. I have another request: ${details}\nCould someone from your team please assist me?`
  };
  let message=templates[type]||templates.other;
  if(extra)message+=`\n\nAdditional details: ${extra}`;
  message+=`\n\nThank you.`;
  const url=`https://wa.me/${BUSINESS.whatsapp}?text=${enc(message)}`;
  const win=window.open(url,'_blank');
  if(win){win.opener=null;}else{error.textContent='Your browser blocked the WhatsApp window. Please allow pop-ups and try again.';error.hidden=false;}
 });
}
