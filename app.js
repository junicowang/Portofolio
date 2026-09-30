/* ============================================================
   RENDER ENGINE. Assembles every data file into the page.
   You usually do not need to change this file. Edit the /data folder.
   ============================================================ */
/* =====================================================================
   ██  RENDER ENGINE  ██   (usually no need to edit)
   ===================================================================== */
document.documentElement.classList.add('js');
const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---- SVG icon set ---- */
const IC = {
  github:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9v2.81c0 .27.18.59.69.48A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"/></svg>',
  linkedin:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  whatsapp:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35ZM12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5A9.42 9.42 0 0 1 18.7 5.4a9.36 9.36 0 0 1 2.76 6.66c-.01 5.2-4.24 9.44-9.41 9.44Zm8.02-17.46A11.3 11.3 0 0 0 12.05.7 11.35 11.35 0 0 0 2.2 17.73L.5 24l6.41-1.68a11.32 11.32 0 0 0 5.14 1.31h.01c6.24 0 11.32-5.08 11.32-11.32a11.26 11.26 0 0 0-3.31-8.27Z"/></svg>',
  external:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 3 14 9-14 9V3Z"/></svg>',
  award:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.12"/></svg>',
  code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>',
  table:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>',
  brain:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 0 0-6 0 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 0Z"/><path d="M12 5a3 3 0 0 1 6 0 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 0"/></svg>',
  layers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><rect x="7" y="10" width="3" height="7"/><rect x="13" y="6" width="3" height="11"/></svg>',
  tool:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-2.4 2.6-2.6Z"/></svg>',
  flask:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6.5L5 18a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 18l-5-8.5V3"/><path d="M7 14h10"/></svg>',
  target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
  rocket:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8a2 2 0 0 0-3 .8Z"/><path d="M12 15 9 12a11 11 0 0 1 6-8c2 0 4 2 4 4a11 11 0 0 1-8 6Z"/><path d="M15 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>',
  zoom:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6M11 8v6"/></svg>',
  close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>'
};

const P = DATA.profile;
const waLink = P.whatsapp ? `https://wa.me/${P.whatsapp.replace(/[^0-9]/g,'')}` : '';
const waDisplay = P.whatsapp ? ('+'+P.whatsapp.replace(/[^0-9]/g,'')) : '';

/* ---- profile bits ---- */
$('#brand-mark').textContent = P.initials;
$('#brand-name').textContent = P.name;
$('#hero-name').textContent = P.name;
$('#hero-role').textContent = P.role;
$('#hero-bio').textContent = P.bio;
$('#foot-name').textContent = P.name;
$('#foot-role').textContent = P.role;
$('#copyright').textContent = `© ${P.copyrightYear} ${P.name}`;
document.title = `${P.name} | Data Science Portfolio`;

/* ---- photo ---- */
(function(){
  if(P.photo){ const img=$('#hero-photo'); img.src=P.photo; img.hidden=false; $('#photo-ph').style.display='none'; }
})();

/* ---- socials (hero + footer) ---- */
function socialHTML(prefix){
  let h = `
    <a href="${esc(P.github)}" target="_blank" rel="noopener" aria-label="GitHub">${IC.github}</a>
    <a href="${esc(P.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${IC.linkedin}</a>
    <a href="mailto:${esc(P.email)}" aria-label="Email">${IC.mail}</a>`;
  if(waLink) h += `<a class="wa" href="${esc(waLink)}" target="_blank" rel="noopener" aria-label="WhatsApp">${IC.whatsapp}</a>`;
  return h;
}
$('#hero-socials').innerHTML = socialHTML();
$('#foot-social').innerHTML = socialHTML();

/* ---- skills ---- */
$('#skills-grid').innerHTML = DATA.skills.map((s,i)=>`
  <div class="skill-cat reveal" data-d="${(i%3)+1}">
    <h3><span class="ic">${IC[s.icon]||IC.code}</span>${esc(s.cat)}</h3>
    <div class="chips">${s.items.map(x=>`<span class="chip">${esc(x)}</span>`).join('')}</div>
  </div>`).join('');

/* ---- project thumbnails (canvas mini-viz, light theme) ---- */
function drawThumb(canvas, seed, kind){
  const dpr=Math.min(window.devicePixelRatio||1,2);
  const r=canvas.getBoundingClientRect();
  const w=canvas.width=Math.max(300,r.width)*dpr, h=canvas.height=118*dpr;
  const ctx=canvas.getContext('2d'); ctx.scale(dpr,dpr);
  const W=w/dpr, H=h/dpr;
  let s=seed; const rand=()=>{ s=(s*9301+49297)%233280; return s/233280; };
  ctx.clearRect(0,0,W,H);
  ctx.strokeStyle='rgba(21,35,63,.08)'; ctx.lineWidth=1;
  for(let gx=0;gx<W;gx+=26){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}
  for(let gy=0;gy<H;gy+=26){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}
  const acc='#0E7A84';
  if(kind==='line'){
    ctx.beginPath(); let py;
    for(let i=0;i<=10;i++){const px=(W/10)*i; const v=0.25+0.5*(i/10)+ (rand()-0.5)*0.18; py=H-v*H*0.8-8; i?ctx.lineTo(px,py):ctx.moveTo(px,py);}
    ctx.strokeStyle=acc; ctx.lineWidth=2.2; ctx.stroke();
  } else if(kind==='scatter'){
    for(let i=0;i<26;i++){ctx.beginPath();ctx.arc(10+rand()*(W-20),10+rand()*(H-20),2+rand()*2.5,0,7); ctx.fillStyle= rand()>0.5?acc:'rgba(21,35,63,.28)'; ctx.globalAlpha=.9; ctx.fill();}
    ctx.globalAlpha=1;
  } else if(kind==='bars'){
    const n=9; const bw=(W-20)/n;
    for(let i=0;i<n;i++){const bh=(0.2+rand()*0.75)*H*0.8; ctx.fillStyle= i%3===0?acc:'rgba(21,35,63,.16)'; ctx.fillRect(12+i*bw, H-bh-6, bw-6, bh);}
  } else if(kind==='boxes'){
    ctx.strokeStyle=acc; ctx.lineWidth=1.8;
    for(let i=0;i<4;i++){const bx=14+rand()*(W-90),by=12+rand()*(H-60),bw=30+rand()*40,bh=18+rand()*26; ctx.strokeRect(bx,by,bw,bh); ctx.fillStyle=acc; ctx.fillRect(bx,by-4,bw*0.5,4);}
  }
}
const KIND={'bigmart-sales':'bars','credit-score-deploy':'scatter','insurance-claims-forecast':'line','sparc-repeat-priority':'bars','vehicle-detection':'boxes','credit-score':'bars','spaceship-titanic':'scatter','diabetes-ann':'line','stock-lstm':'line','healthcare-journey':'bars'};
$('#proj-grid').innerHTML = DATA.projects.map((p,i)=>{
  const metrics=(p.metrics||[]).slice(0,2).map(m=>`<div class="m"><span class="mv">${esc(m.v)}</span><span class="mk">${esc(m.k)}</span></div>`).join('');
  const tags=(p.tech||[]).slice(0,4).map(t=>`<span class="proj-tag">${esc(t)}</span>`).join('');
  const gh = p.github?`<a class="icon-link" href="${esc(p.github)}" target="_blank" rel="noopener" aria-label="GitHub" onclick="event.stopPropagation()">${IC.github}</a>`:'';
  const dm = p.demo?`<a class="icon-link" href="${esc(p.demo)}" target="_blank" rel="noopener" aria-label="Live Demo" onclick="event.stopPropagation()">${IC.external}</a>`:'';
  return `
  <article class="proj-card reveal" data-d="${(i%3)+1}" data-id="${esc(p.id)}" tabindex="0" role="button" aria-label="View details for ${esc(p.title)}">
    <div class="proj-thumb"><span class="proj-cat">${esc(p.category)}</span><canvas data-thumb="${esc(p.id)}"></canvas></div>
    <div class="proj-body">
      <h3>${esc(p.title)}</h3>
      <p class="proj-desc">${esc(p.short)}</p>
      ${metrics?`<div class="proj-metrics">${metrics}</div>`:''}
      <div class="proj-tags">${tags}</div>
      <div class="proj-foot">
        <span class="proj-open">View details ${IC.arrow}</span>
        <span class="proj-links">${gh}${dm}</span>
      </div>
    </div>
  </article>`;
}).join('');

function renderThumbs(){ $$('#proj-grid canvas').forEach((c,idx)=>{ const id=c.getAttribute('data-thumb'); drawThumb(c, 1000+idx*777, KIND[id]||'line'); }); }
renderThumbs();
let rz; window.addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(renderThumbs,200);});

/* ---- experience timeline ---- */
$('#timeline').innerHTML = DATA.experience.map(e=>`
  <div class="tl-item">
    <div class="tl-period">${esc(e.period)}</div>
    <h3>${esc(e.role)}</h3>
    <div class="tl-org">${esc(e.org)}</div>
    ${e.desc?`<p class="tl-desc">${esc(e.desc)}</p>`:''}
    ${(e.points&&e.points.length)?`<ul class="tl-list">${e.points.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}
  </div>`).join('');

/* ---- education ---- */
const ED=DATA.education;
$('#edu-col').innerHTML = `
  <div class="edu-card">
    <h3>${esc(ED.school)}</h3>
    <div class="deg">${esc(ED.degree)}</div>
    <div class="edu-meta">
      <span>Started: ${esc(ED.start)}</span><span>${esc(ED.graduation)}</span>${ED.gpa?`<span>GPA: ${esc(ED.gpa)}</span>`:''}
    </div>
    <div class="edu-block">
      <div class="lab">Relevant Coursework</div>
      <div class="course-chips">${ED.coursework.map(c=>`<span class="chip">${esc(c)}</span>`).join('')}</div>
    </div>
    ${(ED.achievements&&ED.achievements.length)?`<div class="edu-block"><div class="lab">Achievements</div><ul class="tl-list" style="margin-top:0">${ED.achievements.map(a=>`<li>${esc(a)}</li>`).join('')}</ul></div>`:''}
  </div>`;

/* ---- competitions (hide block if empty; klik untuk buka sertifikat) ---- */
(function(){
  const list=$('#comp-list'); const wrap=$('#comp-col');
  if(!DATA.competitions || DATA.competitions.length===0){ wrap.style.display='none'; return; }
  list.innerHTML = DATA.competitions.map(c=>{
    const hasCert = !!c.cert;
    const clickable = hasCert
      ? ` data-cert="${esc(c.cert)}" data-cert-title="${esc(c.name)}" role="button" tabindex="0" aria-label="View certificate for ${esc(c.name)}"`
      : '';
    const cls = 'comp-item' + (hasCert ? ' has-cert' : '');
    const badge = c.result ? `<span class="comp-badge">${esc(c.result)}</span>` : '';
    const viewChip = hasCert ? `<span class="cert-view">${IC.zoom}<span>Certificate</span></span>` : '';
    const linkOut = c.url ? `<a class="comp-link" href="${esc(c.url)}" target="_blank" rel="noopener" aria-label="Open credential" onclick="event.stopPropagation()">${IC.external}</a>` : '';
    return `
    <div class="${cls}"${clickable}>
      <span class="comp-ic">${IC.award}</span>
      <div class="comp-info">
        <h4>${esc(c.name)}</h4>
        <div class="meta">${esc(c.organizer)}${c.year?' · '+esc(c.year):''}</div>
        ${badge}
      </div>
      ${viewChip}${linkOut}
    </div>`;
  }).join('');

  // open modal on click / Enter / Space
  function openFrom(el){
    const src = el.getAttribute('data-cert');
    const title = el.getAttribute('data-cert-title') || 'Sertifikat';
    openCert(src, title);
  }
  list.addEventListener('click', e=>{
    const el = e.target.closest('.comp-item.has-cert'); if(!el) return;
    if(e.target.closest('a')) return;
    openFrom(el);
  });
  list.addEventListener('keydown', e=>{
    if(e.key!=='Enter' && e.key!==' ') return;
    const el = e.target.closest('.comp-item.has-cert'); if(!el) return;
    e.preventDefault(); openFrom(el);
  });
})();

/* ---- certificate modal ---- */
function openCert(src, title){
  const m = $('#certModal');
  const img = m.querySelector('.cert-img');
  img.removeAttribute('src'); // force reload
  img.alt = title + ' certificate';
  img.src = src;
  m.querySelector('.cert-title').textContent = title;
  m.classList.add('open');
  document.body.classList.add('locked');
  m.querySelector('.cert-close').focus();
}
function closeCert(){
  const m = $('#certModal');
  m.classList.remove('open');
  document.body.classList.remove('locked');
}
(function(){
  const m = $('#certModal'); if(!m) return;
  m.addEventListener('click', e=>{ if(e.target===m || e.target.classList.contains('cert-backdrop')) closeCert(); });
  m.querySelector('.cert-close').addEventListener('click', closeCert);
  document.addEventListener('keydown', e=>{ if(e.key==='Escape' && m.classList.contains('open')) closeCert(); });
})();

/* ---- contact list (no form) ---- */
(function(){
  let rows = `
  <div class="contact-row">
    <span class="ic">${IC.mail}</span>
    <div class="info"><div class="lab">Email</div><div class="val">${esc(P.email)}</div></div>
    <button class="act" data-copy="${esc(P.email)}">Copy</button>
  </div>`;
  if(waLink){
    rows += `
    <div class="contact-row wa-row">
      <span class="ic">${IC.whatsapp}</span>
      <div class="info"><div class="lab">WhatsApp</div><div class="val">${esc(waDisplay)}</div></div>
      <a class="act wa" href="${esc(waLink)}" target="_blank" rel="noopener">${IC.whatsapp} Chat</a>
    </div>`;
  }
  rows += `
  <div class="contact-row">
    <span class="ic">${IC.linkedin}</span>
    <div class="info"><div class="lab">LinkedIn</div><div class="val">${esc(P.linkedin.replace(/^https?:\/\//,''))}</div></div>
    <a class="act" href="${esc(P.linkedin)}" target="_blank" rel="noopener">Open</a>
  </div>
  <div class="contact-row">
    <span class="ic">${IC.github}</span>
    <div class="info"><div class="lab">GitHub</div><div class="val">${esc(P.github.replace(/^https?:\/\//,''))}</div></div>
    <a class="act" href="${esc(P.github)}" target="_blank" rel="noopener">Open</a>
  </div>`;
  $('#contact-list').innerHTML = rows;
})();

/* ---- CV button ---- */
(function(){
  const btn=$('#cv-btn');
  if(P.cvUrl){ btn.href=P.cvUrl; }
  else {
    btn.href='#cv';
    btn.addEventListener('click',(e)=>{
      e.preventDefault();
      btn.innerHTML = '<span style="font-size:14px">Add your CV URL in DATA &rarr; cvUrl</span>';
      setTimeout(()=>{ btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg> Download CV'; }, 2600);
    });
  }
})();

/* =====================================================================
   ██  PROJECT DETAIL OVERLAY  ██
   ===================================================================== */
const detail=$('#detail'), detailPanel=$('#detailPanel');
let lastFocus=null;

function metricTiles(arr){
  if(!arr||!arr.length) return '';
  return `<div class="metric-grid">${arr.map(m=>`<div class="metric-tile"><div class="mv">${esc(m.v)}</div><div class="mk">${esc(m.k)}</div></div>`).join('')}</div>`;
}
function listBlock(title,arr){
  if(!arr||!arr.length) return '';
  return `<div class="d-sec"><h3>${esc(title)}</h3><ul class="d-list">${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`;
}
function textBlock(title,txt){
  if(!txt) return '';
  return `<div class="d-sec"><h3>${esc(title)}</h3><p>${esc(txt)}</p></div>`;
}

function openDetail(id){
  const p=DATA.projects.find(x=>x.id===id); if(!p) return;
  const d=p.detail||{};
  const actions=[];
  if(p.github) actions.push(`<a class="btn btn-ghost" href="${esc(p.github)}" target="_blank" rel="noopener">${IC.github} GitHub Repository</a>`);
  if(p.demo) actions.push(`<a class="btn btn-primary" href="${esc(p.demo)}" target="_blank" rel="noopener">${IC.play} Live Demo</a>`);
  detailPanel.innerHTML = `
    <button class="detail-close" id="detailClose" aria-label="Close details">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="detail-hero">
      <div class="detail-cat">${esc(p.category)}</div>
      <h2>${esc(p.title)}</h2>
      <p class="detail-lead">${esc(d.overview||p.short)}</p>
      <div class="detail-tags">${(p.tech||[]).map(t=>`<span class="proj-tag">${esc(t)}</span>`).join('')}</div>
      ${actions.length?`<div class="detail-actions">${actions.join('')}</div>`:''}
    </div>
    <div class="detail-body">
      ${textBlock('Problem Statement', d.problem)}
      ${textBlock('Dataset', d.dataset)}
      ${listBlock('Data Preparation', d.dataPrep)}
      ${Array.isArray(d.eda) ? listBlock('Exploratory Data Analysis', d.eda) : textBlock('Exploratory Data Analysis', d.eda)}
      ${textBlock('Methodology', d.methodology)}
      ${textBlock('Model', d.model)}
      ${(d.metrics&&d.metrics.length)?`<div class="d-sec"><h3>Evaluation</h3>${metricTiles(d.metrics)}</div>`:''}
      ${d.results?`<div class="d-sec"><h3>Results</h3><div class="result-box"><p>${esc(d.results)}</p></div></div>`:''}
      ${listBlock('Key Insights', d.insights)}
      ${listBlock('Challenges', d.challenges)}
      ${listBlock('Future Improvements', d.future)}
      ${listBlock('Recommendations', d.recommendations)}
    </div>`;
  lastFocus=document.activeElement;
  detail.classList.add('open'); document.body.classList.add('locked');
  detail.scrollTop=0;
  $('#detailClose').addEventListener('click',closeDetail);
  $('#detailClose').focus();
  history.replaceState(null,'', '#'+id);
}
function closeDetail(){
  detail.classList.remove('open'); document.body.classList.remove('locked');
  if(location.hash) history.replaceState(null,'', location.pathname+location.search);
  if(lastFocus&&lastFocus.focus) lastFocus.focus();
}
detail.addEventListener('click',e=>{ if(e.target===detail) closeDetail(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&detail.classList.contains('open')) closeDetail(); });

$('#proj-grid').addEventListener('click',e=>{ const card=e.target.closest('.proj-card'); if(card) openDetail(card.getAttribute('data-id')); });
$('#proj-grid').addEventListener('keydown',e=>{ if((e.key==='Enter'||e.key===' ')){ const card=e.target.closest('.proj-card'); if(card){ e.preventDefault(); openDetail(card.getAttribute('data-id')); } } });

(function(){ const h=location.hash.replace('#',''); if(h && DATA.projects.some(p=>p.id===h)) openDetail(h); })();

/* =====================================================================
   ██  INTERACTIONS  ██
   ===================================================================== */
const menu=$('#mobileMenu'), scrim=$('#scrim'), toggle=$('#navToggle');
function openMenu(){menu.classList.add('open');scrim.classList.add('show');toggle.setAttribute('aria-expanded','true');document.body.classList.add('locked');}
function closeMenu(){menu.classList.remove('open');scrim.classList.remove('show');toggle.setAttribute('aria-expanded','false');document.body.classList.remove('locked');}
toggle.addEventListener('click',openMenu);
$('#menuClose').addEventListener('click',closeMenu);
scrim.addEventListener('click',closeMenu);
$$('#mobileMenu a').forEach(a=>a.addEventListener('click',closeMenu));

const nav=$('#nav'), toTop=$('#toTop');
window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  nav.classList.toggle('scrolled', y>10);
  toTop.classList.toggle('show', y>600);
},{passive:true});
toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const io=new IntersectionObserver((ents)=>{
  ents.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
},{threshold:0.12, rootMargin:'0px 0px -8% 0px'});
$$('.reveal').forEach(el=>io.observe(el));
window.addEventListener('load',()=>setTimeout(()=>$$('.reveal:not(.in)').forEach(el=>{const r=el.getBoundingClientRect(); if(r.top<window.innerHeight) el.classList.add('in');}),300));

document.addEventListener('click',e=>{
  const b=e.target.closest('[data-copy]'); if(!b) return;
  const txt=b.getAttribute('data-copy'); const orig=b.textContent;
  const done=()=>{ b.textContent='Copied ✓'; setTimeout(()=>b.textContent=orig,1600); };
  if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(done).catch(()=>selectText(b,txt)); }
  else selectText(b,txt);
});
function selectText(b,txt){ const t=document.createElement('textarea'); t.value=txt; t.style.position='fixed'; t.style.opacity='0'; document.body.appendChild(t); t.select(); try{document.execCommand('copy'); b.textContent='Copied ✓';}catch(_){ b.textContent='Copy manually'; } setTimeout(()=>{document.body.removeChild(t);},50); setTimeout(()=>b.textContent='Copy',1600); }

const navMap={}; $$('.nav-links a[href^="#"]').forEach(a=>navMap[a.getAttribute('href').slice(1)]=a);
const secObs=new IntersectionObserver((ents)=>{
  ents.forEach(en=>{ const a=navMap[en.target.id]; if(!a) return; if(en.isIntersecting){ $$('.nav-links a').forEach(x=>x.style.color=''); a.style.color='var(--accent-ink)'; } });
},{rootMargin:'-45% 0px -50% 0px'});
['skills','projects','experience','education','contact'].forEach(id=>{const el=document.getElementById(id); if(el) secObs.observe(el);});
