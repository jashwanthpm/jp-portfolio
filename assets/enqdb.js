/* JP Portfolio enquiries bridge.
   Public visitors can submit only. Dashboard access reuses the GitHub token
   already saved by Studio Admin; no second Supabase password is required. */
(function(){
  const SB={
    url:'https://kcihpkcpmklzytbsekhy.supabase.co',
    key:'sb_publishable_nM8A5AzPXGZn_7phEIEy5Q_WommbEkU',
    owner:'jashwanthjp18@gmail.com',
    endpoint:'https://kcihpkcpmklzytbsekhy.supabase.co/functions/v1/jp-enquiries'
  };
  const LIM={name:160,phone:40,email:160,instagram:80,occasion:160,looking_for:400,event_date:40,days:40,venue:200,brand:160,budget:80,found_via:160,message:2500,source:80};
  const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}}};
  const githubToken=()=>String(ls.get('jp_tok')||'').trim();
  const session=()=>!!githubToken();
  const request=async(method,path,body,publicMode)=>{
    const token=githubToken();
    if(!publicMode&&!token){const e=new Error('Open Studio Admin first so this page can use your existing GitHub access.');e.auth=true;throw e}
    const u=new URL(SB.endpoint);
    const m=String(path||'').match(/[?&]id=eq\.([^&]+)/);
    if(m)u.searchParams.set('id',decodeURIComponent(m[1]));
    const st=String(path||'').match(/[?&]status=in\.\(([^)]+)\)/);
    if(st)u.searchParams.set('status','in.('+st[1]+')');
    if(publicMode)u.searchParams.set('action','public_insert');
    const headers={apikey:SB.key,'Content-Type':'application/json'};
    if(token&&!publicMode)headers.Authorization='Bearer '+token;
    const r=await fetch(u.toString(),{method,headers,body:body===undefined?undefined:JSON.stringify(body),keepalive:!!publicMode});
    let data=null;try{data=await r.json()}catch(e){}
    if(!r.ok){const x=new Error(data&&data.error||'Request failed ('+r.status+')');if(r.status===401)x.auth=true;throw x}
    return data;
  };
  window.ENQDB={
    cfg:SB,
    session,
    signOut:()=>{},
    rest:(method,path,body)=>request(method,path,body,false),
    submitPublic:async row=>{
      const o={};
      Object.keys(LIM).forEach(k=>{const v=row[k];if(v!==undefined&&v!==null&&String(v).trim())o[k]=String(v).trim().slice(0,LIM[k])});
      if(row.event_date===null)o.event_date=null;
      if(row.days===null)o.days=null;
      if(row.client_ref)o.client_ref=String(row.client_ref).slice(0,160);
      if(!o.name||!o.phone)throw new Error('Name and phone are required.');
      return await request('POST','',o,true);
    },
    insertPublic:row=>{
      try{
        const o={};
        Object.keys(LIM).forEach(k=>{const v=String(row[k]==null?'':row[k]).trim();if(v)o[k]=v.slice(0,LIM[k])});
        if(row.client_ref)o.client_ref=String(row.client_ref).slice(0,160);
        if(!o.name||!o.phone)return;
        request('POST','',o,true).catch(()=>{});
      }catch(e){}
    }
  };
})();