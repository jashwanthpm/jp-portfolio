/* Quote link codec: packs a quotation into the URL hash so no server or database is needed. */
(function(){
const b64={
 enc:u=>{let s='';u.forEach(b=>s+=String.fromCharCode(b));return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')},
 dec:t=>{t=t.replace(/-/g,'+').replace(/_/g,'/');while(t.length%4)t+='=';const s=atob(t),u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u}
};
const pipe=async(u,Cls)=>new Uint8Array(await new Response(new Blob([u]).stream().pipeThrough(new Cls('deflate-raw'))).arrayBuffer());
window.QCODEC={
 async enc(o){const raw=new TextEncoder().encode(JSON.stringify(o));
  if(window.CompressionStream){try{return 'z'+b64.enc(await pipe(raw,CompressionStream))}catch(e){}}
  return 'j'+b64.enc(raw)},
 async dec(t){t=(t||'').replace(/^#/,'');const k=t[0],body=b64.dec(t.slice(1));let raw;
  if(k=='z')raw=await pipe(body,DecompressionStream);else if(k=='j')raw=body;else throw new Error('bad');
  return JSON.parse(new TextDecoder().decode(raw))}
};
})();
