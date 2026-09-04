(async function(){
  const params=new URLSearchParams(location.search);
  const requested=params.get('title')||'';
  const norm=s=>String(s||'').toLowerCase().replace(/[’‘`]/g,"'").replace(/[^a-z0-9]+/g,' ').trim();
  let downloads={};
  try{
    const r=await fetch('/downloads.json?v=20260904',{cache:'no-store'});
    if(r.ok) downloads=await r.json();
  }catch(e){ console.warn('CineVault download manifest unavailable',e); }
  const key=Object.keys(downloads).find(k=>norm(k)===norm(requested));
  const enabled=Boolean(key && downloads[key]);
  ['downloadBtn','downloadBtn2'].forEach(id=>{
    const old=document.getElementById(id);
    if(!old) return;
    const btn=old.cloneNode(true);
    old.replaceWith(btn);
    btn.removeAttribute('onclick');
    if(enabled){
      btn.href='/download.html?title='+encodeURIComponent(key);
      btn.target='_self';
      btn.rel='noopener';
      btn.removeAttribute('aria-disabled');
      btn.classList.remove('disabled');
      btn.textContent='Download';
    }else{
      btn.removeAttribute('href');
      btn.removeAttribute('target');
      btn.setAttribute('aria-disabled','true');
      btn.classList.add('disabled');
      btn.textContent='Download unavailable';
      btn.addEventListener('click',e=>e.preventDefault());
    }
  });
  const copy=document.getElementById('downloadCopy');
  if(copy) copy.textContent=enabled
    ? 'Authorized download available. Your CineVault download link is prepared securely and expires after a limited time.'
    : 'Download is not currently available for this title. Authorized files will appear here when they are added to CineVault.';
})();
