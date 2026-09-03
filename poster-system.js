(function(){
  const fallbackCache=new Map();
  const normalize=s=>(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
  function svgData(title,year,badge){
    const key=normalize(title)+'|'+year;
    if(fallbackCache.has(key))return fallbackCache.get(key);
    const words=String(title||'CineVault').split(/\s+/).filter(Boolean);
    const initials=(words.slice(0,3).map(w=>w[0]).join('')||'CV').toUpperCase();
    const safeTitle=esc(title||'CineVault');
    const safeYear=esc(year||'');
    const safeBadge=esc(badge||'CINEVAULT');
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#111821"/><stop offset="1" stop-color="#3a1f27"/></linearGradient><radialGradient id="r" cx="75%" cy="15%" r="70%"><stop offset="0" stop-color="#b84b57" stop-opacity=".8"/><stop offset="1" stop-color="#b84b57" stop-opacity="0"/></radialGradient></defs><rect width="600" height="900" fill="url(#g)"/><rect width="600" height="900" fill="url(#r)"/><circle cx="80" cy="120" r="120" fill="#b84b57" opacity=".14"/><circle cx="560" cy="720" r="190" fill="#7a3944" opacity=".16"/><path d="M0 700 L600 360 L600 900 L0 900Z" fill="#07090d" opacity=".62"/><text x="42" y="82" fill="#b5bcc8" font-family="Arial,sans-serif" font-size="24" font-weight="700" letter-spacing="4">${safeBadge}</text><text x="42" y="520" fill="#eef1f5" font-family="Arial,sans-serif" font-size="96" font-weight="800">${esc(initials)}</text><text x="42" y="610" fill="#eef1f5" font-family="Arial,sans-serif" font-size="34" font-weight="700">${safeTitle.length>24?safeTitle.slice(0,24)+'…':safeTitle}</text><text x="42" y="660" fill="#9ea7b3" font-family="Arial,sans-serif" font-size="24">${safeYear}</text><text x="42" y="840" fill="#b84b57" font-family="Arial,sans-serif" font-size="20" font-weight="700" letter-spacing="3">CINEVAULT NG</text></svg>`;
    const uri='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg);
    fallbackCache.set(key,uri); return uri;
  }
  function catalog(){return Array.isArray(window.CINEVAULT_CATALOG)?window.CINEVAULT_CATALOG:[]}
  function lookup(title){const n=normalize(title);return catalog().find(m=>normalize(m.t)===n)||catalog().find(m=>normalize(m.t).includes(n)||n.includes(normalize(m.t)));}
  function applyGenerated(img,card){
    if(img.dataset.fallbackApplied)return;
    const title=card?.dataset.title||card?.querySelector('h3')?.textContent||img.alt.replace(/\s+poster.*$/i,'');
    const item=lookup(title);
    img.dataset.fallbackApplied='true';
    img.src=svgData(item?.t||title,item?.y||'',item?.badge||'CINEVAULT');
    img.classList.add('generated-poster');
  }
  function bind(img){
    if(img.dataset.posterBound)return;
    img.dataset.posterBound='true';
    img.referrerPolicy='no-referrer';
    img.decoding='async';
    img.addEventListener('error',function(){
      const src=img.dataset.originalSrc||img.src;
      if(!img.dataset.originalSrc)img.dataset.originalSrc=src;
      if(!img.dataset.tmdbRetried && /image\.tmdb\.org\/t\/p\/original\//.test(src)){
        img.dataset.tmdbRetried='true';
        img.src=src.replace('/original/','/w500/');
        return;
      }
      applyGenerated(img,img.closest('.card'));
    });
  }
  function fillPlaceholders(root){
    root.querySelectorAll('.card').forEach(card=>{
      const poster=card.querySelector('.poster'); if(!poster)return;
      const title=(card.dataset.title||card.querySelector('h3')?.textContent||'').trim();
      const item=lookup(title);
      if(item?.img && !poster.querySelector('img')){
        poster.classList.add('image-poster');
        poster.classList.remove('p1','p2','p3','p4','p5','p6','p7','p8','s1','s2','s3','s4','s5','s6');
        const oldStrong=poster.querySelector('strong'); if(oldStrong)oldStrong.remove();
        const img=document.createElement('img'); img.src=item.img; img.alt=item.t+' poster'; img.loading='lazy'; poster.prepend(img);
      }
    });
  }
  function run(root=document){fillPlaceholders(root);root.querySelectorAll('.image-poster img').forEach(bind)}
  run();
  const observer=new MutationObserver(m=>{for(const x of m){for(const n of x.addedNodes){if(n.nodeType===1)run(n)}}});
  observer.observe(document.body,{childList:true,subtree:true});
})();
