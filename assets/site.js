const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const shuf=a=>{a=[...a];for(let i=a.length;i>1;){const j=Math.random()*i--|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const NAV=[['index.html','Home','home'],['portfolio.html','Portfolio','portfolio'],['clients.html','Galleries','clients'],['about.html','About','about'],['contact.html','Contact','contact']];
const P=document.body.dataset.p;let C={},LB=[],LI=0;
const pics=(pub=true)=>(C.clients||[]).filter(c=>!pub||!c.private).flatMap(c=>(c.photos||[]).map(s=>({src:s,client:c.name,slug:c.slug})));
const tile=(p,cap)=>`<figure class="t" ${p.src?`data-s="${p.src}"`:''}>${p.src?`<img src="${p.src}" alt="${p.client||'Photo'}" loading="lazy">`:`<span class="ph" style="--h:${p.h||0}"></span>`}${cap?`<figcaption>${cap}</figcaption>`:''}</figure>`;
const demo=n=>Array.from({length:n},(_,i)=>({h:i%5,client:'Client'}));
const img=(s,h=0)=>s?`<img src="${s}" alt="">`:`<span class="ph" style="--h:${h}"></span>`;
const txt=(id,v)=>{const e=document.getElementById(id);if(e&&v!=null)e.textContent=v};
function bind(root,list){root.onclick=e=>{const f=e.target.closest('.t[data-s]');if(!f)return;LB=list.filter(p=>p.src).map(p=>p.src);LI=LB.indexOf(f.dataset.s);show()}}
function show(){const l=$('#lb');l.classList.add('o');$('img',l).src=LB[LI];$('small',l).textContent=`${LI+1} / ${LB.length}`}
function shell(){
 document.body.insertAdjacentHTML('afterbegin',`<header id="hd"><div class="wrap"><a class="logo" href="index.html">${(C.name||'JP').split(' ').map(w=>w[0]).join('')}<i>.</i> ${C.name||''}</a><button id="mb" aria-label="Menu">☰</button><nav>${NAV.map(n=>`<a href="${n[0]}" class="${n[2]==P?'on':''}">${n[1]}</a>`).join('')}</nav></div></header>`);
 document.body.insertAdjacentHTML('beforeend',`<footer id="ft"><div class="wrap"><div class="big">${C.name||''}</div><div class="r"><div>${NAV.map(n=>`<a href="${n[0]}">${n[1]}</a>`).join('')}</div><div><a href="mailto:${C.email}">${C.email}</a><a href="${C.instagram}">Instagram</a></div><div>© ${new Date().getFullYear()} ${C.name||''}</div></div></div></footer><div id="lb"><button class="x">×</button><button class="p">‹</button><img alt=""><button class="n">›</button><small></small></div>`);
 const l=$('#lb'),mv=d=>{LI=(LI+d+LB.length)%LB.length;show()};
 $('.x',l).onclick=()=>l.classList.remove('o');$('.p',l).onclick=()=>mv(-1);$('.n',l).onclick=()=>mv(1);
 document.onkeydown=e=>{if(!l.classList.contains('o'))return;if(e.key=='Escape')l.classList.remove('o');if(e.key=='ArrowLeft')mv(-1);if(e.key=='ArrowRight')mv(1)};
 $('#mb').onclick=()=>$('nav').classList.toggle('o');
 addEventListener('scroll',()=>$('#hd').classList.toggle('s',scrollY>40),{passive:true});
 document.title=(document.title.split('—')[0]).trim()+' — '+C.name;
}
function common(){
 txt('about',C.about);txt('stat-intro',C.intro);
 const st=$('#stats');if(st)st.innerHTML=(C.stats||[]).map(s=>`<div><b>${s.n}</b><span>${s.l}</span></div>`).join('');
 const pt=$('#pts');if(pt)pt.innerHTML=(C.points||[]).map((p,i)=>`<div><b>0${i+1}</b><h3>${p.t}</h3><p>${p.d}</p></div>`).join('');
 const mq=$('#mq');if(mq){const h=(C.brands||[]).map(b=>`<span>${b.name}</span><b>✦</b>`).join('');mq.innerHTML=h+h+h+h}
 const pr=$('#portrait');if(pr)pr.innerHTML=img(C.portrait);
 const em=$('#em');if(em){em.textContent=C.email;em.href='mailto:'+C.email}const ig=$('#ig');if(ig)ig.href=C.instagram;
 const wa=$('#wa');if(wa&&C.phone){wa.hidden=false;wa.href='https://wa.me/'+C.phone}
}
const cards=(list)=>list.map(c=>`<a class="cd rv" href="gallery.html?c=${c.slug}">${img(c.cover||(c.photos||[])[0],c.name.length%5)}<div><small>${c.date||''} · ${(c.photos||[]).length} photos</small><h3>${c.name}</h3></div></a>`).join('');
const INIT={
home(){
 txt('kick',C.kicker);txt('role',C.role);const all=pics(),sl=shuf(all).slice(0,5);
 $('#slides').innerHTML=(sl.length?sl:[{}]).map((p,i)=>`<div class="${i?'':'on'}" style="${p.src?`background-image:url('${p.src}')`:'background:radial-gradient(90% 80% at 30% 20%,#4a3426,#0d0c0b)'}"></div>`).join('');
 let k=0;const ds=$$('#slides div');if(ds.length>1)setInterval(()=>{ds[k].classList.remove('on');k=(k+1)%ds.length;ds[k].classList.add('on')},5500);
 const f=()=>{const s=all.length?shuf(all).slice(0,6):demo(6);$('#feat').innerHTML=s.map(p=>tile(p,p.client)).join('');bind($('#feat'),s)};f();$('#sh').onclick=f;
 $('#gal').innerHTML=cards((C.clients||[]).filter(c=>!c.private).slice(0,3));
},
portfolio(){
 const all=pics(),names=[...new Set(all.map(p=>p.client))],g=$('#grid');
 const r=(c)=>{const s=all.length?all.filter(p=>!c||p.client==c):demo(9);g.innerHTML=s.map(p=>tile(p,p.client)).join('');bind(g,s)};
 $('#chips').innerHTML=['All',...names].map((n,i)=>`<button class="${i?'':'on'}">${n}</button>`).join('');
 $('#chips').onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('#chips button').forEach(x=>x.classList.remove('on'));b.classList.add('on');r(b.textContent=='All'?'':b.textContent)};r();
},
clients(){$('#gal').innerHTML=cards((C.clients||[]).filter(c=>!c.private))},
gallery(){
 const s=new URLSearchParams(location.search).get('c'),c=(C.clients||[]).find(x=>x.slug==s);
 if(!c){$('#gt').textContent='Gallery not found';return}
 document.title=c.name+' — '+C.name;$('#gt').textContent=c.name;txt('gd',c.date);txt('gs',c.story);
 const ps=(c.photos||[]).length?c.photos.map(src=>({src,client:c.name})):demo(9);$('#grid').innerHTML=ps.map(p=>tile(p)).join('');bind($('#grid'),ps);
},
about(){},
contact(){
 if((C.faq||[]).length)$('#faq').innerHTML=C.faq.map(x=>`<details><summary>${x.q}</summary><p>${x.a}</p></details>`).join('');
 $('#f').onsubmit=async e=>{e.preventDefault();txt('ok','Sending…');
 try{const r=await fetch(C.formEndpoint,{method:'POST',body:new FormData(e.target),headers:{Accept:'application/json'}});if(!r.ok)throw 0;e.target.reset();txt('ok',"Thank you — I'll reply to you personally, soon.")}catch{txt('ok','Could not send. Please email me directly.')}}}
};
fetch('content.json').then(r=>r.json()).catch(()=>({})).then(c=>{C=c;shell();common();INIT[P]&&INIT[P]();
 const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&(e.target.classList.add('on'),io.unobserve(e.target))),{threshold:.1});$$('.rv').forEach(x=>io.observe(x))});
