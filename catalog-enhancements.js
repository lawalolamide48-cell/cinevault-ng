(function(){
const MOVIES=[
 {t:'Inception',y:'2010',g:'Sci-Fi · Thriller',img:'https://pics.filmaffinity.com/Inception-131981581-large.jpg'},
 {t:'Interstellar',y:'2014',g:'Sci-Fi · Adventure',img:'https://i.pinimg.com/564x/b0/f9/60/b0f960f7594011053b7cac4345228b8d.jpg'},
 {t:'The Dark Knight',y:'2008',g:'Action · Crime',img:'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw%40%40._V1_SL1024_.jpg'},
 {t:'Parasite',y:'2019',g:'Drama · Thriller',img:'https://i0.wp.com/metagalaxia.com.br/wp-content/uploads/2020/04/parasita-filme-oscar-resenha-poster.jpg?resize=971%2C1500&ssl=1'},
 {t:'Titanic',y:'1997',g:'Romance · Drama',img:'https://www.originalfilmart.com/cdn/shop/products/titanic_1997_original_film_art_713cc08c-5fe2-49d1-bd32-51a1d5890d43_600x.jpg?v=1675533926'},
 {t:'The Matrix',y:'1999',g:'Sci-Fi · Action',img:'https://www.limitedruns.com/media/cache/ee/c4/eec41829a5cc47c6462464e89d173883.jpg'},
 {t:'Avatar',y:'2009',g:'Sci-Fi · Adventure',img:'https://www.originalfilmart.com/cdn/shop/products/avatar_2009_advance_styleC_original_film_art_5000x.webp?v=1671134076'},
 {t:'Oppenheimer',y:'2023',g:'Drama · History',img:'https://akcdn.detik.net.id/community/media/visual/2023/08/25/film-kisah-nyata-oppenheimer-2023.jpeg?q=90&w=620'},
 {t:'Spider-Man: Into the Spider-Verse',y:'2018',g:'Animation · Action',img:'https://image.tmdb.org/t/p/original/7d6EY00g1c39SGZOoCJ5Py9nNth.jpg'},
 {t:'Dune: Part Two',y:'2024',g:'Sci-Fi · Adventure',img:'https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg'},
 {t:'Everything Everywhere All at Once',y:'2022',g:'Sci-Fi · Comedy',img:'https://image.tmdb.org/t/p/original/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg'},
 {t:'The Lord of the Rings: The Fellowship of the Ring',y:'2001',g:'Fantasy · Adventure',img:'https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkbl1cHo6.jpg'}
];
const NIGERIA=[
 {t:'Lionheart',y:'2018',g:'Drama · Comedy',img:'https://cdn.guardian.ng/wp-content/uploads/2019/03/Genevieve.jpg'},
 {t:'A Tribe Called Judah',y:'2023',g:'Comedy · Drama',img:'https://image.tmdb.org/t/p/original/7Q6e3Q0z9v8Jq8W7vYq8x9p8f0M.jpg'},
 {t:'Living in Bondage: Breaking Free',y:'2019',g:'Drama · Thriller',img:'https://image.tmdb.org/t/p/original/6n4JQ0a4v8J4W8p9f0y0z3u6p8Y.jpg'},
 {t:'King of Boys',y:'2018',g:'Crime · Drama',img:'https://image.tmdb.org/t/p/original/9h6lJ7k6m7V7p6K5d4Q3x2Z1a0B.jpg'},
 {t:'The Wedding Party',y:'2016',g:'Romance · Comedy',img:'https://image.tmdb.org/t/p/original/8o4KQ1xQ4g9g6s2m0V3m9j7f2cQ.jpg'},
 {t:'The Figurine: Araromire',y:'2010',g:'Mystery · Drama',img:'https://image.tmdb.org/t/p/original/6s6M6t8p0p2X2V8w3x6f4n8y2dA.jpg'}
];
function key(t){return encodeURIComponent(t)}
function card(m,badge){return `<a class="card" href="movie.html?title=${key(m.t)}" data-title="${m.t}" data-tags="${m.g} ${m.y} global movie nigeria nollywood"><div class="poster image-poster"><img src="${m.img}" alt="${m.t} ${m.y} movie poster" loading="lazy"><span>${badge||m.y}</span></div><div><h3>${m.t}</h3><p>${m.g} · ${m.y}</p></div></a>`}
function addSection(id,label,title,items,badge){
 const host=document.getElementById(id); if(!host)return;
 const sec=document.createElement('section'); sec.className='section container slider-section'; sec.dataset.generated='true';
 sec.innerHTML=`<div class="section-head"><div><p class="eyebrow">${label}</p><h2>${title}</h2></div><div class="slider-controls"><button class="slider-btn prev" aria-label="Previous">‹</button><button class="slider-btn next" aria-label="Next">›</button></div></div><div class="movie-rail">${items.map(x=>card(x,badge)).join('')}</div>`;
 host.parentNode.insertBefore(sec,host.nextSibling);
}
function makeExistingRails(){
 document.querySelectorAll('.section.container').forEach(sec=>{
   if(sec.dataset.generated==='true')return;
   const grid=sec.querySelector(':scope > .grid'); if(!grid)return;
   const head=sec.querySelector('.section-head'); if(!head)return;
   grid.classList.add('movie-rail');
   const controls=document.createElement('div'); controls.className='slider-controls';
   controls.innerHTML='<button class="slider-btn prev" aria-label="Previous">‹</button><button class="slider-btn next" aria-label="Next">›</button>';
   head.appendChild(controls);
   sec.classList.add('slider-section');
 }
}
function bind(){
 document.querySelectorAll('.slider-section').forEach(sec=>{
   const rail=sec.querySelector('.movie-rail'); if(!rail)return;
   const prev=sec.querySelector('.prev'),next=sec.querySelector('.next');
   const amount=()=>Math.max(260,Math.round(rail.clientWidth*.72));
   prev&&prev.addEventListener('click',()=>rail.scrollBy({left:-amount(),behavior:'smooth'}));
   next&&next.addEventListener('click',()=>rail.scrollBy({left:amount(),behavior:'smooth'}));
   rail.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.style.display='none';img.parentElement.classList.remove('image-poster');},{once:true}));
 });
}
function addMissingPosters(){
 const map={
  '2012':'https://www.westsideseattle.com/sites/default/files/styles/news_teaser/public/images/www.westseattleherald.com/2010/01/2012_poster.jpg?itok=o-0zILyx',
  'The Suicide Squad':'https://es.web.img3.acsta.net/pictures/21/03/29/11/37/4173669.jpg',
  'The Fall Guy':'https://artofthemovies.co.uk/cdn/shop/files/IMG_5710-1.jpg?v=1708180802',
  'The Heat':'https://cdn.sktorrent.eu/obrazky/7f5a7cb1c4c14767cf49882b13eebb43bca3ae0a.jpg',
  'Tòkunbò':'https://pbs.twimg.com/media/FqbB2qZWwAAa-n2.jpg',
  'House of Ga\'a':'https://m.media-amazon.com/images/M/MV5BYmVmODA4ODItOGJkYi00NWQ2LTg1MGQtNWQ4YzBhMGM2MDhlXkEyXkFqcGc%40._V1_FMjpg_UX1000_.jpg',
  'Jagun Jagun: The Warrior':'https://blog.fusion.ng/wp-content/uploads/2024/08/1_YP9LJVPVLx6qmpdzXp50tQ-1024x1024.jpg',
  'The Black Book':'https://parallelfactsnews.com/wp-content/uploads/2023/09/20230926_215018.jpg',
  'Blood Vessel':'https://pbs.twimg.com/media/F_2q9x7WYAAGTcw.jpg',
  'Lionheart':'https://cdn.guardian.ng/wp-content/uploads/2019/03/Genevieve.jpg'
 };
 document.querySelectorAll('.card').forEach(card=>{const title=card.dataset.title; const url=map[title]; if(!url)return; const p=card.querySelector('.poster'); if(!p)return; let img=p.querySelector('img'); if(!img){img=document.createElement('img');p.classList.add('image-poster');p.prepend(img);} img.src=url;img.alt=title+' movie poster';});
}
makeExistingRails();
const moviesAnchor=document.getElementById('movies'); if(moviesAnchor)addSection('movies','ALL-TIME FAVORITES','From Every Era',MOVIES,'GLOBAL');
const nigeriaAnchor=document.getElementById('nigeria'); if(nigeriaAnchor)addSection('nigeria','MORE NOLLYWOOD','More Nigerian Movies',NIGERIA,'NIGERIA');
addMissingPosters();bind();
})();