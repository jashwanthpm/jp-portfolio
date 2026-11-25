/* Keep the published site on its original interface. */
(function(){
 const apply=d=>{
  const t=(d&&d.theme)||{};
  document.body.classList.remove('ui-studio','ui-equipment');
  document.body.classList.add('ui-original');
  document.documentElement.style.setProperty('--studio-accent',(t.accent||'#c9a46a'));
 };
 fetch('/content.json?interface='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():{}).then(apply).catch(()=>apply({}));
 addEventListener('message',e=>{if(e.origin!==location.origin||!e.data||e.data.type!=='content'||!e.data.data)return;apply(e.data.data)});
})();
