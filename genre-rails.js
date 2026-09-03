(function(){
function run(){
 const anchor=document.getElementById('genres');
 if(!anchor||document.querySelector('.discovery-rails'))return;
 const cards=[...document.querySelectorAll('.card')].map(c=>({title:c.dataset.title||'',tags:(c.dataset.tags||'').toLowerCase(),year:((c.dataset.tags||'').match(/(?:19|20)\d{2}/)||[''])[0],img:c.querySelector('img')?.src||'',href:c.getAttribute('href')||'#'})).filter(x=>x.title);
 const groups=[
 ['ACTION','Action',x=>/action|crime|spy|superhero|military|sniper/.test(x.tags)],
 ['ROMANCE','Romance',x=>/romance/.test(x.tags)],
 ['HORROR','Horror',x=>/horror|vampire/.test(x.tags)],
 ['COMEDY','Comedy',x=>/comedy/.test(x.tags)],
 ['SCI-FI','Sci-Fi & Fantasy',x=>/sci-fi|fantasy/.test(x.tags)],
 ['ANIMATION','Animation',x=>/animation/.test(x.tags)],
 ['AFRICAN CINEMA','African Cinema',x=>/nigeria|nollywood|africa/.test(x.tags)],
 ['CLASSICS','Classics',x=>/^(199\d|200[0-5])$/.test(x.year)],
 ['2020s','Movies of the 2020s',x=>/^202\d$/.test(x.year)],
 ['2010s','Movies of the 2010s',x=>/^201\d$/.test(x.year)],
 ['2000s','Movies of the 2000s',x=>/^200\d$/.test(x.year)],
 ['1990s','Movies of the 1990s',x=>/^199\d$/.test(x.year)]
 ];
 const seen=new Set();
 groups.forEach(([eyebrow,title,test])=>{
  const items=cards.filter(test).filter(x=>!seen.has(eyebrow+'|'+x.title)).slice(0,14);
  if(items.length<3)return;
  const sec=document.createElement('section');sec.className='section container slider-section generated-section discovery-rails';
  sec.innerHTML='<div class="section-head"><div><p class="eyebrow">'+eyebrow+'</p><h2>'+title+'</h2></div><div class="slider-controls"><button class="slider-btn prev" aria-label="Previous '+title+'">‹</button><button class="slider-btn next" aria-label="Next '+title+'">›</button></div></div><div class="movie-rail">'+items.map(x=>'<a class="card" href="'+x.href+'" data-title="'+x.title.replace(/"/g,'&quot;')+'" data-tags="'+x.tags+'"><div class="poster image-poster">'+(x.img?'<img src="'+x.img+'" alt="'+x.title.replace(/"/g,'&quot;')+' poster" loading="lazy">':'<strong>'+x.title+'</strong>')+'</div><div><h3>'+x.title+'</h3><p>'+title+' · '+x.year+'</p></div></a>').join('')+'</div>';
  anchor.parentNode.insertBefore(sec,anchor);
 });
 document.querySelectorAll('.discovery-rails').forEach(sec=>{const rail=sec.querySelector('.movie-rail');const prev=sec.querySelector('.prev'),next=sec.querySelector('.next');if(!rail)return;const amount=()=>Math.max(280,Math.round(rail.clientWidth*.72));prev?.addEventListener('click',()=>rail.scrollBy({left:-amount(),behavior:'smooth'}));next?.addEventListener('click',()=>rail.scrollBy({left:amount(),behavior:'smooth'}));});
}
setTimeout(run,180);
})();