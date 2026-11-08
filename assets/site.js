(function(){const p=location.pathname;if(/\.html$/.test(p)){const n=p.replace(/\/index\.html$/,'/').replace(/\.html$/,'');history.replaceState(null,'',(n||'/')+location.search+location.hash)}})();
const jpDialogReady=window.JPDialog?Promise.resolve():new Promise(resolve=>{const s=document.createElement('script');s.src='/assets/dialog.js';s.onload=resolve;s.onerror=resolve;document.head.appendChild(s)});
const $=(s,r=document)=>r.querySelector(s),$=(s,r=document)=>[...r.querySelectorAll(s)];
const shuf=a=>{a=[...a];for(let i=a.length;i>1;){const j=Math.random()*i--|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const NAV=[['/','Home','home'],['/portfolio','Portfolio','portfolio'],['/clients','Galleries','clients'],['/about','About','about'],['/contact','Contact','contact']];
const NV=()=>NAV.filter(n=>n[2]=='home'||!((C.vis||{})['nav_'+n[2]]===false));
const P=document.body.dataset.p;let C={},LB=[],LI=0;
const waNumber=()=>String(C.phone||'').replace(/\D/g,'');
const waHref=(message='')=>{const n=waNumber();return n?`https://wa.me/${n}${message?'?text='+encodeURIComponent(message):''}`:''};
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
const LAY=l=>{l=l||{};return{s:l.style||'masonry',g:(l.gap===undefined||l.gap==='')?14:+l.gap,c:+l.cols||3,m:+l.mcols||2,r:+l.round||0}};
async function mason(el,all,lay){const gen=el._g=(el._g||0)+1;el._items=all;el._lay=lay;const L=LAY(lay);let items=all;
 await Promise.all(items.map(async p=>{if(p.r==null)p.r=p.src?await getR(p.src):.8}));if(el._g!=gen)return;
 if(L.s=='portrait'){const f=items.filter(p=>p.r<=.92);if(f.length)items=f}
 const n=L.s=='pair'?2:(innerWidth<700?L.m:L.c);el.className='mas '+({grid:'gridl',rows:'rowsl',pair:'rowsl',stack:'stackl',strip:'stripl',story:'storyl',portrait:'portl'}[L.s]||'');el.style.setProperty('--g',L.g+'px');el.style.setProperty('--rd',L.r+'px');el.style.setProperty('--n',n);
 const tile=(p,i,sq)=>`<figure class="t" ${p.src?`data-s="${p.src}"`:''} style="aspect-ratio:${sq||p.r};--d:${Math.min(i,10)}">${p.src?thimg(p.src,i<8?'':' loading="lazy"'):`<span class="ph"></span>`}${window.__dlon&&p.src?`<a class="dli" href="${dlSrc(p.src)}" download="${dlName(p.src)}" title="Download" aria-label="Download">${DLI}</a>`:''}</figure>`;let html;
 if(L.s=='grid')html=items.map((p,i)=>tile(p,i,1)).join('');
 else if(L.s=='portrait')html=items.map((p,i)=>tile(p,i,'2/3')).join('');
 else if(L.s=='story'){const m=innerWidth<700;html=items.map((p,i)=>tile(p,i).replace('style="','style="--w:'+(p.r>1?(m?92:68):(m?68:42))+'%;')).join('')}
 else if(L.s=='stack'||L.s=='strip')html=items.map((p,i)=>tile(p,i)).join('');
 else if(L.s=='rows'||L.s=='pair'){const W=el.clientWidth||1000,avg=items.reduce((s,p)=>s+p.r,0)/(items.length||1)||1,th=W/(n*avg),rows=[];let cur=[],sum=0;
  items.forEach((p,i)=>{cur.push([p,i]);sum+=p.r;if(sum*th+L.g*(cur.length-1)>=W){rows.push({a:cur,s:sum,last:0});cur=[];sum=0}});if(cur.length)rows.push({a:cur,s:sum,last:1});
  html=rows.map(r=>{const w=Math.round(r.s*th+L.g*(r.a.length-1)),full=!r.last||w>=W*.7;return `<div class="fr2"${full?'':` style="max-width:${w}px"`}>${r.a.map(([p,i])=>tile(p,i).replace('style="','style="flex:'+p.r+' 1 0;')).join('')}</div>`}).join('')}
 else{const H=Array(n).fill(0),cols=Array.from({length:n},()=>[]);items.forEach((p,i)=>{const k=H.indexOf(Math.min(...H));cols[k].push([p,i]);H[k]+=1/p.r});html=cols.map(c=>`<div class="mc">${c.map(([p,i])=>tile(p,i)).join('')}</div>`).join('')}
 el.innerHTML=html;el._n=n;bind(el,items);lprog(el);
 if(!window.__mr){window.__mr=1;let tt;addEventListener('resize',()=>{clearTimeout(tt);tt=setTimeout(()=>{const m=$('.mas');if(m&&m._items){const l=LAY(m._lay),k=innerWidth<700?l.m:l.c;if(l.s=='rows'||l.s=='pair'||l.s=='story'||k!=m._n)mason(m,m._items,m._lay)}},150)})}}
const DLI='<svg class="dlsv" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>';
const LOCK='<svg class="lk" viewBox="0 0 24 24" role="img" aria-label="PIN protected"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
const dlSrc=p=>(C.hi||{})[p]||p;
const dlName=p=>{const c=window.__dlc||{},i=(c.photos||[]).indexOf(p),q=dlSrc(p),ext=(q.match(/\.(\w+)$/)||[0,'jpg'])[1];return `${c.slug||'photo'}-${String(i+1).padStart(3,'0')}.${ext}`};
async function sha(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
function gate(c,ok){document.body.insertAdjacentHTML('beforeend',`<div id="gate"><i class="gbg"></i><form><span class="eb">Private gallery</span><h2>${c.name}</h2><p>Enter the PIN you were given to open this gallery.</p><input type="password" id="pin" autocomplete="off" placeholder="PIN" aria-label="PIN"><button class="btn f">Open gallery</button><small id="pe"></small></form></div>`);
 const f=$('#gate form'),bg=c.cover||(c.photos||[])[0];if(bg){const im=new Image();im.onload=()=>{const g=$('#gate .gbg');if(g){g.style.backgroundImage=`url('${bg}')`;g.style.backgroundPosition=pos(bg);g.classList.add('on')}};im.src=bg}
 setTimeout(()=>$('#pin').focus(),50);
 f.onsubmit=async e=>{e.preventDefault();const v=$('#pin').value.trim(),h=await sha((c.pinSalt||'')+v);
  if(h==c.pinHash){try{sessionStorage.setItem('pin_'+c.slug,c.pinHash)}catch{}$('#gate').remove();ok()}
  else{$('#pe').textContent='That PIN is not correct.';f.classList.add('shake');setTimeout(()=>f.classList.remove('shake'),500);$('#pin').value=''}}}
async function dlBlob(a){a.classList.add('busy');try{const r=await fetch(a.href);if(!r.ok)throw 0;const b=await r.blob(),u=URL.createObjectURL(b),t=document.createElement('a');t.href=u;t.download=a.getAttribute('download')||'photo.jpg';document.body.appendChild(t);t.click();t.remove();setTimeout(()=>URL.revokeObjectURL(u),30000)}catch{window.open(a.href,'_blank')}a.classList.remove('busy')}
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a.dl,a.dli');if(a&&a.href&&!PV){e.preventDefault();e.stopPropagation();dlBlob(a)}},true);
async function gcover(c){const old=$('#gcov');if(old)old.remove();const pg=$('.pg');if(pg)pg.classList.remove('has-cover');
 const im=c.cover||(c.photos||[])[0];if(!im||c.showCover===false||!pg)return;pg.classList.add('has-cover');
 pg.insertAdjacentHTML('beforebegin',`<section id="gcov" class="gc-${c.coverSize||'full'}"><i class="gcb"></i><div class="gct">${c.date?`<span class="eb">${c.date}</span>`:''}<h1>${c.name}</h1><button class="gdn" aria-label="View pictures"><span></span></button></div></section>`);
 const b=$('#gcov .gcb'),t=new Image();t.onload=()=>b.classList.add('on');t.src=im;b.style.backgroundImage=`url('${im}')`;b.style.backgroundPosition=pos(im);
 $('#gcov .gdn').onclick=()=>pg.scrollIntoView({behavior:'smooth'})}
async function zipAll(c,btn){const sp=$('#dlp')||{};btn.disabled=true;
 try{if(!window.JSZip)await new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';s.onload=ok;s.onerror=no;document.head.appendChild(s)});
  const z=new JSZip(),ps=c.photos;let n=0;for(const p of ps){const r=await fetch(dlSrc(p));if(!r.ok)throw 0;z.file(dlName(p),await r.blob());n++;sp.textContent=`Preparing ${n} / ${ps.length}…`}
  const blob=await z.generateAsync({type:'blob',compression:'STORE'},m=>sp.textContent=`Zipping ${Math.round(m.percent)}%`),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=c.slug+'.zip';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),60000)}
 catch{await jpDialogReady;if(window.JPDialog)await JPDialog.alert('The download could not be prepared. Please try downloading the pictures one by one instead.');else console.error('Could not prepare the download. Please download the pictures one by one instead.')}sp.textContent='';btn.disabled=false}
const at=(l,i,x)=>PV?` data-item="${l}:${i}"${x.hide?' data-hid="1"':''}`:'';
const shown=a=>(a||[]).map((x,i)=>[x,i]).filter(([x])=>PV||!x.hide);
const em=s=>String(s).replace(/\*(.+?)\*/g,'<em>$1</em>');
const logoHtml=()=>{if(C.logoImg)return `<img src="${C.logoImg}" alt="${C.name||''}" style="height:34px;width:auto">`;const m=C.logoMark===undefined?(C.name||'JP').split(' ').filter(Boolean).map(w=>w[0]).join(''):C.logoMark,t=C.logoText===undefined?(C.name||''):C.logoText;return (m?`${m}<i>.</i> `:'')+t};
function track(){const A=C.analytics||{};if(PV||!A.provider||A.provider=='off'||!A.id||window.__tr)return;
 try{if(localStorage.getItem('jp_notrack')=='1')return}catch{}
 window.__tr=1;const id=String(A.id).trim(),s=document.createElement('script');s.defer=true;
 if(A.provider=='cloudflare'){s.src='https://static.cloudflareinsights.com/beacon.min.js';s.setAttribute('data-cf-beacon',JSON.stringify({token:id}))}
 else if(A.provider=='goatcounter'){window.goatcounter={path:()=>location.pathname+location.search};s.src='https://gc.zgo.at/count.js';s.setAttribute('data-goatcounter','https://'+id.replace(/^https?:\/\//,'').replace(/\.goatcounter\.com.*$/,'')+'.goatcounter.com/count')}
 else if(A.provider=='plausible'){s.src='https://plausible.io/js/script.js';s.setAttribute('data-domain',id.replace(/^https?:\/\//,'').replace(/\/.*$/,''))}
 else return;document.head.appendChild(s)}
function favicon(){if(!C.favicon)return;let l=document.querySelector('link[rel="icon"]');if(!l){l=document.createElement('link');l.rel='icon';document.head.appendChild(l)}l.href=C.favicon}
const TF=[['#kick','kicker'],['#role','role'],['#stat-intro','intro'],['#about','about'],['#quote','intro'],['#cnote','contactNote'],['#story','story'],['#svc h3','t'],['#svc p','d'],['#pts h3','t'],['#pts p','d'],['#stats b','n'],['#stats span:not(.itb)','l']];
function markText(){TF.forEach(([s,f])=>$$(s).forEach(el=>{let path=f;if(/^[tdnl]$/.test(f)){const it=el.closest('[data-item]');if(!it)return;const [l,i]=it.dataset.item.split(':');path=l+'.'+i+'.'+f}el.contentEditable='true';el.spellcheck=false;el.dataset.f=path}))}
function markItems(){$$('[data-item]').forEach(el=>{if(el.tagName=='DETAILS')return;el.insertAdjacentHTML('beforeend','<span class="itb"><button data-ia="hide" title="Hide / show">👁</button><button data-ia="del" title="Remove">✕</button></span>')})}
const pics=(pub=true)=>(C.clients||[]).filter(c=>!pub||!c.private).flatMap(c=>(c.photos||[]).map(s=>({src:s,client:c.name,slug:c.slug})));
const tile=(p,cap)=>`<figure class="t" ${p.src?`data-s="${p.src}"`:''}>${p.src?`<img src="${p.src}" alt="${p.client||'Photo'}" loading="lazy">`:`<span class="ph" style="--h:${p.h||0}"></span>`}${cap?`<figcaption>${cap}</figcaption>`:''}</figure>`;
const demo=n=>Array.from({length:n},(_,i)=>({h:i%5,client:'Client'}));
const img=(s,h=0)=>s?`<img src="${s}" alt="">`:`<span class="ph" style="--h:${h}"></span>`;
const txt=(id,v)=>{const e=document.getElementById(id);if(e&&v!=null)e.textContent=v};
function bind(root,list){root.onclick=e=>{if(e.target.closest('.dli'))return;const f=e.target.closest('.t[data-s]');if(!f)return;LB=list.filter(p=>p.src).map(p=>p.src);LI=LB.indexOf(f.dataset.s);show()}}
function show(){const l=$('#lb');l.classList.add('o');$('img',l).src=LB[LI];$('small',l).textContent=`${LI+1} / ${LB.length}`;const dl=$('.dl',l);if(dl){if(window.__dlon){dl.hidden=false;dl.href=dlSrc(LB[LI]);dl.setAttribute('download',dlName(LB[LI]))}else dl.hidden=true}}
function footerHtml(){const F=C.ftr||{},s=F.style||'classic',yr=new Date().getFullYear(),cp=(F.copy||'© {year} {name}').replace(/\{year\}/g,yr).replace(/\{name\}/g,C.name||''),tg=F.tagline||'';
 const menu=F.menu!==false?NV().map(n=>`<a href="${n[0]}">${n[1]}</a>`):[],
  con=[F.email!==false&&C.email?`<a href="mailto:${C.email}">${C.email}</a>`:'',F.insta!==false&&C.instagram?`<a href="${C.instagram}" target="_blank" rel="noopener">Instagram</a>`:'',F.wa&&waNumber()?`<a href="${waHref()}" target="_blank" rel="noopener">WhatsApp</a>`:''].filter(Boolean),
  lg=`<a class="logo" href="/">${logoHtml()}</a>`;let h;
 if(s=='centered')h=`<div class="wrap fc">${lg}${tg?`<p class="tg">${tg}</p>`:''}${menu.length?`<div class="fl">${menu.join('')}</div>`:''}${con.length?`<div class="fl">${con.join('')}</div>`:''}<div class="cp">${cp}</div></div>`;
 else if(s=='columns')h=`<div class="wrap"><div class="cols"><div>${lg}${tg?`<p class="tg">${tg}</p>`:''}</div>${menu.length?`<div><h4>Menu</h4>${menu.join('')}</div>`:'<div></div>'}${con.length?`<div><h4>Contact</h4>${con.join('')}</div>`:'<div></div>'}</div><div class="bt">${cp}</div></div>`;
 else if(s=='minimal')h=`<div class="wrap fm"><span>${cp}</span><span class="fl">${[...menu,...con].join('')}</span></div>`;
 else h=`<div class="wrap"><div class="r"><div>${menu.join('')}</div><div>${con.join('')}</div><div>${cp}</div></div></div>`;
 return `<footer id="ft" class="f-${s}">${h}</footer>`}
function shell(){
 document.body.insertAdjacentHTML('afterbegin',`<header id="hd"><div class="wrap"><a class="logo" href="/">${logoHtml()}</a><button id="mb" aria-label="Menu">☰</button><nav>${NV().map(n=>`<a href="${n[0]}" class="${n[2]==P?'on':''}">${n[1]}</a>`).join('')}</nav></div></header>`);
 document.body.insertAdjacentHTML('beforeend',`${footerHtml()}<div id="lb"><button class="x">×</button><button class="p">‹</button><img alt=""><button class="n">›</button><a class="dl" hidden>${DLI}<span>Download</span></a><small></small></div>`);
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
 const wa=$('#wa');if(wa&&waNumber()){wa.hidden=false;wa.href=waHref();txt('wat','+'+C.phone)}
}
const cards=(list)=>list.map(c=>`<a class="cd rv" href="/g/${encodeURIComponent(c.slug)}/"><span class="cv">${imgt(c.cover||(c.photos||[])[0],c.name.length%5)}</span><div class="cd-info">${c.date?`<small>${c.date}</small>`:''}<h3>${c.pinHash?LOCK:''}${c.name}</h3></div></a>`).join('');
function igInit(){const sec=$('#igsec');if(!sec)return;const it=(C.igItems||[]).flatMap((x,k)=>(PV||!x.hide?(x.covers||(x.cover?[x.cover]:[])):[]).map(s=>({src:s,url:x.url,k,h:x.hide})));
 if(!it.length){sec.style.display='none';return}
 const hn=(C.instagram||'').replace(/\/$/,'').split('/').pop();$('#igbtn').href=C.instagram||'#';$('#igbtn').textContent=hn?'@'+hn+' ↗':'Follow ↗';
 const half=Array.from({length:Math.max(1,Math.ceil(8/it.length))},()=>it).flat(),all=[...half,...half];
 $('#igr').innerHTML=all.map(x=>`<a class="igi"${PV?` data-item="igItems:${x.k}"${x.h?' data-hid="1"':''}`:''} href="${x.url||C.instagram}" target="_blank" rel="noopener">${thimg(x.src)}</a>`).join('');
 $('#igr').style.setProperty('--t',Math.max(30,half.length*7)+'s')}
const INIT={
notfound(){const im=(C.heroPics||[])[0]||(C.portfolio||[])[0],b=$('.nfb');if(im&&b){b.style.backgroundImage=`url('${im}')`;b.style.backgroundPosition=pos(im);const t=new Image();t.onload=()=>b.classList.add('on');t.src=im}},
home(){
 txt('kick',C.kicker);txt('role',C.role);
 {const nm=(C.name||'').trim().split(/\s+/).filter(Boolean),bs=$$('.hero h1 b');if(nm.length&&bs.length>1){bs[0].textContent=nm.length>1?nm.slice(0,-1).join(' '):nm[0];bs[1].innerHTML=nm.length>1?`<em>${nm[nm.length-1]}</em>`:''}}
const hp=(C.heroPics||[]).filter(Boolean);
 if(hp[0]&&!document.querySelector(`link[rel=preload][href="${hp[0]}"]`)){const l=document.createElement('link');l.rel='preload';l.as='image';l.href=hp[0];document.head.appendChild(l)}
 $('#slides').innerHTML=`<div class="trk">${(hp.length?hp:[null]).map(s=>`<div class="sl" style="${s?`background-image:url('${s}');background-position:${pos(s)}`:'background:radial-gradient(90% 80% at 30% 20%,#4a3426,#0d0c0b)'}"></div>`).join('')}</div>${hp.length>1?`<div class="dots">${hp.map((_,i)=>`<button aria-label="Slide ${i+1}" data-i="${i}"></button>`).join('')}</div>`:''}`;
 let k=0,dir=1;const trk=$('#slides .trk'),go=n=>{k=n;trk.style.transform=`translateX(-${k*100}%)`;$$('#slides .dots button').forEach((b,i)=>b.classList.toggle('on',i==k))};go(0);
 clearInterval(window.SL);if(hp.length>1){window.SL=setInterval(()=>{if(k+dir>=hp.length||k+dir<0)dir=-dir;go(k+dir)},5500);$$('#slides .dots button').forEach(b=>b.onclick=()=>go(+b.dataset.i))}
 const gp=()=>{const cap=2,pool=[...(C.portfolio||[]).map(s=>({src:s,g:'pf'})),...(C.clients||[]).filter(c=>!c.private&&!c.pinHash).flatMap(c=>shuf(c.photos||[]).slice(0,cap).map(s=>({src:s,g:c.slug})))],out=[],cnt={};
  shuf(pool).forEach(p=>{if(out.length<6&&(cnt[p.g]||0)<(p.g=='pf'?6:cap)){out.push(p);cnt[p.g]=(cnt[p.g]||0)+1}});return out.length?out:demo(6)};
 const dims=ps=>Promise.all(ps.map(p=>new Promise(r=>{if(!p.src){p.r=.8;return r()}const i=new Image();i.onload=()=>{p.r=i.naturalWidth/i.naturalHeight||.8;r()};i.onerror=()=>{p.r=.8;r()};i.src=p.src})));
 const draw=async s=>{await Promise.all(s.map(async p=>{p.r=p.src?await getR(p.src):.8}));const per=innerWidth<700?2:3,rows=[];for(let i=0;i<s.length;i+=per)rows.push(s.slice(i,i+per));
  $('#feat').innerHTML=rows.map(r=>`<div class="fr">${r.map(p=>`<figure class="t" ${p.src?`data-s="${p.src}"`:''} style="flex:${p.r} 1 0;aspect-ratio:${p.r}">${p.src?`${thimg(p.src)}`:`<span class="ph" style="--h:${p.h||0}"></span>`}</figure>`).join('')}</div>`).join('');bind($('#feat'),s)};
 const sig=JSON.stringify([C.portfolio,(C.clients||[]).map(c=>[c.slug,c.photos,c.private])]);if(window.__fsig!=sig){window.__fsig=sig;window.__fs=gp()}
 window.__redraw=()=>draw(window.__fs);draw(window.__fs);
 const pre=s=>Promise.race([Promise.all(s.map(p=>p.src?new Promise(r=>{const i=new Image();i.onload=i.onerror=r;i.src=th(p.src)}):0)),new Promise(r=>setTimeout(r,3000))]);
 clearInterval(window.__gt);
 if(!PV){const fe=$('#feat');let hov=false,seen=true;fe.onmouseenter=()=>hov=true;fe.onmouseleave=()=>hov=false;fe.ontouchstart=()=>{hov=true;clearTimeout(window.__ht);window.__ht=setTimeout(()=>hov=false,8000)};
  if(window.IntersectionObserver)new IntersectionObserver(es=>seen=es[0].isIntersecting).observe(fe);
  window.__gt=setInterval(async()=>{const sc=fe.closest('[data-sec]');if(document.hidden||hov||!seen||(sc&&getComputedStyle(sc).display=='none')||($('#lb')&&$('#lb').classList.contains('o')))return;
   const s=gp();await Promise.all(s.map(async p=>{p.r=p.src?await getR(p.src):.8}));await pre(s);fe.style.opacity=0;await new Promise(r=>setTimeout(r,450));window.__fs=s;await draw(s);fe.style.opacity=1},5000)}
 const galRender=resz=>{const pubs=(C.clients||[]).filter(c=>!c.private),sig=JSON.stringify((C.clients||[]).map(c=>[c.slug,c.onHome,c.private]))+(innerWidth<700);
  if(window.__gsig!=sig){window.__gsig=sig;const f=pubs.filter(c=>c.onHome);window.__gs=(f.length?f:shuf(pubs).slice(0,innerWidth<700?4:3)).map(c=>c.slug)}
  $('#gal').innerHTML=cards(window.__gs.map(s=>pubs.find(c=>c.slug==s)).filter(Boolean));if(resz)$$('#gal .rv').forEach(x=>x.classList.add('on'))};
 window.__galr=galRender;galRender();
 if(!window.__fr){window.__fr=1;let w0=innerWidth<700;addEventListener('resize',()=>{const w=innerWidth<700;if(w!=w0){w0=w;window.__redraw&&window.__redraw();window.__galr&&window.__galr(true)}})}
 if(!$('.hero .sd')){$('.hero').insertAdjacentHTML('beforeend','<button class="sd" aria-label="Scroll down"><span></span></button>');$('.hero .sd').onclick=()=>{let e=$('.hero').nextElementSibling;while(e&&getComputedStyle(e).display=='none')e=e.nextElementSibling;e&&e.scrollIntoView({behavior:'smooth'})}}
 const DEF=['who','stats','feat','pts','brands','ig','gal','cta'];let hm=(C.home||[]).slice();
 DEF.forEach((id,i)=>{if(!hm.some(h=>h.id==id)){const pi=hm.findIndex(h=>h.id==DEF[i-1]);hm.splice(pi+1,0,{id,show:true})}});
 let ref=$('.hero');hm.forEach(h=>{const e=$(`[data-sec="${h.id}"]`);if(!e)return;e.style.display=h.show===false?'none':'';ref.after(e);ref=e});
 igInit();
},
portfolio(){
 const s=(C.portfolio||[]).length?C.portfolio.map(src=>({src})):demo(9);mason($('#grid'),s,C.pfLay);
},
clients(){$('#gal').innerHTML=cards((C.clients||[]).filter(c=>!c.private))},
gallery(){
 const s=new URLSearchParams(location.search).get('c')||window.GSLUG,c=(C.clients||[]).find(x=>x.slug==s);
 if(!c){$('#gt').textContent='Gallery not found';return}
 const run=()=>{document.title=c.name+' — '+C.name;$('#gt').textContent=c.name;txt('gd',c.date);txt('gs',c.story);
  window.__dlc=c;window.__dlon=!!c.download&&c.download!='off';
  if((c.private||c.pinHash)&&!document.querySelector('meta[name=robots]'))document.head.insertAdjacentHTML('beforeend','<meta name="robots" content="noindex,nofollow">');
  const ps=(c.photos||[]).length?c.photos.map(src=>({src,client:c.name})):demo(9);mason($('#grid'),ps,c.lay);
  let ga=$('#gact');if(!ga){$('#gs').insertAdjacentHTML('afterend','<div id="gact"></div>');ga=$('#gact')}
  ga.innerHTML=window.__dlon&&(c.photos||[]).length?`<span id="dlp"></span><button class="ibtn" id="dlall" title="Download all pictures" aria-label="Download all pictures">${DLI}</button>`:'';
  if($('#dlall'))$('#dlall').onclick=()=>zipAll(c,$('#dlall'));
  const galleryBack=$('.pg .wrap > a.eb, #gbar > a.eb');if(galleryBack)galleryBack.style.display=c.private?'none':'';
  let bar=$('#gbar');if(!bar){const back=$('.pg .wrap > a.eb');if(back){bar=document.createElement('div');bar.id='gbar';back.parentNode.insertBefore(bar,back);bar.appendChild(back)}}
  if(bar&&ga&&ga.parentNode!==bar)bar.appendChild(ga);
  gcover(c)};
 let ok=false;try{ok=sessionStorage.getItem('pin_'+c.slug)==c.pinHash}catch{}
 if(c.pinHash&&!PV&&!ok){$('#gt').textContent='';gate(c,run)}else run()
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
,enquire(){
 const root=$('#ew');if(!root)return;
 const S={occasion:'',days:'',wants:[],budget:'',found:'',collabModel:'',collabType:''},seq=()=>isC()?(isB()?[0,1,5,2,4]:[0,1,5,2,3,4]):[0,1,2,3,4],bar=$('#ewb'),lab=$('#ewl'),back=$('#ewback'),next=$('#ewnext'),err=$('#ewerr'),f=$('#ef'),
  val=n=>(f.elements[n]&&f.elements[n].value||'').trim(),
  isC=()=>/collab/i.test(S.occasion||''),
  isB=()=>isC()&&/barter/i.test(S.collabType||''),
  prog=()=>{const q=seq();bar.style.width=(i+1)/q.length*100+'%';lab.textContent=`Step ${i+1} of ${q.length}`},
  note=()=>{const n=$('#ew-collab-note');if(n)n.hidden=!isB()},
  igFix=v=>{v=String(v||'').trim();return v&&!/^@|^https?:\/\//i.test(v)?'@'+v.replace(/\s+/g,''):v};
 let i=0,busy=false;
 const go=(n,quiet)=>{const q=seq();i=Math.max(0,Math.min(q.length-1,n));const id=q[i],c=isC();$$('.ew-step',root).forEach(x=>x.hidden=+x.dataset.s!==id);prog();note();back.hidden=i==0;
  next.textContent=i==q.length-1?'Send enquiry':'Continue';err.textContent='';
  const vb=$('#ewvenueb'),db=$('#ewdaysb'),lc=$('#ewcollabloc'),igf=$('#ewinstagramfield');if(vb)vb.hidden=c;if(db)db.hidden=c;if(lc)lc.hidden=!c;if(igf)igf.hidden=c;
  if(!quiet)$('.ew-top').scrollIntoView({behavior:'smooth',block:'start'});
  if(id==4)setTimeout(()=>f.elements.name.focus({preventScroll:true}),350)};
 const other=g=>{const w=root.querySelector(`.ew-other[data-for=${g}]`);if(!w)return;const on=[].concat(S[g]).includes('Other');w.hidden=!on;return on?w.querySelector('input'):null};
 root.addEventListener('click',e=>{const o=e.target.closest('.ew-opt');if(!o||!o.parentElement.dataset.g)return;
  const box=o.parentElement,g=box.dataset.g,v=o.dataset.v;
  if(box.hasAttribute('data-multi')){o.classList.toggle('on');S[g]=$$('.ew-opt.on',box).map(x=>x.dataset.v)}
  else{const was=o.classList.contains('on');$$('.ew-opt',box).forEach(x=>x.classList.remove('on'));if(was&&g!='occasion'){S[g]=''}else{o.classList.add('on');S[g]=v}}
  const oi=other(g);if(oi&&v=='Other')oi.focus();
  err.textContent='';if(g=='collabType'){prog();note()}
  if(g=='occasion'&&v!='Other'&&S[g])setTimeout(()=>go(1),240)});
 const tbd=$('#ewtbd'),dt=f.elements.date;dt.min=new Date().toISOString().slice(0,10);
 tbd.onclick=()=>{tbd.classList.toggle('on');dt.disabled=tbd.classList.contains('on');if(dt.disabled)dt.value=''};
 const check=()=>{const id=seq()[i];
  if(id==0){if(!S.occasion)return'Please pick one to continue.';if(S.occasion=='Other'&&!val('occasion_other'))return'Please tell me what you have in mind.'}
  if(id==1&&isC()&&window.__ewLocReq!==false){if(!val('collab_city'))return'Please tell me which city you are in.';if(!val('collab_area'))return'Please tell me the area where you stay.'}
  if(id==5){if(!S.collabModel)return'Please tell me who you are collaborating as.';if(S.collabModel=='Other'&&!val('collab_role_other'))return'Please tell me a little about you.';if(val('collab_ig').replace(/[@\s]/g,'').length<2)return'Please add your Instagram handle.';if(!S.collabType)return'Please choose the kind of collaboration you are looking for.'}
  if(id==2&&S.wants.includes('Other')&&!val('wants_other'))return'Please tell me what else you need.';
  if(id==4){if(!val('name'))return'Please add your name.';if(val('phone').replace(/\D/g,'').length<10)return'Please add a valid WhatsApp number.';if(val('email')&&!/^\S+@\S+\.\S+$/.test(val('email')))return'That email does not look right.';if(!val('message'))return'Please describe your requirements so I can understand what you need.';
   if(S.found=='Other'&&!val('found_other'))return'Please tell me where you heard about me.'}
  return''};
 back.onclick=()=>go(i-1);
 f.addEventListener('keydown',e=>{if(e.key=='Enter'&&e.target.tagName=='INPUT'){e.preventDefault();next.click()}});
 const submit=async()=>{if(busy||val('_gotcha'))return;busy=true;next.disabled=true;next.textContent='Sending…';
  const occ=S.occasion=='Other'?val('occasion_other'):S.occasion,wants=S.wants.map(w=>w=='Other'?val('wants_other'):w).filter(Boolean),found=S.found=='Other'?val('found_other'):S.found,
   date=tbd.classList.contains('on')?'Not fixed yet':val('date'),
   q={o:occ,w:wants,d:date,y:isC()?'':S.days,v:isC()?[val('collab_area'),val('collab_city')].filter(Boolean).join(', '):val('venue'),n:val('name'),p:val('phone'),e:val('email'),i:igFix(isC()?val('collab_ig'):val('instagram')),b:isC()?[S.collabType,isB()?'':S.budget].filter(Boolean).join(' \u00b7 '):S.budget,br:'',f:found,m:[val('message'),isC()?'Collab as: '+(S.collabModel=='Other'?val('collab_role_other'):S.collabModel)+' | Collaboration: '+S.collabType:''].filter(Boolean).join('\n')};
  let link='';try{link=location.origin+'/admin/quote.html#e='+(await QCODEC.enc(q))}catch{}
  const payload={name:q.n,phone:q.p,email:q.e||null,instagram:q.i||null,occasion:occ,looking_for:[...wants,...(isC()?['Collaboration']:[])].join(', '),event_date:/^\d{4}-\d{2}-\d{2}$/.test(date)?date:null,days:(parseInt(String(q.y).match(/\d+/)?.[0]||'',10)||null),venue:q.v||null,brand:null,budget:q.b||null,found_via:found||null,message:q.m||null,source:new URLSearchParams(location.search).get('ref')||'direct link'};
  try{if(!window.ENQDB||typeof ENQDB.submitPublic!=='function')throw new Error('Enquiry service is not available.');await ENQDB.submitPublic(payload);
   f.hidden=true;$('.ew-top').hidden=true;$('.ew-tiny').hidden=true;$('#ewok').hidden=false;$('#ewokn').innerHTML='Thank <em>you'+(q.n?', '+q.n.split(' ')[0].replace(/[<>&"]/g,''):'')+'</em>';
   const a=$('#ewokw');if(waNumber()){a.href=waHref(`Hi ${C.name||''}, I just filled the enquiry form.`);a.style.display='inline-flex'}
   window.scrollTo({top:0,behavior:'smooth'})}
  catch(e){err.textContent='Could not send. Please try again, or email '+(C.email||'me')+' directly.';next.disabled=false;next.textContent='Send enquiry';busy=false}};
 next.onclick=()=>{const m=check();if(m){err.textContent=m;return}if(i==seq().length-1)submit();else go(i+1)};
 go(0,1);
}
,quote(){
 const root=$('#qt'),esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
  paras=s=>esc(s).split(/\n+/).map(x=>x.trim()).filter(Boolean).map(x=>`<p>${x}</p>`).join(''),
  inr=n=>'\u20b9'+new Intl.NumberFormat('en-IN',{maximumFractionDigits:2}).format(Math.round(n*100)/100),
  fd=iso=>{const d=/^\d{4}-\d{2}-\d{2}$/.test(iso||'')?new Date(iso+'T00:00:00'):null;return d&&!isNaN(d)?d.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}):''},
  num=v=>{v=+v;return isFinite(v)&&v>0?v:0};
 const draw=async()=>{let q;
  try{
    const shortId=new URLSearchParams(location.search).get('c');
    if(shortId){
     if(!/^[A-Za-z0-9]{12}$/.test(shortId))throw 0;
     const r=await fetch('https://q.sakkhi.co.in/api/'+encodeURIComponent(shortId),{headers:{Accept:'application/json'}});
     if(!r.ok)throw 0;
     const data=await r.json();q=data.quote;
    }else q=await QCODEC.dec(location.hash);
    if(!q||!Array.isArray(q.i))throw 0
   }
  catch{root.innerHTML='<div class="qbad"><h1>Quotation not <em>found</em></h1><p style="margin-top:18px">This link looks incomplete. Please ask for a fresh link.</p></div>';return}
  const items=q.i.slice(0,40).map(r=>({d:r[0],n:r[1],q:num(r[2])||1,r:num(r[3])})),
   sub=items.reduce((s,x)=>s+x.q*x.r,0),dis=Math.min(num(q.ds),sub),tx=sub-dis,gp=num(q.g),gs=tx*gp/100,tot=tx+gs,ap=Math.min(100,num(q.a)),adv=Math.round(tot*ap/100),bal=tot-adv,
   today=(d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'))(new Date()),exp=/^\d{4}-\d{2}-\d{2}$/.test(q.x||'')&&q.x<today,
   title=q.t||'Photography',wm=`Hi ${C.name||''}, I'd like to confirm quotation ${q.n||''} (${title}) for ${inr(tot)}. Please share the next steps.`,
   qm=`Hi ${C.name||''}, I have a question about quotation ${q.n||''} (${title}).`,
   link=m=>waHref(m)||`mailto:${C.email||''}?subject=${encodeURIComponent('Quotation '+(q.n||''))}&body=${encodeURIComponent(m)}`;
  document.title=`Quotation ${q.n||''} \u2014 ${C.name||''}`.trim();
  root.innerHTML=`<span class="eb">Quotation${exp?'<span class="qpill x">Expired</span>':''}</span>
  <div class="qh"><h1>${q.c?`For <em>${esc(q.c)}</em>`:'Your <em>quotation</em>'}</h1><div class="qm">${q.n?`No. <b>${esc(q.n)}</b><br>`:''}${fd(q.d)?`Issued <b>${fd(q.d)}</b><br>`:''}${fd(q.x)?`Valid until <b>${fd(q.x)}</b>`:''}</div></div>
  <div class="qi"><div><small>Shoot</small>${esc(title)}</div>${q.e?`<div><small>Date</small>${esc(q.e)}</div>`:''}${q.l?`<div><small>Venue / city</small>${esc(q.l)}</div>`:''}</div>
  <table><thead><tr><th>Description</th><th class="qr qhq">Qty</th><th class="qr qhq">Rate</th><th class="qr">Amount</th></tr></thead><tbody>${items.map(x=>`<tr><td>${esc(x.d)}${x.n?`<small>${esc(x.n)}</small>`:''}</td><td class="qr qhq">${x.q}</td><td class="qr qhq">${inr(x.r)}</td><td class="qr">${inr(x.q*x.r)}</td></tr>`).join('')}</tbody></table>
  <div class="qtot"><div><span>Subtotal</span><span>${inr(sub)}</span></div>${dis?`<div><span>Discount</span><span>\u2212 ${inr(dis)}</span></div>`:''}${gp?`<div><span>GST (${gp}%)</span><span>${inr(gs)}</span></div>`:''}<div class="qg"><span>Total</span><span>${inr(tot)}</span></div>${ap&&ap<100?`<div class="qa"><span>Advance to confirm (${ap}%)</span><span>${inr(adv)}</span></div><div><span>Balance</span><span>${inr(bal)}</span></div>`:ap==100?`<div class="qa"><span>Payable to confirm</span><span>${inr(tot)}</span></div>`:''}</div>
  ${q.nt?`<div class="qbx"><h4>What's included</h4>${paras(q.nt)}</div>`:''}${q.pb?`<div class="qbx"><h4>Payment details</h4>${paras(q.pb)}</div>`:''}${q.tm?`<div class="qbx"><h4>Terms</h4>${paras(q.tm)}</div>`:''}
  <div class="qacts"><a class="btn f" href="${esc(link(wm))}" target="_blank" rel="noopener">Accept &amp; confirm</a><a class="btn" href="${esc(link(qm))}" target="_blank" rel="noopener">Ask a question</a><button class="btn" id="qp" type="button">Save as PDF</button></div>`;
  $('#qp').onclick=()=>window.print()};
 addEventListener('hashchange',draw);draw();
}

};
const PV=new URLSearchParams(location.search).has('preview'),NOSITE=/^\/admin(\/|$)/.test(location.pathname);
const obs=()=>{const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&(e.target.classList.add('on'),io.unobserve(e.target))),{threshold:.1});$$('.rv').forEach(x=>io.observe(x))};
function theme(){const t=C.theme||{},s=document.documentElement.style,set=(k,v)=>v?s.setProperty(k,v):s.removeProperty(k);
 set('--acc',t.accent);set('--hs',t.heroScale&&t.heroScale/100);set('--ds',t.headScale&&t.headScale/100);set('--bs',t.bodyScale&&t.bodyScale/100);
 set('--d',t.headFont&&`'${t.headFont}',serif`);set('--bf',t.bodyFont&&`'${t.bodyFont}',sans-serif`);
 [t.headFont,t.bodyFont].filter(Boolean).forEach(n=>{const id='gf-'+n.replace(/\W/g,'');if(!document.getElementById(id)){const l=document.createElement('link');l.id=id;l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family='+n.replace(/ /g,'+')+':ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap';document.head.appendChild(l)}})}
function boot(c){C=c;theme();const bc=document.body.classList;[...bc].filter(x=>/^(x|hs)-/.test(x)).forEach(x=>bc.remove(x));bc.add('hs-'+((C.hdr||{}).style||'classic'));Object.entries(C.vis||{}).forEach(([k,v])=>v===false&&bc.add('x-'+k));
 $$('#hd,#ft,#lb').forEach(e=>e.remove());shell();common();INIT[P]&&INIT[P]();obs();favicon();track();if(PV){markItems();markText()}
 if(PV){bc.add('pv');ME.forEach(([s,p])=>$$(s).forEach(x=>x.dataset.edit=p));$$('a[href]').forEach(a=>{const h=a.getAttribute('href');if(/^\/(portfolio|clients|gallery|about|contact)?(\?|$)/.test(h)&&!/preview/.test(h))a.setAttribute('href',h+(h.includes('?')?'&':'?')+'preview=1')})}}
if(NOSITE){}else if(PV){addEventListener('message',e=>{if(e.origin!=location.origin||!e.data)return;if(e.data.type=='content')boot(e.data.data);if(e.data.type=='scroll'){const el=$(e.data.sel);el&&el.scrollIntoView({behavior:'smooth',block:'center'})}});
 document.addEventListener('click',e=>{const ia=e.target.closest('[data-ia]');if(ia){e.preventDefault();e.stopPropagation();const it=ia.closest('[data-item]'),[l,i]=it.dataset.item.split(':');parent.postMessage({type:'item',list:l,i:+i,act:ia.dataset.ia},location.origin);return}
  const t=e.target.closest('[data-edit]');if(t&&!e.target.closest('[data-f]')){e.preventDefault();e.stopPropagation();parent.postMessage({type:'edit',path:t.dataset.edit},location.origin)}},true);
 document.addEventListener('input',e=>{const el=e.target.closest('[data-f]');if(!el)return;const f=el.dataset.f,v=f=='story'?[...el.querySelectorAll('p')].map(p=>(p.innerText??p.textContent).trim()).join('\n\n'):(el.innerText??el.textContent).trim();parent.postMessage({type:'text',path:f,value:v},location.origin)});
 document.addEventListener('keydown',e=>{const el=e.target.closest&&e.target.closest('[data-f]');if(el&&e.key=='Enter'&&el.dataset.f!='story'&&el.dataset.f!='about'){e.preventDefault();el.blur()}});
 document.addEventListener('paste',e=>{const el=e.target.closest&&e.target.closest('[data-f]');if(!el)return;e.preventDefault();document.execCommand('insertText',false,(e.clipboardData||window.clipboardData).getData('text/plain'))});
 parent.postMessage({type:'ready'},location.origin)}
else fetch('/content.json?t='+Date.now(),{cache:'no-store'}).then(r=>r.json()).catch(()=>({})).then(boot);
