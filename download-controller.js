(async function(){
  const params=new URLSearchParams(location.search);
  const requested=params.get('title')||'';
  const setButtons=(enabled,key)=>{
    ['downloadBtn','downloadBtn2'].forEach(id=>{
      const old=document.getElementById(id); if(!old) return;
      const btn=old.cloneNode(true); old.replaceWith(btn); btn.removeAttribute('onclick');
      if(enabled){
        btn.href='/download.html?title='+encodeURIComponent(key);
        btn.target='_self'; btn.rel='noopener'; btn.removeAttribute('aria-disabled');
        btn.classList.remove('disabled'); btn.textContent='Download';
      }else{
        btn.removeAttribute('href'); btn.removeAttribute('target');
        btn.setAttribute('aria-disabled','true'); btn.classList.add('disabled');
        btn.textContent='Download unavailable'; btn.addEventListener('click',e=>e.preventDefault());
      }
    });
  };

  if(!requested){
    setButtons(false,'');
    const copy=document.getElementById('downloadCopy');
    if(copy)copy.textContent='No movie title was supplied.';
    return;
  }

  let available=false;
  try{
    const r=await fetch('/api/download?title='+encodeURIComponent(requested)+'&check=1',{cache:'no-store'});
    if(r.ok){const data=await r.json(); available=Boolean(data.available);}
  }catch(e){console.warn('CineVault download availability check failed',e);}

  setButtons(available,requested);
  const copy=document.getElementById('downloadCopy');
  if(copy)copy.textContent=available
    ? 'An authorized CineVault file is connected. Your secure download is prepared when you continue.'
    : 'Direct downloads are enabled only for movies CineVault NG owns, licenses, or is explicitly authorized to distribute.';
})();
