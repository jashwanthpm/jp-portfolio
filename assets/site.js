(function(){const p=location.pathname;if(/\.html$/.test(p)){const n=p.replace(/\/index\.html$/,'/').replace(/\.html$/,'');history.replaceState(null,'',(n||'/')+location.search+location.hash)}})();
const jpDialogReady=window.JPDialog?Promise.resolve():new Promise(resolve=>{const s=document.createElement('script');s.src='/assets/dialog.js';s.onload=resolve;s.onerror=resolve;document.head.appendChild(s)});
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
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
const getR=s=>{const d=(C.dims||{})[s],lh=/googleusercontent\.com\/d\//.test(s);if(d&&!lh)return Promise.resolve(d[0]/d[1]);return RC[s]||(RC[s]=new Promise(res=>{const a=new Image();a.onload=()=>res(a.naturalWidth/a.naturalHeight||.8);a.onerror=()=>{const b=new Image();b.onload=()=>res(b.naturalWidth/b.naturalHeight||.8);b.onerror=()=>res(.8);b.src=s};a.src=lh?s.replace(/=w\d+$/,'=w240'):th(s)}))};
function lprog(el){let bar=$('#lp');if(!bar){document.body.insertAdjacentHTML('beforeend','<div id="lp"><i></i><span></span></div>');bar=$('#lp')}
 const imgs=$$('img',el),t=Math.min(12,imgs.length);let n=0;const upd=()=>{bar.firstChild.style.width=(t?n/t*100:100)+'%';bar.lastChild.textContent=n<t?`Loading pictures ${n} / ${t}`:'';bar.classList.toggle('done',n>=t)};
 imgs.forEach((im,k)=>{const d=()=>{im.classList.add('l');if(im._c)return;im._c=1;if(k<12){n++;upd()}};im.complete&&im.naturalWidth?d():(im.addEventListener('load',d),im.addEventListener('error',d))});upd()}
const LAY=l=>{l=l||{};return{s:l.style||'masonry',g:(l.gap===undefined||l.gap==='')?14:+l.gap,c:+l.cols||3,m:+l.mcols||2,r:+l.round||0}};
async function mason(el,all,lay){const gen=el._g=(el._g||0)+1;el._items=all;el._lay=lay;const L=LAY(lay);let items=all;
 await Promise.all(items.map(async p=>{if(p.r==null)p.r=p.src?await getR(p.src):.8}));if(el._g!=gen)return;
 if(L.s=='portrait'){const f=items.filter(p=>p.r<=.92);if(f.length)items=f}
 const n=L.s=='pair'?2:(innerWidth<700?L.m:L.c);el.className='mas '+({grid:'gridl',rows:'rowsl',pair:'rowsl',stack:'stackl',strip:'stripl',story:'storyl',portrait:'portl'}[L.s]||'');el.style.setProperty('--g',L.g+'px');el.style.setProperty('--rd',L.r+'px');el.style.setProperty('--n',n);
 const tile=(p,i,sq)=>`<figure class="t" ${p.src?`data-s="${p.src}"`:''} style="aspect-ratio:${sq||p.r};--d:${Math.min(i,10)}">${p.src?thimg(p.src,i<8?'':' loading="lazy"'):`<span class="ph"></span>`}${window.__fav&&p.src?`<button class="fv${FAV.has(p.src)?' on':''}" data-fv="${p.src}" aria-label="Favorite">${HRT}</button>`:''}${window.__dlon&&p.src?`<a class="dli" href="${dlSrc(p.src)}" download="${dlName(p.src)}" title="Download" aria-label="Download">${DLI}</a>`:''}</figure>`;let html;
 if(L.s=='grid')html=items.map((p,i)=>tile(p,i,1)).join('');
 else if(L.s=='portrait')html=items.map((p,i)=>tile(p,i,'2/3')).join('');
 else if(L.s=='story'){const m=innerWidth<700;html=items.map((p,i)=>tile(p,i).replace('style="','style="--w:'+(p.r>1?(m?92:68):(m?68:42))+'%;')).join('')}
 else if(L.s=='stack')html=items.map((p,i)=>tile(p,i)).join('');
 else if(L.s=='strip'){const row=items.map((p,i)=>tile(p,i)).join('');html=`<div class="film-track" style="--film-duration:${Math.max(24,items.length*6)}s">${row}${row}</div>`}
 else if(L.s=='rows'||L.s=='pair'){const W=el.clientWidth||1000,avg=items.reduce((s,p)=>s+p.r,0)/(items.length||1)||1,th=W/(n*avg),rows=[];let cur=[],sum=0;
  items.forEach((p,i)=>{cur.push([p,i]);sum+=p.r;if(sum*th+L.g*(cur.length-1)>=W){rows.push({a:cur,s:sum,last:0});cur=[];sum=0}});if(cur.length)rows.push({a:cur,s:sum,last:1});
  html=rows.map(r=>{const w=Math.round(r.s*th+L.g*(r.a.length-1)),full=!r.last||w>=W*.7;return `<div class="fr2"${full?'':` style="max-width:${w}px"`}>${r.a.map(([p,i])=>tile(p,i).replace('style="','style="flex:'+p.r+' 1 0;')).join('')}</div>`}).join('')}
 else{const H=Array(n).fill(0),cols=Array.from({length:n},()=>[]);items.forEach((p,i)=>{const k=H.indexOf(Math.min(...H));cols[k].push([p,i]);H[k]+=1/p.r});html=cols.map(c=>`<div class="mc">${c.map(([p,i])=>tile(p,i)).join('')}</div>`).join('')}
 el.innerHTML=html;el._n=n;bind(el,items);lprog(el);
 if(!window.__mr){window.__mr=1;let tt;addEventListener('resize',()=>{clearTimeout(tt);tt=setTimeout(()=>{const m=$('.mas');if(m&&m._items){const l=LAY(m._lay),k=innerWidth<700?l.m:l.c;if(l.s=='rows'||l.s=='pair'||l.s=='story'||k!=m._n)mason(m,m._items,m._lay)}},150)})}}
const DLI='<svg class="dlsv" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>';
const LOCK='<svg class="lk" viewBox="0 0 24 24" role="img" aria-label="PIN protected"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
const dlSrc=p=>(C.hi||{})[p]||p;
const SBURL='https://kcihpkcpmklzytbsekhy.supabase.co',SBKEY='sb_publishable_nM8A5AzPXGZn_7phEIEy5Q_WommbEkU';
const gid=u=>(String(u).match(/[?&]id=([\w-]+)/)||String(u).match(/\/d\/([\w-]+)/)||[])[1];
const dlFetch=u=>/drive\.google\.com\/uc/.test(u)&&(C.cloudSettings||{}).driveKey?`https://www.googleapis.com/drive/v3/files/${gid(u)}?alt=media&key=${C.cloudSettings.driveKey}`:u;
const FN=SBURL+'/functions/v1/gallery',FAV=new Set();
const visitorId=()=>{const c=window.__dlc||{};if(!c.slug)return null;try{let id=localStorage.getItem('vid_'+c.slug);if(!id){id=crypto.randomUUID();localStorage.setItem('vid_'+c.slug,id)}return id}catch{return crypto.randomUUID()}};
const gcall=(action,x={})=>{const c=window.__dlc||{};if(c.type!=='client')return Promise.resolve({});let em='',nm='',ph='';try{em=localStorage.getItem('em_'+c.slug)||'';nm=localStorage.getItem('nm_'+c.slug)||'';ph=localStorage.getItem('ph_'+c.slug)||''}catch{}
 return fetch(FN,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,slug:c.slug,name:c.name,email:em||null,visitor_id:visitorId(),visitor_name:nm,phone:ph,...x}),keepalive:true}).then(r=>r.json()).catch(()=>({}))};
const FL={active:'My Favorites',lists:{'My Favorites':[]}},hx=t=>String(t??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const thumb=f=>/googleusercontent\.com\/d\//.test(f)?f.replace(/=w\d+$/,'=w400'):(typeof th==='function'?th(f):f);
function loadLocalFL(slug){try{const j=JSON.parse(localStorage.getItem('fl2_'+slug)||'null');if(j&&j.lists){FL.active=j.active;FL.lists=j.lists}}catch{}if(!FL.lists[FL.active])FL.lists[FL.active]=[];favSync(false)}
function saveFL(){try{localStorage.setItem('fl2_'+window.__dlc.slug,JSON.stringify(FL))}catch{}}
const favTotal=()=>new Set(Object.values(FL.lists).flat()).size;
function favHeader(){const b=document.getElementById('cgf');if(b){const sp=b.querySelector('span');sp.textContent=favTotal();sp.classList.toggle('z',!favTotal())}}
function lbFav(){const b=document.querySelector('#lb .lbh');if(b){b.hidden=!window.__fav;b.classList.toggle('on',typeof LB!=='undefined'&&FAV.has(LB[LI]))}const d=document.querySelector('#lb .lbd');if(d&&typeof LB!=='undefined'&&LB[LI]){d.href=dlSrc(LB[LI]);d.setAttribute('download',dlName(LB[LI]))}}
function favSync(ui=true){FAV.clear();(FL.lists[FL.active]||[]).forEach(f=>FAV.add(f));if(ui){document.querySelectorAll('.fv').forEach(b=>b.classList.toggle('on',FAV.has(b.dataset.fv)));lbFav();favHeader()}}
async function loadFavs(){const r=await gcall('myfavs');if(r.items&&r.items.length){r.items.forEach(({file,list})=>{const L=FL.lists[list]=FL.lists[list]||[];if(!L.includes(file))L.push(file)});saveFL();favSync()}}
function sModal(html,mount){const g=document.createElement('div');g.className='sm';g.innerHTML='<div class="sb">'+html+'</div>';document.body.appendChild(g);g.onclick=e=>{if(e.target===g||e.target.closest('[data-x]'))g.remove()};if(mount)mount(g);return g}
function sAsk(title,val,ok){sModal(`<h3>${title}</h3><input value="${hx(val)}" maxlength="60" aria-label="${title}"><div class="sa"><button data-x>Cancel</button><button class="btn f" data-ok>Save</button></div>`,g=>{const i=g.querySelector('input');i.focus();i.select();const go=()=>{const v=i.value.trim();if(v){g.remove();ok(v)}};g.querySelector('[data-ok]').onclick=go;i.onkeydown=e=>{if(e.key==='Enter')go()}})}
async function toggleFav(f){const c=window.__dlc||{};if(!f||!(await needEmail(true)))return;const L=FL.lists[FL.active]=FL.lists[FL.active]||[],i=L.indexOf(f);
 if(i<0){if(c.favLimit>0&&favTotal()>=c.favLimit){sModal(`<h3>Favorite limit reached</h3><p>You can choose up to ${c.favLimit} favorites. Remove one to pick another.</p><div class="sa"><button class="btn f" data-x>OK</button></div>`);return}L.push(f);gcall('fav',{file:f,list:FL.active})}
 else{L.splice(i,1);gcall('unfav',{file:f,list:FL.active})}saveFL();favSync();if(document.getElementById('fdr'))favDrawer(true)}
function favDrawer(re){let d=document.getElementById('fdr');if(d&&!re){d.remove();return}if(!d){d=document.createElement('aside');d.id='fdr';document.body.appendChild(d);
 d.onclick=async e=>{const c=window.__dlc,t=e.target.closest('button');if(!t)return;
  if(t.classList.contains('fx'))d.remove();
  else if(t.dataset.l){FL.active=t.dataset.l;saveFL();favSync();favDrawer(true)}
  else if(t.dataset.a==='new')sAsk('New favorite list','',n=>{if(!FL.lists[n]){FL.lists[n]=[];FL.active=n;saveFL();favSync();favDrawer(true)}});
  else if(t.dataset.a==='ren')sAsk('Rename list',FL.active,n=>{if(n===FL.active||FL.lists[n])return;const o=FL.active;FL.lists[n]=FL.lists[o];delete FL.lists[o];FL.active=n;saveFL();gcall('rename',{old:o,list:n});favSync();favDrawer(true)});
  else if(t.dataset.a==='del')sModal(`<h3>Delete “${hx(FL.active)}”?</h3><p>The photos stay in the gallery.</p><div class="sa"><button data-x>Cancel</button><button class="btn f" data-ok>Delete</button></div>`,g=>g.querySelector('[data-ok]').onclick=()=>{g.remove();const o=FL.active;delete FL.lists[o];gcall('dellist',{list:o});FL.active=Object.keys(FL.lists)[0]||'My Favorites';FL.lists[FL.active]=FL.lists[FL.active]||[];saveFL();favSync();favDrawer(true)});
  else if(t.dataset.a==='dl'){window.__zset=FL.active;zipAll(c,t,FL.lists[FL.active],c.slug+'-'+FL.active.toLowerCase().replace(/[^a-z0-9]+/g,'-'),'original')}
  else if(t.dataset.r){const L=FL.lists[FL.active],i=L.indexOf(t.dataset.r);if(i>=0){L.splice(i,1);gcall('unfav',{file:t.dataset.r,list:FL.active});saveFL();favSync();favDrawer(true)}}}}
 const L=FL.lists,names=Object.keys(L),files=L[FL.active]||[];
 d.innerHTML=`<div class="fh"><b>Favorites</b><button class="fx" aria-label="Close">✕</button></div><div class="fl">${names.map(n=>`<button data-l="${hx(n)}" class="${n===FL.active?'on':''}">${hx(n)} <i>${L[n].length}</i></button>`).join('')}<button data-a="new">＋ New list</button></div><div class="fb"><button data-a="ren">Rename</button><button data-a="del">Delete</button><button data-a="dl" ${window.__dlon&&files.length?'':'disabled'}>Download list</button></div><div class="fg">${files.map(f=>`<div class="fi"><img src="${hx(thumb(f))}" onerror="this.onerror=null;this.src='${hx(f)}'" alt=""><button data-r="${hx(f)}" aria-label="Remove">✕</button></div>`).join('')||'<p>Tap the heart on any photo to add it to this list.</p>'}</div>`}
function dlModal(){const c=window.__dlc,sets=(c.sets||[]).filter(x=>x.photos&&x.photos.length),cur=sets.length>1?(sets.find(x=>x.name===window.__set)||sets[0]):null;
 sModal(`<h3>Download</h3><div class="lb2">Size</div><label class="rd"><input type="radio" name="r" value="original" checked><span><b>Original size</b><small>Full quality, largest files</small></span></label><label class="rd"><input type="radio" name="r" value="web"><span><b>Web size</b><small>Smaller files, good for sharing</small></span></label>${cur?`<div class="lb2">Photos</div><label class="rd"><input type="radio" name="s" value="cur" ${window.__set==='Whole gallery'?'':'checked'}><span><b>${hx(cur.name)}</b><small>${cur.photos.length} photos</small></span></label><label class="rd"><input type="radio" name="s" value="all" ${window.__set==='Whole gallery'?'checked':''}><span><b>Whole gallery</b><small>${(c.photos||[]).length} photos</small></span></label>`:''}<div class="sa"><button data-x>Cancel</button><button class="btn f" data-go>Download</button></div>`,g=>g.querySelector('[data-go]').onclick=()=>{const res=g.querySelector('[name=r]:checked').value,sc=g.querySelector('[name=s]:checked'),all=!cur||(sc&&sc.value==='all');g.remove();window.__zset=all?'Whole gallery':cur.name;
  zipAll(c,document.getElementById('cgd')||{},all?(c.photos||[]):cur.photos,c.slug+(all?'':'-'+cur.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')),res)})}
const HRT='<svg viewBox="0 0 24 24"><path d="M12 20.4s-7.6-4.7-9.3-9.6C1.6 7.5 3.4 4.4 6.7 4.4c2 0 3.9 1.2 5.3 3.1 1.4-1.9 3.3-3.1 5.3-3.1 3.3 0 5.1 3.1 4 6.4-1.7 4.9-9.3 9.6-9.3 9.6z"/></svg>';
function cgLetters(n){let i=0;return String(n).split(' ').map(w=>`<span class="cw">${[...w].map(ch=>`<span class="cl" style="--i:${i++}">${hx(ch)}</span>`).join('')}</span>`).join(' ')}
const CGI={heart:HRT,dl:'<svg viewBox="0 0 24 24"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>',share:'<svg viewBox="0 0 24 24"><path d="M21 11 14 4v4C7 9 4 13 3 19c3-3 6-4 11-4v4z"/></svg>',play:'<svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg>'};
function sToast(m){let t=document.getElementById('stoast');if(!t){document.body.insertAdjacentHTML('beforeend','<div id="stoast" style="position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#171513;border:1px solid #c9a46a;color:#efe9df;border-radius:30px;padding:10px 20px;z-index:300;font:14px system-ui;display:none"></div>');t=document.getElementById('stoast')}t.textContent=m;t.style.display='block';clearTimeout(sToast.t);sToast.t=setTimeout(()=>t.style.display='none',2200)}
function cgBar(c){
 ['gsets','cga','cgbar','cgnext'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});
 const g=document.getElementById('grid');if(!g)return;
 const sets=(c.sets||[]).filter(x=>x.photos&&x.photos.length),multi=sets.length>1;let si=0;
 const listOf=()=>multi?sets[si].photos:(c.photos||[]);
 const q=id=>document.getElementById(id);
 const nextBox=()=>{const n=q('cgnext');if(!n)return;if(!multi){n.innerHTML='';return}
  n.innerHTML=si<sets.length-1?`<button data-n="1"><small>Next collection</small><b>${hx(sets[si+1].name)}</b><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>`:`<button data-n="top"><small>That was the last folder</small><b>Return to gallery start</b><svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button>`};
 const draw=()=>{window.__set=multi?sets[si].name:'Whole gallery';const l=listOf();mason(g,l.length?l.map(src=>({src,client:c.name})):demo(9),c.lay);nextBox()};
 const setTab=i=>{si=i;document.querySelectorAll('#cgt button').forEach((x,k)=>x.classList.toggle('on',k===si));draw();const bar=q('cgbar');if(bar)bar.scrollIntoView({behavior:'smooth'})};
 g.insertAdjacentHTML('beforebegin',`<div id="cgbar"><div class="cgn"><b>${hx(c.name)}</b><small>${hx(c.date||'')}</small></div><div id="cgt">${multi?sets.map((x,i)=>`<button data-i="${i}" class="${i===0?'on':''}">${hx(x.name)}</button>`).join(''):''}</div><div class="cgi">${window.__fav?`<button id="cgf" aria-label="Favorites">${CGI.heart}<span class="z">0</span></button>`:''}${window.__dlon?`<button id="cgd" aria-label="Download">${CGI.dl}</button>`:''}<button id="cgs" aria-label="Share">${CGI.share}</button><button id="cgp" aria-label="Slideshow">${CGI.play}</button></div></div>`);
 g.insertAdjacentHTML('afterend','<div id="cgnext"></div><footer id="cgclosing"><span>Private gallery</span><b>Published by JP. Saki</b></footer>');
 q('cgt').onclick=e=>{const b=e.target.closest('button');if(b)setTab(+b.dataset.i)};
 q('cgnext').onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.n==='top')setTab(0);else setTab(si+1)};
 if(q('cgf'))q('cgf').onclick=async()=>{let em='';try{em=localStorage.getItem('em_'+c.slug)||''}catch{}if(!em){if(!(await needEmail(true)))return;await loadFavs()}favDrawer()};
 if(q('cgd'))q('cgd').onclick=dlModal;
 q('cgs').onclick=()=>{const url=location.href.split('#')[0];if(navigator.share)navigator.share({title:c.name,url}).catch(()=>{});else if(navigator.clipboard)navigator.clipboard.writeText(url).then(()=>sToast('Link copied'));else sToast('Copy the link from the address bar')};
 let ss=null;q('cgp').onclick=()=>{if(ss){clearInterval(ss);ss=null;return}LB=listOf().filter(Boolean);if(!LB.length)return;LI=0;show();ss=setInterval(()=>{if(!document.getElementById('lb').classList.contains('o')){clearInterval(ss);ss=null;return}LI=(LI+1)%LB.length;show()},3500)};
 draw();
}
function clientMode(c){
 if(c.type!=='client')return;document.body.classList.add('cg');
 if(!document.getElementById('cgcss2'))document.head.insertAdjacentHTML('beforeend','<style id="cgcss2">body.cg .pg,body.cg .pg.has-cover{padding-top:0!important}body.cg #gcov{margin:0!important}body.cg #gcov .gdn{display:none!important}body.cg #gcov .gct{display:flex;flex-direction:column;align-items:center}body.cg #gcov h1{order:1;margin:0}body.cg #gcov .eb{order:2;margin:18px 0 0;opacity:0;animation:cgf 1s ease forwards 1.15s}body.cg #gcov .gvg{order:3;margin-top:30px;padding:11px 22px;font-size:10.5px;letter-spacing:.3em;opacity:0;animation:cgf 1s ease forwards 1.55s}.cw{display:inline-block;white-space:nowrap}.cl{display:inline-block;opacity:0;transform:translateY(.5em);filter:blur(8px);animation:cgl 1s cubic-bezier(.2,.7,.2,1) forwards;animation-delay:calc(var(--i)*55ms + .3s)}@keyframes cgl{to{opacity:1;transform:none;filter:none}}@keyframes cgf{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}@media(prefers-reduced-motion:reduce){.cl,body.cg #gcov .eb,body.cg #gcov .gvg{animation:none!important;opacity:1!important;transform:none!important;filter:none!important}}#cgbar{margin-top:0!important}#cgnext{display:flex;justify-content:center;padding:46px 0 80px}#cgnext button{display:flex;align-items:center;gap:14px;background:none;border:1px solid #ffffff2e;border-radius:40px;color:#efe9df;padding:12px 14px 12px 24px;cursor:pointer;font:inherit;text-align:left;transition:.25s}#cgnext button:hover{border-color:#c9a46a;background:#c9a46a14}#cgnext small{display:block;color:#9d9387;font-size:11px;letter-spacing:.14em;text-transform:uppercase}#cgnext b{display:block;font:500 20px Georgia,serif}#cgnext svg{width:38px;height:38px;padding:9px;border-radius:50%;background:#c9a46a;stroke:#17120b;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.fv svg,#lb #lbtools svg,.cgi svg{stroke:currentColor;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.fv svg{width:19px;height:19px;stroke:#fff}.fv.on svg,#lb #lbtools .lbh.on svg,#cgf.on svg{fill:#ff6b81;stroke:#ff6b81}body.cg #lb>.dl{display:none!important}body.cg #lb small{bottom:auto;top:24px;left:26px}#lb #lbtools{position:absolute;bottom:26px;left:50%;transform:translateX(-50%);display:flex;gap:8px;padding:7px;background:#171513eb;border:1px solid #ffffff24;border-radius:40px;backdrop-filter:blur(10px);z-index:5}#lb #lbtools>*{position:static;width:52px;height:52px;padding:0;border-radius:50%;background:none;border:0;color:#efe9df;display:grid;place-items:center;opacity:1;font-size:0;cursor:pointer;transition:.2s;text-decoration:none}#lb #lbtools>*:hover{background:#ffffff1c;color:#c9a46a}#lb #lbtools svg{width:25px;height:25px}#lb #lbtools .lbd{background:#c9a46a;color:#17120b}#lb #lbtools .lbd:hover{background:#d6b57d;color:#17120b}#lb #lbtools .lbd svg{stroke:#17120b}</style>');
 if(!document.getElementById('cgcss'))document.head.insertAdjacentHTML('beforeend','<style id="cgcss">body.cg #hd nav,body.cg #hd #mb,body.cg #ft,body.cg #gbar,body.cg #gs,body.cg #gallery-nav{display:none!important}body.cg #hd{position:absolute!important;background:none!important;border:0!important}body.cg #gcov{height:calc(100svh - 76px)!important;min-height:460px}body.cg .gdn{display:none}.gvg{display:none}body.cg .gvg{display:inline-block;margin-top:34px;background:none;border:1px solid #efe9dd;color:#efe9dd;letter-spacing:.32em;font-size:12px;text-transform:uppercase;padding:16px 30px;cursor:pointer;transition:.25s}body.cg .gvg:hover{background:#efe9dd;color:#17120b}body.cg .pg .wrap{max-width:none!important;width:100%!important;padding-left:4px!important;padding-right:4px!important}body.cg .mas{--g:5px!important}#cgbar{position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:26px;padding:14px 18px;margin:0 -4px 6px;background:#0d0c0bf2;backdrop-filter:blur(12px);border-bottom:1px solid #ffffff14}#cgbar .cgn b{display:block;font:500 26px/1.05 Georgia,serif}#cgbar .cgn small{display:block;letter-spacing:.26em;font-size:10px;color:#9d9387;text-transform:uppercase;margin-top:3px}#cgt{display:flex;gap:24px;overflow:auto;flex:1;scrollbar-width:none}#cgt button{background:none;border:0;border-bottom:1px solid transparent;color:#9d9387;font:inherit;font-size:17px;padding:6px 0;cursor:pointer;white-space:nowrap}#cgt button:hover{color:#efe9df}#cgt .on{color:#efe9df;border-color:#c9a46a}.cgi{display:flex;gap:4px;margin-left:auto}.cgi button{position:relative;background:none;border:0;color:#efe9df;width:46px;height:46px;border-radius:50%;cursor:pointer;display:grid;place-items:center;transition:.2s}.cgi button:hover{background:#ffffff14;color:#c9a46a}.cgi svg{width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}.cgi span{position:absolute;top:3px;right:1px;font-size:10px;background:#c9a46a;color:#17120b;border-radius:9px;padding:0 5px;min-width:16px;text-align:center}.cgi span.z{display:none}@media(max-width:700px){#cgbar{padding:10px 12px;gap:10px;flex-wrap:wrap}#cgbar .cgn b{font-size:19px}#cgt{order:3;flex-basis:100%}.cgi button{width:40px;height:40px}}body.cg #dlall,body.cg #dlp{display:none!important}#cga{margin-left:auto;display:flex;gap:10px;align-items:center}#cga button{background:none;border:1px solid #ffffff40;color:inherit;border-radius:30px;padding:9px 18px;cursor:pointer;font:inherit;transition:.2s}#cga button:hover{border-color:#c9a46a;color:#c9a46a}#cgf span{margin-left:2px}#lb .dl{padding:13px 26px!important;font-size:15px!important;border-radius:40px!important;background:#c9a46a!important;color:#17120b!important;font-weight:600}#lb .dl svg{stroke:#17120b}.lbh{position:absolute;top:16px;right:84px;z-index:3;width:48px;height:48px;border-radius:50%;background:#0009;color:#fff;border:1px solid #ffffff44;font-size:21px;cursor:pointer}.lbh.on{color:#ff6b81}.sm{position:fixed;inset:0;z-index:200;background:#0e0d0ccc;display:grid;place-items:center}.sb{width:min(400px,92vw);background:#171513;border:1px solid #302a25;border-radius:16px;padding:24px;color:#efe9df;font:14px system-ui}.sb h3{font:400 28px Georgia,serif;margin:0 0 10px}.sb p{color:#9d9387}.sb input[type=text],.sb input:not([type]){width:100%;padding:12px 16px;border-radius:30px;border:1px solid #302a25;background:#100e0d;color:inherit}.sa{display:flex;gap:10px;justify-content:flex-end;margin-top:16px}.sa button{background:none;border:1px solid #302a25;color:inherit;border-radius:30px;padding:10px 20px;cursor:pointer}.sa .btn.f{background:#c9a46a;border-color:#c9a46a;color:#17120b;font-weight:600}.lb2{margin:12px 0 6px;color:#9d9387;font-size:12px}.rd{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border:1px solid #302a25;border-radius:12px;margin-bottom:8px;cursor:pointer}.rd input{accent-color:#c9a46a;margin-top:3px}.rd b{display:block}.rd small{color:#9d9387}#fdr{position:fixed;top:0;right:0;bottom:0;width:min(380px,100vw);z-index:150;background:#171513;border-left:1px solid #302a25;color:#efe9df;font:14px system-ui;overflow:auto;padding:20px;box-shadow:-14px 0 40px #000a}#fdr .fh{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}#fdr .fh b{font:400 28px Georgia,serif}#fdr button{background:none;border:1px solid #302a25;color:inherit;border-radius:30px;padding:7px 14px;cursor:pointer;font:inherit}#fdr button:disabled{opacity:.4}#fdr .fl,#fdr .fb{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px}#fdr .fl .on{background:#c9a46a;color:#17120b;border-color:#c9a46a}#fdr i{font-style:normal;opacity:.7}#fdr .fg{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}#fdr .fi{position:relative;aspect-ratio:1}#fdr .fi img{width:100%;height:100%;object-fit:cover;border-radius:6px}#fdr .fi button{position:absolute;top:4px;right:4px;width:26px;height:26px;padding:0;background:#000b;border:0}#cgbar .cgn b{font-size:22px;font-weight:400;letter-spacing:-.01em}#cgbar .cgn small{font-size:9px;letter-spacing:.18em}#cgt{gap:18px}#cgt button{font-size:15px;font-weight:400;padding:5px 0}#cgnext{padding:24px 0 34px}#cgnext button{border-radius:14px;padding:10px 14px 10px 18px;gap:12px}#cgnext small{font-size:9px;letter-spacing:.12em}#cgnext b{font:500 16px/1.25 Inter,system-ui,sans-serif;letter-spacing:0}#cgnext svg{width:32px;height:32px;padding:8px}#cgclosing{display:flex;justify-content:center;align-items:center;gap:8px;padding:0 16px 42px;color:#82786e;font:10px Inter,system-ui,sans-serif;letter-spacing:.08em}#cgclosing b{font-weight:500;color:#b5a99a;letter-spacing:.04em}#lb #lbtools{top:18px;right:18px;bottom:auto;left:auto;transform:none;gap:4px;padding:5px;border-radius:32px;background:#171513c9;border:1px solid #ffffff24}#lb #lbtools>*{width:42px;height:42px;border-radius:50%}#lb #lbtools svg{width:21px;height:21px}#fdr{padding:18px}#fdr .fh b{font:400 23px/1.2 Georgia,serif;letter-spacing:-.01em}#fdr .fl button{font-size:12px;padding:7px 11px}#fdr .fb button{font-size:12px;padding:7px 12px}#fdr .fg{gap:5px}@media(max-width:700px){#cgbar{padding:8px 10px;gap:8px}#cgbar .cgn b{font-size:17px;line-height:1.15}#cgbar .cgn small{font-size:8px;letter-spacing:.12em}#cgt{gap:14px}#cgt button{font-size:13px;padding:4px 0}#cgbar .cgi button{width:34px;height:34px}#cgbar .cgi svg{width:19px;height:19px}#cgnext{padding:18px 0 26px}#cgnext b{font-size:14px}#cgclosing{padding-bottom:30px;font-size:9px}#lb #lbtools{top:10px;right:10px;gap:2px;padding:4px}#lb #lbtools>*{width:38px;height:38px}#lb #lbtools svg{width:19px;height:19px}#fdr .fh b{font-size:21px}}</style>');
 const lg=document.querySelector('#hd .logo');if(lg)lg.href=c.homeUrl||'/';
 cgBar(c);
 const lb=document.getElementById('lb');if(lb&&!lb.querySelector('#lbtools'))lb.insertAdjacentHTML('beforeend',`<div id="lbtools">${window.__fav?`<button class="lbh" aria-label="Favorite">${HRT}</button>`:''}${window.__dlon?`<a class="dl lbd" aria-label="Download original" title="Download" href="#">${CGI.dl}</a>`:''}</div>`);
 favHeader();lbFav();let em='';try{em=localStorage.getItem('em_'+c.slug)||''}catch{}if(window.__fav)loadFavs()}
function needEmail(force){const c=window.__dlc||{},slug=c.slug||'gallery',askName=c.askName??!!c.emailGate,askEmail=c.askEmail??!!c.emailGate,askPhone=!!c.askPhone;
 const cv0=c.cover||(c.photos||[])[0],bgs=cv0?'linear-gradient(#0e0d0cdb,#0e0d0cdb),url('+cv0+') center/cover':'#0e0d0ccc';
 if(!askName&&!askEmail&&!askPhone)return Promise.resolve(true);
 const stored=k=>{try{return localStorage.getItem(k+'_'+slug)||''}catch{return ''}};
 if((!askName||stored('nm'))&&(!askEmail||stored('em'))&&(!askPhone||stored('ph')))return Promise.resolve(true);
 return new Promise(ok=>{const fields=(askName?'<input name="visitor_name" type="text" required placeholder="Your name" aria-label="Name" autocomplete="name">':'')+(askEmail?'<input name="email" type="email" required placeholder="Email address" aria-label="Email" autocomplete="email">':'')+(askPhone?'<input name="phone" type="tel" required placeholder="Phone number" aria-label="Phone" autocomplete="tel">':'');
 const html='<div id="emg" style="position:fixed;inset:0;z-index:99;display:grid;place-items:center;background:'+bgs+'"><form style="width:min(380px,90vw);background:#171513;border:1px solid #302a25;border-radius:16px;padding:26px;text-align:center;color:#efe9df;font:14px system-ui"><h3 style="font:400 30px Georgia,serif;margin:0 0 6px">Your details</h3><p style="color:#9d9387;margin:0 0 14px">A few details help keep your gallery activity together.</p>'+fields+'<button class="btn f" style="width:100%;margin-top:4px">Continue</button><button type="button" id="emx" style="background:none;border:0;color:#9d9387;margin-top:10px;cursor:pointer">Cancel</button></form></div>';
 document.body.insertAdjacentHTML('beforeend',html);
 const g=document.getElementById('emg'),f=g.querySelector('form'),get=k=>(f.querySelector('[name="'+k+'"]')||{}).value?.trim()||'';
 const first=f.querySelector('input');if(first)first.focus();document.getElementById('emx').onclick=()=>{g.remove();ok(false)};
 f.onsubmit=e=>{e.preventDefault();const nm=get('visitor_name'),em=get('email'),ph=get('phone');try{if(askName)localStorage.setItem('nm_'+slug,nm);if(askEmail)localStorage.setItem('em_'+slug,em);if(askPhone)localStorage.setItem('ph_'+slug,ph);localStorage.setItem('reg_'+slug,'1')}catch{}
 gcall('email',{email:em||null,visitor_name:nm,phone:ph});g.remove();ok(true)}})}
const dlName=p=>{const c=window.__dlc||{},i=(c.photos||[]).indexOf(p),q=dlSrc(p),ext=(q.match(/\.(\w+)$/)||[0,'jpg'])[1];return `${c.slug||'photo'}-${String(i+1).padStart(3,'0')}.${ext}`};
async function sha(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
function gate(c,ok){document.body.insertAdjacentHTML('beforeend',`<div id="gate"><i class="gbg"></i><form><span class="eb">Private gallery</span><h2>${c.name}</h2><p>Enter the PIN you were given to open this gallery.</p><input type="password" id="pin" autocomplete="off" placeholder="PIN" aria-label="PIN"><button class="btn f">Open gallery</button><small id="pe"></small></form></div>`);
 const f=$('#gate form'),cands=[c.cover,...(c.photos||[])].filter(Boolean).slice(0,4);let bg=cands[0];if(bg){const im=new Image();im.onerror=()=>{cands.shift();if(cands.length){bg=cands[0];im.src=bg}};im.onload=()=>{const g=$('#gate .gbg');if(g){g.style.backgroundImage=`url('${bg}')`;g.style.backgroundPosition=pos(bg);g.classList.add('on')}};im.src=bg}
 setTimeout(()=>$('#pin').focus(),50);
 f.onsubmit=async e=>{e.preventDefault();const v=$('#pin').value.trim(),h=await sha((c.pinSalt||'')+v);
  if(h==c.pinHash){try{sessionStorage.setItem('pin_'+c.slug,c.pinHash)}catch{}$('#gate').remove();ok()}
  else{$('#pe').textContent='That PIN is not correct.';f.classList.add('shake');setTimeout(()=>f.classList.remove('shake'),500);$('#pin').value=''}}}
async function dlBlob(a){a.classList.add('busy');try{const r=await fetch(dlFetch(a.href));if(!r.ok)throw 0;const b=await r.blob(),u=URL.createObjectURL(b),t=document.createElement('a');t.href=u;t.download=a.getAttribute('download')||'photo.jpg';document.body.appendChild(t);t.click();t.remove();setTimeout(()=>URL.revokeObjectURL(u),30000)}catch{window.open(a.href,'_blank')}a.classList.remove('busy')}
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a.dl,a.dli');if(a&&a.href&&!PV){e.preventDefault();e.stopPropagation();needEmail().then(k=>{if(k){const f=(a.closest&&a.closest('.t')&&a.closest('.t').dataset.s)||(typeof LB!=='undefined'?LB[LI]:'');gcall('download',{file:f,res:'original',set:window.__set||''});dlBlob(a)}})}},true);
async function gcover(c){const old=$('#gcov');if(old)old.remove();const pg=$('.pg');if(pg)pg.classList.remove('has-cover');
 const im=c.cover||(c.photos||[])[0];if(!im||c.showCover===false||!pg)return;pg.classList.add('has-cover');
 pg.insertAdjacentHTML('beforebegin',`<section id="gcov" class="gc-${c.coverSize||'full'}"><i class="gcb"></i><div class="gct">${c.date?`<span class="eb">${c.date}</span>`:''}<h1>${c.type==='client'?cgLetters(c.name):c.name}</h1><button class="gdn" aria-label="View pictures"><span></span></button><button class="gvg" type="button">View gallery</button></div></section>`);
 const b=$('#gcov .gcb'),t=new Image();t.onload=()=>b.classList.add('on');t.src=im;b.style.backgroundImage=`url('${im}')`;b.style.backgroundPosition=pos(im);
 $('#gcov .gdn').onclick=$('#gcov .gvg').onclick=()=>pg.scrollIntoView({behavior:'smooth'})}
async function zipAll(c,btn,list,zn,res){if(!(await needEmail()))return;gcall('zip',{n:(list||c.photos||[]).length,file:zn||c.slug,res:res||'original',set:window.__zset||''});const sp=$('#dlp')||{};btn.disabled=true;
 try{if(!window.JSZip)await new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';s.onload=ok;s.onerror=no;document.head.appendChild(s)});
  const z=new JSZip(),ps=list||c.photos;let n=0;for(const p of ps){const r=await fetch(dlFetch(res==='web'?p:dlSrc(p)));if(!r.ok)throw 0;z.file(dlName(p),await r.blob());n++;sp.textContent=`Preparing ${n} / ${ps.length}…`}
  const blob=await z.generateAsync({type:'blob',compression:'STORE'},m=>sp.textContent=`Zipping ${Math.round(m.percent)}%`),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=(zn||c.slug)+'.zip';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),60000)}
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
function show(){const l=$('#lb');l.classList.add('o');setTimeout(lbFav,0);$('img',l).src=LB[LI];$('small',l).textContent=`${LI+1} / ${LB.length}`;const dl=$('.dl',l);if(dl){if(window.__dlon){dl.hidden=false;dl.href=dlSrc(LB[LI]);dl.setAttribute('download',dlName(LB[LI]))}else dl.hidden=true}}
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
  window.__dlc=c;window.__dlon=!!c.download&&c.download!='off';window.__fav=c.type==='client'&&c.favorites!==false;loadLocalFL(c.slug);
  if(window.__fav&&!document.getElementById('fvcss'))document.head.insertAdjacentHTML('beforeend','<style id="fvcss">.fv{position:absolute;left:10px;bottom:10px;z-index:3;width:36px;height:36px;border-radius:50%;border:0;background:#000a;color:#fff;font-size:17px;cursor:pointer;opacity:0;transition:.2s}.t:hover .fv,.fv.on{opacity:1}.fv.on{color:#ff6b81}@media(hover:none){.fv{opacity:1}}</style>');
  if((c.private||c.pinHash)&&!document.querySelector('meta[name=robots]'))document.head.insertAdjacentHTML('beforeend','<meta name="robots" content="noindex,nofollow">');
  const sets=(c.sets||[]).filter(x=>x.photos&&x.photos.length);let si=0;
  const draw=()=>{window.__set=sets.length?sets[si].name:'';const l=sets.length?sets[si].photos:(c.photos||[]);mason($('#grid'),l.length?l.map(src=>({src,client:c.name})):demo(9),c.lay)};draw();
  const oldg=$('#gsets');if(oldg)oldg.remove();
  if(sets.length>1){$('#grid').insertAdjacentHTML('beforebegin','<div id="gsets" style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:0 0 18px"></div>');
   const paint=()=>{$('#gsets').innerHTML=sets.map((x,i)=>`<button data-i="${i}" class="btn ${i===si?'f':''}" style="padding:7px 16px">${x.name}</button>`).join('')+(window.__dlon?'<button id="dlset" class="btn" style="margin-left:auto;padding:7px 16px">Download folder</button>':'')};paint();
   $('#gsets').onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.id==='dlset'){zipAll(c,b,sets[si].photos,c.slug+'-'+sets[si].name.toLowerCase().replace(/[^a-z0-9]+/g,'-'));return}si=+b.dataset.i;paint();draw()}}
  const publicGalleries=(C.clients||[]).filter(x=>!x.private&&x.slug),currentIndex=publicGalleries.findIndex(x=>x.slug===s||x.slug===c.slug),prevGallery=currentIndex>0?publicGalleries[currentIndex-1]:null,nextGallery=currentIndex>=0?publicGalleries[currentIndex+1]:null;
  const gnav=$('#gallery-nav');
  if(gnav){
   gnav.replaceChildren();
   const addStep=(item,kind,label)=>{if(!item)return;const a=document.createElement('a');a.className='gallery-step '+kind;a.href='/g/'+encodeURIComponent(item.slug)+'/';const small=document.createElement('small');small.textContent=label;const name=document.createElement('b');name.textContent=item.name||'View gallery';a.append(small,name);gnav.appendChild(a)};
   addStep(prevGallery,'prev','← Previous gallery');
   addStep(nextGallery,'next','Next gallery →');
   gnav.hidden=!prevGallery&&!nextGallery;
  }
  let ga=$('#gact');if(!ga){$('#gs').insertAdjacentHTML('afterend','<div id="gact"></div>');ga=$('#gact')}
  ga.innerHTML=window.__dlon&&(c.photos||[]).length?`<span id="dlp"></span><button class="ibtn" id="dlall" title="Download all pictures" aria-label="Download all pictures">${DLI}</button>`:'';
  if($('#dlall'))$('#dlall').onclick=()=>zipAll(c,$('#dlall'));
  const galleryBack=$('.pg .wrap > a.eb, #gbar > a.eb');if(galleryBack)galleryBack.style.display=c.private?'none':'';
  let bar=$('#gbar');if(!bar){const back=$('.pg .wrap > a.eb');if(back){bar=document.createElement('div');bar.id='gbar';back.parentNode.insertBefore(bar,back);bar.appendChild(back)}}
  if(bar&&ga&&ga.parentNode!==bar)bar.appendChild(ga);
  clientMode(c);gcover(c)};
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
function theme(){const t=C.theme||{},s=document.documentElement.style,set=(k,v)=>v?s.setProperty(k,v):s.removeProperty(k);const studio=t.interface==='studio'||t.interface==='equipment';document.body.classList.remove('ui-equipment','ui-studio','ui-original');document.body.classList.add(studio?'ui-studio':'ui-original');
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

document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('.fv,.lbh');if(!b)return;e.preventDefault();e.stopPropagation();await toggleFav(b.classList.contains('lbh')?LB[LI]:b.dataset.fv)},true);
