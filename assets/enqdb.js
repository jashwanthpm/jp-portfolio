/* Enquiry database helper (Supabase). The key below is a PUBLIC "publishable" key, safe to ship in a website.
   What it can do is limited by database rules: visitors can only ADD an enquiry, only the owner login can read or edit them. */
(function(){
const SB={url:'https://smyupcjfusgduaoxqfvu.supabase.co',key:'sb_publishable_TKEOxVT1aP_mW78TdPE7KQ_zKkk8WoN',table:'jp_enquiries',owner:'jashwanthjp18@gmail.com'};
const SK='jp_sb_session',LIM={name:120,phone:40,email:160,instagram:80,occasion:160,looking_for:400,event_date:40,days:40,venue:200,brand:160,budget:80,found_via:160,message:2500,source:80};
const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}},del:k=>{try{localStorage.removeItem(k)}catch(e){}}};
const session=()=>{try{return JSON.parse(ls.get(SK))}catch(e){return null}};
const save=j=>{if(j&&j.access_token){ls.set(SK,JSON.stringify({access_token:j.access_token,refresh_token:j.refresh_token,expires_at:j.expires_at||Math.floor(Date.now()/1000)+(j.expires_in||3600),email:(j.user&&j.user.email)||''}))}};
const authCall=async(grant,body)=>{const r=await fetch(SB.url+'/auth/v1/token?grant_type='+grant,{method:'POST',headers:{apikey:SB.key,'Content-Type':'application/json'},body:JSON.stringify(body)});let j={};try{j=await r.json()}catch(e){}if(!r.ok)throw new Error(j.error_description||j.msg||j.message||'Sign-in failed');return j};
let refreshing=null;
const token=async()=>{const s=session();if(!s)return null;if(s.expires_at*1000-Date.now()>60000)return s.access_token;
 if(!refreshing)refreshing=authCall('refresh_token',{refresh_token:s.refresh_token}).then(j=>{save(j);return j.access_token}).catch(()=>{ls.del(SK);return null}).finally(()=>{refreshing=null});return refreshing};
const rest=async(method,path,body,prefer)=>{const t=await token();if(!t){const e=new Error('Please sign in again.');e.auth=true;throw e}
 const h={apikey:SB.key,Authorization:'Bearer '+t,'Content-Type':'application/json'};if(prefer)h.Prefer=prefer;
 const r=await fetch(SB.url+'/rest/v1/'+SB.table+path,{method,headers:h,body:body===undefined?undefined:JSON.stringify(body)});
 if(r.status===401||r.status===403){const e=new Error(r.status===401?'Please sign in again.':'This login is not allowed to view enquiries.');e.auth=true;throw e}
 if(!r.ok){let m='';try{m=(await r.json()).message}catch(e){}throw new Error(m||('Request failed ('+r.status+')'))}
 if(r.status===204)return null;const tx=await r.text();return tx?JSON.parse(tx):null};
window.ENQDB={cfg:SB,session,
 signIn:async(email,password)=>{const j=await authCall('password',{email,password});save(j);return j},
 signOut:()=>{ls.del(SK)},
 rest,
 /* Used by the public enquiry form: add only, never reads anything back. */
 insertPublic:row=>{try{const o={};Object.keys(LIM).forEach(k=>{const v=String(row[k]==null?'':row[k]).trim();if(v)o[k]=v.slice(0,LIM[k])});if(row.client_ref)o.client_ref=row.client_ref;if(!o.name)return;
  fetch(SB.url+'/rest/v1/'+SB.table,{method:'POST',headers:{apikey:SB.key,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(o),keepalive:true}).catch(function(){})}catch(e){}}
};
})();