/* Shared site interface selector. */
(function(){
 const apply=d=>{
  const t=(d&&d.theme)||{},studio=t.interface==='studio'||t.interface==='equipment';
  document.body.classList.toggle('ui-studio',studio);
  document.body.classList.toggle('ui-equipment',studio);
  document.body.classList.toggle('ui-original',!studio);
  document.documentElement.style.setProperty('--studio-accent',studio?'#b28a54':(t.accent||'#c9a46a'));
 };
 fetch('/content.json?interface='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():{}).then(apply).catch(()=>apply({}));
 addEventListener('message',e=>{if(e.origin!==location.origin||!e.data||e.data.type!=='content'||!e.data.data)return;apply(e.data.data)});
})();
