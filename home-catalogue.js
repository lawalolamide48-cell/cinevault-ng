(async function(){
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function start(){
 try{if(window.CINEVAULT_CATALOG_READY)await window.CINEVAULT_CATALOG_READY}catch(e){console.warn('CineVault catalogue load warning',e)}
 for(let attempt=0;attempt<6;attempt++){
  const catalog=Array.isArray(window.CINEVAULT_CATALOG)?window.CINEVAULT_CATALOG:[];
  if(catalog.length) return renderHome(catalog);
  await wait(300*(attempt+1));
 }
 renderHome(Array.isArray(window.CINEVAULT_CATALOG)?window.CINEVAULT_CATALOG:[]);
}
function renderHome(catalog){
 const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
 const slug=s=>encodeURIComponent(String(s||'').trim());
 const posters=window.CINEVAULT_POSTERS||{};
 const byTitle=t=>catalog.find(m=>String(m.t).toLowerCase()===String(t).toLowerCase());
 const card=(m,badge,forceSeries=false)=>{const href=((forceSeries||m.type==='series')?'series.html':'movie.html')+'?title='+slug(m.t),tags=(m.g||[]).filter(x=>!['Nigeria','African Cinema','African Diaspora','US','UK'].includes(x)).slice(0,3).join(' · '),src=m.img||posters[m.t]||'',image=src?`<img src="${esc(src)}" alt="${esc(m.t)} ${m.y} poster" loading="lazy" referrerpolicy="no-referrer">`:'';return `<a class="card" href="${href}" data-title="${esc(m.t)}" data-tags="${esc((m.g||[]).join(' ')+' '+m.y)}"><div class="poster image-poster">${image}<span>${esc(badge||m.badge||m.y)}</span></div><div><h3>${esc(m.t)}</h3><p>${esc(tags)}${tags?' · ':''}${esc(m.y)}</p></div></a>`};
 const render=(id,items,badge,forceSeries=false)=>{const sec=document.getElementById(id),grid=sec?.querySelector('.grid');if(grid)grid.innerHTML=items.length?items.map(m=>card(m,badge,forceSeries)).join(''):'<p class="catalog-note">No titles are available in this section yet.</p>'};
 const trendingNames=['Alpha','Facing El Chapo','Grand Theft Auto VI: An Extended Look','Colours of Fire','Cradle 2 the Grave','The Last House','The Whisper Man','The Heat','Abigail','Sniper: The Last Stand'];
 const globalNames=['Spider-Man: Brand New Day','The Odyssey','Toy Story 5','Michael','The Super Mario Galaxy Movie','The Devil Wears Prada 2','Project Hail Mary','Pegasus 3','Minions & Monsters','Obsession','Backrooms','Hoppers','Grand Theft Auto VI: An Extended Look','The Whisper Man','The Last House',"Don't Say Good Luck",'The Heat','72 Hours','13 Minutes','KPop Demon Hunters','Shrek','2012'];
 const trending=trendingNames.map(byTitle).filter(Boolean),global=globalNames.map(byTitle).filter(Boolean);
 const nigeria=catalog.filter(m=>m.type==='movie'&&m.g.includes('Nigeria')).sort((a,b)=>b.pop-a.pop||b.y-a.y).slice(0,20);
 const africa=catalog.filter(m=>m.type==='movie'&&m.g.includes('African Cinema')&&!m.g.includes('Nigeria')).sort((a,b)=>b.pop-a.pop||b.y-a.y).slice(0,16);
 const seriesNames=['Beauty in Black','Blood Sisters','Aníkúlápó: The Series','Far From Home','Postcards','Shanty Town','Olóládé','Castle and Castle','King of Boys: The Return of the King','To Kill a Monkey','Baby Farm','Òlòtūré: The Journey','Seven Doors','Wura','The Smart Money Woman','Skinny Girl in Transit','Queen Sono','Blood & Water','How to Ruin Christmas','Savage Beauty','Kings of Jo’burg','Ludik','Shaka iLembe','Jiva!','Fatal Seduction','Reyka','The Brave Ones','Justice Served','Gomora','The Queen','Gqeberha: The Empire','The River','Yoh! Christmas','Supacell','The Mentalist','Outer Banks','Mousetrap','Our Sticky Love','Spooky in Love','Death of the Pastor’s Wife','Umthetho'];
 const staticSeries=[...document.querySelectorAll('#series .card')].map(c=>({t:c.querySelector('h3')?.textContent?.trim()||'',y:Number((c.querySelector('p')?.textContent||'').match(/\b\d{4}\b/)?.[0])||0,type:'series',g:(c.dataset.tags||'').split(/\s+/).filter(Boolean),pop:0})).filter(m=>m.t);
 const series=seriesNames.map(byTitle).filter(Boolean).map(m=>({...m,type:'series'}));
 const uniqueSeries=[];for(const m of [...series,...staticSeries])if(!uniqueSeries.some(x=>x.t.toLowerCase()===m.t.toLowerCase()))uniqueSeries.push(m);
 render('trending',trending,'NIGERIA');render('movies',global,'WORLD');render('nigeria',nigeria,'NIGERIA');render('series',uniqueSeries.slice(0,18),'SERIES',true);
 if(!document.getElementById('africaBeyond')){const anchor=document.getElementById('genres');if(anchor){const sec=document.createElement('section');sec.id='africaBeyond';sec.className='section container';sec.innerHTML='<div class="section-head"><div><p class="eyebrow">AFRICAN CINEMA</p><h2>Africa Beyond Nollywood</h2></div><span class="section-note">South Africa · Kenya · Senegal · more</span></div><div class="grid"></div><p class="catalog-note">A curated African selection alongside Nigeria’s catalogue. CineVault is a discovery service and does not host copyrighted films without distribution rights.</p>';anchor.parentNode.insertBefore(sec,anchor);render('africaBeyond',africa,'AFRICA')}}
 const mc=catalog.filter(m=>m.type==='movie').length,sc=catalog.filter(m=>m.type==='series').length,stats=document.querySelectorAll('.hero-stats span');if(stats[0])stats[0].innerHTML=`<b>${catalog.length}+ Titles</b><small>Movies & series</small>`;if(stats[1])stats[1].innerHTML=`<b>${mc} Movies</b><small>Global & African picks</small>`;if(stats[2])stats[2].innerHTML=`<b>${sc} Series</b><small>Nigeria & worldwide</small>`;
 document.dispatchEvent(new CustomEvent('cinevault:home-rendered'));
}
start();
})();
