const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const shuf=a=>{a=[...a];for(let i=a.length;i>1;){const j=Math.random()*i--|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const NAV=[['index.html','Home','home'],['portfolio.html','Portfolio','portfolio'],['clients.html','Galleries','clients'],['about.html','About','about'],['contact.html','Contact','contact']];
const NV=()=>NAV.filter(n=>n[2]=='home'||!((C.vis||{})['nav_'+n[2]]===false));
const P=document.body.dataset.p;let C={},LB=[],LI=0;
const DFL={story:"I didn't pick up a camera to make perfect pictures. I picked it up to keep real moments from slipping away.\n\nOn a wedding day I stay close but quiet, watching for the glances, the nervous laughs, the blessings of elders and the tears nobody planned. Those are the frames families return to years later.\n\nMy style is natural, candid and unhurried. I work with the light and the moment as they are, and I edit honestly, so your gallery feels like your day, nothing more and nothing less.",services:[{"t": "Weddings", "d": "Full-day coverage of rituals, family and the small in-between moments."}, {"t": "Pre-wedding & engagement", "d": "Relaxed, story-led shoots in places that mean something to you."}, {"t": "Haldi, Mehendi & Sangeet", "d": "Colour, music and energy, captured as it happens."}, {"t": "Portraits", "d": "Honest portraits for brides, grooms, families and brands."}],note:"Tell me about your day: date, venue and what matters most. I reply personally."};
const wk=()=>(C.portfolio||[]).length?C.portfolio.map(s=>({src:s})):pics();
const ME=[['.hero h1','b:name'],['.logo','lg:logoText'],['#portrait','b:portrait'],['#mq','r'],['#igsec','i'],['#feat','pf'],['#gal','c'],['#apics','a']];
const pos=s=>(C.focus||{})[s]||'50% 50%';
const imgp=(s,h=0)=>s?`<img src="${s}" alt="" style="object-position:${pos(s)}">`:`<span class="ph" style="--h:${h}"></span>`;
const th=s=>/^\/images\/[^/]/.test(s||'')?s.replace('/images/','/images/t/'):s;
const thimg=(s,x='')=>`<img src="${th(s)}"${th(s)!=s?` onerror="this.onerror=null;this.src='${s}'"`:''} alt="" decoding="async"${x}>`;
const imgt=(s,h=0)=>s?`<img src="${th(s)}"${th(s)!=s?` onerror="this.onerror=null;this.src='${s}'"`:''} alt="" decoding="async" style="object-position:${pos(s)}">`:`<span class="ph" style="--h:${h}"></span>`;
const RC={};
const getR=s=>{const d=(C.dims||{})[s];if(d)return Promise.resolve(d[0]/d[1]);return RC[s]||(RC[s]=new Promise(res=>{const a=new Image();a.onload=()=>res(a.naturalWidth/a.naturalHeight||.8);a.onerror=()=>{const b=new Image();b.onload=()=>res(b.naturalWidth/b.naturalHeight||.8);b.onerror=()=>res(.8);b.src=s};a.src=th(s)}))};
function lprog(el){let bar=$('#lp');if(!bar){document.body.insertAdjacentHTML('beforeend','<div id="lp"><i></i><span></span></div>');bar=$('#lp')}
 const imgs=$$('img',el),t=Math.min(12,imgs.length);let n=0;const upd=()=>{bar.firstChild.style.width=(t?n/t*100:100)+'%';bar.lastChild.textContent=n<t?`Loading pictures ${n} / ${t}`:'';bar.classList.toggle('done',n>=t)};
 imgs.forEach((im,k)=>{const d=()=>{im.classList.add('l');if(im._c)return;im._c=1;if(k<12){n++;upd()}};im.complete&&im.naturalWidth?d():(im.addEventListener('load',d),im.addEventListener('error',d))});upd()}
async function mason(el,items){const gen=el._g=(el._g||0)+1;el._items=items;
 await Promise.all(items.map(async p=>{if(p.r==null)p.r=p.src?await getR(p.src):.8}));if(el._g!=gen)return;
 const n=innerWidth<700?2:3,H=Array(n).fill(0),cols=Array.from({length:n},()=>[]);
 items.forEach((p,i)=>{const k=H.indexOf(Math.min(...H));cols[k].push([p,i]);H[k]+=1/p.r});
 el.innerHTML=cols.map(c=>`<div class="mc">${c.map(([p,i])=>`<figure class="t" ${p.src?`data-s="${p.src}"`:''} style="aspect-ratio:${p.r};--d:${Math.min(i,10)}">${p.src?thimg(p.src,i<8?'':' loading="lazy"'):`<span class="ph"></span>`}</figure>`).join('')}</div>`).join('');
 el._n=n;bind(el,items);lprog(el);
 if(!window.__mr){window.__mr=1;addEventListener('resize',()=>{const m=$('.mas');if(m&&m._items&&(innerWidth<700?2:3)!=m._n)mason(m,m._items)})}}
const at=(l,i,x)=>PV?` data-item="${l}:${i}"${x.hide?' data-hid="1"':''}`:'';
const shown=a=>(a||[]).map((x,i)=>[x,i]).filter(([x])=>PV||!x.hide);
const em=s=>String(s).replace(/\*(.+?)\*/g,'<em>$1</em>');
const logoHtml=()=>{if(C.logoImg)return `<img src="${C.logoImg}" alt="${C.name||''}" style="height:34px;width:auto">`;const m=C.logoMark===undefined?(C.name||'JP').split(' ').filter(Boolean).map(w=>w[0]).join(''):C.logoMark,t=C.logoText===undefined?(C.name||''):C.logoText;return (m?`${m}<i>.</i> `:'')+t};
function favicon(){if(!C.favicon)return;let l=document.querySelector('link[rel="icon"]');if(!l){l=document.createElement('link');l.rel='icon';document.head.appendChild(l)}l.href=C.favicon}
const TF=[['#kick','kicker'],['#role','role'],['#stat-intro','intro'],['#about','about'],['#quote','intro'],['#cnote','contactNote'],['#story','story'],['#svc h3','t'],['#svc p','d'],['#pts h3','t'],['#pts p','d'],['#stats b','n'],['#stats span:not(.itb)','l']];
function markText(){TF.forEach(([s,f])=>$$(s).forEach(el=>{let path=f;if(/^[tdnl]$/.test(f)){const it=el.closest('[data-item]');if(!it)return;const [l,i]=it.dataset.item.split(':');path=l+'.'+i+'.'+f}el.contentEditable='true';el.spellcheck=false;el.dataset.f=path}))}
function markItems(){$$('[data-item]').forEach(el=>{if(el.tagName=='DETAILS')return;el.insertAdjacentHTML('beforeend','<span class="itb"><button data-ia="hide" title="Hide / show">👁</button><button data-ia="del" title="Remove">✕</button></span>')})}
const pics=(pub=true)=>(C.clients||[]).filter(c=>!pub||!c.private).flatMap(c=>(c.photos||[]).map(s=>({src:s,client:c.name,slug:c.slug})));
const tile=(p,cap)=>`<figure class="t" ${p.src?`data-s="${p.src}"`:''}>${p.src?`<img src="${p.src}" alt="${p.client||'Photo'}" loading="lazy">`:`<span class="ph" style="--h:${p.h||0}"></span>`}${cap?`<figcaption>${cap}</figcaption>`:''}</figure>`;
const demo=n=>Array.from({length:n},(_,i)=>({h:i%5,client:'Client'}));
const img=(s,h=0)=>s?`<img src="${s}" alt="">`:`<span class="ph" style="--h:${h}"></span>`;
const txt=(id,v)=>{const e=document.getElementById(id);if(e&&v!=null)e.textContent=v};
function bind(root,list){root.onclick=e=>{const f=e.target.closest('.t[data-s]');if(!f)return;LB=list.filter(p=>p.src).map(p=>p.src);LI=LB.indexOf(f.dataset.s);show()}}
function show(){const l=$('#lb');l.classList.add('o');$('img',l).src=LB[LI];$('small',l).textContent=`${LI+1} / ${LB.length}`}
function shell(){
 document.body.insertAdjacentHTML('afterbegin',`<header id="hd"><div class="wrap"><a class="logo" href="index.html">${logoHtml()}</a><button id="mb" aria-label="Menu">☰</button><nav>${NV().map(n=>`<a href="${n[0]}" class="${n[2]==P?'on':''}">${n[1]}</a>`).join('')}</nav></div></header>`);
 document.body.insertAdjacentHTML('beforeend',`<footer id="ft"><div class="wrap"><div class="r"><div>${NV().map(n=>`<a href="${n[0]}">${n[1]}</a>`).join('')}</div><div><a href="mailto:${C.email}">${C.email}</a><a href="${C.instagram}">Instagram</a></div><div>© ${new Date().getFullYear()} ${C.name||''}</div></div></div></footer><div id="lb"><button class="x">×</button><button class="p">‹</button><img alt=""><button class="n">›</button><small></small></div>`);
 const l=$('#lb'),mv=d=>{LI=(LI+d+LB.length)%LB.length;show()};
 $('.x',l).onclick=()=>l.classList.remove('o');$('.p',l).onclick=()=>mv(-1);$('.n',l).onclick=()=>mv(1);
 document.onkeydown=e=>{if(!l.classList.contains('o'))return;if(e.key=='Escape')l.classList.remove('o');if(e.key=='ArrowLeft')mv(-1);if(e.key=='ArrowRight')mv(1)};
 $('#mb').onclick=()=>$('nav').classList.toggle('o');
 addEventListener('scroll',()=>$('#hd').classList.toggle('s',scrollY>40),{passive:true});
 document.title=(document.title.split('—')[0]).trim()+' — '+C.name;
}
function common(){
 txt('about',C.about);txt('stat-intro',C.intro);
 const st=$('#stats');if(st)st.innerHTML=shown(C.stats).map(([s,i])=>`<div${at('stats',i,s)}><b>${s.n}</b><span>${s.l}</span></div>`).join('');
 const pt=$('#pts');if(pt)pt.innerHTML=shown(C.points).map(([p,i],n)=>`<div${at('points',i,p)}><b>0${n+1}</b><h3>${p.t}</h3><p>${p.d}</p></div>`).join('');
 const mq=$('#mq');if(mq){const h=(C.brands||[]).map(b=>`<span>${b.name}</span><b>✦</b>`).join('');mq.innerHTML=h+h+h+h}
 const pr=$('#portrait');if(pr)pr.innerHTML=imgp(C.portrait);
 const em=$('#em');if(em){em.href='mailto:'+C.email;txt('emt',C.email)}const ig=$('#ig');if(ig){ig.href=C.instagram;txt('igt','@'+(C.instagram||'').replace(/\/$/,'').split('/').pop())}
 const wa=$('#wa');if(wa&&C.phone){wa.hidden=false;wa.href='https://wa.me/'+C.phone;txt('wat','+'+C.phone)}
}
const cards=(list)=>list.map(c=>`<a class="cd rv" href="gallery.html?c=${c.slug}"><span class="cv">${imgt(c.cover||(c.photos||[])[0],c.name.length%5)}</span><div><small>${c.date||''} · ${(c.photos||[]).length} photos</small><h3>${c.name}</h3></div></a>`).join('');
function igInit(){const sec=$('#igsec');if(!sec)return;const it=(C.igItems||[]).flatMap((x,k)=>(PV||!x.hide?(x.covers||(x.cover?[x.cover]:[])):[]).map(s=>({src:s,url:x.url,k,h:x.hide})));
 if(!it.length){sec.style.display='none';return}
 const hn=(C.instagram||'').replace(/\/$/,'').split('/').pop();$('#igbtn').href=C.instagram||'#';$('#igbtn').textContent=hn?'@'+hn+' ↗':'Follow ↗';
 const half=Array.from({length:Math.max(1,Math.ceil(8/it.length))},()=>it).flat(),all=[...half,...half];
 $('#igr').innerHTML=all.map(x=>`<a class="igi"${PV?` data-item="igItems:${x.k}"${x.h?' data-hid="1"':''}`:''} href="${x.url||C.instagram}" target="_blank" rel="noopener">${thimg(x.src)}</a>`).join('');
 $('#igr').style.setProperty('--t',Math.max(30,half.length*7)+'s')}
const INIT={
home(){
 txt('kick',C.kicker);txt('role',C.role);
 {const nm=(C.name||'').trim().split(/\s+/).filter(Boolean),bs=$$('.hero h1 b');if(nm.length&&bs.length>1){bs[0].textContent=nm.length>1?nm.slice(0,-1).join(' '):nm[0];bs[1].innerHTML=nm.length>1?`<em>${nm[nm.length-1]}</em>`:''}}
const hp=(C.heroPics||[]).filter(Boolean);
 if(hp[0]&&!document.querySelector(`link[rel=preload][href="${hp[0]}"]`)){const l=document.createElement('link');l.rel='preload';l.as='image';l.href=hp[0];document.head.appendChild(l)}
 $('#slides').innerHTML=`<div class="trk">${(hp.length?hp:[null]).map(s=>`<div class="sl" style="${s?`background-image:url('${s}');background-position:${pos(s)}`:'background:radial-gradient(90% 80% at 30% 20%,#4a3426,#0d0c0b)'}"></div>`).join('')}</div>${hp.length>1?`<div class="dots">${hp.map((_,i)=>`<button aria-label="Slide ${i+1}" data-i="${i}"></button>`).join('')}</div>`:''}`;
 let k=0,dir=1;const trk=$('#slides .trk'),go=n=>{k=n;trk.style.transform=`translateX(-${k*100}%)`;$$('#slides .dots button').forEach((b,i)=>b.classList.toggle('on',i==k))};go(0);
 clearInterval(window.SL);if(hp.length>1){window.SL=setInterval(()=>{if(k+dir>=hp.length||k+dir<0)dir=-dir;go(k+dir)},5500);$$('#slides .dots button').forEach(b=>b.onclick=()=>go(+b.dataset.i))}
 const gp=()=>{const cap=2,pool=[...(C.portfolio||[]).map(s=>({src:s,g:'pf'})),...(C.clients||[]).filter(c=>!c.private).flatMap(c=>shuf(c.photos||[]).slice(0,cap).map(s=>({src:s,g:c.slug})))],out=[],cnt={};
  shuf(pool).forEach(p=>{if(out.length<6&&(cnt[p.g]||0)<(p.g=='pf'?6:cap)){out.push(p);cnt[p.g]=(cnt[p.g]||0)+1}});return out.length?out:demo(6)};
 const dims=ps=>Promise.all(ps.map(p=>new Promise(r=>{if(!p.src){p.r=.8;return r()}const i=new Image();i.onload=()=>{p.r=i.naturalWidth/i.naturalHeight||.8;r()};i.onerror=()=>{p.r=.8;r()};i.src=p.src})));
 const draw=async s=>{await Promise.all(s.map(async p=>{p.r=p.src?await getR(p.src):.8}));const per=innerWidth<700?2:3,rows=[];for(let i=0;i<s.length;i+=per)rows.push(s.slice(i,i+per));
  $('#feat').innerHTML=rows.map(r=>`<div class="fr">${r.map(p=>`<figure class="t" ${p.src?`data-s="${p.src}"`:''} style="flex:${p.r} 1 0;aspect-ratio:${p.r}">${p.src?`${thimg(p.src)}`:`<span class="ph" style="--h:${p.h||0}"></span>`}</figure>`).join('')}</div>`).join('');bind($('#feat'),s)};
 const sig=JSON.stringify([C.portfolio,(C.clients||[]).map(c=>[c.slug,c.photos,c.private])]);if(window.__fsig!=sig){window.__fsig=sig;window.__fs=gp()}
 window.__redraw=()=>draw(window.__fs);draw(window.__fs);$('#sh').onclick=()=>{window.__fs=gp();draw(window.__fs)};
 if(!window.__fr){window.__fr=1;let w0=innerWidth<700;addEventListener('resize',()=>{const w=innerWidth<700;if(w!=w0){w0=w;window.__redraw&&window.__redraw()}})}
 $('#gal').innerHTML=cards((C.clients||[]).filter(c=>!c.private).slice(0,3));
 const DEF=['who','stats','feat','pts','brands','ig','gal','cta'];let hm=(C.home||[]).slice();
 DEF.forEach((id,i)=>{if(!hm.some(h=>h.id==id)){const pi=hm.findIndex(h=>h.id==DEF[i-1]);hm.splice(pi+1,0,{id,show:true})}});
 let ref=$('.hero');hm.forEach(h=>{const e=$(`[data-sec="${h.id}"]`);if(!e)return;e.style.display=h.show===false?'none':'';ref.after(e);ref=e});
 igInit();
},
portfolio(){
 const s=(C.portfolio||[]).length?C.portfolio.map(src=>({src})):demo(9);mason($('#grid'),s);
},
clients(){$('#gal').innerHTML=cards((C.clients||[]).filter(c=>!c.private))},
gallery(){
 const s=new URLSearchParams(location.search).get('c'),c=(C.clients||[]).find(x=>x.slug==s);
 if(!c){$('#gt').textContent='Gallery not found';return}
 document.title=c.name+' — '+C.name;$('#gt').textContent=c.name;txt('gd',c.date);txt('gs',c.story);
 const ps=(c.photos||[]).length?c.photos.map(src=>({src,client:c.name})):demo(9);mason($('#grid'),ps);
},
about(){
 $('#story').innerHTML=(C.story||DFL.story).split(/\n\s*\n/).filter(Boolean).map(p=>`<p>${p}</p>`).join('');txt('quote',C.intro);
 txt('svcE',C.svcEyebrow||'What I shoot');$('#svcH').innerHTML=em(C.svcHeading||'What I *shoot*');
 $('#svc').innerHTML=shown((C.services||[]).length?C.services:DFL.services).map(([s,i],n)=>`<div${at('services',i,s)}>${s.img?`<i class="si"><img src="${s.img}" alt=""></i>`:''}<b>0${n+1}</b><h3>${s.t}</h3><p>${s.d}</p></div>`).join('');
 const ap=C.aboutPics||[];$('#apsec').style.display=ap.length?'':'none';$('#apics').innerHTML=ap.map(s=>`<img src="${s}" alt="">`).join('');
},
contact(){
 txt('cnote',C.contactNote||DFL.note);$('#tc').onclick=e=>{const b=e.target.closest('button');if(!b)return;e.preventDefault();$$('#tc button').forEach(x=>x.classList.remove('on'));b.classList.add('on');$('#ty').value=b.textContent};
 if((C.faq||[]).length)$('#faq').innerHTML=shown(C.faq).map(([x])=>`<details><summary>${x.q}</summary><p>${x.a}</p></details>`).join('');
 $('#f').onsubmit=async e=>{e.preventDefault();txt('ok','Sending…');
 try{const r=await fetch(C.formEndpoint,{method:'POST',body:new FormData(e.target),headers:{Accept:'application/json'}});if(!r.ok)throw 0;e.target.reset();txt('ok',"Thank you — I'll reply to you personally, soon.")}catch{txt('ok','Could not send. Please email me directly.')}}}
};
const PV=new URLSearchParams(location.search).has('preview');
const obs=()=>{const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&(e.target.classList.add('on'),io.unobserve(e.target))),{threshold:.1});$$('.rv').forEach(x=>io.observe(x))};
function theme(){const t=C.theme||{},s=document.documentElement.style,set=(k,v)=>v?s.setProperty(k,v):s.removeProperty(k);
 set('--acc',t.accent);set('--hs',t.heroScale&&t.heroScale/100);set('--ds',t.headScale&&t.headScale/100);set('--bs',t.bodyScale&&t.bodyScale/100);
 set('--d',t.headFont&&`'${t.headFont}',serif`);set('--bf',t.bodyFont&&`'${t.bodyFont}',sans-serif`);
 [t.headFont,t.bodyFont].filter(Boolean).forEach(n=>{const id='gf-'+n.replace(/\W/g,'');if(!document.getElementById(id)){const l=document.createElement('link');l.id=id;l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family='+n.replace(/ /g,'+')+':ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap';document.head.appendChild(l)}})}
function boot(c){C=c;theme();const bc=document.body.classList;[...bc].filter(x=>x.startsWith('x-')).forEach(x=>bc.remove(x));Object.entries(C.vis||{}).forEach(([k,v])=>v===false&&bc.add('x-'+k));
 $$('#hd,#ft,#lb').forEach(e=>e.remove());shell();common();INIT[P]&&INIT[P]();obs();favicon();if(PV){markItems();markText()}
 if(PV){bc.add('pv');ME.forEach(([s,p])=>$$(s).forEach(x=>x.dataset.edit=p));$$('a[href]').forEach(a=>{const h=a.getAttribute('href');if(/\.html/.test(h)&&!/preview/.test(h))a.setAttribute('href',h+(h.includes('?')?'&':'?')+'preview=1')})}}
if(PV){addEventListener('message',e=>{if(e.origin!=location.origin||!e.data)return;if(e.data.type=='content')boot(e.data.data);if(e.data.type=='scroll'){const el=$(e.data.sel);el&&el.scrollIntoView({behavior:'smooth',block:'center'})}});
 document.addEventListener('click',e=>{const ia=e.target.closest('[data-ia]');if(ia){e.preventDefault();e.stopPropagation();const it=ia.closest('[data-item]'),[l,i]=it.dataset.item.split(':');parent.postMessage({type:'item',list:l,i:+i,act:ia.dataset.ia},location.origin);return}
  const t=e.target.closest('[data-edit]');if(t&&!e.target.closest('[data-f]')){e.preventDefault();e.stopPropagation();parent.postMessage({type:'edit',path:t.dataset.edit},location.origin)}},true);
 document.addEventListener('input',e=>{const el=e.target.closest('[data-f]');if(!el)return;const f=el.dataset.f,v=f=='story'?[...el.querySelectorAll('p')].map(p=>(p.innerText??p.textContent).trim()).join('\n\n'):(el.innerText??el.textContent).trim();parent.postMessage({type:'text',path:f,value:v},location.origin)});
 document.addEventListener('keydown',e=>{const el=e.target.closest&&e.target.closest('[data-f]');if(el&&e.key=='Enter'&&el.dataset.f!='story'&&el.dataset.f!='about'){e.preventDefault();el.blur()}});
 document.addEventListener('paste',e=>{const el=e.target.closest&&e.target.closest('[data-f]');if(!el)return;e.preventDefault();document.execCommand('insertText',false,(e.clipboardData||window.clipboardData).getData('text/plain'))});
 parent.postMessage({type:'ready'},location.origin)}
else fetch('content.json?t='+Date.now(),{cache:'no-store'}).then(r=>r.json()).catch(()=>({})).then(boot);
